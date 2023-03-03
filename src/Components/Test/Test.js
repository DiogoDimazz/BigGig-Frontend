import { useEffect, useState } from 'react'
import './style.css'
import useConsumer from '../../Hooks/useConsumer'
import { animated, useSpring, easings, config } from 'react-spring'

export const Test = () =>{
    const {bpmInMilisseconds} = useConsumer()
    const [clickOn, setClickOn] = useState(false)
    const [angle, setAngle] = useState(45)
    const [fatherPendulum, setFatherPendulum] = useState()
    const [childPendulum, setChildPendulum] = useState()
    const [frameo, setFrameo] = useState()

    const pendulumConfig = {
        easing: easings.easeInOutSine,
        clamp: true,
        duration: bpmInMilisseconds,
    }

    const firstMove = useSpring({
        loop: false,
        from: {transform: clickOn ? 'rotate(0deg)' : `rotate(${angle/2}deg)`},
        to: {transform: clickOn ?  `rotate(${angle/2}deg)` : 'rotate(0deg)'},
        config: pendulumConfig
    })

    const pendulo = useSpring({
        loop: {cancel: clickOn ? false : true},
        from: {transform: 'rotate(0deg)'},
        to: [
            {transform: `rotate(-${angle}deg)`},
            {transform: 'rotate(0deg)'}
        ],
        config: pendulumConfig,
        reset: true
    })

    const penduloStop = useSpring({
        loop: false,
        from: {transform: childPendulum?.style.transform},
        to: {transform: 'rotate(0deg)'},
        config: pendulumConfig,
        reset: true
    })

    function StartStop() {
        setClickOn(prev => !prev)
    }

    useEffect(() => {
        frameo?.addEventListener('click', StartStop)
    }, [frameo])


    useEffect(() => {
        setFatherPendulum(document?.querySelector('.primeiro'))
        setChildPendulum(document?.querySelector('.pendulo'))
        setFrameo(document?.querySelector('.frame'))
        return()=>{
            setClickOn(false)
        }
    }, [])

    return (
        <div className='geral'>
            <div className='frame'>
                <animated.div className='primeiro' style={firstMove}>
                    <animated.div className='pendulo' style={pendulo}/>
                </animated.div>
            </div>
            <div className='info'>    
                {clickOn
                ?
                <h2 className='informer'>On</h2>
                :
                <h2 className='informer'>Off</h2>
                }
                <h2 className='second-informer'>{childPendulum?.style.transform}</h2>
            </div>
        </div>
    )
}