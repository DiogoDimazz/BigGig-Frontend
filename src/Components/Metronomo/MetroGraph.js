import './styles.css'
import metronome from '../../assets/Metronomo_1.png'
import metronomeStick from '../../assets/haste.png'
import stickHoleDetail from '../../assets/buraco_detalhe.png'
import metronomeWeight from '../../assets/peso.png'

export const MetroGraph = () => {
    return (
        <div className='metronome-conteiner'>
            <div className='metronome'>
                <img className='metronome-base-img' src={metronome} alt='metronome'/>
                <img className='metronome-stick-img' src={metronomeStick} alt='stick'/>
                <img className='metronome-hole-detail' src={stickHoleDetail} alt='hole'/>
                <img className='metronome-weight' src={metronomeWeight} alt='weight'/>
            </div>
        </div>
    )
}