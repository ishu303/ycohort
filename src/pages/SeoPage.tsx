import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, Mic, CheckCircle2, ChevronDown, Users, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import Layout from "../Layout";
import { useSeoHead } from "../lib/useSeoHead";
import { EXAM_PAGES, CITY_PAGES, SeoPageContent } from "../data/seoPages";
import NotFound from "./NotFound";

type Props = { kind: "exam" | "city"; slug: string };

export default function SeoPage({ kind, slug }: Props) {
  const lookup = kind === "exam" ? EXAM_PAGES : CITY_PAGES;
  const data = lookup[slug];

  if (!data) return <NotFound />;

  const canonical = `https://ycohort.app/${data.slug}`;

  useSeoHead({
    title: data.title,
    description: data.metaDescription,
    canonical,
    jsonLd: buildJsonLd(data, canonical),
  });

  return (
    <Layout>
      <Hero data={data} />
      <WhySection data={data} />
      <HowSection data={data} />
      <TogetherSection data={data} />
      <FaqSection data={data} />
      <CtaBanner data={data} />
    </Layout>
  );
}

/* ───────── sections ───────── */

function Hero({ data }: { data: SeoPageContent }) {
  const Icon = data.type === "city" ? MapPin : BookOpen;
  return (
    <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-xs text-amber-800">
        <Icon className="w-3.5 h-3.5 text-orange-500" />
        <span className="font-bold tracking-wide">{data.badge}</span>
      </div>
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-slate-900 mt-5">
        {data.h1}
      </h1>
      <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium mt-5">
        {data.heroSubtitle}
      </p>
      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/#radar-demo"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
        >
          {data.ctaText} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/#pricing"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-700 hover:text-orange-600 font-extrabold text-sm border border-amber-200 transition-all"
        >
          View Cohort Pass
        </Link>
      </div>
    </section>
  );
}

function WhySection({ data }: { data: SeoPageContent }) {
  return (
    <section className="py-14 bg-white border-y border-orange-100/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900" data-speakable>
          {data.why.heading}
        </h2>
        {data.why.paragraphs.map((p, i) => (
          <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">{p}</p>
        ))}
      </div>
    </section>
  );
}

function HowSection({ data }: { data: SeoPageContent }) {
  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900" data-speakable>
          {data.how.heading}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.how.steps.map((step, i) => {
          const StepIcon = i === 0 ? BookOpen : i === 1 ? Compass : Mic;
          return (
            <div key={i} className="relative p-6 rounded-2xl bg-[#FFFDF5] border border-amber-200/50 space-y-3 hover:border-orange-300 hover:shadow-md transition-all">
              <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <StepIcon className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TogetherSection({ data }: { data: SeoPageContent }) {
  return (
    <section className="py-14 bg-amber-50/40 border-y border-orange-100/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs text-amber-800">
          <Users className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-bold tracking-wide">What you actually do together</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900" data-speakable>
          {data.together.heading}
        </h2>
        {data.together.paragraphs.map((p, i) => (
          <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">{p}</p>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ data }: { data: SeoPageContent }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900" data-speakable>
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-3">
        {data.faq.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="bg-white border-2 border-orange-100/80 rounded-2xl p-4 transition-all hover:border-orange-200">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex justify-between items-center text-left font-extrabold text-sm text-slate-900"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <p className="text-xs text-slate-500 leading-relaxed font-semibold pt-2.5 mt-1 border-t border-orange-50">
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

function CtaBanner({ data }: { data: SeoPageContent }) {
  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 sm:p-10 text-center space-y-5">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-md">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
          Ready to {data.ctaText.toLowerCase()}?
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

/* ───────── per-page JSON-LD ───────── */

function buildJsonLd(data: SeoPageContent, canonical: string): object[] {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ycohort.app/" },
      { "@type": "ListItem", position: 2, name: data.shortName, item: canonical },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const orgType = data.type === "city" ? "LocalBusiness" : "EducationalOrganization";
  const areaServed =
    data.schemaAreaServed.type === "City"
      ? { "@type": "City", name: data.schemaAreaServed.name, containedInPlace: { "@type": "Country", name: "India" } }
      : { "@type": "Country", name: data.schemaAreaServed.name };

  const orgSchema: any = {
    "@context": "https://schema.org",
    "@type": orgType,
    name: `yCohort — ${data.shortName}`,
    url: canonical,
    description: data.metaDescription,
    areaServed,
    knowsAbout: data.schemaKnowsAbout,
    parentOrganization: { "@type": "Organization", name: "yCohort", url: "https://ycohort.app/" },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    url: canonical,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: "https://ycohort.app/" },
    primaryImageOfPage: "https://ycohort.app/og-image.png",
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.how.heading,
    step: data.how.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return [webPage, breadcrumb, faqPage, orgSchema, howTo];
}
