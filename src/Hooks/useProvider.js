import { useState } from "react"


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)

    const [realBpm, setRealBpm] = useState(60)
    const [bpmChangeValue, setBpmChangeValue] = useState(2)
    const [bpmInMilisseconds, setBpmInMilisseconds] = useState(1000)
    
    const [faderPositionPercentage, setFaderPositionPercentage] = useState()

    const [timeSignature, setTimeSignature] = useState({
        time: '4/4',
        compoundMeter: false,
        beats: ['strong', 'weak', 'weak', 'weak'],
        isBeat: [false, false, false, false]
    })
    const [isBulbLit, setIsBulbLit] = useState([false, false, false, false])

    const [info, setInfo] = useState()

    return {
        metronomeOn, setMetronomeOn,
        realBpm, setRealBpm,
        bpmChangeValue, setBpmChangeValue,
        timeSignature, setTimeSignature,
        isBulbLit, setIsBulbLit,
        bpmInMilisseconds, setBpmInMilisseconds,
        faderPositionPercentage, setFaderPositionPercentage,
        info, setInfo
    }
}

export default useProvider;