import { getAllPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroLabel}>Our Blog</p>
          <h1 className={styles.heroTitle}>Insights &amp; Ideas</h1>
          <p className={styles.heroSub}>
            Practical articles on web design, SEO, and digital marketing — written by our team.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>No posts found. Check back soon.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>Powered by WordPress &amp; Next.js</p>
      </footer>
    </main>
  );
}
