import './styles.css'
import {useSpring, animated, config} from 'react-spring'
import useConsumer from '../../Hooks/useConsumer'

import metronome from '../../assets/Metronomo_1.png'
import metronomeStick from '../../assets/haste.png'
import stickHoleDetail from '../../assets/buraco_detalhe.png'
import metronomeWeight from '../../assets/peso.png'

export const MetroGraph = () => {
    const {metronomeOn, setMetronomeOn} = useConsumer()
    const pendulumMovement = useSpring({
        from: { transform: 'rotate(45deg)'},
        to: [
            {transform: 'rotate(45deg)'},
            {transform: 'rotate(-45deg)'}
    ],
    config: {
        friction: 20,
        tension: 110
    },
    loop: {
        reverse: true
    }
    })


    return (
        <div className='metronome-conteiner'>
            <div className='metronome'>
                <img className='metronome-base-img img-general' src={metronome} alt='metronome'/>
                <animated.div style={metronomeOn ? pendulumMovement : {transform: 'rotate(0deg)'}} className='pendulum-group'>
                    <img className='metronome-stick-img img-general' src={metronomeStick} alt='stick'/>
                    <img className='metronome-weight img-general' src={metronomeWeight} alt='weight'/>
                </animated.div>
                <img className='metronome-hole-detail' src={stickHoleDetail} alt='hole'/>
            </div>
            <div>
                <button onClick={() => setMetronomeOn(!metronomeOn)}>On/Off</button>
            </div>
        </div>
    )
}