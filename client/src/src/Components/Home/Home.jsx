import {useEffect, useState} from 'react'
import './Home.css'
import {Header} from '../Header/Header'
import {Articles} from '../Articles/Articles'
import QuickStartSection from './Quick Start Section/QuickStartSection'
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

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://chesspuzzle.net/Daily/Api', true);
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            let result = JSON.parse(request.responseText);
            document.getElementById("puzzleText").textContent = result.Text;
            document.getElementById("puzzleLink").href = result.Link;
            document.getElementById("puzzleImage").src = result.Image;
          }
        };
        request.send();
      }, []);
    
  return (
    <div id='homeComponent'>
        <header>
            <Header />
        </header>
        <section id='homeMain'>
            <section id='chessNewsSection'>
                <h4>Chess Feed</h4>
                <Articles article={article} isLoading={isLoading} isError={isError} fetchData={fetchData}/>
            </section>
            <section id="playChessSectionContainer">
                <div id='quickStartContainer'>
                    <QuickStartSection/>
                </div>
                
                <div className='puzzleStatsBtn'>
                    <a id="puzzleLink" href="https://chesspuzzle.net/Daily" target='_blank'>
                        <img id="puzzleImage" alt="Daily Chess Puzzle" />
                    </a>
                    <div>
                        <h3>Puzzle Of The Day</h3>  
                        <h4><span id="puzzleText" /></h4>
                    </div>   
                </div>
            </section>
        </section>
        <footer>
        </footer>
    </div>
    
  )
}
export default Home