import { useState } from "react"


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmInMilisseconds, setBpmInMilisseconds] = useState(400)

    return {
        metronomeOn, setMetronomeOn,
        bpmInMilisseconds, setBpmInMilisseconds
    }
}

export default useProvider;