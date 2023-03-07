import './style.css'
import ReactAudioPlayer from 'react-audio-player'
import useConsumer from '../../Hooks/useConsumer'
import strongBeat from '../../assets/strong-beat.mp3'
import mediumBeat from '../../assets/medium-beat.mp3'
import weakBeat from '../../assets/weak-beat.mp3'
import subdivisionBeat from '../../assets/subdivision-beat.mp3'
import { useEffect, useRef, useState } from 'react'
import { useInterval } from '../../Hooks/useInterval'

export const SoundAndBlinks = () => {
    const {timeSignature, isBulbLit, setIsBulbLit, metronomeOn, bpmInMilisseconds, isNewBpm, setIsNewBpm} = useConsumer()
    const audioRefs = useRef([])
    audioRefs.current = []
    const [beatNumber, setBeatNumber] = useState(0)

    function getProperClick(beat) {
        switch(beat) {
            case 'strong':
                return strongBeat;
            case 'medium':
                return mediumBeat;
            case 'weak':
                return weakBeat;
            case 'subdivision':
                return subdivisionBeat
            default:
                break;
        }
    }

    function lights(i) {
        const localLights = isBulbLit.map((b, index) => {
            if (i - 1 === index || (i === 0 && index === isBulbLit.length - 1)) {return false}
            if (i === index) {return true}
            return b;
        })
        setIsBulbLit(localLights)
    }
    
    function addToRefs(el) {
        if(el) {
            audioRefs.current.push(el)
        }
    }
    
    useInterval(() => {

        if(!audioRefs.current[beatNumber]) {
            setBeatNumber(1)
            audioRefs.current[0].play()
            lights(0)
            return
        }

        audioRefs.current[beatNumber].play()
        lights(beatNumber)
        if(isNewBpm){return setIsNewBpm(false)}
        
        if (beatNumber >= timeSignature.beats.length - 1) {
            setBeatNumber(0)
        } else {
            setBeatNumber(prev => prev + 1)
        }
    }, metronomeOn ? bpmInMilisseconds : null)

    useEffect(() => {
        setIsBulbLit(timeSignature.isBeat)

        if(!metronomeOn) return setBeatNumber(0)

        return()=>{}
    }, [metronomeOn])

    return (
        <>
            {timeSignature.beats.map((beat, index) => (
                <audio key={index} src={getProperClick(beat)} ref={addToRefs}/>
            ))}
        </>
    )
}