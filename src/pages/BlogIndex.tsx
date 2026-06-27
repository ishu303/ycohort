import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import Layout from "../Layout";
import { useSeoHead } from "../lib/useSeoHead";
import { ALL_BLOG_POSTS } from "../data/blogPosts";

export default function BlogIndex() {
  const canonical = "https://ycohort.app/blog";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "yCohort Blog — Peer Learning for Competitive Exams",
      url: canonical,
      description:
        "Long-form guides on peer learning, study twins, exam strategy and competitive-exam preparation in India.",
      publisher: { "@type": "Organization", name: "yCohort", url: "https://ycohort.app/" },
      blogPost: ALL_BLOG_POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        url: `https://ycohort.app/blog/${p.slug}`,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        author: { "@type": "Organization", name: p.author },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ycohort.app/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
      ],
    },
  ];

  useSeoHead({
    title: "yCohort Blog — Study Twins, Peer Learning & Exam Strategy",
    description:
      "Long-form guides on peer learning, study twin matching, active recall and exam strategy for JEE, NEET, UPSC, CAT and NDA aspirants in India.",
    canonical,
    jsonLd,
  });

  return (
    <Layout>
      <section className="pt-12 pb-10 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-xs text-amber-800">
          <BookOpen className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-bold tracking-wide">yCohort Blog</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mt-5">
          Long-form guides on peer learning and exam strategy
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium mt-4">
          What a study twin actually is, why solo NEET prep leaks marks, how to find a CAT partner that lasts. Written for serious competitive-exam aspirants in India.
        </p>
      </section>

      <section className="px-4 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-white border-2 border-orange-100/80 rounded-2xl p-6 hover:border-orange-300 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                <span className="text-orange-600">{post.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readMinutes} min read</span>
              </div>
              <h2 className="font-display font-black text-xl text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mt-3 flex-1">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 mt-4 group-hover:gap-2.5 transition-all">
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
