import './styles.css'
import {useSpring, useTrail, animated, easings} from 'react-spring'
import useConsumer from '../../Hooks/useConsumer'

import metronome from '../../assets/Metronomo_2.png'
import stickHoleDetail from '../../assets/buraco_detalhe.png'
import { Pendulum } from '../Pendulum/Pendulum'

export const MetroGraph = () => {
    const {metronomeOn, setMetronomeOn} = useConsumer()


    return (
        <div className='metronome-conteiner'>
            <div className='metronome'>
                <img className='metronome-base-img img-general' src={metronome} alt='metronome'/>
                <Pendulum/>
                <img className='metronome-hole-detail' src={stickHoleDetail} alt='hole'/>
            </div>
            <button onClick={() => setMetronomeOn(!metronomeOn)}>On/Off</button>
        </div>
    )
}