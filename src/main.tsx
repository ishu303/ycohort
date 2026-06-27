import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import SeoPage from "./pages/SeoPage.tsx";
import BlogIndex from "./pages/BlogIndex.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import NotFound from "./pages/NotFound.tsx";
import RouterScrollManager from "./lib/RouterScrollManager.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// Strip the static SEO skeleton (crawler-only) before React takes over.
const skeleton = rootEl.querySelector("#seo-skeleton");
if (skeleton) skeleton.remove();

const Router = (
  <StrictMode>
    <BrowserRouter>
      <RouterScrollManager />
      <Routes>
        <Route path="/" element={<App />} />

        {/* Exam cohort pages */}
        <Route path="/jee-study-partner"    element={<SeoPage kind="exam" slug="jee-study-partner" />} />
        <Route path="/neet-study-buddy"     element={<SeoPage kind="exam" slug="neet-study-buddy" />} />
        <Route path="/upsc-peer-group"      element={<SeoPage kind="exam" slug="upsc-peer-group" />} />
        <Route path="/cat-mba-study-group"  element={<SeoPage kind="exam" slug="cat-mba-study-group" />} />
        <Route path="/nda-prep-buddy"       element={<SeoPage kind="exam" slug="nda-prep-buddy" />} />

        {/* City cohort pages */}
        <Route path="/study-buddy-delhi"     element={<SeoPage kind="city" slug="study-buddy-delhi" />} />
        <Route path="/study-buddy-kota"      element={<SeoPage kind="city" slug="study-buddy-kota" />} />
        <Route path="/study-buddy-hyderabad" element={<SeoPage kind="city" slug="study-buddy-hyderabad" />} />
        <Route path="/study-buddy-bengaluru" element={<SeoPage kind="city" slug="study-buddy-bengaluru" />} />
        <Route path="/study-buddy-mumbai"    element={<SeoPage kind="city" slug="study-buddy-mumbai" />} />
        <Route path="/study-buddy-pune"      element={<SeoPage kind="city" slug="study-buddy-pune" />} />
        <Route path="/study-buddy-lucknow"   element={<SeoPage kind="city" slug="study-buddy-lucknow" />} />
        <Route path="/study-buddy-patna"     element={<SeoPage kind="city" slug="study-buddy-patna" />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/what-is-a-study-twin"             element={<BlogPost slug="what-is-a-study-twin" />} />
        <Route path="/blog/how-to-find-jee-study-partner"    element={<BlogPost slug="how-to-find-jee-study-partner" />} />
        <Route path="/blog/why-solo-neet-prep-fails"         element={<BlogPost slug="why-solo-neet-prep-fails" />} />
        <Route path="/blog/active-recall-vs-passive-video"   element={<BlogPost slug="active-recall-vs-passive-video" />} />
        <Route path="/blog/kota-paradox-isolation"           element={<BlogPost slug="kota-paradox-isolation" />} />
        <Route path="/blog/upsc-answer-writing-peer-evaluation" element={<BlogPost slug="upsc-answer-writing-peer-evaluation" />} />
        <Route path="/blog/voice-rooms-vs-telegram-cat"      element={<BlogPost slug="voice-rooms-vs-telegram-cat" />} />
        <Route path="/blog/drop-year-survival-guide"         element={<BlogPost slug="drop-year-survival-guide" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// react-snap leaves a fully rendered tree in #root at build time.
const hasPrerenderedTree = rootEl.hasChildNodes();
if (hasPrerenderedTree) {
  hydrateRoot(rootEl, Router);
} else {
  createRoot(rootEl).render(Router);
}
