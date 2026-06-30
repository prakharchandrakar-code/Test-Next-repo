import Image from "next/image";
import Link from "next/link";
import { WPPost, formatDate } from "@/lib/wordpress";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: WPPost;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const delay = `${index * 80}ms`;
  const primaryCategory = post.categories[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.card}
      style={{ "--delay": delay } as React.CSSProperties}
    >
      <div className={styles.imageWrapper}>
        {post.featuredImageUrl ? (
          <Image
            className={styles.image}
            src={post.featuredImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>✍️</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {primaryCategory && (
            <span className={styles.category}>{primaryCategory}</span>
          )}
          <span className={styles.date}>{formatDate(post.date)}</span>
        </div>

        <h2 className={styles.title}>{post.title}</h2>

        {post.excerpt && (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}

        <span className={styles.readMore}>
          Read article <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
