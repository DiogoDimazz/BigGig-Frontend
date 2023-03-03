import { useEffect } from 'react';
import { Header } from '../../Components/Header/Header';
import { MetroControls } from '../../Components/MetroControls/MetroControls';
import { MetroGraph } from '../../Components/Metronomo/MetroGraph'
import { SoundAndBlinks } from '../../Components/SoundsAndBlinks/SoundsAndBlinks';
import useConsumer from '../../Hooks/useConsumer';
import './styles.css';
import { InfoTest } from '../../Components/InfoTest/InfoTest';

function Main() {

  return (
    <div className='main-page'>
      <Header/>
      <main className='main-container'>
        <div className='left-main-side'>
          <MetroGraph/>
          <MetroControls/>
          <SoundAndBlinks/>
        </div>
        <div className='right-main-side main-font-text'>
          <InfoTest/>
        </div>
      </main>
    </div>
  )
}

export default Main;
