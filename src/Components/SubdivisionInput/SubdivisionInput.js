import { useEffect } from 'react'
import './style.css'
import useConsumer from '../../Hooks/useConsumer'

export const SubdivisionInput = () => {
    const {timeSignature, isBulbLit, setIsBulbLit} = useConsumer()


    function bulbColor(beat, index) {
        switch (beat) {
            case 'strong':
                return {
                    backgroundColor: isBulbLit[index] ? 'green' : 'var(--green-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'weak':
                return {
                    backgroundColor: isBulbLit[index] ? 'red' : 'var(--red-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'medium':
                return {
                    backgroundColor: isBulbLit[index] ? 'var(--orange-100)' : 'var(--orange-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'subdivision':
                return {
                    backgroundColor: isBulbLit[index] ? 'red' : 'var(--red-bulb-off)',
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: '20%'
                }
            default:
                return
        }
    }

    function glowColor(beat, index) {
        switch (beat) {
            case 'strong':
                return {
                    backgroundColor: isBulbLit[index] ? 'var(--green-glow-on)' : 'var(--green-glow)',
                    top: '0.2rem',
                    left: '0.3rem'
                };
            case 'medium':
                return {
                    backgroundColor: isBulbLit[index] ? 'var(--orange-glow-on)' : 'var(--orange-glow)',
                    top: '0.2rem',
                    left: '0.3rem'
                }
            case 'subdivision': 
            return {
                backgroundColor: isBulbLit[index] ? 'var(--red-glow-on)' : 'var(--red-glow)',
                left: '0.1rem'
            }
            default:
                return {
                    backgroundColor: isBulbLit[index] ? 'var(--red-glow-on)' : 'var(--red-glow)',
                    top: '0.2rem',
                    left: '0.3rem'
                }
        }
    }

    function blinkColor(beat, index) {
        switch (beat) {
            case 'strong':
                return {
                    boxShadow: '0 0 2rem green',
                    display: isBulbLit[index] ? 'flex' : 'none'
                }
            case 'medium':
                return {
                    boxShadow: '0rem 0rem 2rem var(--orange-100)',
                    display: isBulbLit[index] ? 'flex' : 'none'
                }
            default:
                return {
                    boxShadow: '0rem 0rem 2rem red',
                    display: isBulbLit[index] ? 'flex' : 'none'
                }
        }
    }

    useEffect(() => {
        setIsBulbLit(timeSignature.isBeat)
    }, [timeSignature])

    return (
        <>
            <div className='subdivision-conteiner'>
                <span className='subdivision-label'>Subdivisão</span>
                <div className='subdivision-bulbs'>
                    {timeSignature.beats.map((beat, index) => (
                        <div className='beat' key={index}>
                            <span className='bulb' style={bulbColor(beat, index)}>
                                <span className='glow' style={glowColor(beat, index)}/>
                                <span className='blink' style={blinkColor(beat, index)}/>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}