import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllSlugs, getPost, type Block } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "מאמר לא נמצא | Portal Studio" };
  return {
    title: `${post.title} | Portal Studio`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "he_IL",
    },
  };
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "ul")
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return <p>{block.text}</p>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "he-IL",
    author: { "@type": "Organization", name: "Portal Studio" },
    publisher: { "@type": "Organization", name: "Portal Studio" },
  };

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <span
              className="text-[11px] font-display font-semibold tracking-[0.18em] uppercase"
              style={{ color: "#DC5D46" }}
            >
              {post.tag}
            </span>
            <h1
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
              style={{ color: "#062340" }}
            >
              {post.title}
            </h1>
            <div
              className="mt-4 flex items-center gap-4 text-sm font-body"
              style={{ color: "rgba(6,35,64,0.55)" }}
            >
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {post.readingMinutes} דק' קריאה
              </span>
            </div>
          </header>

          <div className="legal-prose">
            {post.content.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(6,35,64,0.12)" }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-display font-medium"
              style={{ color: "#DC5D46" }}
            >
              <ArrowRight size={16} />
              חזרה לכל המאמרים
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
