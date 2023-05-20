import './Post.css'

export const Post = ({ post }) => {
    const maxCharacters = 60;
    let formatTitle = post.title.replace(/&amp;/g, '&')

    if (formatTitle.length > maxCharacters) {
        formatTitle = formatTitle.slice(0, maxCharacters) + '...';
      }

  return (
    <section>
        <p>{ formatTitle }</p>
    </section>
  )
}