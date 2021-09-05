import { Fragment } from 'react';
import Hero from '../components/home/hero';
import FeaturedPosts from '../components/home/featured-posts';

const DUMMY_POSTS = [
  {
    title: 'Getting Started With NextJS',
    slug: 'getting-started-with-nextjs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a react framework for production - it makes building fullstack react applications a breeze',
    date: '2022-02-10',
  },
  {
    title: 'Getting Started With NextJS',
    slug: 'getting-started-with-nextjs2',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a react framework for production - it makes building fullstack react applications a breeze',
    date: '2022-02-10',
  },
  {
    title: 'Getting Started With NextJS',
    slug: 'getting-started-with-nextjs3',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a react framework for production - it makes building fullstack react applications a breeze',
    date: '2022-02-10',
  },
  {
    title: 'Getting Started With NextJS',
    slug: 'getting-started-with-nextjs4',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a react framework for production - it makes building fullstack react applications a breeze',
    date: '2022-02-10',
  },
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}

export default HomePage;
