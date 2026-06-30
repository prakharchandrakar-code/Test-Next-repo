import { getAllPosts, getPostBySlug, formatDate } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./post.module.css";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImageUrl && { images: [post.featuredImageUrl] }),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className={styles.main}>
      <article>
        {/* Hero */}
        <div className={styles.hero}>
          {post.featuredImageUrl && (
            <div className={styles.heroImage}>
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.heroOverlay} />
            </div>
          )}
          <div className={styles.heroContent}>
            <Link href="/" className={styles.back}>
              ← Back to blog
            </Link>
            <div className={styles.metaRow}>
              {post.categories[0] && (
                <span className={styles.category}>{post.categories[0]}</span>
              )}
              <span className={styles.date}>{formatDate(post.date)}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt && (
              <p className={styles.excerpt}>{post.excerpt}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentWrapper}>
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBack}>
          ← All articles
        </Link>
      </footer>
    </main>
  );
}
