import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "תובנות | Portal Studio",
  description:
    "תובנות על בינה מלאכותית לניהול עסקים — איך לשלב AI חכם, לחסוך זמן ולשמור על הקול האנושי של העסק שלך.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <p
              className="text-sm font-display font-medium tracking-widest uppercase mb-3"
              style={{ color: "#6091B0" }}
            >
              תובנות
            </p>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#062340" }}
            >
              מחשבות על AI, עסקים ואנושיות
            </h1>
            <p className="mt-4 text-lg font-body" style={{ color: "#374151" }}>
              תובנות פרקטיות איך בינה מלאכותית עוזרת לעסק שלך לעבוד חכם יותר — בלי
              לאבד את הקול שמבדל אותך.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-glow group flex flex-col p-6 rounded-2xl bg-white"
                style={{ border: "1px solid rgba(6,35,64,0.1)" }}
              >
                <span
                  className="text-[11px] font-display font-semibold tracking-[0.18em] uppercase mb-3"
                  style={{ color: "#DC5D46" }}
                >
                  {post.tag}
                </span>
                <h2
                  className="font-display font-bold text-xl leading-snug mb-2"
                  style={{ color: "#062340" }}
                >
                  {post.title}
                </h2>
                <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6b7280" }}>
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-body" style={{ color: "rgba(6,35,64,0.5)" }}>
                    <Clock size={14} />
                    {post.readingMinutes} דק' קריאה
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-display font-medium"
                    style={{ color: "#DC5D46" }}
                  >
                    קריאה
                    <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
