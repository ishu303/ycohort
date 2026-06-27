import { Link } from "react-router-dom";
import { useState } from "react";
import { Clock, ArrowRight, ChevronDown, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Layout from "../Layout";
import { useSeoHead } from "../lib/useSeoHead";
import { BLOG_POSTS } from "../data/blogPosts";
import NotFound from "./NotFound";

type Props = { slug: string };

export default function BlogPost({ slug }: Props) {
  const post = BLOG_POSTS[slug];
  if (!post) return <NotFound />;

  const canonical = `https://ycohort.app/blog/${post.slug}`;
  const wordCount = countWords(post);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: canonical,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      inLanguage: "en-IN",
      wordCount,
      timeRequired: `PT${post.readMinutes}M`,
      keywords: post.tags.join(", "),
      articleSection: post.category,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: post.author, url: "https://ycohort.app/" },
      publisher: {
        "@type": "Organization",
        name: "yCohort",
        url: "https://ycohort.app/",
        logo: { "@type": "ImageObject", url: "https://ycohort.app/icon-512.png" },
      },
      image: "https://ycohort.app/og-image.png",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-speakable]"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ycohort.app/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://ycohort.app/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  useSeoHead({
    title: `${post.title} | yCohort Blog`,
    description: post.metaDescription,
    canonical,
    jsonLd,
  });

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-orange-600 transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
        </Link>

        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-4">
          <span className="text-orange-600">{post.category}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readMinutes} min read</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.1] tracking-tight">
          {post.title}
        </h1>

        <div className="mt-7 space-y-4">
          {post.intro.map((p, i) => (
            <p key={i} className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">{p}</p>
          ))}
        </div>

        <nav aria-label="Table of contents" className="mt-10 p-5 rounded-2xl bg-amber-50/60 border border-amber-100">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">In this article</p>
          <ol className="space-y-1.5 text-sm font-semibold text-slate-700">
            {post.toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-orange-600 transition-colors">
                  <span className="text-orange-500 font-mono font-black mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-12">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight" data-speakable>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-700 text-base leading-relaxed font-medium">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <PostFaq faq={post.faq} />

        <PostCta />

        <RelatedPosts slugs={post.related} />
      </article>
    </Layout>
  );
}

function PostFaq({ faq }: { faq: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mt-16">
      <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-6" data-speakable>
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="bg-white border-2 border-orange-100/80 rounded-2xl p-4 transition-all hover:border-orange-200">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex justify-between items-center text-left font-extrabold text-sm text-slate-900"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <p className="text-xs text-slate-600 leading-relaxed font-semibold pt-2.5 mt-1 border-t border-orange-50">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PostCta() {
  return (
    <section className="mt-16">
      <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 sm:p-10 text-center space-y-5">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-md">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
          Ready to find your study twin?
        </h2>
        <p className="text-slate-600 text-sm font-medium max-w-md mx-auto">
          Claim your free 1-year Early Bud Pass. No card. Two minutes. Founding cohort only.
        </p>
        <Link
          to="/#pricing"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-300/30 active:scale-95 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" /> Claim Free Pass
        </Link>
      </div>
    </section>
  );
}

function RelatedPosts({ slugs }: { slugs: string[] }) {
  const posts = slugs.map((s) => BLOG_POSTS[s]).filter(Boolean);
  if (!posts.length) return null;
  return (
    <section className="mt-16">
      <h2 className="font-display font-black text-xl text-slate-900 mb-5">Read next</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group bg-white border border-orange-100 rounded-2xl p-4 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-bold">{p.category}</span>
            <h3 className="font-black text-sm text-slate-900 mt-2 leading-snug group-hover:text-orange-600 transition-colors">
              {p.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-orange-600 mt-2 group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function countWords(post: { intro: string[]; sections: { paragraphs: string[] }[] }): number {
  const all =
    post.intro.join(" ") +
    " " +
    post.sections.flatMap((s) => s.paragraphs).join(" ");
  return all.trim().split(/\s+/).length;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}
