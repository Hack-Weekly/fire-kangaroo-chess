import './Home.css'
import {Header} from '../Header/Header'

export const Home = () => {
  return (
    <div id='homeComponent'>
        <header>
            <Header />
        </header>
        <section id='homeMain'>
            <section id="chessNewsSection">
                News Section (COMPONENT)
            </section>
            <section id="playChessSectionContainer">
                <div id='quickStartSection'>
                    Quick Start Section (COMPONENT)
                </div>
                <div id='puzzleAndStatsSection'>
                    <div className='puzzleStatsBtn'>
                        Puzzle of the day
                    </div>
                    <div className='puzzleStatsBtn'>
                        Stats
                    </div>
                </div>
            </section>
        </section>
        <footer>FOOTER COMPONENT</footer>
    </div>
    
  )
}
export default Home