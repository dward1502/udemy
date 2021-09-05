import Image from 'next/image';

import classes from './hero.module.scss';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/hero.jpg'
          alt='An image showing people'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Daniel</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular and React
      </p>
    </section>
  );
}

export default Hero;
