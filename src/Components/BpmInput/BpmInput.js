import { useEffect, useRef, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './style.css'

export const BpmInput = () => {
    const {
        metronomeOn,setMetronomeOn,
        realBpm, setRealBpm,
        isNewBpm, setIsNewBpm,
        bpmChangeValue, setBpmChangeValue,
        setBpmInMilisseconds
    } = useConsumer()
    const bpmInputRef = useRef(null)
    const [bpmInputValue, setBpmInputValue] = useState(realBpm)
    const bpmChangeValueRef = useRef(null)

    let isFirstInput = true

    function keyboardInputs({code, key}) {
        if(code === "Space") {return setMetronomeOn(prev => !prev)}
        
        if(!isNaN(key)) {
            if(isFirstInput) {
                bpmInputRef.current.focus()
                setBpmInputValue('')
                isFirstInput = false
                return
            }
        }
        
        if(code === 'ArrowUp') {
            if(Number(bpmInputRef.current.value) + bpmChangeValue > 240) {return}
            setBpmInputValue(Number(bpmInputRef.current.value) + bpmChangeValue)
            setRealBpm(Number(bpmInputRef.current.value) + bpmChangeValue)
            setIsNewBpm(true)
            return
        }
        
        if(code === 'ArrowDown') {
            if(Number(bpmInputRef.current.value) - bpmChangeValue < 30) {return}
            setBpmInputValue(Number(bpmInputRef.current.value) - bpmChangeValue)
            setRealBpm(Number(bpmInputRef.current.value) - bpmChangeValue)
            setIsNewBpm(true)
            return
        }
        
        if(code === 'ArrowRight') {
            if(bpmChangeValue === 10) {return}
            setBpmChangeValue(prev => prev+1)
            return
        }
        
        if(code === 'ArrowLeft') {
            if(bpmChangeValue === 1) {return}
            setBpmChangeValue(prev => prev-1)
            return
        }

    }

    function inputingBpm(e) {
        e.preventDefault()

        if(bpmInputRef.current.value !== '0') {
            setBpmInputValue(bpmInputRef.current.value)
            
            if(bpmInputRef.current.value >= 30 && bpmInputRef.current.value <= 240) {
                setRealBpm(bpmInputRef.current.value)
                isFirstInput = true
                bpmInputRef.current.blur()
                if(metronomeOn) {setIsNewBpm(true)}
            }

            return
        }

    }

    function bpmToMilisseconds() {
        setBpmInMilisseconds(60000 / realBpm)
    }

    useEffect(() => {
        if(!isNewBpm){return bpmToMilisseconds()}
        //eslint-disable-next-line
    }, [realBpm, isNewBpm])

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
                <input className='bpm-input' value={bpmInputValue} ref={bpmInputRef} onChange={inputingBpm}/>
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