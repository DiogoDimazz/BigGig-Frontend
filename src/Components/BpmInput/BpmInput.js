import { useEffect, useRef } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './style.css'

export const BpmInput = () => {
    const {
        setMetronomeOn,
        realBpm, setRealBpm,
        bpmIncrease,
        bpmDecrease} = useConsumer()
    const bpmInputRef = useRef(null)
    const bpmIncreaseRef = useRef(null)
    const bpmDecreaseRef = useRef(null)

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
            if(bpmInputRef.current.value > 240 - bpmIncrease) {return}

            bpmInputRef.current.value += bpmIncrease
            setRealBpm(prev => prev + bpmIncrease)
        }

        if(code === 'ArrowDown') {
            if(bpmInputRef.current.value - bpmDecrease < 30) {return}
            bpmInputRef.current.value -= bpmDecrease
            setRealBpm(prev => prev - bpmDecrease)
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
        }
        //eslint-disable-next-line
    }, [])


    return (
        <div className='bpm-conteiner'>
            <label className='bpm-label'>
                <input className='bpm-input' value={realBpm} ref={bpmInputRef} onChange={inputingBpm}/>
                    BPM
            </label>
            <div className='bpm-change-values'>
                <div className='bpm-increase-box'>
                    <div className='bpm-increase-first-line'>
                        <input ref={bpmIncreaseRef} className='increase-bpm bpm-change-input' defaultValue={bpmIncrease}/>
                        <button className='bpm-changer-btn'>+</button>
                    </div>
                    <span className='small-disclaimer bpm-changer-span'>ou seta pra cima</span>
                </div>
                <div className='bpm-decrease-box'>
                    <span className='small-disclaimer bpm-changer-span'>ou seta pra baixo</span>
                    <div className='bpm-decrease-first-line'>
                        <input ref={bpmDecreaseRef} className='decrease-bpm bpm-change-input' defaultValue={bpmDecrease}/>
                        <button className='bpm-changer-btn'>-</button>
                    </div>
                </div>
            
            </div>
        </div>
    )
}