import './styles.css'
import {useSpring, useTrail, animated, easings} from 'react-spring'
import useConsumer from '../../Hooks/useConsumer'

import { Pendulum } from '../Pendulum/Pendulum'
export const MetroGraph = () => {

    return (
        <div className='metronome-conteiner'>
            <div className='metronome'>
                <Pendulum/>
            </div>
        </div>
    )
}