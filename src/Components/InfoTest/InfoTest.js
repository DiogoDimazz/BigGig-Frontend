import { useEffect } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './style.css'

export const InfoTest = () => {
    const {info} = useConsumer()

    useEffect(() => {
        return()=>{}
    }, [info])


    return (
        <h1>{info}</h1>
    )
}