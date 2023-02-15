import './styles.css'
import { animated, useSpring, easings } from 'react-spring'
import { useEffect, useState, useRef } from 'react'

import useConsumer from '../../Hooks/useConsumer'

import metronomeStick from '../../assets/haste.png'
import metronomeWeight from '../../assets/peso.png'
import metronomeClick from '../../assets/click-two.mp3'


export const Pendulum = () => {
    const {metronomeOn, bpmInMilisseconds} = useConsumer()

    const [pendulumElement, setPendulumElement] = useState()
    const [pendulumFirstMovementInitialization, setPendulumFirstMovementInitialization] = useState({transform: 'rotate(0deg)'})
    const [weightHeight, setWeightHeight] = useState()
    const [pendulumDelayEffect, setPendulumDelayEffect] = useState({transform: 'rotate(0deg)'})

    const bpm = 60000 / bpmInMilisseconds
    const clickRef = useRef(null)
    const bulbRef = useRef(null)
    const bulbGlowRef = useRef(null)

    let clickInterval

    const pendulumConfig = {
        easing: easings.easeInOutSine,
        clamp: true,
        duration: bpmInMilisseconds,
    }

    const [pendulumStart, apiPendulumStart] = useSpring(() => ({
        loop: false,
        from: {transform: 'rotate(0deg)'},
        to: {transform: `rotate(${(bpmInMilisseconds * 0.035)}deg)`},
        config: pendulumConfig,
        reset: true
    }), [metronomeOn])
    

    const pendulumMovement = useSpring({
        loop: {reverse: true},
        from: { transform: `rotate(0deg)`},
        to: [
            {transform: `rotate(-${(bpmInMilisseconds * 0.035) * 2}deg)`},
            {transform: `rotate(0deg)`},
        ],
        config: pendulumConfig,
        reset: true
    })

    const pendulumEnd = useSpring({
        from : {transform: `rotate(${bpmInMilisseconds * 0.035}deg)`},
        to: {transform: `rotate(0deg)`},
        config: {
            easing: easings.easeInElastic,
            clamp: true
        },
        reset: true,
        loop: false
    })

    const pendulumStop = useSpring({
        from: {transform: pendulumElement?.style.transform},
        to: {transform: 'rotate(0deg)'},
        config: {
            easing: easings.easeInElastic,
            clamp: true
        },
        reset: true,
        loop: false
    })

    function defineWeightPosition() {

        if (bpm < 40) return setWeightHeight(66)
        if (bpm > 206) return setWeightHeight(1)

        setWeightHeight((206 - bpm) * 0.375 + 1)
    }


    function clickReset() {
        setTimeout(() => {
            clickRef.current.currentTime = 0
        }, bpmInMilisseconds - 5)
    }


    function lightBulbBlink() {
        bulbRef.current.style.backgroundColor = "red"
        bulbGlowRef.current.style.opacity = 1
        
        setTimeout(() => {
            bulbRef.current.style.backgroundColor = "rgb(105, 0, 0)"
            bulbGlowRef.current.style.opacity = 0
        }, 100)
    }

    function switchMetronome() {
        apiPendulumStart.start()

        setTimeout(() => {
            if (pendulumDelayEffect !== pendulumMovement) {
                setPendulumDelayEffect(pendulumMovement)
            }
        }, bpmInMilisseconds)
        
        setTimeout(() => {
            clickInterval = setInterval(() => {
                clickRef.current.play()
                clickReset()
                lightBulbBlink()
            }, bpmInMilisseconds)
        }, bpmInMilisseconds/2)
    }
        
    useEffect(() => {

        if(metronomeOn){
            switchMetronome()
            setPendulumFirstMovementInitialization(pendulumEnd)
        }
    return(()=>{
        clearInterval(clickInterval)
        setPendulumDelayEffect(pendulumStop)
        })
        //eslint-disable-next-line
    }, [metronomeOn])

    useEffect(() => {
        setPendulumElement(document.querySelector('.pendulum-group'))
        defineWeightPosition()
        return(()=>{
            setPendulumFirstMovementInitialization({transform: 'rotate(0deg)'})
        })
        //eslint-disable-next-line
    }, [])


    return (
        <>
            <audio src={metronomeClick} ref={clickRef}/>
            <animated.div style={metronomeOn ? pendulumStart : pendulumFirstMovementInitialization} className='pendulum-first-move-box'>
                <animated.div style={pendulumDelayEffect} className='pendulum-group'>
                    <animated.img className='metronome-stick-img img-general' src={metronomeStick} alt='stick'/>
                    <animated.img className='metronome-weight img-general' src={metronomeWeight} alt='weight' style={{bottom: `${weightHeight}%`}}/>
                </animated.div>
            </animated.div>
            <div className='light-bulb-element'>
                    <div className='light-bulb img-general' ref={bulbRef} style={{backgroundColor: 'rgb(105, 0, 0)'}}/>
                    <div className='light-bulb-flash img-general' ref={bulbGlowRef} style={{opacity: 0}}/>
                    <div className='light-bulb-shine img-general'/>
            </div>
        </>
    )
}