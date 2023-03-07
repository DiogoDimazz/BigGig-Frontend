import useConsumer from '../../Hooks/useConsumer'
import './style.css'
import { timeSignaturesData } from '../../Data/TimeSignaturesData'
import { useRef, useState } from 'react'

export const TimeSignatureInput = () => {
    const {timeSignature, setTimeSignature} = useConsumer()
    const [localTimeSignature, setLocalTimeSignature] = useState(timeSignature.time)
    const selectRef = useRef(null)

    function changeTimeSignature(e) {
        e.preventDefault()

        if(e.target.value === 'Outra fórmula de compasso...') {
            return
        }

        setTimeSignature(timeSignaturesData.find(ts => ts.time === e.target.value))
        setLocalTimeSignature(e.target.value)
        selectRef.current.blur()
    }

    return (
        <>
            <div className='time-info-conteiner'>
                <label className='time-label'>
                    Fórmula de Compasso
                    <select
                        ref={selectRef}
                        value={localTimeSignature}
                        name='timeSignature' 
                        className='time-signature-input' 
                        onChange={(e) => changeTimeSignature(e)}
                        >
                            {timeSignaturesData.map((timeInfo, index) => (
                                <option
                                    className='time-signature'
                                    key={index}
                                >
                                    {timeInfo.time}
                                </option>
                            ))}
                        <option key={timeSignaturesData.length + 1}>Outra fórmula de compasso...</option>
                    </select>
                </label>
            </div>
        </>
    )
}