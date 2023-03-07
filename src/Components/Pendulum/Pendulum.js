import useConsumer from '../../Hooks/useConsumer'
import { animated, useSpring, easings } from 'react-spring'
import { useEffect, useState } from 'react'
import './style.css'

export const Pendulum = () => {
    const {metronomeOn, setMetronomeOn, bpmInMilisseconds, realBpm, isNewBpm, pendulumAngle, setPendulumAngle} = useConsumer()
    const [pendulumElement, setPendulumElement] = useState()
    const [firstMoveElement, setFirstMoveElement] = useState()
    const [isLoopOn, setIsLoopOn] = useState()
    const [weightPosition, setWeightPosition] = useState()
    
    function defineWeightPosition() {
        if(realBpm < 40) {return setWeightPosition(88)}
        if(realBpm > 208) {return setWeightPosition(2)}
        return setWeightPosition(88 - ((realBpm - 40) * 0.51))
    }

    function definePendulumAngle() {
        if(realBpm < 40) {return setPendulumAngle(145)}
        if(realBpm > 208) {return setPendulumAngle(13)}

        setPendulumAngle((((208 - realBpm) * 0.79) + 13).toFixed(0))
    }
    
    const [firstMove] = useSpring({
        loop: false,
        from: {transform: metronomeOn ? 'rotate(0deg)' : firstMoveElement?.style.transform},
        to: {transform: metronomeOn ?  `rotate(${pendulumAngle/2}deg)` : 'rotate(0deg)'},
        config: {
            easing: easings.easeInOutSine,
            clamp: true,
            duration: metronomeOn ? bpmInMilisseconds/2 : bpmInMilisseconds
        },
    }, [metronomeOn])
    
    function loopDefinition() {
        if(isLoopOn) {
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
            {transform: isLoopOn ?  `rotate(-${pendulumAngle}deg)` : 'rotate(0deg)'},
            {transform: 'rotate(0deg)'}
        ],
        config: {
            easing: easings.easeInOutSine,
            clamp: true,
            duration: bpmInMilisseconds,
        },
    }), [isLoopOn, bpmInMilisseconds])
    
    
    useEffect(() => {
        if(metronomeOn) {
            setTimeout(() => {
                setIsLoopOn(true)
            }, bpmInMilisseconds/2)
            return
        }
        setIsLoopOn(false)
        //eslint-disable-next-line
    }, [metronomeOn])

    useEffect(() => {
        if(isNewBpm) {return}
        defineWeightPosition()
        definePendulumAngle()
        return()=>{
        }
        //eslint-disable-next-line
    }, [isNewBpm])

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