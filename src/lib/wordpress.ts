const BASE = process.env.WP_API_URL!;

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  categories: string[];
  featuredImageUrl: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(post: any): WPPost {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms: { name: string }[] = post._embedded?.["wp:term"]?.[0] ?? [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").trim(),
    content: post.content.rendered,
    date: post.date,
    categories: terms.map((t) => t.name),
    featuredImageUrl: featuredMedia?.source_url ?? null,
  };
}

export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${BASE}/posts?_embed&per_page=100&status=publish`, {
      next: { tags: ["wp-posts"], revalidate: 60 },
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return posts.map(normalizePost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${BASE}/posts?slug=${slug}&_embed`, {
      next: { tags: ["wp-posts"], revalidate: 60 },
    });
    if (!res.ok) return null;
    const posts = await res.json();
    if (!posts.length) return null;
    return normalizePost(posts[0]);
  } catch {
    return null;
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
