import { useEffect } from 'react'
import './style.css'
import useConsumer from '../../Hooks/useConsumer'

export const SubdivisionInput = () => {
    const {timeSignature} = useConsumer()


    function bulbColor(beat) {
        switch (beat) {
            case 'strong':
                return {
                    backgroundColor: 'var(--green-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'weak':
                return {
                    backgroundColor: 'var(--red-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'medium':
                return {
                    backgroundColor: 'var(--red-bulb-off)',
                    width: '100%',
                    height: '100%'
                };
            case 'subdivision':
                return {
                    backgroundColor: 'var(--red-bulb-off)',
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: '20%'
                }
            default:
                return
        }
    }

    function glowColor(beat) {
        switch (beat) {
            case 'strong':
                return {
                    backgroundColor: 'var(--green-glow)',
                    top: '0.2rem',
                    left: '0.3rem'
                };
            case 'subdivision': 
            return {
                backgroundColor: 'var(--red-glow)',
                left: '0.1rem'
            }
            default:
                return {
                    backgroundColor: 'var(--red-glow)',
                    top: '0.2rem',
                    left: '0.3rem'
                }
        }
    }

    function blinkColor(beat) {
        switch (beat) {
            case 'strong':
                return {
                    boxShadow: '0 0 1rem green',
                    display: 'none'
                }
            case 'medium':
                return {
                    boxShadow: '0.1rem 0.1rem 1rem red',
                    display: 'none'
                }
            default:
                return {
                    boxShadow: '0.1rem 0.1rem 1rem red',
                    display: 'none'
                }
        }
    }

    useEffect(() => {
    }, [timeSignature])

    return (
        <>
            <div className='subdivision-conteiner'>
                <span className='subdivision-label'>Subdivisão</span>
                <div className='subdivision-bulbs'>
                    {timeSignature.beats.map((beat, index) => (
                        <div className='beat' key={index}>
                            <span className='bulb' style={bulbColor(beat)}>
                                <span className='glow' style={glowColor(beat)}/>
                                <span className='blink' style={blinkColor(beat)}/>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}