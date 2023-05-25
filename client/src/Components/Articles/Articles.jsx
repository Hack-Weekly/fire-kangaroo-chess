import {Post} from '../Post/Post'
import './Articles.css'

export const Articles = ({ article, isLoading, isError, fetchData }) => {

    if (isLoading) {
        return (
            <section className='statusMsg'>
                <h4 className='loading-text' >Loading...</h4>
            </section>
        )
    } else if (isError) {
        return (
            <section className='statusMsg'>
                <h4>Failed to load...</h4>
                <button onClick={fetchData}>Try again</button>
            </section>
        )
    } else {

        const articlesRenderLimit = article != null ? article.slice(0, 8) : [];

        return (
            <section className='articles'>
                {articlesRenderLimit.map((post) => <Post key={post.data.id} post={post.data} />)}
            </section>
          )
    }
}