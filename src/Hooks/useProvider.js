import { useState } from "react"


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [realBpm, setRealBpm] = useState(60)
    const [bpmIncrease, setBpmIncrease] = useState(2)
    const [bpmDecrease, setBpmDecrease] = useState(2)
    const [timeSignature, setTimeSignature] = useState({
        time: '4/4',
        compoundMeter: false,
        beats: ['strong', 'weak', 'weak', 'weak']
    })
    const [bpmInMilisseconds, setBpmInMilisseconds] = useState()

    return {
        metronomeOn, setMetronomeOn,
        realBpm, setRealBpm,
        bpmIncrease, setBpmIncrease,
        bpmDecrease, setBpmDecrease,
        timeSignature, setTimeSignature,
        bpmInMilisseconds, setBpmInMilisseconds
    }
}

export default useProvider;