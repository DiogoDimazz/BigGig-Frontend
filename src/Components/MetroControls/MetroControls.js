import { BpmInput } from '../BpmInput/BpmInput'
import './style.css'
import { TimeSignatureInput } from '../TimeSignatureInput/TimeSignatureInput'
import { SubdivisionInput } from '../SubdivisionInput/SubdivisionInput'
import { ClickVolume } from '../ClickVolume/ClickVolume'
import { PowerButton } from '../PowerButton/PowerButton'


export const MetroControls = () => {


    return (
        <main className='controls-main'>
            <BpmInput/>
            <div className='line-div'>
                <PowerButton/>
                <TimeSignatureInput/>
            </div>
            <ClickVolume/>
            <SubdivisionInput/>
        </main>
    )
}