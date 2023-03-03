import './style.css'
import useConsumer from '../../Hooks/useConsumer'
import strongBeat from '../../assets/strong-beat.mp3'
import mediumBeat from '../../assets/medium-beat.mp3'
import weakBeat from '../../assets/weak-beat.mp3'
import subdivisionBeat from '../../assets/subdivision-beat.mp3'
import { useEffect, useRef, useState } from 'react'

export const SoundAndBlinks = () => {
    const {timeSignature, isBulbLit, setIsBulbLit, metronomeOn, bpmInMilisseconds, faderPositionInPercentage} = useConsumer()
    const audioRefs = useRef([])
    audioRefs.current = []

    let clickInterval

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
            if (i - 1 === index) {return false}
            if (i === index) {return true}
            return b;
        })
        setIsBulbLit(localLights)
    }

    function metronomePlay() {
        audioRefs.current[0].play()
        lights(0)
        let beatNumber = 1
        
        clickInterval = setInterval(() => {
            audioRefs.current[beatNumber].play()
            lights(beatNumber)
            if (beatNumber < timeSignature.beats.length - 1) {beatNumber++} else {beatNumber = 0}
            
        }, [bpmInMilisseconds])
    }
    
    function addToRefs(el) {
        if(el) {
            audioRefs.current.push(el)
        }
    }
    
    useEffect(() =>{
        if(metronomeOn) {
            metronomePlay()
        } else {clearInterval(clickInterval)}
        return()=>{
            clearInterval(clickInterval)
            setIsBulbLit(timeSignature.isBeat)
        }
    }, [metronomeOn])

    useEffect(() => {

        return()=>{ 
        }
    }, [timeSignature])

    return (
        <>
            {timeSignature.beats.map((beat, index) => (
                <audio key={index} src={getProperClick(beat)} ref={addToRefs} />
            ))}
        </>
    )
}