import { BpmInput } from '../BpmInput/BpmInput'
import './style.css'
import { TimeSignatureInput } from '../TimeSignatureInput/TimeSignatureInput'
import { SubdivisionInput } from '../SubdivisionInput/SubdivisionInput'


export const MetroControls = () => {


    return (
        <main className='controls-main'>
            <BpmInput/>
            <TimeSignatureInput/>
            <SubdivisionInput/>
        </main>
    )
}