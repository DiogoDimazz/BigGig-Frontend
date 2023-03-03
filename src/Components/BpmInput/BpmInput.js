import { useEffect, useRef } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './style.css'

export const BpmInput = () => {
    const {
        setMetronomeOn,
        realBpm, setRealBpm,
        bpmChangeValue, setBpmChangeValue
    } = useConsumer()
    const bpmInputRef = useRef(null)
    const bpmChangeValueRef = useRef(null)

    let isFirstInput = true

    function keyboardInputs({code, key}) {
        if(code === "Space") {return setMetronomeOn(prev => !prev)}

        if(!isNaN(key)) {
            if(isFirstInput) {
                bpmInputRef.current.value = ''
                bpmInputRef.current.focus()

                isFirstInput = false
                return
            }
        }

        if(code === 'ArrowUp') {
            if(bpmInputRef.current.value > 240 - bpmChangeValue) {return}

            bpmInputRef.current.value += bpmChangeValue
            setRealBpm(prev => prev + bpmChangeValue)
        }

        if(code === 'ArrowDown') {
            if(bpmInputRef.current.value - bpmChangeValue < 30) {return}
            bpmInputRef.current.value -= bpmChangeValue
            setRealBpm(prev => prev - bpmChangeValue)
        }

        if(code === 'ArrowRight') {
            console.log(bpmChangeValue);
            if(bpmChangeValue === 10) {return}
            setBpmChangeValue(prev => prev+1)
        }
        
        if(code === 'ArrowLeft') {
            if(bpmChangeValue === 1) {return}
            setBpmChangeValue(prev => prev-1)
        }

    }

    function inputingBpm() {
        if(bpmInputRef.current.value >= 30 && bpmInputRef.current.value <= 240) {
            setRealBpm(bpmInputRef.current.value)
            bpmInputRef.current.blur()
            isFirstInput = true
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyboardInputs)

        return()=>{
            window.removeEventListener('keydown', keyboardInputs)
        }
        //eslint-disable-next-line
    }, [realBpm, bpmChangeValue])


    return (
        <div className='bpm-conteiner'>
            <label className='bpm-label'>
                <input className='bpm-input' value={realBpm} ref={bpmInputRef} onChange={inputingBpm}/>
                    BPM
            </label>
            <div className='bpm-change-values'>
            <div className='bpm-change-controls'>
                <button className='bpm-changer-btn'>+</button>
                <div className='bpm-change-inner-box'>
                    <button className='left-arrow-bpm-changer arrows-bpm-changer'/>
                        <span ref={bpmChangeValueRef} className='bpm-change-input small-input-font'>{bpmChangeValue}</span>
                        <button className='right-arrow-bpm-changer arrows-bpm-changer'/>
                    </div>
                <button className='bpm-changer-btn'>-</button>
            </div>
            <span className='small-disclaimer bpm-changer-span'>use as setas do teclado</span>
        </div>
        </div>
    )
}