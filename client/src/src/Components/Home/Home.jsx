import {useEffect, useState} from 'react'
import './Home.css'
import {Header} from '../Header/Header'
import {Articles} from '../Articles/Articles'

export const Home = () => {

    const [article, setArticle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Fetch data from reddit
    const fetchData = async() => {
        setIsLoading(true);
        try {
            const response = await fetch('https://www.reddit.com/r/chess.json');
            if (response.ok) {
                const jsonResponse = await response.json();
                setArticle(jsonResponse.data.children);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (article) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [article])

  return (
    <div id='homeComponent'>
        <header>
            <Header />
        </header>
        <section id='homeMain'>
            <section id="chessNewsSection">
                <h4>Chess Feed</h4>
                <Articles article={article} isLoading={isLoading} isError={isError} fetchData={fetchData}/>
            </section>
            <section id="playChessSectionContainer">
            <div id='quickStartSectionContainer'>
            
                <div id='quickStartSection'>
                    Quick Start Section
                <div>
                    <div className='quickStartBtn'>
                    <div class="lobby__app__content lpools">

                    <button>
                    <div data-id="1+0">
                    <div class="clock">1+0</div>
                    <div class="perf">Bullet</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="2+1">
                    <div class="clock">2+1</div>
                    <div class="perf">Bullet</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="3+0">
                    <div class="clock">3+0</div>
                    <div class="perf">Blitz</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="3+2">
                    <div class="clock">3+2</div>
                    <div class="perf">Blitz</div>
                    </div>
                    </button>
                    <button>
                    <div data-id="5+0">
                    <div class="clock">5+0</div>
                    <div class="perf">Blitz</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="5+3">
                    <div class="clock">5+3</div>
                    <div class="clock">Blitz</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="10+0">
                    <div class="clock">10+0</div>
                    <div class="perf">Rapid</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="10+5">
                    <div class="clock">10+5</div>
                    <div class="perf">Rapid</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="15+10">
                    <div class="clock">15+10</div>
                    <div class="perf">Rapid</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="30+0">
                    <div class="clock">30+0</div>
                    <div class="perf">Classical</div>
                    </div>
                    </button>

                    <button>
                    <div data-id="30+20">
                    <div class="clock">30+20</div>
                    <div class="perf">Classical</div>
                    </div>
                    </button>

                    <button>
                    <div class="custom" data-id="custom">Custom</div>
                    </button>
                    </div>
                    
                </div>
                </div>
                </div>

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