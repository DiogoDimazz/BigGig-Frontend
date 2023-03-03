import './style.css'
import fader from '../../assets/fader.png'
import { useEffect, useRef, useState } from 'react';
import Draggable, {DraggableCore} from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer';

export const ClickVolume = () => {
    const {faderPositionPercentage, setFaderPositionPercentage} = useConsumer()
    const [faderPositionPixels, setFaderPositionPixels] = useState()
    const [faderHoleSize, setFaderHoleSize] = useState()
    const nodeRef = useRef(null)
    const holeRef = useRef(null)

    function knobMoved(e) {
        e.preventDefault()
        const translation = Number(nodeRef.current.style.transform.slice(10).split('px, ')[0])
        setFaderPositionPixels(translation)
        setFaderPositionPercentage((translation / (faderHoleSize / 2)).toFixed(2))
    }

    function screenSizeAdjustment() {
        const newWidth = (holeRef.current.clientWidth * 24.36) / 100        
        setFaderHoleSize(newWidth);
    }

    useEffect(() => {
        setFaderPositionPixels((faderHoleSize/2) * faderPositionPercentage)
    }, [faderHoleSize])

    useEffect(() => {
        setFaderHoleSize(holeRef.current.clientWidth);
        setFaderPositionPixels(0)
        setFaderPositionPercentage(0)
        window.addEventListener('resize', screenSizeAdjustment)
        //eslint-disable-next-line
    }, [])

    return(
        <div className='volume-conteiner'>
            <div ref={holeRef} className='fader-hole'/>
            <Draggable
            nodeRef={nodeRef}
            bounds='.fader-hole'
            axis='x'
            handle='.fader-knob'
            position={{x: faderPositionPixels, y: 0}}
            onStop={knobMoved}
            >
                <img
                ref={nodeRef}
                src={fader}
                draggable='false'
                alt='fader-knob'
                className='fader-knob' 
                />
            </Draggable>
        </div>
    )
}