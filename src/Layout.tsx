import React from "react";
import { Link } from "react-router-dom";
import { EXAM_PAGES, CITY_PAGES } from "./data/seoPages";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-slate-800 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-radial from-yellow-200/40 via-amber-100/30 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-[-15%] w-[45vw] h-[45vw] bg-radial from-orange-200/30 via-yellow-100/20 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 shadow-lg shadow-orange-500/15">
            <span className="font-display font-black text-white text-xl tracking-tighter">yC</span>
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 bg-clip-text text-transparent">
              yCohort
            </span>
            <span className="ml-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200 uppercase tracking-wider">
              Peer Matching
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/#how-it-works" className="hover:text-orange-600 transition-colors">How It Works</Link>
          <Link to="/#radar-demo" className="hover:text-orange-600 transition-colors">Peer Radar</Link>
          <Link to="/#pricing" className="hover:text-orange-600 transition-colors">Cohort Pass</Link>
          <Link to="/blog" className="hover:text-orange-600 transition-colors">Blog</Link>
          <Link to="/#faq" className="hover:text-orange-600 transition-colors">FAQ</Link>
        </nav>

        <Link
          to="/#radar-demo"
          className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/15 hover:shadow-orange-500/35 active:scale-95"
        >
          Scan Study Twins
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const examLinks = Object.entries(EXAM_PAGES).slice(0, 6);
  const cityLinks = Object.entries(CITY_PAGES);

  return (
    <footer className="bg-[#1e1b4b] text-slate-400 py-12 border-t border-orange-200/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-display font-black text-white text-base shadow-md">yC</div>
            <span className="font-display font-black text-white text-lg tracking-tight">yCohort</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            The active human study system for competitive exams. Swap your syllabus strengths for perfect study twin matches.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Exams</h4>
          <ul className="mt-3 space-y-2 text-xs font-bold">
            {examLinks.map(([slug, p]) => (
              <li key={slug}>
                <Link to={`/${slug}`} className="hover:text-white transition-colors">{p.shortName}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Cities</h4>
          <ul className="mt-3 space-y-2 text-xs font-bold">
            {cityLinks.map(([slug, p]) => (
              <li key={slug}>
                <Link to={`/${slug}`} className="hover:text-white transition-colors">{p.shortName}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Platform</h4>
          <ul className="mt-3 space-y-2 text-xs font-bold">
            <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/#radar-demo" className="hover:text-white transition-colors">Peer Match Radar</Link></li>
            <li><Link to="/#pricing" className="hover:text-white transition-colors">Cohort Pass</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 text-xs font-bold">
        <span>&copy; {new Date().getFullYear()} yCohort Alliance. Built for serious exam preparation in India.</span>
      </div>
    </footer>
  );
}
