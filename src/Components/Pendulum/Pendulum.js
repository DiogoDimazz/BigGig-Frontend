import useConsumer from '../../Hooks/useConsumer'
import { animated, useSpring, easings } from 'react-spring'
import { useEffect, useState } from 'react'
import './style.css'

export const Pendulum = () => {
    const {metronomeOn, setMetronomeOn, bpmInMilisseconds, realBpm} = useConsumer()
    const [pendulumElement, setPendulumElement] = useState()
    const [firstMoveElement, setFirstMoveElement] = useState()
    const [teste, setTeste] = useState()
    const [weightPosition, setWeightPosition] = useState()

    const angle = 60
    
    function defineWeightPosition() {
        if(realBpm < 40) {return setWeightPosition(88)}
        if(realBpm > 208) {return setWeightPosition(2)}
        return setWeightPosition(88 - ((realBpm - 40) * 0.51))
    }
    
    const firstMove = useSpring({
        loop: false,
        from: {transform: metronomeOn ? 'rotate(0deg)' : firstMoveElement?.style.transform},
        to: {transform: metronomeOn ?  `rotate(${angle/2}deg)` : 'rotate(0deg)'},
        config: {
            easing: easings.easeInOutSine,
            clamp: true,
            duration: metronomeOn ? bpmInMilisseconds/2 : bpmInMilisseconds
        }
    })

    function loopDefinition() {
        if(teste) {
            return {reverse: true}
        }
        return {
            cancel: true
        }
    }

    const [pendulumMovement] = useSpring(() => ({
        loop: loopDefinition(),
        from: {transform: 'rotate(0deg)'},
        to: [
            {transform: teste ?  `rotate(-${angle}deg)` : 'rotate(0deg)'},
            {transform: 'rotate(0deg)'}
        ],
        config: {
            easing: easings.easeInOutSine,
            clamp: true,
            duration: bpmInMilisseconds,
        }
    }), [teste])

 

    useEffect(() => {
        if(metronomeOn) {
            console.log('true');
            setTimeout(() => {
                setTeste(true)
            }, bpmInMilisseconds/2)
            return
        }
        console.log('false');
        setTeste(false)
        //eslint-disable-next-line
    }, [metronomeOn])

    useEffect(() => {
        defineWeightPosition()
        //eslint-disable-next-line
    }, [realBpm])

    useEffect(() => {
        setPendulumElement(document.querySelector('.pendulum'))
        setFirstMoveElement(document.querySelector('.first-move'))
        return()=>{
            setMetronomeOn(false)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <animated.div style={firstMove} className='first-move'>
            <animated.div style={pendulumMovement} className='pendulum'>
                <animated.div className='pendulum-weight' style={{bottom: `${weightPosition}%`}}/>
            </animated.div>
        </animated.div>
    )
}