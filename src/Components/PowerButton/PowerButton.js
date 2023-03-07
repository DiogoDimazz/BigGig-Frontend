import { useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './style.css'

export const PowerButton = () => {
    const {setMetronomeOn} = useConsumer()
    const [onOff, setOnOff] = useState(false)

    return (
        <div className='power-button' onClick={() => setMetronomeOn(prev => !prev)}>
            <span className='button-text'>{onOff ? 'On' : 'Off'}</span>
        </div>
    )
}