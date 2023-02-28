import { Header } from '../../Components/Header/Header';
import { MetroControls } from '../../Components/MetroControls/MetroControls';
import { MetroGraph } from '../../Components/Metronomo/MetroGraph'
import useConsumer from '../../Hooks/useConsumer';
import './styles.css';

function Main() {
  const {metronomeOn, setMetronomeOn} = useConsumer()

  return (
    <div className='main-page'>
      <Header/>
      <main className='main-container'>
        <div className='left-main-side'>
          <MetroGraph/>
          <MetroControls/>
          {/* <button onClick={() => setMetronomeOn(!metronomeOn)}>ligar</button> */}
        </div>
        <div className='right-main-side main-font-text'>
          Right Main Side
        </div>
      </main>
    </div>
  )
}

export default Main;
