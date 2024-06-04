import Image from "next/image";

import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/andreas.jpg"
          alt="Andreas photo"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I'm Andreas</h1>
      <p>I blog about web development</p>
    </section>
  );
}
