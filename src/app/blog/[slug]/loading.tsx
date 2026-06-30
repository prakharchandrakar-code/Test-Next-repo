import styles from "./loading.module.css";

export default function PostLoading() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.shimmer} ${styles.backSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.badgeSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.titleSkeleton}`} />
          <div className={`${styles.shimmer} ${styles.titleSkeleton} ${styles.titleShort}`} />
          <div className={`${styles.shimmer} ${styles.excerptSkeleton}`} />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {[100, 95, 88, 100, 72, 90, 82].map((w, i) => (
          <div
            key={i}
            className={`${styles.shimmer} ${styles.lineSkeleton}`}
            style={{ width: `${w}%` }}
          />
        ))}
        <div className={`${styles.shimmer} ${styles.headingSkeleton}`} />
        {[96, 88, 100, 75].map((w, i) => (
          <div
            key={`b-${i}`}
            className={`${styles.shimmer} ${styles.lineSkeleton}`}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </main>
  );
}
