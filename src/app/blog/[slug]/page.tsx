import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllSlugs, getPost, type Block } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

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
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "he_IL",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "h3") return <h3>{block.text}</h3>;
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

  const blogPostingLd = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
    datePublished: post.date,
    inLanguage: "he-IL",
    author: { "@type": "Organization", name: "Portal Studio" },
    publisher: { "@type": "Organization", name: "Portal Studio" },
  };

  // FAQPage schema — לתוצאות עשירות בגוגל כשיש מקטע שאלות נפוצות
  const faqLd =
    post.faq && post.faq.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": faqLd ? [blogPostingLd, faqLd] : [blogPostingLd],
  };

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          {post.coverImage && (
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-8"
              style={{ border: "1px solid rgba(6,35,64,0.1)" }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}
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

          {post.faq && post.faq.length > 0 && (
            <section
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid rgba(6,35,64,0.12)" }}
              aria-label="שאלות נפוצות"
            >
              <h2
                className="font-display text-2xl font-bold tracking-tight mb-6"
                style={{ color: "#062340" }}
              >
                שאלות נפוצות
              </h2>
              <div className="space-y-3">
                {post.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl bg-white px-5 py-4"
                    style={{ border: "1px solid rgba(6,35,64,0.1)" }}
                  >
                    <summary
                      className="flex cursor-pointer items-center justify-between gap-3 font-display font-semibold list-none"
                      style={{ color: "#062340" }}
                    >
                      {item.q}
                      <span
                        className="shrink-0 transition-transform group-open:rotate-45"
                        style={{ color: "#DC5D46" }}
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 font-body leading-relaxed" style={{ color: "#374151" }}>
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

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
