import { useState } from "react"


function useProvider() {
    const [groceries, setGroceries] = useState([])

    return {
        groceries, setGroceries
    }
}

export default useProvider;