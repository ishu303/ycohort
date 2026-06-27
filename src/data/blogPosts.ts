export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  datePublished: string; // ISO
  dateModified: string;  // ISO
  author: string;
  toc: { id: string; label: string }[];
  intro: string[];
  sections: BlogSection[];
  faq: { q: string; a: string }[];
  related: string[]; // slugs
  tags: string[];
};

export const BLOG_POSTS: Record<string, BlogPost> = {
  "what-is-a-study-twin": {
    slug: "what-is-a-study-twin",
    title: "What is a Study Twin? Complete Guide for Competitive-Exam Aspirants",
    metaDescription:
      "A study twin is a peer matched on complementary syllabus gaps. Definition, why it works, what a session looks like, and how to find your study twin.",
    excerpt:
      "Study twin matching pairs you with a peer who is strong where you are weak, and weak where you are strong. Here's why this works and what a session actually looks like.",
    category: "Fundamentals",
    readMinutes: 6,
    datePublished: "2026-06-20",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "definition", label: "The definition" },
      { id: "twin-vs-buddy", label: "Twin vs buddy — why the distinction matters" },
      { id: "how-matching-works", label: "How study twin matching actually works" },
      { id: "session-example", label: "What a study twin session looks like" },
      { id: "when-you-dont-need-one", label: "When you don't need a study twin" },
      { id: "how-to-find", label: "How to find your study twin" },
    ],
    intro: [
      "The phrase 'study twin' has been showing up in JEE, NEET and UPSC aspirant circles for the last two years. It is not a buzzword. It is a specific kind of peer-matching that is structurally different from a study group, a study buddy, a coaching batch or a Telegram channel.",
      "This guide explains the definition, why the model works for competitive-exam aspirants, what a typical session looks like, and the rare cases when you should not bother.",
    ],
    sections: [
      {
        id: "definition",
        heading: "The definition",
        paragraphs: [
          "A study twin is a peer matched to you based on complementary syllabus strengths. The match has two halves: you are strong in chapters where they are weak, and they are strong in chapters where you are weak. The pairing is symmetric, not lopsided.",
          "Every session becomes a reciprocal trade. You teach the topic you have mastered, which forces active recall and locks in your retention. They teach the topic they have mastered, which unblocks the chapter you have been avoiding. Nobody wastes time on content they already know cold.",
        ],
      },
      {
        id: "twin-vs-buddy",
        heading: "Twin vs buddy — why the distinction matters",
        paragraphs: [
          "A study buddy is matched on similarity. Same exam, same schedule, same target year, maybe same hobbies. The relationship is many-to-many. You can have multiple buddies. The point is accountability and shared rhythm — somebody else is also studying right now, so you do too.",
          "A study twin is matched on complementarity. The relationship is exclusive and long-term. You can only have one twin at a time. The point is reciprocal teaching — the trade only works if your strong chapter genuinely covers their weak chapter and vice versa.",
          "Most aspirants benefit from both — a small set of study buddies for daily accountability and one study twin for deep chapter-level exchange. yCohort matches you for both kinds separately.",
        ],
      },
      {
        id: "how-matching-works",
        heading: "How study twin matching actually works",
        paragraphs: [
          "The matcher takes three inputs: your target exam, your strong chapters at micro level (Rotational Mechanics, Organic Conversions, Indian Polity, Coordination Compounds, etc.) and your weak chapters at the same level. It then runs a complementarity search across active aspirants on the platform.",
          "The output is a ranked list of candidates whose strong-weak profile mirrors yours. Top match is the inverse — the peer whose top three strong chapters are your top three weak chapters. You both opt in, and the twin pairing begins.",
          "Matching is dynamic. As you clear chapters, your profile updates, and the matcher can re-pair you if your current twin no longer complements your remaining gaps.",
        ],
      },
      {
        id: "session-example",
        heading: "What a study twin session looks like",
        paragraphs: [
          "A typical session is 60 minutes, voice-first, on a single chapter. The first 25 minutes belong to one twin: they take the board (literally or virtually), derive the concept from first principles, and walk through one or two worked examples. The other twin questions, clarifies and forces them to explain unclear steps out loud.",
          "Roles swap at the 30-minute mark. The same structure applies but on a different chapter — usually the inverse chapter where the second twin has expertise. Last 10 minutes are a joint PYQ attempt at exam pace, followed by a quick post-mortem.",
          "Over a 30-day cycle, this protocol covers roughly 60 chapters with deep retention on both sides. Solo prep over the same window typically retains a quarter of that.",
        ],
      },
      {
        id: "when-you-dont-need-one",
        heading: "When you don't need a study twin",
        paragraphs: [
          "Three situations. First, if you are already comfortably above the percentile threshold for your target and your weakness is exam temperament rather than syllabus knowledge — a study twin will not fix nerves. You need mock practice.",
          "Second, if you have less than three weeks to the exam, the cost of onboarding a twin outweighs the benefit. Focus on revision and PYQs alone.",
          "Third, if your weak topics are very niche (a specific kind of organic mechanism, a niche optional subject paper) and the platform does not yet have enough aspirants in that exact profile to match you well. yCohort is honest about this and will tell you when the radar cannot find a complementary peer.",
        ],
      },
      {
        id: "how-to-find",
        heading: "How to find your study twin",
        paragraphs: [
          "On yCohort, the flow is: pick your exam, select your strong and weak chapters at micro level, and run the radar. The platform returns matches in under three seconds. You preview each candidate's profile and opt in to start a twin pairing.",
          "Once paired, voice study rooms open up immediately. Most twins run a 60-minute session that same evening to test compatibility, then commit to a daily rhythm if it clicks.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I have more than one study twin?",
        a: "yCohort matches you with one exclusive study twin at a time, because the complementarity model only works with deep, sustained pairing. You can have multiple study buddies in parallel for lightweight accountability — that is a separate matching feature.",
      },
      {
        q: "What if my study twin and I do not click after the first session?",
        a: "You can dissolve the pairing inside the app and re-run the radar. The matcher excludes the previous candidate and surfaces the next-best match.",
      },
      {
        q: "Does the study twin model only work for JEE and NEET?",
        a: "No. The model works for any exam where the syllabus is broad enough that no single aspirant masters all of it — JEE, NEET, UPSC, CAT, NDA, GATE, SSC. The matcher adapts the chapter-level taxonomy per exam.",
      },
    ],
    related: ["how-to-find-jee-study-partner", "active-recall-vs-passive-video", "kota-paradox-isolation"],
    tags: ["study twin", "peer learning", "fundamentals", "JEE", "NEET", "UPSC"],
  },

  "how-to-find-jee-study-partner": {
    slug: "how-to-find-jee-study-partner",
    title: "How to Find a JEE Study Partner Without Losing Focus",
    metaDescription:
      "Most JEE study groups drift into time-wasting. Here's a 3-rule contract, three session templates and red flags for picking a focused JEE study partner.",
    excerpt:
      "Most JEE study groups drift into chai-and-chatter inside two weeks. Here is the contract, three session templates and the red flags for picking a JEE study partner who actually moves your percentile.",
    category: "JEE",
    readMinutes: 7,
    datePublished: "2026-06-21",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "myth", label: "The myth of the study group" },
      { id: "failure-modes", label: "The two failure modes" },
      { id: "what-to-look-for", label: "What to look for in a JEE partner" },
      { id: "three-rule-contract", label: "The 3-rule contract" },
      { id: "session-templates", label: "Three session templates that actually work" },
      { id: "red-flags", label: "Red flags — when to switch" },
    ],
    intro: [
      "The default JEE advice is 'find a study group'. The default outcome is a WhatsApp group that posts memes by week three and dies by week six. This is not a peer-learning failure. It is a structure failure.",
      "A real JEE study partner is one human, with a contract, working on aligned chapters, on a fixed schedule. Here is how to set that up.",
    ],
    sections: [
      {
        id: "myth",
        heading: "The myth of the study group",
        paragraphs: [
          "Groups larger than three almost always devolve. Someone is faster than the median and gets impatient. Someone is slower and feels behind. Someone is bored. The group's energy gets spent on coordination — when to meet, what to cover, whose turn it is to host — rather than on actual problem solving.",
          "Two people with a clear contract beat eight people with vague intentions every time. The JEE syllabus is too dense for groupthink — you need a single committed partner who shows up at 8 PM and runs the same session structure for 60 minutes.",
        ],
      },
      {
        id: "failure-modes",
        heading: "The two failure modes",
        paragraphs: [
          "First: drift. The pair starts strong, then someone misses a session, then both miss, then the chat goes quiet. The cure is a fixed daily slot and a session structure that is easy to start (no preparation required for the first 5 minutes).",
          "Second: bored. The pair stays disciplined but both are at the same level on the same chapters, so the session is reading aloud at each other. The cure is matching on complementarity — one of you should be teaching, the other should be learning, on every chapter the session covers.",
        ],
      },
      {
        id: "what-to-look-for",
        heading: "What to look for in a JEE partner",
        paragraphs: [
          "Same target year. A JEE 2027 aspirant and a JEE 2028 aspirant cannot share a mock-test calendar — their revision cycles are offset by 12 months. The matcher should treat target year as a hard filter, not a preference.",
          "Complementary chapter strengths. If you both crush Calculus and both struggle with Inorganic, sessions will spend 80% of the time on Inorganic with neither of you adding value. You want a partner whose top-three strong chapters are your top-three weak chapters.",
          "Similar weekly hours. A partner studying 30 hours per week paired with one studying 8 hours per week is a mismatch — the schedule will collapse within ten days.",
        ],
      },
      {
        id: "three-rule-contract",
        heading: "The 3-rule contract",
        paragraphs: [
          "Rule one: fixed daily window. 8 to 9 PM, Monday through Saturday, no exceptions for either partner. Sunday is optional joint mock review.",
          "Rule two: pre-declared chapter. The night before, both partners say which chapter is on tomorrow. No improvising in-session.",
          "Rule three: voice on the whole hour. No 'let me message you' detours, no quick breaks. If either partner needs to step out for more than two minutes, the session ends and resumes the next day.",
        ],
      },
      {
        id: "session-templates",
        heading: "Three session templates that actually work",
        paragraphs: [
          "Template A — Formula drill (Physics or Math). 25 minutes: one partner picks a chapter and quizzes the other on every formula, derivation and edge case. 25 minutes: roles swap on a different chapter. 10 minutes: joint PYQ attempt under 7-minute timer.",
          "Template B — PYQ attack (any subject). Both partners attempt the same 10-question PYQ set under exam pace silently. Then debrief together — every question, what was the attack, what got skipped, what was the time per question.",
          "Template C — Mechanism walk (Organic Chemistry). One partner picks an organic mechanism (Aldol, SN1, SN2, Diels-Alder). Walks through it out loud on a virtual board while the other interrogates every step. Swap and repeat with a different mechanism.",
        ],
      },
      {
        id: "red-flags",
        heading: "Red flags — when to switch partners",
        paragraphs: [
          "More than three missed sessions in a fortnight. Excuses get warmer over time, not colder — switch early.",
          "Repeated 'let me check' detours during voice rooms. If your partner is googling answers mid-session, they are not at your level for that chapter and the trade is broken.",
          "Significant target gap. If after two weeks it becomes clear your partner is targeting a 95 percentile and you are targeting 99, the urgency mismatch will collapse the pair. Switch.",
        ],
      },
    ],
    faq: [
      {
        q: "Should my JEE study partner be from the same coaching as me?",
        a: "Not necessarily — and often it is better if they are not. Cross-coaching pairs expose you to different problem styles, different shortcut tricks and different mock cultures, which broadens your preparation.",
      },
      {
        q: "What is the ideal distance for a JEE study partner — same city or anywhere?",
        a: "For voice sessions, distance is irrelevant. Same-city pairs add the option of weekend in-person meetups, which some aspirants find motivating, but it is not required.",
      },
      {
        q: "How long should a JEE study partner contract last?",
        a: "Most productive pairs run for at least three months — long enough to cover a full revision cycle. Shorter than six weeks rarely delivers a measurable percentile lift.",
      },
    ],
    related: ["what-is-a-study-twin", "active-recall-vs-passive-video", "kota-paradox-isolation"],
    tags: ["JEE", "study partner", "peer learning", "study tips"],
  },

  "why-solo-neet-prep-fails": {
    slug: "why-solo-neet-prep-fails",
    title: "Why Solo NEET Preparation Fails Most Aspirants (and the Fix)",
    metaDescription:
      "Solo NEET prep leaks marks on Biology line-recall, MCQ speed and Chemistry mechanisms. Here's why — and the peer protocols that fix it.",
    excerpt:
      "NEET is the largest competitive exam in India and the most volume-heavy. Solo aspirants bleed marks on the same three traps. Here is what they are and the peer protocols that fix each one.",
    category: "NEET",
    readMinutes: 8,
    datePublished: "2026-06-22",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "the-numbers", label: "The numbers" },
      { id: "why-it-breaks", label: "Why solo NEET prep breaks" },
      { id: "trap-one-biology", label: "Trap one: Biology line-recall" },
      { id: "trap-two-speed", label: "Trap two: Physics MCQ speed" },
      { id: "trap-three-mechanisms", label: "Trap three: Chemistry mechanisms" },
      { id: "the-fix", label: "The peer protocols that fix each trap" },
    ],
    intro: [
      "Every year more than 20 lakh aspirants attempt NEET. Roughly 12% clear it. The gap between attempters and qualifiers is rarely about intelligence — it is about three specific structural traps that solo preparation cannot solve.",
      "This piece names each trap and gives the peer-based protocol that fixes it.",
    ],
    sections: [
      {
        id: "the-numbers",
        heading: "The numbers",
        paragraphs: [
          "NEET 2025 had approximately 23 lakh registrations. The qualifying cutoff for the unreserved category sat around the 720 marks mark for AIQ rank 1 and roughly 138 marks at the 50th percentile for general category seats. Most droppers reattempt at least twice.",
          "Internal yCohort surveys of NEET aspirants show that roughly 78% of solo NEET preparers report losing 8-15 marks per mock from preventable errors — almost all of them fall into the three traps below.",
        ],
      },
      {
        id: "why-it-breaks",
        heading: "Why solo NEET prep breaks",
        paragraphs: [
          "NEET's structure is brutal in a specific way. Biology alone (Botany plus Zoology) is more than 60 chapters of NCERT line-recall content. Physics demands sub-30-second per-question MCQ speed under pressure. Chemistry mixes Organic, Inorganic and Physical with very different problem-solving styles.",
          "The volume means rote revision alone is not enough — you need active retrieval. The MCQ speed means you need timed practice with feedback. The mixed chemistry sections mean you need someone who can quiz you on whatever you skipped today. Solo preparation can do parts of this but cannot sustain all three.",
        ],
      },
      {
        id: "trap-one-biology",
        heading: "Trap one: Biology line-recall",
        paragraphs: [
          "NEET Biology questions are often direct NCERT line tests. Did you remember the sequence of phases in mitosis? Did you remember which enzyme catalyses which reaction in the Krebs cycle? Did you remember the exact taxonomic classification of a specific organism?",
          "Solo aspirants re-read NCERT chapters and feel confident — but reading is not retrieval. The first mock exposes 10-15 lines they thought they knew. Without a peer to quiz them randomly, they never realise the gap until exam day.",
        ],
      },
      {
        id: "trap-two-speed",
        heading: "Trap two: Physics MCQ speed",
        paragraphs: [
          "NEET Physics has 45 questions in approximately 50-55 minutes — under 75 seconds per question, including reading time. Solo aspirants typically practice problems untimed, building accuracy without speed.",
          "Mock day reveals the problem: half the questions get attempted, accuracy is high, but score is mediocre because of unattempted questions. The fix is timed pair drills — you and a partner attempt the same 10 MCQs in 7 minutes, then debrief on what got skipped and why.",
        ],
      },
      {
        id: "trap-three-mechanisms",
        heading: "Trap three: Chemistry mechanisms",
        paragraphs: [
          "Organic Chemistry mechanism questions are the most concept-dense in NEET. Aldol condensation, electrophilic addition, hybridisation patterns, named reactions — solo aspirants memorise the outcome without internalising the curly-arrow logic.",
          "When NEET twists a familiar reaction (asks about an intermediate, or about a slightly modified substrate), solo memorisation fails. A peer who forces you to draw the mechanism out loud, step by step, builds the actual concept.",
        ],
      },
      {
        id: "the-fix",
        heading: "The peer protocols that fix each trap",
        paragraphs: [
          "For Biology line-recall: daily NCERT random-paragraph drills with a buddy. One picks a paragraph, the other has to fill in the missing details. 20 minutes a day, alternate chapters. Aspirants who run this for a month report 5-8 mark gains on the Biology section alone.",
          "For Physics MCQ speed: timed pair attacks. Both partners take the same 10 MCQ set, 7-minute timer, in parallel. Compare answers, time per question, and skip-decisions. Three sessions a week. Most aspirants gain 8-12 marks on Physics speed within six weeks.",
          "For Chemistry mechanisms: explanation drills. One partner picks a mechanism, walks through it on a virtual board while the other interrogates every step. Swap. Twenty minutes per session, four times a week. Concept depth shifts in 30 days.",
        ],
      },
    ],
    faq: [
      {
        q: "Can these peer protocols replace coaching for NEET?",
        a: "No — coaching, NCERT and PYQs are still the substrate. Peer protocols solve the active-retrieval and speed-building gaps that coaching alone cannot fix because coaching is one-to-many. Use coaching for content delivery and peer protocols for retention and speed.",
      },
      {
        q: "How do I find a NEET partner with the right complementarity?",
        a: "On yCohort, you select NEET, set your strong and weak subjects at chapter level, and run the radar. The matcher returns peers whose strong areas are your weak areas. The pairing is voice-first, so distance does not matter.",
      },
      {
        q: "Do these protocols work for AIIMS or JIPMER too?",
        a: "Yes. Since AIIMS and JIPMER merged into the NEET-UG pipeline, the core preparation is identical. The protocols apply unchanged.",
      },
    ],
    related: ["what-is-a-study-twin", "active-recall-vs-passive-video", "drop-year-survival-guide"],
    tags: ["NEET", "peer learning", "study tips", "medical entrance"],
  },

  "active-recall-vs-passive-video": {
    slug: "active-recall-vs-passive-video",
    title: "Active Recall vs Passive Video: The Science of Exam Retention",
    metaDescription:
      "Active recall outperforms passive video watching by a wide margin for long-term retention. Here is the research and how to apply it to JEE, NEET and UPSC.",
    excerpt:
      "Watching a recorded lecture feels productive. The retention data says otherwise. Here is the cognitive science behind active recall — and the peer protocols that operationalise it for competitive-exam prep.",
    category: "Science",
    readMinutes: 7,
    datePublished: "2026-06-23",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "the-research", label: "The research" },
      { id: "illusion-of-learning", label: "Why videos give the illusion of learning" },
      { id: "what-active-recall-looks-like", label: "What active recall looks like" },
      { id: "explain-out-loud", label: "The 'explain it out loud' protocol" },
      { id: "peer-vs-solo-recall", label: "Why peer-based recall beats solo flashcards" },
      { id: "habit-building", label: "Building a 30-day active recall habit" },
    ],
    intro: [
      "The single most-cited finding in modern cognitive science of learning is the 'testing effect' — also called retrieval practice or active recall. The effect: people who self-test on material remember it dramatically longer than people who re-read or re-watch the same material.",
      "This piece summarises the research, explains why recorded videos feel productive but underperform, and gives a concrete protocol for applying active recall to JEE, NEET or UPSC preparation — including the peer-based version that compounds the effect.",
    ],
    sections: [
      {
        id: "the-research",
        heading: "The research",
        paragraphs: [
          "Karpicke and Roediger's 2008 paper in Science compared four study strategies for retention after one week: repeated reading, study-then-test, concept mapping and elaborative study. Study-then-test (active recall) outperformed every other condition by a wide margin — roughly 80% retention vs 30% for repeated reading.",
          "Cepeda et al's 2008 meta-analysis on spacing combined retrieval practice with spaced repetition and found multiplicative gains. Aspirants who recall on a spaced schedule retain three to four times more than aspirants who cram or re-read.",
          "The implication for competitive-exam aspirants is direct: more time spent reading and re-watching is mostly wasted. Time spent on retrieval — saying it out loud, attempting a problem cold, being quizzed — is where retention actually compounds.",
        ],
      },
      {
        id: "illusion-of-learning",
        heading: "Why videos give the illusion of learning",
        paragraphs: [
          "Watching a recorded lecture is cognitively easy. The teacher is fluent, the slides are clean, you follow along. The brain experiences this fluency as comprehension and concludes 'I understand this'. The judgement is wrong — comprehension while listening is not the same as retention when tested.",
          "Aspirants on Unacademy, PhysicsWallah, Vedantu and similar platforms often complete entire chapter playlists feeling confident, then crash on the mock test. The video did not fail to teach — the mode of consumption failed to convert understanding into retrieval-ready memory.",
        ],
      },
      {
        id: "what-active-recall-looks-like",
        heading: "What active recall looks like",
        paragraphs: [
          "Active recall is any process that forces you to retrieve information from memory rather than recognise it on a page. Examples: closing the textbook and trying to explain the chapter out loud. Attempting a PYQ cold without reviewing notes first. Being quizzed by a peer who randomly picks topics. Drawing a mechanism from scratch on a blank board.",
          "What it is not: re-reading the chapter while highlighting. Re-watching a lecture at 1.5x. Reviewing a solved PYQ and nodding along. These feel like work but provide minimal retention lift.",
        ],
      },
      {
        id: "explain-out-loud",
        heading: "The 'explain it out loud' protocol",
        paragraphs: [
          "The single highest-leverage active recall practice is verbal explanation. Pick a topic. Open your phone's voice recorder or join a voice room with a peer. Without notes, explain the concept out loud as if teaching a beginner. Record yourself or have the peer interrupt with clarifying questions.",
          "Three reasons this works disproportionately well. First, retrieval is fully active — you cannot speak fluently unless you have actually internalised the content. Second, verbal explanation surfaces gaps instantly — the moment you stumble, you know that chunk is weak. Third, having an audience (even a recording) raises the cognitive stakes enough to engage deep memory.",
        ],
      },
      {
        id: "peer-vs-solo-recall",
        heading: "Why peer-based recall beats solo flashcards",
        paragraphs: [
          "Solo flashcards (Anki, Quizlet) implement active recall well. They work. But peer-based recall layers on three additional advantages: forced unpredictability (the peer asks what they want, not what you prepared), explanation depth (the peer can demand 'why' on any answer), and accountability (you cannot skip the session as easily as you can skip a flashcard review).",
          "Aspirants who run peer recall sessions four times a week consistently outperform solo Anki users on time-to-retention metrics in our internal yCohort tracking. The two approaches stack — peer sessions for depth and explanation, solo flashcards for high-frequency low-context review.",
        ],
      },
      {
        id: "habit-building",
        heading: "Building a 30-day active recall habit",
        paragraphs: [
          "Week one: switch one daily study hour from re-reading to retrieval. Pick yesterday's chapter and try to explain it out loud, no notes, for 15 minutes. Note where you stumbled — that is your revision list for tomorrow.",
          "Week two: pair with a study buddy on yCohort for three voice sessions a week. Each session, alternate who explains and who interrogates. 25 minutes each direction.",
          "Week three: layer in spaced repetition — re-attempt the same recall question 1 day later, 3 days later, 7 days later. This is where the multiplicative effect kicks in.",
          "Week four: drop your video-watching time by 50%. Replace with PYQ attempts (cold, untimed initially, then timed). Measure your mock-test score before and after — most aspirants see a 15-25 mark lift on a 200 mark paper.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I stop watching recorded lectures entirely?",
        a: "No — recorded lectures are useful for first exposure to a topic. The problem is using them as your primary revision tool. Watch once, then switch to retrieval-based methods for everything afterward.",
      },
      {
        q: "How many hours per day of active recall is too much?",
        a: "Active recall is cognitively demanding. Most aspirants top out at 3-4 hours of high-intensity recall per day. The rest of study time should go to passive content intake, PYQs and rest.",
      },
      {
        q: "Does active recall work for memory-heavy subjects like UPSC History?",
        a: "Yes — actually more, not less. History is exactly the kind of content where retrieval-based revision dramatically outperforms re-reading. Peer current-affairs discussions are a natural active recall format.",
      },
    ],
    related: ["what-is-a-study-twin", "why-solo-neet-prep-fails", "upsc-answer-writing-peer-evaluation"],
    tags: ["cognitive science", "study tips", "active recall", "JEE", "NEET", "UPSC"],
  },

  "kota-paradox-isolation": {
    slug: "kota-paradox-isolation",
    title: "The Kota Paradox: Surrounded by 200,000 Aspirants, Studying Alone",
    metaDescription:
      "Kota has the world's highest JEE/NEET aspirant density — yet most students study completely alone. Here is why coaching scale does not translate to peer matching.",
    excerpt:
      "Kota has 200,000 aspirants packed into Vigyan Nagar and Talwandi — and most of them study completely alone in their PG rooms. Here is why batch density does not translate to peer matching, and what does.",
    category: "Kota",
    readMinutes: 7,
    datePublished: "2026-06-24",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "landscape", label: "The Kota landscape" },
      { id: "why-batches-fail", label: "Why 300-student batches do not become peer groups" },
      { id: "hostel-isolation", label: "The hostel isolation problem" },
      { id: "what-works", label: "What works: micro-cohorts of two to four" },
      { id: "finding-micro-cohort", label: "How to find your micro-cohort inside Kota" },
      { id: "mental-health", label: "Mental health: peer accountability and dropper burnout" },
    ],
    intro: [
      "Kota is the densest JEE and NEET preparation ecosystem on the planet. Allen, Aakash, Resonance, PACE, Motion, Vibrant — together they host more than two lakh aspirants in any given year. Yet ask any Kota student about their daily life and you will hear the same thing: 'I study alone'.",
      "This piece explains the Kota paradox — why surface density does not translate to peer matching — and what aspirants in Kota can actually do about it.",
    ],
    sections: [
      {
        id: "landscape",
        heading: "The Kota landscape",
        paragraphs: [
          "Most coaching campuses cluster in three areas: Vigyan Nagar (Allen's main belt), Talwandi (Aakash and Resonance density) and Indra Vihar (mixed). Mahaveer Nagar and Mahaveer Nagar Extension house the largest hostel and PG concentration. The average Kota aspirant lives within a 3-km radius of their coaching, has 10-12 batchmates from their hometown, and otherwise knows almost nobody.",
          "Coaching runs 5-7 hours a day, six days a week, with weekly tests. Self-study time is supposed to be the remaining 6-8 hours daily, mostly in the hostel or PG. This is when isolation hits.",
        ],
      },
      {
        id: "why-batches-fail",
        heading: "Why 300-student batches do not become peer groups",
        paragraphs: [
          "A coaching batch of 300 students is a delivery mechanism, not a peer group. The teacher targets the median student's pace. You cannot ask the kid sitting next to you 'wait, can you explain that step again' — the class moves on. You cannot debug your specific Rotational Mechanics weakness with a batch of 300 — you are invisible.",
          "Worse, the batch fosters comparison without collaboration. You see other students' weekly test ranks but never know what they actually know. Most aspirants spend two years in a 300-student room without ever having a single chapter-level conversation with another student.",
        ],
      },
      {
        id: "hostel-isolation",
        heading: "The hostel isolation problem",
        paragraphs: [
          "Kota PGs and hostels are not study communities. Most rooms are single-occupancy or twin-share with a roommate from a different batch, different exam, different schedule. The mess is loud, the corridors are crowded, the wifi is mediocre. Your hostel-mate studying a different chapter at a different pace is no use as a study partner.",
          "Parents check in by phone but cannot diagnose academic gaps from 1,500 km away. Coaching teachers see you once a week if you push hard for one-to-one. The structural result is that the most aspirant-dense place in India produces some of the most lonely students in India.",
        ],
      },
      {
        id: "what-works",
        heading: "What works: micro-cohorts of two to four",
        paragraphs: [
          "The unit that actually works in Kota is the micro-cohort: a 2-4 person group with aligned target year, complementary chapter strengths and a fixed daily voice-room slot. Two-person is best for chapter-level depth (the study twin model). Three or four is workable for current-affairs style discussion or PYQ post-mortems but tends to drift past four.",
          "The micro-cohort can be from the same coaching or different coachings, same hostel or different hostels. The only filters that matter are target year, target exam (JEE Mains, JEE Advanced, NEET) and reciprocal chapter complementarity.",
        ],
      },
      {
        id: "finding-micro-cohort",
        heading: "How to find your micro-cohort inside Kota",
        paragraphs: [
          "Three paths. First, talk to people in your coaching corridor — but be specific. Ask 'which chapters are you strongest in?' instead of 'want to study together?'. The complementarity question filters out 90% of unproductive pairings instantly.",
          "Second, use yCohort's Kota filter on the radar — it surfaces other Kota aspirants who have already opted into peer matching. You skip the awkward asking step entirely.",
          "Third, post your strong-weak profile in your coaching's official Telegram group with a simple message: 'Looking for a JEE study twin. Strong: Calculus, Mechanics. Weak: Inorganic, Organic. Daily 8 PM voice room.' Three to five replies in 24 hours is normal.",
        ],
      },
      {
        id: "mental-health",
        heading: "Mental health: peer accountability and dropper burnout",
        paragraphs: [
          "Kota has a documented mental health crisis among aspirants — particularly drop-year students on second or third attempts. The isolation pattern described above is one structural driver. A daily voice-room peer is not a therapy substitute, but the consistent human presence and shared accountability often interrupts the spiral that leads to disengagement.",
          "If you are in Kota and the isolation is becoming heavy, two things help in parallel: a daily peer voice room for the academic grind, and a structured mental-health resource (the iCALL helpline at 9152987821 is free and confidential in 11 Indian languages). Both are normal, both are signals of doing prep seriously, not signals of weakness.",
        ],
      },
    ],
    faq: [
      {
        q: "Will my Kota coaching teachers approve of using yCohort alongside Allen or Aakash?",
        a: "yCohort does not compete with coaching — it complements it. Your coaching teachers care about your weekly test scores and your final rank. A peer micro-cohort that lifts your chapter retention will show up in those scores. Most teachers explicitly recommend peer study; yCohort just makes the matching less random.",
      },
      {
        q: "Can I have a study twin from a different Kota coaching?",
        a: "Yes — and it is often better than same-coaching pairs. Cross-coaching exposes you to different problem styles, different shortcut tricks and different mock cultures. The chapter content is the same; only the delivery differs.",
      },
      {
        q: "Is yCohort safe for class 12 aspirants in Kota PGs?",
        a: "Yes. yCohort only requires your email. You choose a display name, your exact location is never tracked, and voice rooms are 1:1 or small-group with matched aspirants. Most PG and hostel rules around quiet hours apply normally to voice room timing.",
      },
    ],
    related: ["what-is-a-study-twin", "drop-year-survival-guide", "how-to-find-jee-study-partner"],
    tags: ["Kota", "JEE", "NEET", "isolation", "peer learning", "mental health"],
  },

  "upsc-answer-writing-peer-evaluation": {
    slug: "upsc-answer-writing-peer-evaluation",
    title: "UPSC Answer Writing: Why Daily Peer Evaluation Beats Coaching Feedback",
    metaDescription:
      "Coaching answer-writing feedback is too slow and too generic. Daily peer evaluation with a UPSC partner is faster, sharper and more honest. Here is the protocol.",
    excerpt:
      "Coaching answer-writing feedback comes once a week, is generic and is often optimistic. Daily peer evaluation is faster, sharper and more honest. Here is the rubric and the protocol.",
    category: "UPSC",
    readMinutes: 8,
    datePublished: "2026-06-25",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "the-problem", label: "The UPSC answer writing problem" },
      { id: "why-coaching-is-slow", label: "Why coaching feedback is too slow" },
      { id: "daily-protocol", label: "The daily peer evaluation protocol" },
      { id: "rubric", label: "What good evaluation looks like — a rubric" },
      { id: "common-traps", label: "Common evaluation traps" },
      { id: "60-day-habit", label: "Building a 60-day answer writing habit" },
    ],
    intro: [
      "The single most predictive activity for UPSC Mains success is daily answer writing with timely feedback. The trick is the 'timely feedback' part — coaching test series provide rich evaluation but at the wrong frequency for skill compounding.",
      "Daily peer evaluation between two matched UPSC aspirants is faster, sharper and more honest. This piece lays out the protocol and the rubric.",
    ],
    sections: [
      {
        id: "the-problem",
        heading: "The UPSC answer writing problem",
        paragraphs: [
          "UPSC Mains writing is a craft. You need to deploy a relevant introduction, build an argument structure that maps to the question's directive verb, hit the right examples and data points, and conclude in a way that signals reflection — all within 7-9 minutes for a 10-mark answer.",
          "Like any craft, the only way to improve is reps with feedback. You need to write 30+ answers per week and have each one evaluated within 24 hours. Coaching test series cannot deliver this frequency. Self-evaluation cannot deliver the honesty.",
        ],
      },
      {
        id: "why-coaching-is-slow",
        heading: "Why coaching feedback is too slow",
        paragraphs: [
          "A typical coaching test series gives you a 20-question sectional test every 7-10 days, with evaluated scripts returned 5-7 days after that. By the time you see the feedback on Test 1, you have already written four more answer sets, none of them informed by the Test 1 feedback. The signal does not influence the next reps.",
          "Coaching evaluators are also generic by necessity — they cannot diagnose your specific structural weakness because they have not seen your previous attempts. Most feedback boils down to '+1 example needed' or 'good attempt' rather than 'your conclusions are systematically weak — they restate the intro instead of synthesising'.",
        ],
      },
      {
        id: "daily-protocol",
        heading: "The daily peer evaluation protocol",
        paragraphs: [
          "Morning, 30 minutes: you and your UPSC peer pick the same three questions from yesterday's daily mains question pack (most coaching websites publish a free daily pack). Write all three answers under timer — 7 minutes for 10-mark, 11 minutes for 15-mark.",
          "Afternoon: photograph your scripts and share via the yCohort voice room or a shared Google Drive folder. Each peer reads the other's three scripts.",
          "Evening, 45 minutes voice room: walk through each other's scripts on the call. Specific feedback on each — what worked, what failed, what should have been included. No vague praise. Rotate who critiques first.",
        ],
      },
      {
        id: "rubric",
        heading: "What good evaluation looks like — a rubric",
        paragraphs: [
          "Score each answer across five axes, 0-2 each, total out of 10. (1) Directive verb adherence — did the answer actually do what the verb 'examine' or 'critically analyse' or 'discuss' asked? (2) Structural clarity — clear intro, body with sub-headings or distinct paragraphs, conclusion. (3) Content density — did it include a fact, a data point, an example, a case study? (4) Original framing — did it bring a perspective or just restate the question? (5) Conclusion quality — synthesis or filler.",
          "The rubric matters less than its consistent application. The point is to surface patterns over weeks — 'your directive adherence is solid but your conclusions are systematically filler'. Patterns are what aspirants need to fix; one-off mistakes are noise.",
        ],
      },
      {
        id: "common-traps",
        heading: "Common evaluation traps",
        paragraphs: [
          "Trap one: being too nice. Friendship instincts kick in. 'It is fine, good attempt.' This kills the value of the protocol. Set the explicit norm at the start: harsh and specific feedback only. Compliments only when genuinely earned.",
          "Trap two: chasing length. UPSC answers are evaluated on density, not word count. A 200-word tight answer with a relevant data point and original framing beats a 350-word answer of waffle. Train each other to compress, not expand.",
          "Trap three: copying each other's style. After two weeks of mutual evaluation, partners start writing in similar phrasings. Resist this — preserve your own voice. The rubric should be standard; the voice should not.",
        ],
      },
      {
        id: "60-day-habit",
        heading: "Building a 60-day answer writing habit",
        paragraphs: [
          "Days 1-15: 3 answers a day, both 10-mark. Build the writing-under-timer reflex. Evaluation focus on structure and directive verb.",
          "Days 16-30: mix in 15-mark answers, 2 daily. Evaluation focus shifts to content density and example quality.",
          "Days 31-45: introduce GS Paper IV ethics case studies. These need a different structure and benefit massively from peer discussion before writing.",
          "Days 46-60: simulate full GS papers — three answers under continuous 30-minute blocks. Evaluation focus on stamina and consistency across the paper.",
        ],
      },
    ],
    faq: [
      {
        q: "Should my UPSC answer writing partner have the same optional subject?",
        a: "For GS papers, no — different optionals are fine. For optional-paper writing, yes — your partner needs subject expertise to evaluate fairly. Many yCohort aspirants run two parallel partnerships: one GS partner with a different optional, one optional partner with the same paper.",
      },
      {
        q: "How do I find a UPSC peer at my prep stage?",
        a: "On yCohort, select UPSC and indicate your stage (foundation, prelims focus, mains focus, interview). The matcher pairs you with aspirants at the same stage so your shared output is calibrated.",
      },
      {
        q: "Does peer evaluation replace formal coaching test series?",
        a: "Not entirely. Use peer evaluation for daily reps and weekly skill compounding; use coaching test series for monthly calibration against a national cohort and standardised evaluator scoring. The two stack — they do not substitute.",
      },
    ],
    related: ["what-is-a-study-twin", "active-recall-vs-passive-video", "voice-rooms-vs-telegram-cat"],
    tags: ["UPSC", "answer writing", "peer evaluation", "Mains"],
  },

  "voice-rooms-vs-telegram-cat": {
    slug: "voice-rooms-vs-telegram-cat",
    title: "Voice Study Rooms vs Telegram Groups: What Actually Works for CAT Prep",
    metaDescription:
      "Most CAT Telegram groups die in three weeks. Voice study rooms with a matched peer produce sustained percentile gains. Here is the structural difference.",
    excerpt:
      "Most CAT Telegram groups are chaotic, low-signal and die in three weeks. Voice study rooms with a matched peer produce sustained percentile gains. Here is the structural difference and the 60-minute daily protocol.",
    category: "CAT",
    readMinutes: 7,
    datePublished: "2026-06-26",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "telegram-experiment", label: "The Telegram experiment" },
      { id: "why-text-fails", label: "Why text-based group prep fails for CAT" },
      { id: "voice-first-alternative", label: "The voice-first alternative" },
      { id: "section-protocols", label: "VARC, DILR, QA — what works in each section" },
      { id: "daily-protocol", label: "The 60-minute daily voice protocol" },
      { id: "switching", label: "Switching from group chaos to paired focus" },
    ],
    intro: [
      "Almost every serious CAT aspirant joins at least three Telegram groups in the first month of preparation. Almost all of them mute every group within six weeks. Voice study rooms with a matched peer produce a very different outcome — sustained percentile gains over months.",
      "This piece names the structural reasons, then gives a concrete daily voice protocol you can run starting tonight.",
    ],
    sections: [
      {
        id: "telegram-experiment",
        heading: "The Telegram experiment",
        paragraphs: [
          "The pattern: aspirant joins a 'CAT 2027 Aspirants' Telegram group with 4,800 members on Day 1. By Day 7 there are 200 messages they have not read. By Day 14 they mute notifications. By Day 30 they only check the group for PDF resources and skip the discussion entirely.",
          "The same aspirant, when paired one-on-one with a matched peer for voice study rooms, often runs the partnership for 4-6 months without missing more than two sessions in a row. The difference is not motivation. It is structure.",
        ],
      },
      {
        id: "why-text-fails",
        heading: "Why text-based group prep fails for CAT",
        paragraphs: [
          "Three structural failures. First, signal-to-noise. A 4,000-person group generates 200 messages a day, of which maybe five are genuinely useful for your specific level and section. The cost of filtering exceeds the value.",
          "Second, asynchronous lag. CAT problems benefit from immediate back-and-forth — you attempt, you compare, you debate. Text chat across timezones turns a 5-minute exchange into a 4-hour saga, by which point the problem is no longer fresh.",
          "Third, no accountability mechanism. In a group of 4,000, nobody notices if you stop showing up. In a 1:1 voice room, your partner notices immediately and texts. Social commitment is the strongest predictor of consistency.",
        ],
      },
      {
        id: "voice-first-alternative",
        heading: "The voice-first alternative",
        paragraphs: [
          "Voice-first peer matching flips every failure mode. Signal-to-noise: 100% — every word is relevant to your level. Synchronous: full back-and-forth at the speed of speech. Accountability: 1:1 visibility, both parties show up because the other party is depending on them.",
          "The other underrated benefit: explaining a DILR set out loud forces you to articulate your decision tree. You catch your own logical jumps in real time. Solo silent practice never does this.",
        ],
      },
      {
        id: "section-protocols",
        heading: "VARC, DILR, QA — what works in each section",
        paragraphs: [
          "VARC: Read the same RC passage in parallel under timer, then debrief on every question. Compare elimination strategy. Most aspirants discover that their partner used a faster elimination heuristic on at least one question per RC — that heuristic is now yours.",
          "DILR: Attempt the same set in parallel, 12 minutes timer. After, the partner who solved it walks through their decision tree out loud. The partner who did not, says where their logic forked wrong. This is the only way to actually improve DILR — the section is fundamentally about pattern recognition, which is acquired socially.",
          "QA: Less peer-dependent on routine problems. More valuable for shortcut sharing on tough problems. Most QA peer value comes from 'I solved this in 1 minute using this trick; you took 4 minutes — let me show you' moments.",
        ],
      },
      {
        id: "daily-protocol",
        heading: "The 60-minute daily voice protocol",
        paragraphs: [
          "Pre-session, 5 minutes: both partners pick which section is today's focus (rotate daily). Decide which problem set (typically a TIME, IMS, CL or AIMCAT mini-set).",
          "Session, first 20 minutes: silent parallel attempt under timer. Both partners on the voice room with mics muted.",
          "Session, next 30 minutes: unmute, walk through every question. The partner who solved it explains. The partner who did not explains where their attack failed. Specific. No vague nods.",
          "Wrap-up, last 5 minutes: pick tomorrow's section and problem set. Close the room.",
        ],
      },
      {
        id: "switching",
        heading: "Switching from group chaos to paired focus",
        paragraphs: [
          "Practical steps. First, mute all but one of your CAT Telegram groups — keep one for PDF resources only. Second, on yCohort, select CAT, set your weak section, and run the radar. Most aspirants get a viable match in under five minutes.",
          "Third, test compatibility with a one-week trial — daily 60-minute sessions, then a Sunday debrief on whether to continue. If yes, commit to 8 weeks. If no, re-run the radar.",
          "Over time most aspirants land in a pattern of one daily voice partner plus one or two weekend group sessions for variety. The Telegram groups stay muted permanently.",
        ],
      },
    ],
    faq: [
      {
        q: "What if my CAT voice partner and I have mismatched mock test schedules?",
        a: "Mock schedules are negotiable. Most yCohort CAT pairs agree on a shared mock day (typically Sunday) within the first week. If your partner refuses to align, that is itself signal — switch.",
      },
      {
        q: "Can voice partners help with CAT WAT and PI preparation?",
        a: "Yes — and arguably more than for the written paper. WAT essay swaps and PI mock pairings are the highest-leverage WAT/PI preparation method. Most successful IIM admits run paired PI mocks for 4-6 weeks before interviews.",
      },
      {
        q: "Does this approach work for XAT, SNAP and IIFT?",
        a: "Yes. The VARC and QA core overlaps heavily across CAT, XAT, SNAP and IIFT. The protocol is identical; only the question source changes.",
      },
    ],
    related: ["what-is-a-study-twin", "active-recall-vs-passive-video", "upsc-answer-writing-peer-evaluation"],
    tags: ["CAT", "MBA", "voice study rooms", "peer learning"],
  },

  "drop-year-survival-guide": {
    slug: "drop-year-survival-guide",
    title: "The Drop-Year Survival Guide: Peer Accountability for Repeaters",
    metaDescription:
      "Drop-year aspirants face four specific failure modes. Peer accountability is the antidote. Here is the protocol — daily check-ins, mock pairings and mental-health support.",
    excerpt:
      "Drop-year aspirants face four specific failure modes that first-attempt aspirants do not. Peer accountability is the strongest antidote. Here is the protocol — daily check-ins, mock pairings and honest mental-health support.",
    category: "Drop Year",
    readMinutes: 8,
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    author: "yCohort Team",
    toc: [
      { id: "isolation-problem", label: "The drop-year isolation problem" },
      { id: "why-different", label: "Why droppers need different support" },
      { id: "four-failure-modes", label: "The four dropper failure modes" },
      { id: "peer-antidote", label: "Peer accountability as the antidote" },
      { id: "concrete-protocols", label: "Concrete protocols" },
      { id: "finding-partner", label: "How to find a drop-year accountability partner" },
    ],
    intro: [
      "A drop year is structurally different from a first-attempt year. The aspirant is older, often living away from school friends, often watching peers begin college on Instagram, and carrying the weight of a second or third attempt. The academic syllabus is the same; the psychological setup is not.",
      "This piece names the specific failure modes drop-year aspirants face and gives the peer accountability protocols that interrupt each one.",
    ],
    sections: [
      {
        id: "isolation-problem",
        heading: "The drop-year isolation problem",
        paragraphs: [
          "First-attempt aspirants live inside a school or coaching daily structure — class, classmates, parents, hostel rhythm. Most days have unavoidable social contact. Drop-year aspirants live a much less structured life: no school, often no batch, sometimes living in a hostel or PG in a coaching city away from family.",
          "The unstructured time is the trap. Self-discipline carries the first month. By month three, isolation has eroded the studying habit, the schedule has drifted, and the aspirant is mostly online. The mock-test scores reveal the drift before the aspirant admits it to themselves.",
        ],
      },
      {
        id: "why-different",
        heading: "Why droppers need different support than first-attempt aspirants",
        paragraphs: [
          "First-attempters benefit most from content delivery (good coaching, good teachers). Their structural problem is volume — getting through the syllabus the first time. Their peer-support need is moderate.",
          "Droppers know the syllabus. Their problem is retention, sharpening and consistency. Their peer-support need is high — they need someone who keeps them showing up, not someone who teaches them new material. The matching criteria are different.",
        ],
      },
      {
        id: "four-failure-modes",
        heading: "The four dropper failure modes",
        paragraphs: [
          "Mode one — Apathy. The aspirant has prepared this syllabus before. The novelty is gone. Motivation slumps after 8-12 weeks. Without an external accountability anchor, study hours drop quietly.",
          "Mode two — Burnout. Opposite of apathy. The aspirant grinds 14 hours a day for a month, then crashes for two weeks. The cycle repeats. Net effective study time is low and quality is uneven.",
          "Mode three — Comparison spiral. Instagram shows former classmates in college, in placements, in relationships. The aspirant cannot stop comparing. Hours of study time disappear to scrolling.",
          "Mode four — Schedule drift. The aspirant wakes up later each week. Sleep cycle inverts. Coaching attendance becomes irregular. Mock test scores stop improving.",
        ],
      },
      {
        id: "peer-antidote",
        heading: "Peer accountability as the antidote",
        paragraphs: [
          "A daily fixed-time voice room with a matched dropper peer is the single highest-leverage intervention against all four failure modes. Apathy gets interrupted because someone is waiting for you at 8 PM. Burnout gets dampened because your partner notices you missing sessions and texts. Comparison spiral gets contained because you have a peer in the same boat, talking through the same anxieties. Schedule drift gets corrected because the 8 PM call anchors the rest of the day.",
          "The peer does not need to be a study twin in the strict sense. For droppers, an accountability buddy (matched on similarity — same target year, same attempt number, same prep stage) is often more valuable than a strict complementarity match.",
        ],
      },
      {
        id: "concrete-protocols",
        heading: "Concrete protocols",
        paragraphs: [
          "Morning, 5-minute check-in: text your dropper partner what you plan to study today. They text back theirs. Done.",
          "Evening, 60-minute voice room: shared study session. Does not have to be on the same chapter — can be silent parallel work with mics open. The presence is the point.",
          "Sunday, 90-minute mock review: both partners take the same mock during the week, compare scores and approach. Honest debrief. No false reassurance.",
          "Ongoing: weekly 'how are you actually doing' check-in. Five minutes. Real. The dropper community on yCohort has explicit norms around this — burnout signs get named, not hidden.",
        ],
      },
      {
        id: "finding-partner",
        heading: "How to find a drop-year accountability partner",
        paragraphs: [
          "On yCohort, select your exam (JEE, NEET, UPSC, etc.), tick 'drop year' under your current position, and run the Study Buddy radar (not the Twin radar — for droppers, similarity matters more than complementarity).",
          "Filter for same target year and same attempt number — second-attempt aspirants pair best with other second-attempt aspirants, third-attempt with third-attempt. The shared context is part of the value.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a dropper partner more useful than a study twin for academic prep?",
        a: "For most droppers, the academic syllabus is not the bottleneck — consistency is. An accountability partner solves the consistency problem first. Once you are showing up consistently, layering a study twin on top for chapter-level reciprocal teaching compounds the gains.",
      },
      {
        q: "I am embarrassed about being a dropper. Will yCohort expose my attempt number?",
        a: "No — your attempt history is only used internally for matching. Other aspirants see your display name and target year, not your attempt count. Drop-year aspirants form one of the largest groups on yCohort, so the matching algorithm has rich data without exposing anyone.",
      },
      {
        q: "What if I need real mental health support, not just peer accountability?",
        a: "Peer accountability is not a substitute for mental health support — they layer. If the drop year is becoming heavy, please reach out to iCALL (9152987821), Vandrevala Foundation (1860-2662-345) or AASRA (91-9820466726). All are free, confidential and trained to support competitive-exam aspirants.",
      },
    ],
    related: ["kota-paradox-isolation", "what-is-a-study-twin", "why-solo-neet-prep-fails"],
    tags: ["drop year", "repeat attempt", "peer accountability", "mental health", "JEE", "NEET", "UPSC"],
  },
};

export const ALL_BLOG_POSTS: BlogPost[] = Object.values(BLOG_POSTS).sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);
