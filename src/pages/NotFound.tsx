import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useSeoHead } from "../lib/useSeoHead";

export default function NotFound() {
  useSeoHead({
    title: "Page not found — yCohort",
    description: "The page you are looking for does not exist on yCohort. Return to the home page to find your study twin.",
    canonical: "https://ycohort.app/",
  });

  return (
    <Layout>
      <section className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-display font-black text-5xl text-slate-900">404</h1>
        <p className="text-slate-600 font-semibold">This page does not exist on yCohort.</p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-sm hover:bg-orange-600 transition-all"
        >
          Back to home
        </Link>
      </section>
    </Layout>
  );
}
