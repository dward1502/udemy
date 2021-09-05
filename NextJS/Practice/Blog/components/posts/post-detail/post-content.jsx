import ReactMarkdown from 'react-markdown'
import classes from './post-content.module.scss'
import PostHeader from './post-header';

const DUMMY_SLUG = [
  {
    title: 'Getting Started With NextJS',
    slug: 'getting-started-with-nextjs',
    image: 'getting-started-nextjs.png',
    date: '2022-02-10',
    content:'# This is the first post'
  }
];

function PostContent() {
    const imagePath = `/images/posts/${DUMMY_SLUG.slug}/${DUMMY_SLUG.image}`

    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_SLUG.title} image={imagePath}/>
            <ReactMarkdown>{DUMMY_SLUG.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent
