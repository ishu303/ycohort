export type FaqItem = { q: string; a: string };

export type SeoPageContent = {
  slug: string;
  type: "exam" | "city";
  shortName: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  heroSubtitle: string;
  why: { heading: string; paragraphs: string[] };
  how: { heading: string; steps: { title: string; desc: string }[] };
  together: { heading: string; paragraphs: string[] };
  faq: FaqItem[];
  ctaText: string;
  schemaKnowsAbout: string[];
  schemaAreaServed: { type: "Country" | "City"; name: string };
};

/* ────────────────────────────────────────────────────────────
   EXAM PAGES — 5
   ──────────────────────────────────────────────────────────── */

export const EXAM_PAGES: Record<string, SeoPageContent> = {
  "jee-study-partner": {
    slug: "jee-study-partner",
    type: "exam",
    shortName: "JEE Study Partner",
    title: "Find Your JEE Study Partner — Voice Peer Learning | yCohort",
    metaDescription:
      "Match with a JEE study partner who is strong in your weak chapters. Voice-first peer learning for JEE Mains & Advanced. Free 1-year Early Bud Pass.",
    badge: "For JEE Mains & JEE Advanced aspirants",
    h1: "Find your JEE study partner — matched on your weak chapters",
    heroSubtitle:
      "Stop grinding the JEE syllabus alone. yCohort pairs you with a peer who excels at the chapters you struggle with — and needs your help on the chapters you already cleared.",
    why: {
      heading: "Why JEE preparation breaks without a study partner",
      paragraphs: [
        "JEE preparation is a two-year endurance race across Physics, Chemistry and Mathematics — and the syllabus is too wide for any single aspirant to master alone. Most students who attempt JEE from purely solo study burn out somewhere around the second mock-test cycle because there is no one to debug a wrong approach in real time, no one to question why your unit analysis keeps failing in Rotational Mechanics, and no one to spot that you keep missing the same Diels-Alder pattern in Organic Chemistry.",
        "Coaching classes — Allen, Aakash, FIITJEE, Resonance, PhysicsWallah — optimise for the median student in a batch of 200. They cannot pause for your specific blind spot. A JEE study partner does exactly that. You explain Calculus to them and reinforce your own grip. They explain Inorganic Chemistry to you and unblock the chapter you have been avoiding for three months.",
      ],
    },
    how: {
      heading: "How yCohort matches JEE aspirants",
      steps: [
        { title: "Pick your paper", desc: "Select JEE Mains, JEE Advanced or both. yCohort parses your syllabus at micro-chapter level — Calculus, Electrodynamics, Coordination Compounds, all of it." },
        { title: "Run the JEE radar", desc: "yCohort scans active JEE aspirants and pairs you with one whose strong chapters are exactly your weak chapters, and the other way around." },
        { title: "Jump into a voice study room", desc: "Solve PYQs out loud, debug each other's approach to Mechanics and Organic, stay accountable through every mock-test cycle." },
      ],
    },
    together: {
      heading: "What JEE study partners do together on yCohort",
      paragraphs: [
        "Daily 60-minute voice sessions on a single chapter — one of you takes the board (explaining out loud, deriving from scratch) while the other questions and clarifies. This is the active-recall protocol that boosts retention well beyond passive video watching.",
        "Joint PYQ attempts under timed mock conditions. Compare attack strategies, eliminate slow approaches, share shortcuts for units conversion, limits, and reaction mechanisms. Weekend full-syllabus mock review — discuss every wrong answer, share which topics each of you needs to drill before the next attempt.",
      ],
    },
    faq: [
      {
        q: "Is yCohort useful for JEE droppers?",
        a: "Yes. Drop-year JEE aspirants are one of the largest groups on yCohort because the year-long isolation problem is sharper for them. The matcher considers your target attempt year and pairs you with peers on the exact same timeline.",
      },
      {
        q: "Does yCohort have separate matching for JEE Mains and JEE Advanced?",
        a: "Yes. You select which paper you are targeting, and yCohort routes you accordingly. JEE Advanced aspirants get more matches inside derivation-heavy topics; JEE Mains aspirants get more matches inside MCQ-strategy topics.",
      },
      {
        q: "Can my JEE study partner be from a different city?",
        a: "Yes. Voice rooms work over Wi-Fi or 4G, so distance is irrelevant. You can also filter for same-city partners if you prefer to meet up in person at a library or café.",
      },
      {
        q: "Do I need to be enrolled in JEE coaching to use yCohort?",
        a: "No. yCohort works whether you are in Allen, Aakash, FIITJEE, Resonance, BYJU's, PhysicsWallah, or studying entirely on your own. The peer match is independent of which coaching you attend.",
      },
    ],
    ctaText: "Find my JEE study partner",
    schemaKnowsAbout: ["JEE Mains preparation", "JEE Advanced preparation", "JEE Physics", "JEE Chemistry", "JEE Mathematics", "Peer learning for JEE"],
    schemaAreaServed: { type: "Country", name: "India" },
  },

  "neet-study-buddy": {
    slug: "neet-study-buddy",
    type: "exam",
    shortName: "NEET Study Buddy",
    title: "Find a NEET Study Buddy — Voice Peer Learning | yCohort",
    metaDescription:
      "Match with a NEET study buddy for Biology, Physics and Chemistry MCQ practice. Voice-first peer learning for NEET 2027 aspirants. Free 1-year pass.",
    badge: "For NEET (UG) medical aspirants",
    h1: "Find a NEET study buddy who fixes your weak chapters",
    heroSubtitle:
      "NEET is too brutal to grind alone. yCohort matches you with a peer who knows Botany line-by-line where you don't, and needs your Physics MCQ speed where you do.",
    why: {
      heading: "Why solo NEET preparation leaks marks",
      paragraphs: [
        "NEET is the largest competitive exam in India and the most volume-heavy. Biology alone — Botany and Zoology together — has more than 60 chapters of NCERT line-recall content, while Physics and Chemistry MCQs demand sub-30-second per-question speed. Solo aspirants lose 8 to 12 marks every mock from silly NCERT line errors that a study buddy would catch in two minutes of reading aloud.",
        "Anatomy mnemonics, Physiology cycles, plant tissue diagrams, reaction mechanism trees — these are exactly the topics that stick when you teach them out loud to another aspirant. yCohort pairs you with a NEET buddy whose strong topics are your weak topics, which means every session is mutually useful and neither of you wastes time reviewing what you already know.",
      ],
    },
    how: {
      heading: "How yCohort matches NEET aspirants",
      steps: [
        { title: "Pick NEET", desc: "Pick your target year and the subjects you struggle with — Physics, Chemistry, Botany, Zoology — at chapter level." },
        { title: "Run the NEET radar", desc: "yCohort scans active NEET aspirants and pairs you with peers whose strong chapters mirror your weak ones." },
        { title: "Jump into a voice room", desc: "Drill NCERT lines, attack MCQ sets under timer, exchange mnemonics for Anatomy and Genetics — together, every evening." },
      ],
    },
    together: {
      heading: "What NEET study buddies do together on yCohort",
      paragraphs: [
        "Daily NCERT recall drills — one buddy reads a paragraph, the other has to fill in the missing details. This is the single most effective Biology preparation method and it only works with a partner. Physics MCQ time attacks where you compete on speed for two-minute Mechanics sets, then post-mortem each wrong answer.",
        "Chemistry reaction-mechanism explanations done out loud — Aldol condensation, SN1 vs SN2, hybridisation patterns. Weekend mock-test pairings where you take the same NTA-style mock at the same time, then debrief together. Drop-year and class-12 aspirants are both welcome, and the matcher pairs you with someone on the same prep timeline.",
      ],
    },
    faq: [
      {
        q: "Does yCohort help with AIIMS or JIPMER preparation?",
        a: "Yes. Since AIIMS and JIPMER merged into the single NEET-UG pipeline, the core Biology, Physics and Chemistry preparation is identical. yCohort's matcher works across all NEET-UG aspirants regardless of target college.",
      },
      {
        q: "I am preparing for class 12 boards and NEET together. Will yCohort fit?",
        a: "Yes. Most class-12 NEET aspirants are also balancing CBSE or state-board exams. The matcher considers your board and pairs you with peers on the same dual track — so your weekend topics actually overlap.",
      },
      {
        q: "Is yCohort suitable for NEET repeaters and droppers?",
        a: "Yes. NEET droppers are one of the most active cohorts on yCohort because the isolation of a drop year is the hardest part. The matcher pairs you with peers on the same attempt number and target year.",
      },
      {
        q: "Can I use yCohort if I am in a NEET hostel with strict hours?",
        a: "Yes. Voice rooms work on any phone or laptop over Wi-Fi or 4G, and most NEET buddy sessions run 60 minutes in the evening — exactly the time hostels allow. You set your study habit (early bird or night owl) during matching.",
      },
    ],
    ctaText: "Find my NEET study buddy",
    schemaKnowsAbout: ["NEET preparation", "NEET Biology", "NEET Physics", "NEET Chemistry", "NCERT Biology recall", "Medical entrance peer learning"],
    schemaAreaServed: { type: "Country", name: "India" },
  },

  "upsc-peer-group": {
    slug: "upsc-peer-group",
    type: "exam",
    shortName: "UPSC Peer Group",
    title: "Find a UPSC Peer Study Group — Answer Writing | yCohort",
    metaDescription:
      "Match with UPSC aspirants for daily answer writing, current affairs discussion and optional subject peer review. Voice-first study groups. Free pass.",
    badge: "For UPSC Civil Services aspirants",
    h1: "Find your UPSC peer group — answer writing, current affairs, optional",
    heroSubtitle:
      "UPSC is too vast for solo prep. yCohort matches you with peers for daily answer writing, current affairs deep-dives, optional-subject doubt sessions and interview mocks.",
    why: {
      heading: "Why UPSC aspirants need a peer group, not just a coaching",
      paragraphs: [
        "UPSC Civil Services preparation involves four overlapping problems that no single aspirant can solve alone. Daily answer writing needs an evaluator who is also writing — not a teacher who reviews your script once a week. Current affairs across The Hindu, Indian Express, Yojana and PIB needs a discussion partner to retain context. Optional subjects demand doubt sessions with peers who picked the same paper. And SSB-style interview prep needs live mock conversations.",
        "yCohort pairs you with UPSC aspirants who match your stage of preparation, your optional subject, and your daily schedule. You exchange answer scripts, debate current affairs, debug a tough Polity question, and walk into the interview with someone who has already heard your weakest arguments and helped you fix them.",
      ],
    },
    how: {
      heading: "How yCohort matches UPSC aspirants",
      steps: [
        { title: "Pick UPSC + your optional", desc: "Select Civil Services and your optional subject — PSIR, History, Public Administration, Geography, Sociology, Anthropology, Literature, and others." },
        { title: "Run the UPSC radar", desc: "yCohort scans active UPSC aspirants on the same prep stage (foundation, prelims focus, mains focus, interview) and matches you on syllabus gaps." },
        { title: "Join a peer group room", desc: "Daily 60-minute voice sessions for answer-writing exchange, current affairs debate, optional discussion, or mock interview practice." },
      ],
    },
    together: {
      heading: "What UPSC peer groups do together on yCohort",
      paragraphs: [
        "Daily structured answer-writing exchanges — you write a 10-mark or 15-mark answer in the morning, your peer evaluates it by evening, and you do the same for them. This is the single fastest way to climb the Mains writing ladder, and it only works with a committed partner.",
        "Current-affairs voice rooms three evenings a week — pick a single editorial or PIB notification and debate its implications across GS Papers II, III and IV. Optional subject doubt sessions for paper-specific deep dives. Weekend interview mock pairings where you alternate being candidate and panel member — the most underrated UPSC preparation method.",
      ],
    },
    faq: [
      {
        q: "Can I match with a peer who has the same UPSC optional subject?",
        a: "Yes. Optional subject is one of the strongest matching signals on yCohort. You can filter for peers who picked PSIR, History, Public Administration, Geography, Sociology, Anthropology, or any of the standard optionals.",
      },
      {
        q: "I am a working professional preparing for UPSC. Will yCohort fit?",
        a: "Yes. yCohort lets you filter peers by schedule — early morning sprints before office, late-night sessions after work, or weekend deep-dives. Working professionals are matched with other working professionals so timing always aligns.",
      },
      {
        q: "Does yCohort work for state PCS prep — UPPSC, BPSC, MPSC?",
        a: "Yes. State PCS preparation shares the bulk of its syllabus with UPSC Civil Services, especially in Polity, Geography, Economy and Current Affairs. yCohort matches state-PCS aspirants with each other and with UPSC peers where the syllabus overlaps.",
      },
      {
        q: "How does yCohort help with UPSC interview preparation?",
        a: "yCohort runs peer interview mocks where two aspirants alternate as candidate and panel member. Pairings are based on your DAF profile and optional subject, so questions get specific. You record the session and review it together.",
      },
    ],
    ctaText: "Find my UPSC peer group",
    schemaKnowsAbout: ["UPSC Civil Services preparation", "UPSC answer writing", "Current affairs analysis", "UPSC optional subjects", "Mains GS preparation", "UPSC interview"],
    schemaAreaServed: { type: "Country", name: "India" },
  },

  "cat-mba-study-group": {
    slug: "cat-mba-study-group",
    type: "exam",
    shortName: "CAT MBA Group",
    title: "Find a CAT Study Group — VARC, DILR, QA | yCohort",
    metaDescription:
      "Match with CAT aspirants for VARC speed drills, DILR set discussions, QA shortcuts and mock test post-mortems. Voice-first MBA prep. Free pass.",
    badge: "For CAT, XAT, IIM aspirants",
    h1: "Find your CAT study group — VARC, DILR, QA, daily",
    heroSubtitle:
      "CAT has three very different sections and almost no aspirant is strong in all three. yCohort pairs you with peers who cover your weakest section while you cover theirs.",
    why: {
      heading: "Why CAT aspirants drift without a study group",
      paragraphs: [
        "CAT has three sections — VARC, DILR and QA — each with a totally different rhythm. Engineers crush QA but bleed in VARC. Humanities graduates fly through RC but freeze on DILR sets. Working professionals balance prep with full-time jobs and rarely sustain a four-section workload alone. Solo CAT preparation almost always becomes lopsided in 8 weeks.",
        "yCohort pairs you with CAT aspirants whose strong section is exactly your weak section. You drill VARC reading-comprehension passages together. You debate DILR set logic out loud — the only effective way to learn pattern recognition. You exchange QA shortcuts and avoid duplicating problems you have already solved. Mock-test post-mortems become a two-person debrief, not a self-graded checklist.",
      ],
    },
    how: {
      heading: "How yCohort matches CAT aspirants",
      steps: [
        { title: "Pick CAT + your weak section", desc: "Select CAT (and optionally XAT, SNAP, IIFT) and flag whether VARC, DILR or QA is your bottleneck." },
        { title: "Run the CAT radar", desc: "yCohort scans active CAT aspirants and matches you with peers whose strong section is your weak section, and the other way around." },
        { title: "Join a CAT study room", desc: "Daily section sprints, mock test post-mortems, RC strategy exchanges, DILR set discussions — voice-first, 60 minutes." },
      ],
    },
    together: {
      heading: "What CAT study groups do together on yCohort",
      paragraphs: [
        "Daily 30-minute section sprints — one day VARC, next day DILR, next day QA. You both attempt the same set under timer, then debrief on approach, elimination strategy and time management. This is the only way to actually improve sectional percentiles instead of just attempting more questions.",
        "Mock test post-mortems on Sundays — go through every wrong answer together and identify whether the loss was concept, speed, or careless. RC strategy exchanges where you compare which questions you skipped and why. DILR pattern-recognition discussions where you walk through your decision tree out loud — the single most underrated CAT preparation method.",
      ],
    },
    faq: [
      {
        q: "Does yCohort work for working professionals preparing for CAT?",
        a: "Yes. Working professionals form one of the largest groups on yCohort. You filter peers by schedule (early morning, evening after work, weekend warriors) and the matcher pairs you with people who can actually show up at the same time as you.",
      },
      {
        q: "Can I use yCohort if I am also preparing for XAT, SNAP or IIFT?",
        a: "Yes. The core preparation for CAT, XAT, SNAP and IIFT overlaps significantly in VARC and QA. yCohort matches you with peers who target the same exam basket, so your shared prep is always aligned.",
      },
      {
        q: "How is yCohort different from a Telegram group or WhatsApp group for CAT?",
        a: "Telegram and WhatsApp groups are reactive and chaotic — hundreds of strangers, no structure. yCohort gives you a matched, committed peer or small group with daily voice rooms, scheduled sessions and matched syllabus gaps. Quality over volume.",
      },
      {
        q: "Does yCohort help with IIM specific targeting like IIM-A, IIM-B, IIM-C?",
        a: "Yes. Once you cross the 90th percentile threshold, IIM-specific WAT and PI preparation begins. yCohort pairs you with peers targeting the same IIM cluster so you can do WAT essay swaps and PI mocks together.",
      },
    ],
    ctaText: "Find my CAT study group",
    schemaKnowsAbout: ["CAT preparation", "MBA entrance preparation", "VARC drill", "DILR practice", "Quantitative aptitude", "IIM CAT prep"],
    schemaAreaServed: { type: "Country", name: "India" },
  },

  "nda-prep-buddy": {
    slug: "nda-prep-buddy",
    type: "exam",
    shortName: "NDA Prep Buddy",
    title: "Find an NDA Prep Buddy — Math, GAT, SSB | yCohort",
    metaDescription:
      "Match with NDA aspirants for Math drills, GAT practice, current affairs and SSB interview prep. Voice-first peer learning for NDA 1 & NDA 2. Free pass.",
    badge: "For NDA & defence aspirants",
    h1: "Find your NDA prep buddy — Math, GAT, SSB, together",
    heroSubtitle:
      "NDA needs Math, English, GK and SSB-interview readiness — plus physical training. yCohort pairs you with a buddy who keeps you accountable across the whole stack.",
    why: {
      heading: "Why NDA aspirants need a prep buddy",
      paragraphs: [
        "NDA is the only major Indian competitive exam that combines a written paper (Math + GAT) with an SSB interview that lasts five days and tests psychology, group behaviour and physical command. Most NDA aspirants over-invest in the written paper and walk into SSB unprepared — or do the opposite. A prep buddy keeps both tracks honest.",
        "Math problem swaps prevent you from drilling only the topics you already like. GAT current-affairs quizzes force you to keep up with daily news. SSB peer mocks — GTO situations, group discussions, personal interview rehearsals — are the only way to debug your conversational and command instincts before the real board. yCohort matches you with NDA buddies who target the same attempt (NDA 1 or NDA 2) and the same target year.",
      ],
    },
    how: {
      heading: "How yCohort matches NDA aspirants",
      steps: [
        { title: "Pick NDA 1 or NDA 2", desc: "Select your target attempt and year. yCohort considers your current stage — written prep, SSB prep, or both." },
        { title: "Run the NDA radar", desc: "yCohort scans active NDA aspirants and pairs you with one whose strong topic is your weak topic — Trigonometry, Calculus, English Grammar, Indian History." },
        { title: "Join a prep room", desc: "Math problem swaps, GAT current affairs quizzes, SSB peer mocks — daily voice rooms or weekend deep dives." },
      ],
    },
    together: {
      heading: "What NDA prep buddies do together on yCohort",
      paragraphs: [
        "Daily Math problem swaps — you set five problems for your buddy in Algebra or Trigonometry, they set five for you in Calculus or Vectors. This forces you out of your comfort zone and keeps the syllabus balanced across the 12 chapters that actually appear in the paper.",
        "GAT current affairs quizzes three times a week — defence news, geopolitical updates, sports, awards. SSB peer mocks on weekends — alternate as candidate and observer for GTO group discussions and personal interview rehearsals. Physical training accountability — share daily run and pull-up logs to keep the SSB physical standards on track.",
      ],
    },
    faq: [
      {
        q: "Can I match for NDA 1 and NDA 2 separately?",
        a: "Yes. You pick which attempt you are targeting during matching, and yCohort routes you to peers on the same attempt and year. This keeps your shared mock-test schedule and prep cycle perfectly aligned.",
      },
      {
        q: "Is yCohort useful for NDA aspirants who are still in class 11 or 12?",
        a: "Yes. NDA-eligible aspirants are matched together so your shared topics also overlap with your CBSE or state-board preparation. This makes Math and English prep doubly useful.",
      },
      {
        q: "How does yCohort help with SSB interview preparation?",
        a: "yCohort runs structured SSB peer mocks — you alternate as candidate and observer for GTO group discussions, group planning exercises, lecturettes, and personal interviews. You record and review sessions together.",
      },
      {
        q: "Will yCohort track my physical training and pull-up counts?",
        a: "yCohort does not track biometrics but you can log shared daily training updates with your prep buddy in the room chat. Most defence aspirants find peer accountability the single biggest motivator to maintain physical standards.",
      },
    ],
    ctaText: "Find my NDA prep buddy",
    schemaKnowsAbout: ["NDA preparation", "NDA Math", "NDA GAT", "SSB interview", "Defence exam preparation", "Indian military entrance"],
    schemaAreaServed: { type: "Country", name: "India" },
  },
};

/* ────────────────────────────────────────────────────────────
   CITY PAGES — 8
   ──────────────────────────────────────────────────────────── */

export const CITY_PAGES: Record<string, SeoPageContent> = {
  "study-buddy-delhi": {
    slug: "study-buddy-delhi",
    type: "city",
    shortName: "Delhi",
    title: "Find a Study Buddy in Delhi — JEE, NEET, UPSC | yCohort",
    metaDescription:
      "Match with Delhi study buddies for UPSC, JEE, NEET and CAT. From Mukherjee Nagar to Karol Bagh — voice-first peer learning. Free 1-year pass.",
    badge: "For Delhi competitive exam aspirants",
    h1: "Find a study buddy in Delhi — matched on your exam and chapters",
    heroSubtitle:
      "Delhi has the densest aspirant base in India but also the loneliest PG rooms. yCohort matches Delhi aspirants on real syllabus gaps — across Mukherjee Nagar, ORN, Karol Bagh and beyond.",
    why: {
      heading: "Why Delhi aspirants struggle even surrounded by 100,000 peers",
      paragraphs: [
        "Delhi is the UPSC capital of India — Mukherjee Nagar, Old Rajinder Nagar and Karol Bagh together host more than 100,000 aspirants in any given year. Add JEE and NEET dropper hostels in Patel Nagar and Munirka, plus CAT prep cohorts in Lajpat Nagar and Hauz Khas, and Delhi is statistically the most peer-dense city in the country. Yet most Delhi aspirants study completely alone in 100-square-foot PG rooms.",
        "The problem is not density — it is matching. Sitting in a 200-student coaching batch does not give you a study partner on your specific weak chapter. yCohort solves exactly this. You stay in your Mukherjee Nagar PG, log in, and get paired with another Delhi aspirant whose strong topic is your weak topic. Voice rooms run over Wi-Fi or 4G so distance across Delhi never becomes a friction.",
      ],
    },
    how: {
      heading: "How yCohort matches Delhi aspirants",
      steps: [
        { title: "Pick your exam + Delhi", desc: "Select UPSC, JEE, NEET, CAT or any supported exam, and set Delhi as your city label." },
        { title: "Filter for same-city peers", desc: "yCohort can match you with Delhi-only peers or open the radar nationwide — your choice." },
        { title: "Join voice study rooms", desc: "Daily 60-minute voice sessions on shared chapters, weekend in-person meetups if you both want to." },
      ],
    },
    together: {
      heading: "What Delhi study buddies do together on yCohort",
      paragraphs: [
        "Late-evening voice sessions after coaching hours — most Mukherjee Nagar and ORN aspirants are in class till 6 or 7 PM, then need a structured peer session to consolidate. yCohort buddies run 8-9 PM voice rooms for current-affairs discussion, answer writing or QA drills.",
        "Weekend in-person meetups in Mukherjee Nagar Main Market, Karol Bagh Ghaffar Market cafés or ORN study libraries when both buddies want to. Cross-PG accountability — you both log daily mock scores, share which Polity or Calculus chapter you cleared, and keep each other from the classic Delhi dropper drift.",
      ],
    },
    faq: [
      {
        q: "Does yCohort have UPSC aspirants from Mukherjee Nagar and Old Rajinder Nagar?",
        a: "Yes. UPSC aspirants from Mukherjee Nagar, Old Rajinder Nagar and Karol Bagh form one of the largest sub-cohorts on yCohort. You can filter for same-area peers if you want to meet up in person between voice sessions.",
      },
      {
        q: "Can I find JEE or NEET dropper buddies in Delhi?",
        a: "Yes. Delhi has large JEE and NEET dropper hostels in Patel Nagar, Munirka and Pitampura. yCohort matches you with droppers on the same target year so your mock schedule and revision cycle align.",
      },
      {
        q: "Does yCohort work in Hindi-English mixed sessions common in Delhi?",
        a: "Yes. Most Delhi voice rooms run in Hindi-English mix naturally. yCohort does not enforce a language — your matched buddy will speak whatever you both find comfortable.",
      },
      {
        q: "I work in Delhi and prepare for UPSC or CAT in the evening. Will yCohort fit?",
        a: "Yes. Working-professional aspirants in Delhi are a fast-growing yCohort group. You set evening or late-night availability during matching and get paired with peers on the same after-work schedule.",
      },
    ],
    ctaText: "Find a Delhi study buddy",
    schemaKnowsAbout: ["UPSC preparation in Delhi", "JEE dropper community Delhi", "NEET dropper Delhi", "CAT preparation Delhi", "Mukherjee Nagar UPSC", "Old Rajinder Nagar coaching"],
    schemaAreaServed: { type: "City", name: "Delhi" },
  },

  "study-buddy-kota": {
    slug: "study-buddy-kota",
    type: "city",
    shortName: "Kota",
    title: "Find a Study Buddy in Kota — JEE & NEET | yCohort",
    metaDescription:
      "Match with a JEE or NEET study buddy in Kota — Allen, Aakash, Resonance, PACE aspirants. Voice-first peer learning to beat hostel isolation. Free pass.",
    badge: "For Kota JEE & NEET aspirants",
    h1: "Find a study buddy in Kota — Allen, Aakash, Resonance, PACE",
    heroSubtitle:
      "Kota is paradox — you are surrounded by 200,000 aspirants but you study alone in your PG. yCohort gives you the one-to-one peer your hostel and your 300-student batch can't.",
    why: {
      heading: "Why Kota students need a study twin even inside Allen and Aakash",
      paragraphs: [
        "Kota is the JEE and NEET coaching capital of India. Allen, Aakash, Resonance, PACE, Motion, Vibrant — together they host more than 200,000 aspirants in any given year, packed into Vigyan Nagar, Talwandi, Indra Vihar and Mahaveer Nagar hostels. Yet ask any Kota student and they will tell you the same thing: their 300-student batch is not a peer group, and their hostel-mate studies a different chapter on a different schedule.",
        "yCohort solves the Kota paradox. You stay in your same Allen or Aakash batch, but you also get matched with one Kota peer whose strong chapter is your weak chapter — and you both run a daily 60-minute voice session on that exact topic. Drop-year aspirants, class-12 aspirants, repeaters on a third attempt — all matched by syllabus gap, not by coaching batch.",
      ],
    },
    how: {
      heading: "How yCohort matches Kota aspirants",
      steps: [
        { title: "Pick JEE or NEET + Kota", desc: "Select your exam and set Kota as your city label. You can optionally filter by area — Vigyan Nagar, Talwandi, Indra Vihar, Mahaveer Nagar." },
        { title: "Run the Kota radar", desc: "yCohort scans active Kota aspirants from your batch and across coachings and pairs you on complementary chapter strengths." },
        { title: "Join a voice study room", desc: "Late-night formula drills, joint weekly-test review, NCERT line-by-line for Biology — voice-first, hostel-friendly." },
      ],
    },
    together: {
      heading: "What Kota study buddies do together on yCohort",
      paragraphs: [
        "Joint weekly-test review every Sunday — both buddies discuss every wrong answer from the Allen or Aakash test, identify which topics need re-drill, and plan the next week's revision. This is the single most useful Kota study activity and almost nobody does it alone.",
        "Late-night formula drills — Kota hostels typically allow 10-11 PM study time. yCohort voice rooms in this window are common: one buddy quizzes the other on Physics formulas, conics equations, or Periodic table trends. Optional in-person meetups at Vigyan Nagar Mall food court or Talwandi cafés on Sunday afternoons.",
      ],
    },
    faq: [
      {
        q: "Will my Allen or Aakash hostel allow yCohort voice sessions?",
        a: "Most Kota hostels and PGs allow phone or laptop study sessions in the evening and pre-sleep window — exactly the typical yCohort voice-room slot. The session is just a normal call, so hostel rules around quiet hours apply normally.",
      },
      {
        q: "Can I match with peers from a different Kota coaching?",
        a: "Yes. yCohort matches across coachings — Allen, Aakash, Resonance, PACE, Motion, Vibrant. This is often more useful because you get exposure to different problem styles and shortcut tricks from another coaching's batch.",
      },
      {
        q: "I am a Kota dropper. Will yCohort help with the isolation?",
        a: "Yes — drop-year aspirants in Kota are one of the largest groups on yCohort precisely because the isolation is the hardest part of a drop year. The matcher pairs you with other droppers on the same attempt and target year.",
      },
      {
        q: "Does yCohort have parents-visible study logs for Kota students?",
        a: "yCohort does not push reports to parents, but you can share your own streak and session log with your parents directly if you want them to see your peer-study commitment. Many Kota parents appreciate the visibility.",
      },
    ],
    ctaText: "Find a Kota study buddy",
    schemaKnowsAbout: ["JEE coaching Kota", "NEET coaching Kota", "Allen Kota", "Aakash Kota", "Resonance Kota", "Kota dropper preparation"],
    schemaAreaServed: { type: "City", name: "Kota" },
  },

  "study-buddy-hyderabad": {
    slug: "study-buddy-hyderabad",
    type: "city",
    shortName: "Hyderabad",
    title: "Find a Study Buddy in Hyderabad — JEE, NEET, EAMCET | yCohort",
    metaDescription:
      "Match with Hyderabad study buddies for JEE, NEET, EAMCET, UPSC and GATE. Sri Chaitanya, Narayana, BITS, IIIT Hyderabad. Voice-first peer learning.",
    badge: "For Hyderabad competitive exam aspirants",
    h1: "Find a study buddy in Hyderabad — JEE, NEET, EAMCET, GATE",
    heroSubtitle:
      "Hyderabad is one of India's biggest competitive-exam hubs — Sri Chaitanya, Narayana, IIIT-H, BITS. yCohort matches Hyderabad aspirants on real syllabus gaps.",
    why: {
      heading: "Why Hyderabad aspirants need yCohort despite huge coaching density",
      paragraphs: [
        "Hyderabad sits at the top of India's JEE and NEET preparation pyramid. Sri Chaitanya and Narayana batches in Ameerpet, Kukatpally and Dilsukhnagar move at world-class speed, producing some of the country's best ranks every year. The flip side is intensity — students burn out at 16, juggling EAMCET, JEE Mains and Advanced, plus the pressure of Telugu medium to English medium transition for many.",
        "yCohort matches Hyderabad aspirants — both English and Telugu medium — on actual chapter-level gaps. A Sri Chaitanya batch student might pair with a Narayana student because their strong chapters are flipped. An IIIT-H undergrad preparing for GATE pairs with a BITS Hyderabad junior on the same DSA chapter. The matching is syllabus-first, college-agnostic.",
      ],
    },
    how: {
      heading: "How yCohort matches Hyderabad aspirants",
      steps: [
        { title: "Pick your exam + Hyderabad", desc: "Select JEE, NEET, EAMCET, GATE, UPSC or any supported exam and set Hyderabad as your city label." },
        { title: "Run the Hyderabad radar", desc: "yCohort scans active Hyderabad aspirants and matches you on syllabus complementarity, including medium-of-instruction preference." },
        { title: "Join a voice room", desc: "Evening voice sessions after coaching, weekend mock-test pairings, GATE-DSA pair coding, EAMCET-JEE crossover drills." },
      ],
    },
    together: {
      heading: "What Hyderabad study buddies do together on yCohort",
      paragraphs: [
        "Evening voice sessions in the 8-10 PM window after Sri Chaitanya or Narayana coaching hours — joint problem solving on the day's tough Physics or Organic chapter. Weekend mock-test pairings where both buddies attempt the same JEE or NEET mock and debrief on Sunday afternoon.",
        "EAMCET and JEE Mains crossover drills — most Hyderabad aspirants attempt both, and the syllabus overlap is huge. Pair sessions help you avoid duplicating effort and identify which JEE problems also unlock EAMCET shortcuts. GATE peer-coding for IIIT-H and BITS Hyderabad undergrads in DSA, OS, and CN chapters.",
      ],
    },
    faq: [
      {
        q: "Can I find a Telugu-medium study buddy in Hyderabad on yCohort?",
        a: "Yes. yCohort lets you set your preferred medium during matching. Telugu medium and English medium Hyderabad aspirants are both well represented, and matched accordingly.",
      },
      {
        q: "Does yCohort match across Sri Chaitanya, Narayana and other Hyderabad coachings?",
        a: "Yes — matching is across coachings. Many of the best Hyderabad matches come from cross-coaching pairings because students get exposed to different problem styles from another batch.",
      },
      {
        q: "I am a BITS Hyderabad or IIIT-H student preparing for GATE or placements. Will yCohort fit?",
        a: "Yes. Undergrad students from BITS Hyderabad, IIIT-H, JNTU and Osmania form a strong GATE and placement-prep sub-cohort on yCohort. You can pair on DSA, OS, DBMS, or any GATE CS topic.",
      },
      {
        q: "Does yCohort help with the EAMCET + JEE dual-exam grind?",
        a: "Yes. Most Andhra and Telangana JEE aspirants also attempt EAMCET, and the syllabus overlap is huge. yCohort pairs you with peers running the same dual-exam track so shared sessions cover both at once.",
      },
    ],
    ctaText: "Find a Hyderabad study buddy",
    schemaKnowsAbout: ["JEE preparation Hyderabad", "NEET preparation Hyderabad", "EAMCET preparation", "Sri Chaitanya", "Narayana coaching", "GATE preparation Hyderabad"],
    schemaAreaServed: { type: "City", name: "Hyderabad" },
  },

  "study-buddy-bengaluru": {
    slug: "study-buddy-bengaluru",
    type: "city",
    shortName: "Bengaluru",
    title: "Find a Study Buddy in Bengaluru — CAT, GATE, UPSC | yCohort",
    metaDescription:
      "Match with Bengaluru study buddies for CAT, GATE, UPSC and JEE. PESU, RVCE, MSRIT, working professionals. Voice-first peer learning. Free pass.",
    badge: "For Bengaluru competitive exam aspirants",
    h1: "Find a study buddy in Bengaluru — CAT, GATE, UPSC, working pros",
    heroSubtitle:
      "Bengaluru aspirants juggle engineering coursework, full-time jobs and exam prep — all in the same week. yCohort matches you with peers on the exact same balance.",
    why: {
      heading: "Why Bengaluru aspirants are the hardest to keep on schedule",
      paragraphs: [
        "Bengaluru has India's largest concentration of working-professional aspirants. Software engineers preparing for CAT, MBA, GATE, GMAT and UPSC after 9-hour workdays. Engineering undergrads in PESU, RVCE, MSRIT, BMSCE juggling coursework with placement prep. Plus a fast-growing JEE / NEET dropper community in HSR, Indiranagar and Jayanagar PGs. All packed into Bengaluru's brutal commute.",
        "The Bengaluru problem is not access to coaching — it is sustained schedule. Solo aspirants drop off in 4-6 weeks because nobody is holding them accountable to the 8 PM session after a long workday. yCohort pairs you with a Bengaluru peer on the exact same schedule — fellow working pro, fellow PESU junior, fellow CAT-after-work grinder. Accountability turns into a two-person commitment, not a one-person willpower problem.",
      ],
    },
    how: {
      heading: "How yCohort matches Bengaluru aspirants",
      steps: [
        { title: "Pick your exam + Bengaluru", desc: "Select CAT, GATE, UPSC, JEE, NEET or any supported exam and set Bengaluru as your city label." },
        { title: "Set your schedule type", desc: "Working professional, college student or full-time aspirant — yCohort matches you with peers on the same daily rhythm." },
        { title: "Join a voice room", desc: "Post-work 8-10 PM sessions, weekend Koramangala or Jayanagar meetups, GATE pair coding, CAT mock pairings." },
      ],
    },
    together: {
      heading: "What Bengaluru study buddies do together on yCohort",
      paragraphs: [
        "Post-work 8-10 PM voice sessions — by far the dominant Bengaluru study slot. Working-professional buddies open a voice room, drill one section together, and close before midnight. Weekend longer sessions in Koramangala, Jayanagar, HSR Layout cafés or libraries when both buddies want to meet.",
        "Engineering-college buddies pair on placement-prep DSA, GATE preparation, or CAT-after-college sessions. Cross-college pairing breaks the bubble of your own campus — PESU paired with RVCE, MSRIT with BMSCE. JEE / NEET droppers in HSR PGs pair with other droppers on the same target year.",
      ],
    },
    faq: [
      {
        q: "I work at a Bengaluru tech company and prepare for CAT or UPSC at night. Will yCohort fit?",
        a: "Yes. Working-professional aspirants are the single largest Bengaluru group on yCohort. The matcher pairs you with peers on the same post-work schedule, so your 8-10 PM voice sessions actually have someone reliable on the other side.",
      },
      {
        q: "Does yCohort work for GATE preparation alongside placements?",
        a: "Yes. PESU, RVCE, MSRIT, BMSCE and other Bengaluru engineering juniors and seniors use yCohort for GATE prep paired with placement DSA — the two prep streams overlap heavily and a peer keeps both honest.",
      },
      {
        q: "Can I find weekend-only study buddies in Bengaluru?",
        a: "Yes. yCohort lets you set Weekend Warrior as your study habit during matching. You will be paired with peers who only study on Saturdays and Sundays — common for full-time working pros.",
      },
      {
        q: "How does yCohort handle Bengaluru's commute and timezone issues?",
        a: "All yCohort sessions are voice-first over Wi-Fi or 4G, so the Bengaluru commute does not affect attendance. You can run a voice room from a Namma Metro coach as easily as from home.",
      },
    ],
    ctaText: "Find a Bengaluru study buddy",
    schemaKnowsAbout: ["CAT preparation Bengaluru", "GATE preparation Bengaluru", "UPSC preparation Bengaluru", "Working professional MBA prep", "Engineering placement prep", "PESU RVCE MSRIT GATE"],
    schemaAreaServed: { type: "City", name: "Bengaluru" },
  },

  "study-buddy-mumbai": {
    slug: "study-buddy-mumbai",
    type: "city",
    shortName: "Mumbai",
    title: "Find a Study Buddy in Mumbai — CA, CAT, JEE | yCohort",
    metaDescription:
      "Match with Mumbai study buddies for CA, CAT, JEE, NEET and UPSC. Andheri, Powai, Thane, Bandra — voice-first peer learning. Free 1-year pass.",
    badge: "For Mumbai competitive exam aspirants",
    h1: "Find a study buddy in Mumbai — CA, CAT, JEE, NEET, UPSC",
    heroSubtitle:
      "Mumbai aspirants juggle 90-minute commutes, intense schools and dense coaching schedules. yCohort matches you with peers across Mumbai who run the same brutal calendar.",
    why: {
      heading: "Why Mumbai aspirants almost never find a real study partner alone",
      paragraphs: [
        "Mumbai has one of India's biggest competitive-exam aspirant bases — CA aspirants in Vile Parle and Andheri, IIT-JEE droppers in Borivali and Powai, CAT and CFA grinders in Bandra-Kurla Complex and Lower Parel, and a fast-growing UPSC cohort in Thane and Navi Mumbai. The challenge is the city itself — a 90-minute commute kills any in-person study group plan, and coaching batches stay in their bubble.",
        "yCohort solves Mumbai's geography problem with voice-first study rooms. You stay in Borivali or Thane, your matched buddy stays in Powai or Andheri, and your daily 60-minute voice session runs over Wi-Fi without anyone needing to commute. Same-city matching when you want in-person weekend meetups in Bandra or Lower Parel cafés.",
      ],
    },
    how: {
      heading: "How yCohort matches Mumbai aspirants",
      steps: [
        { title: "Pick your exam + Mumbai", desc: "Select CA, CAT, JEE, NEET, UPSC or any supported exam and set Mumbai as your city label." },
        { title: "Run the Mumbai radar", desc: "yCohort matches you with Mumbai peers on syllabus gaps and schedule type — school student, college student, working pro." },
        { title: "Join a voice room", desc: "Commute-time voice sessions on the local train, late-night sessions from your PG, weekend meetups in central Mumbai." },
      ],
    },
    together: {
      heading: "What Mumbai study buddies do together on yCohort",
      paragraphs: [
        "Commute-time voice sessions — one of yCohort's biggest Mumbai use-cases. Both buddies on a Western Line or Central Line local at 6 PM, joint MCQ drills with earphones in. Late-night sessions from PG rooms after coaching, especially for IIT-JEE droppers in Andheri and CA aspirants in Vile Parle.",
        "Weekend in-person meetups in Bandra, Lower Parel cafés or Powai library spaces when both buddies opt in. CA + CAT crossover prep for the many Mumbai aspirants attempting both, where the QA and Logic syllabus overlaps. IIT Bombay junior + Mumbai engineering-college pairings for GATE and placements.",
      ],
    },
    faq: [
      {
        q: "Can I find a study buddy for CA and CAT combo in Mumbai?",
        a: "Yes. CA + CAT is one of the most common Mumbai prep combinations because both attract commerce graduates and the QA syllabus overlaps. yCohort pairs you with peers running the same dual track.",
      },
      {
        q: "How do Mumbai's long commutes affect yCohort sessions?",
        a: "They don't — yCohort voice rooms run on any phone over 4G. Many Mumbai buddies actually use commute time as session time, which is a productive way to recover 90 minutes a day.",
      },
      {
        q: "Does yCohort work for IIT Bombay or VJTI undergrads preparing for placements or GATE?",
        a: "Yes. IIT Bombay, VJTI, SPIT, DJ Sanghvi and KJ Somaiya juniors and seniors use yCohort for GATE preparation and placement DSA paired with peers across other Mumbai engineering colleges.",
      },
      {
        q: "I am a working professional in BKC preparing for CAT or UPSC. Will yCohort fit?",
        a: "Yes. Working-professional aspirants in BKC, Lower Parel and Andheri form a strong Mumbai sub-cohort on yCohort. Evening post-work voice sessions are the dominant pattern.",
      },
    ],
    ctaText: "Find a Mumbai study buddy",
    schemaKnowsAbout: ["CA preparation Mumbai", "CAT preparation Mumbai", "JEE preparation Mumbai", "IIT Bombay placement prep", "Mumbai UPSC aspirants", "Andheri Powai Thane coaching"],
    schemaAreaServed: { type: "City", name: "Mumbai" },
  },

  "study-buddy-pune": {
    slug: "study-buddy-pune",
    type: "city",
    shortName: "Pune",
    title: "Find a Study Buddy in Pune — MPSC, UPSC, GATE | yCohort",
    metaDescription:
      "Match with Pune study buddies for MPSC, UPSC, GATE, JEE and CAT. COEP, VIT-Pune, MIT-WPU, Pune Camp coaching. Voice-first peer learning.",
    badge: "For Pune competitive exam aspirants",
    h1: "Find a study buddy in Pune — MPSC, UPSC, GATE, JEE",
    heroSubtitle:
      "Pune is split between MPSC and UPSC tracks, engineering-college placements and growing JEE / NEET dropper communities. yCohort matches Pune peers on real overlap.",
    why: {
      heading: "Why Pune aspirants benefit from cross-track peer matching",
      paragraphs: [
        "Pune has India's strongest MPSC preparation ecosystem — Pune Camp, Sadashiv Peth and Tilak Road are dense with MPSC coaching. Plus a growing UPSC cohort that often overlaps with MPSC prep. Add engineering-college placement prep at COEP, VIT-Pune, MIT-WPU, MITCOE and PICT, plus a JEE / NEET dropper community in Karve Nagar and Aundh, and Pune has one of India's most diverse aspirant mixes.",
        "yCohort pairs Pune aspirants across these overlapping tracks. An MPSC aspirant pairs with a UPSC aspirant because Polity, Economy and Modern History overlap 70%. A COEP placement candidate pairs with a VIT-Pune GATE candidate on the same DSA topic. JEE droppers in Karve Nagar pair on the same target year. The matcher does not silo Pune by college or coaching — it matches by actual syllabus complementarity.",
      ],
    },
    how: {
      heading: "How yCohort matches Pune aspirants",
      steps: [
        { title: "Pick your exam + Pune", desc: "Select MPSC, UPSC, GATE, JEE, NEET, CAT or any supported exam and set Pune as your city label." },
        { title: "Run the Pune radar", desc: "yCohort matches you with Pune peers across coachings and colleges on syllabus gap and schedule type." },
        { title: "Join a voice room", desc: "Evening sessions after college or coaching, weekend Aundh or Kothrud meetups, MPSC-UPSC crossover discussions." },
      ],
    },
    together: {
      heading: "What Pune study buddies do together on yCohort",
      paragraphs: [
        "MPSC and UPSC peer pairs run shared current-affairs discussions because the Maharashtra-focused MPSC component complements the all-India UPSC focus. Answer-writing exchanges in Marathi and English depending on aspirant preference. GATE preparation pairs at COEP, VIT-Pune, MIT-WPU help juniors and seniors avoid duplicated DSA drills.",
        "JEE / NEET dropper buddies in Karve Nagar, Aundh and Kothrud run late-evening voice sessions when hostel and PG rules allow. Weekend in-person meetups at Pune University library, FC Road cafés or Aundh study spaces — fully optional, only when both buddies want to.",
      ],
    },
    faq: [
      {
        q: "Can I find an MPSC and UPSC combined study buddy in Pune?",
        a: "Yes. MPSC + UPSC is one of the most common Pune combinations because Polity, Economy and Modern History overlap 70%. yCohort pairs you with peers running the same dual track so your shared prep is genuinely useful for both.",
      },
      {
        q: "Does yCohort match in Marathi for MPSC preparation?",
        a: "Yes. yCohort lets you set Marathi as your preferred medium during matching. MPSC aspirants frequently run voice sessions in Marathi for state-board content and the matcher respects that preference.",
      },
      {
        q: "I am at COEP, VIT-Pune or MIT-WPU preparing for GATE. Will yCohort fit?",
        a: "Yes. Pune engineering-college juniors and seniors form a strong GATE prep sub-cohort on yCohort. Cross-college pairing breaks your campus bubble and exposes you to different problem styles.",
      },
      {
        q: "Are there many JEE or NEET droppers on yCohort from Pune?",
        a: "Yes. Karve Nagar, Aundh and Kothrud have growing JEE and NEET dropper hostels and they are well represented on yCohort. The matcher pairs you with droppers on the same target year and attempt.",
      },
    ],
    ctaText: "Find a Pune study buddy",
    schemaKnowsAbout: ["MPSC preparation Pune", "UPSC preparation Pune", "GATE preparation Pune", "COEP placement prep", "Pune JEE dropper community", "Pune Camp coaching"],
    schemaAreaServed: { type: "City", name: "Pune" },
  },

  "study-buddy-lucknow": {
    slug: "study-buddy-lucknow",
    type: "city",
    shortName: "Lucknow",
    title: "Find a Study Buddy in Lucknow — UPPSC, UPSC, JEE | yCohort",
    metaDescription:
      "Match with Lucknow study buddies for UPPSC, UPSC, JEE, NEET. Aminabad, Aliganj coaching peer matching. Voice-first peer learning. Free pass.",
    badge: "For Lucknow competitive exam aspirants",
    h1: "Find a study buddy in Lucknow — UPPSC, UPSC, JEE, NEET",
    heroSubtitle:
      "Lucknow is Uttar Pradesh's UPPSC and UPSC hub plus a growing JEE / NEET dropper centre. yCohort matches Lucknow aspirants on real syllabus complementarity.",
    why: {
      heading: "Why Lucknow aspirants need structured peer matching",
      paragraphs: [
        "Lucknow is the heart of Uttar Pradesh's competitive-exam preparation. UPPSC, UPSC and BPSC aspirants cluster in Aminabad, Aliganj and Hazratganj coaching belts. Plus a growing JEE and NEET dropper community in Gomti Nagar and Indira Nagar, and a steady stream of CDS and SSC aspirants. The Lucknow problem is that coaching density does not translate into peer accountability — most aspirants study alone in PG rooms despite being in classes of 150.",
        "yCohort pairs Lucknow aspirants by syllabus complementarity, not by coaching enrollment. A UPPSC aspirant in Aliganj pairs with a UPSC aspirant in Aminabad because their Indian Polity and Modern History overlap. JEE droppers in Gomti Nagar pair with each other on Calculus and Mechanics. Hindi-medium and English-medium aspirants are matched accordingly.",
      ],
    },
    how: {
      heading: "How yCohort matches Lucknow aspirants",
      steps: [
        { title: "Pick your exam + Lucknow", desc: "Select UPPSC, UPSC, JEE, NEET, CDS, SSC or any supported exam and set Lucknow as your city label." },
        { title: "Run the Lucknow radar", desc: "yCohort matches you with Lucknow peers on syllabus gap, medium preference, and schedule type." },
        { title: "Join a voice room", desc: "Evening voice sessions after coaching, weekend Aminabad or Gomti Nagar meetups, Hindi-English mixed answer-writing." },
      ],
    },
    together: {
      heading: "What Lucknow study buddies do together on yCohort",
      paragraphs: [
        "UPPSC and UPSC peer pairs run shared current affairs discussions and Indian Polity revision. Answer-writing exchanges in Hindi and English depending on aspirant medium — a huge gap that solo Lucknow aspirants struggle to fill. Evening voice sessions in the 8-10 PM window after Aminabad coaching hours.",
        "JEE and NEET dropper buddies in Gomti Nagar and Indira Nagar PGs run late-evening formula drill sessions. Weekend optional meetups at Lucknow University library, Hazratganj cafés or Aliganj study spaces. Same-batch and cross-batch pairing across Lucknow's UPPSC coachings.",
      ],
    },
    faq: [
      {
        q: "Does yCohort match Hindi-medium UPPSC and UPSC aspirants?",
        a: "Yes. Hindi-medium aspirants form a large group on yCohort, especially from Lucknow, Patna, Allahabad and Varanasi. The matcher pairs Hindi-medium aspirants together so your answer-writing exchanges actually work.",
      },
      {
        q: "Can I find a UPPSC and UPSC combined study buddy in Lucknow?",
        a: "Yes. UPPSC + UPSC is one of the most common Lucknow combinations because the Polity, Modern History and Geography overlap is huge. yCohort pairs you with peers running the same dual track.",
      },
      {
        q: "Are there JEE and NEET droppers on yCohort in Lucknow?",
        a: "Yes. Gomti Nagar and Indira Nagar host growing JEE and NEET dropper hostels. The matcher pairs you with droppers on the same target year and attempt for shared mock cycles.",
      },
      {
        q: "I work in Lucknow and prepare for UPPSC or UPSC in the evening. Will yCohort fit?",
        a: "Yes. Working-professional aspirants in Lucknow are matched with other working professionals on the same evening schedule, so your 8-10 PM voice sessions have a reliable peer.",
      },
    ],
    ctaText: "Find a Lucknow study buddy",
    schemaKnowsAbout: ["UPPSC preparation Lucknow", "UPSC preparation Lucknow", "JEE NEET dropper Lucknow", "Aminabad coaching", "Aliganj coaching", "Hindi medium UPSC"],
    schemaAreaServed: { type: "City", name: "Lucknow" },
  },

  "study-buddy-patna": {
    slug: "study-buddy-patna",
    type: "city",
    shortName: "Patna",
    title: "Find a Study Buddy in Patna — BPSC, UPSC, JEE, NEET | yCohort",
    metaDescription:
      "Match with Patna study buddies for BPSC, UPSC, JEE, NEET. Boring Road and Kankarbagh coaching peer matching. Voice-first peer learning. Free pass.",
    badge: "For Patna competitive exam aspirants",
    h1: "Find a study buddy in Patna — BPSC, UPSC, JEE, NEET",
    heroSubtitle:
      "Patna has India's largest BPSC and UPSC aspirant base outside Delhi, plus huge JEE and NEET dropper communities. yCohort matches Patna peers on real complementarity.",
    why: {
      heading: "Why Patna aspirants are underserved by traditional study groups",
      paragraphs: [
        "Patna is one of India's most aspirant-dense cities. Boring Road and Kankarbagh host hundreds of BPSC and UPSC coachings — Drishti IAS, Vajiram, NextIAS branches all run packed batches. Plus enormous JEE and NEET dropper hostels for Bihar students who could not go to Kota. The problem in Patna is the opposite of Bangalore — too many aspirants, almost no structured peer matching, and informal WhatsApp study groups that collapse in 3 weeks.",
        "yCohort gives Patna aspirants a committed, matched peer instead of a chaotic group. BPSC and UPSC aspirants pair on overlapping Polity, History and Bihar-specific current affairs. JEE and NEET droppers pair on target year. Hindi-medium and English-medium aspirants are matched accordingly, with voice rooms running in whichever language both buddies prefer.",
      ],
    },
    how: {
      heading: "How yCohort matches Patna aspirants",
      steps: [
        { title: "Pick your exam + Patna", desc: "Select BPSC, UPSC, JEE, NEET, SSC or any supported exam and set Patna as your city label." },
        { title: "Run the Patna radar", desc: "yCohort matches you with Patna peers on syllabus gap, medium preference, and target attempt year." },
        { title: "Join a voice room", desc: "Evening voice sessions after Boring Road coaching, weekend Kankarbagh meetups, Hindi-English answer writing." },
      ],
    },
    together: {
      heading: "What Patna study buddies do together on yCohort",
      paragraphs: [
        "BPSC and UPSC peer pairs run daily answer-writing exchanges and shared Bihar-current-affairs discussions. Polity and Modern History overlap is huge, so shared prep covers both exams at once. Evening voice sessions in the 8-10 PM window after Boring Road or Kankarbagh coaching hours.",
        "JEE and NEET dropper buddies in Patliputra Colony and Kankarbagh PGs run formula drills, weekly-test review and NCERT line-by-line in the late evening. Weekend optional in-person meetups at Patna University library, Boring Road cafés or Kankarbagh study spaces. Working-professional Patna aspirants pair with each other on after-work schedules.",
      ],
    },
    faq: [
      {
        q: "Can I find a BPSC and UPSC combined study buddy in Patna?",
        a: "Yes. BPSC + UPSC is one of the most common Patna combinations because Polity, Modern History and Geography overlap 70%, plus Bihar-specific current affairs share a lot of context. yCohort pairs you with peers running the same dual track.",
      },
      {
        q: "Does yCohort match Hindi-medium aspirants in Patna?",
        a: "Yes. Hindi-medium aspirants are a major group on yCohort, especially from Patna, Lucknow, Varanasi and Allahabad. The matcher pairs Hindi-medium aspirants together so your answer-writing and discussion work in the language you actually use.",
      },
      {
        q: "Are JEE and NEET droppers in Patna active on yCohort?",
        a: "Yes. Patliputra Colony, Kankarbagh and Boring Road have growing JEE and NEET dropper hostels. The matcher pairs you with droppers on the same target year for shared mock-test cycles.",
      },
      {
        q: "I am a working professional in Patna preparing for BPSC or UPSC. Will yCohort fit?",
        a: "Yes. Working-professional aspirants in Patna are matched with other working professionals on the same evening or weekend schedule, so your sessions actually have a reliable peer on the other side.",
      },
    ],
    ctaText: "Find a Patna study buddy",
    schemaKnowsAbout: ["BPSC preparation Patna", "UPSC preparation Patna", "JEE NEET dropper Patna", "Boring Road coaching", "Kankarbagh coaching", "Hindi medium UPSC Bihar"],
    schemaAreaServed: { type: "City", name: "Patna" },
  },
};

export const ALL_SEO_PAGES: SeoPageContent[] = [
  ...Object.values(EXAM_PAGES),
  ...Object.values(CITY_PAGES),
];
