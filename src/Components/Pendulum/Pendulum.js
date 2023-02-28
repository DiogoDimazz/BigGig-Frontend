import useConsumer from '../../Hooks/useConsumer'
import { animated, useSpring, easings } from 'react-spring'
import { useEffect, useState } from 'react'
import './style.css'

export const Pendulum = () => {
    const {metronomeOn, bpmInMilisseconds, realBpm} = useConsumer()
    const [firstMoveElement, setFirstMoveElement] = useState()
    const [pendulumElement, setPendulumElement] = useState()
    const [weightPosition, setWeightPosition] = useState()


    const pendulumConfig = {
        easing: easings.easeInOutSine,
        clamp: true,
        duration: bpmInMilisseconds,
    }

    const firstMove = useSpring({
        from: metronomeOn ? {transform: 'rotate(0deg)'} : {transform: firstMoveElement?.style.transform},
        to: metronomeOn ? {transform: 'rotate(-45deg)'} : {transform: 'rotate(0deg)'},
        config: pendulumConfig
    })

    const pendulumMovement = useSpring({
        loop: {reverse: true},
        from: { transform: `rotate(0deg)`},
        to: [
            {transform: `rotate(90deg)`},
            {transform: `rotate(0deg)`},
        ],
        config: pendulumConfig,
        reset: true
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
        if(realBpm < 40) {return setWeightPosition(88)}
        if(realBpm > 208) {return setWeightPosition(2)}

        return setWeightPosition(88 - ((realBpm - 40) * 0.51))
    }

    useEffect(() => {
        defineWeightPosition()
        //eslint-disable-next-line
    }, [realBpm])
    
    useEffect(() => {
        setPendulumElement(document.querySelector('.pendulum'))
        setFirstMoveElement(document.querySelector('.first-move'))
        //eslint-disable-next-line
    }, [])

    return (
        <animated.div style={firstMove} className='first-move'>
            <animated.div style={metronomeOn ? pendulumMovement : pendulumStop} className='pendulum'>
                <animated.div className='pendulum-weight' style={{bottom: `${weightPosition}%`}}/>
            </animated.div>
        </animated.div>
    )
}