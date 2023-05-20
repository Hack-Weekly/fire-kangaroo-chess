import {Post} from '../Post/Post'
import './Articles.css'

export const Articles = ({ article, isLoading, isError, fetchData }) => {

    if (isLoading) {
        return <h4>Loading...</h4>
    } else if (isError) {
        return (
            <section>
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