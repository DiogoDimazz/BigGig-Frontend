import { useState } from "react"


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)

    const [realBpm, setRealBpm] = useState(60)
    const [isNewBpm, setIsNewBpm] = useState(false)
    const [bpmChangeValue, setBpmChangeValue] = useState(2)
    const [bpmInMilisseconds, setBpmInMilisseconds] = useState(1000)
    const [pendulumAngle, setPendulumAngle] = useState()
    
    const [faderPositionPercentage, setFaderPositionPercentage] = useState()

    const [timeSignature, setTimeSignature] = useState({
        time: 'single beat',
        compoundMeter: false,
        beats: ['strong'],
        isBeat: [false]
    })
    const [isBulbLit, setIsBulbLit] = useState([false])

    const [info, setInfo] = useState()

    return {
        metronomeOn, setMetronomeOn,
        realBpm, setRealBpm,
        isNewBpm, setIsNewBpm,
        bpmChangeValue, setBpmChangeValue,
        timeSignature, setTimeSignature,
        isBulbLit, setIsBulbLit,
        bpmInMilisseconds, setBpmInMilisseconds,
        pendulumAngle, setPendulumAngle,
        faderPositionPercentage, setFaderPositionPercentage,
        info, setInfo
    }
}

export default useProvider;