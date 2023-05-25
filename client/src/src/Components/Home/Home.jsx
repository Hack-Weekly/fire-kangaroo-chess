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
                <QuickStartSection/>

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