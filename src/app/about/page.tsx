import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Gary Wang",
  description: "Gary Wang — Statistics, Data Science & Economics student at UC Berkeley, machine learning researcher.",
};

const experience = [
  {
    when: "Sep 2026 – Present",
    title: "URAP Research Assistant",
    org: "University of California, Berkeley · Berkeley, CA",
    bullets: [
      "AI nutrition and food systems research and full-stack development.",
      "Risk assessment algorithms for non-communicable diseases (NCDs) team.",
      "Supervised by Prof. Isabel Madzorera.",
    ],
  },
  {
    when: "Aug 2026 – Present",
    title: "Undergraduate Research Assistant",
    org: "Data Science Discovery Program · Berkeley, CA",
    bullets: [
      "AI for Science Discovery and Knowledge Evaluation/Management.",
      "Supervised by Prof. Stefano Bertozzi.",
    ],
  },
  {
    when: "Aug 2026 – Present",
    title: "Student Researcher",
    org: "Rapid Reviews\\Infectious Diseases · Berkeley, CA",
    bullets: [
      "AI/machine peer-review evaluation team, in collaboration with the MIT Press and the Gates Foundation.",
      "Supervised by Director Hildy Fong Baker.",
    ],
  },
  {
    when: "Sep 2026 – Present",
    title: "Undergraduate Student Researcher",
    org: "William and Barbara Leonard Transportation Center · San Bernardino, CA",
    bullets: ["Social media analysis of SBCTA."],
  },
  {
    when: "Oct 2025 – Sep 2026",
    title: "Undergraduate Research Assistant",
    org: "William and Barbara Leonard Transportation Center · San Bernardino, CA",
    bullets: [
      "Chatbot research assistant, supervised by Prof. Yunfei Hou.",
      "Developed reward-modeling pipelines and evaluation frameworks for chatbot systems, measuring confidence calibration and faithfulness across LLM-generated outputs, improving response sharpness by 60%.",
      "Implemented automated experiments and data analysis workflows to assess model truthfulness under varying prompts and conversational contexts.",
    ],
  },
  {
    when: "Jun 2026 – Aug 2026",
    title: "Full Stack Engineer",
    org: "Accio · Sunnyvale, CA",
    bullets: [
      "Optimized a persistent-memory AI agent workflow and its contextual memory systems, improving workflow efficiency by 30% and contextual memory performance by over 20% across specialized professional AI modes.",
      "Redesigned an agent evaluation dashboard and engineered an RLHF-based evaluation system, improving work speed by 15% while streamlining model analysis and the deep learning step process.",
    ],
  },
  {
    when: "May 2026 – Aug 2026",
    title: "ML Researcher",
    org: "Alibaba Cloud · Hangzhou, China",
    bullets: [
      "Multilingual system optimization, recommendation-oriented NLP analysis on large-scale e-commerce data.",
    ],
  },
  {
    when: "May 2026 – Aug 2026",
    title: "Business Analyst",
    org: "Alibaba Group · Hangzhou, China",
    bullets: [
      "Built frameworks for evaluation and experimentation efficiency, improving performance in AI-driven e-commerce projects and initiatives by 20% for Alibaba's Cross-Border E-commerce Service Center.",
      "Analyzed large-scale e-commerce and recommendation data using econometric modeling to evaluate scalable AI marketplace solutions, providing 100+ generative solutions and market decisions.",
    ],
  },
  {
    when: "Jan 2026 – Jun 2026",
    title: "Undergraduate Researcher",
    org: "University of California, Riverside · Riverside, CA",
    bullets: [
      "Applied tensor decomposition, CP decomposition, and related machine learning techniques to classify and categorize AI-generated responses from university chatbot interactions.",
      "Evaluated and improved contextual accuracy by 40% across diverse student inquiry categories, analyzing response quality and identifying performance trends in information retrieval and response specificity.",
      "Collaborated with and supervised by Prof. Vagelis Papalexakis.",
    ],
  },
  {
    when: "Sep 2025 – Jun 2026",
    title: "Undergraduate Researcher",
    org: "California State University-San Bernardino",
    bullets: ["Reward modeling."],
  },
  {
    when: "Mar 2026 – May 2026",
    title: "Startup Associate",
    org: "Figwork",
    bullets: ["Outreach & growth."],
  },
  {
    when: "Apr 2025 – Jun 2025",
    title: "Marketing Intern",
    org: "Efficient Business Integrators · Mission Viejo, CA",
    bullets: ["Operation optimization, automation tool efficiency, product visibility, UI/UX."],
  },
  {
    when: "Jun 2024 – May 2025",
    title: "Instructor",
    org: "Mathnasium - The Math Learning Center",
    bullets: [
      "Mathematics instructor and 1-1 instructor: K-12, AP Calculus BC, AP Statistics, AP Physics.",
    ],
  },
  {
    when: "Aug 2023 – May 2025",
    title: "Founder",
    org: "LanguageConnect",
    bullets: ["AI survey-response analysis, AI news page and blog."],
  },
  {
    when: "Aug 2023 – May 2025",
    title: "Publisher",
    org: "ForeignLanguagePro",
    bullets: [
      "Language-acquisition iOS app built with the OpenAI API, Flutter, AssemblyAI, Firebase, and Android Studio.",
    ],
  },
  {
    when: "Jul 2024 – Dec 2024",
    title: "ML Researcher",
    org: "Kaggle",
    bullets: ["Salary prediction model on 70k entries with 6 unique prediction algorithms."],
  },
  {
    when: "Jul 2024 – Aug 2024",
    title: "Data Analyst",
    org: "MP Biomedicals · Santa Ana, CA",
    bullets: [
      "Full-stack development and customer support: 20+ features for a customer support portal supporting nucleic acid homogenizer systems.",
      "Collaborated with engineers and stakeholders to test, debug, and deploy application features, improving system usability and customer support workflows.",
    ],
  },
  {
    when: "Aug 2023 – May 2024",
    title: "Software Intern",
    org: "California State Polytechnic University-Pomona",
    bullets: [
      "AI innovation research and cloud computing app development.",
      "Supervised by Prof. Yu Sun.",
    ],
  },
  {
    when: "Jan 2024 – Apr 2024",
    title: "Research Writer",
    org: "IEEE Conference",
    bullets: [
      "NLP analysis on language acquisition applications (ADNLP '24).",
      "Reward model and tensor decomposition (IEEE '26).",
    ],
  },
  {
    when: "Jul 2023 – Aug 2023",
    title: "Software Engineer",
    org: "MP Biomedicals",
    bullets: [
      "NGS kit analysis, beta data testing on a bacterial pathogen prep kit, and FastPrep research with MP lab teams.",
    ],
  },
  {
    when: "Sep 2021 – May 2023",
    title: "Volunteer",
    org: "Center for Compassionate Leadership",
    bullets: ["3 book drives, $3k raised for ARC & ACS.", "Veteran rehab and K2K reading management."],
  },
  {
    when: "Dec 2021 – Jan 2022",
    title: "Astrophysics Researcher",
    org: "George Mason University",
    bullets: [
      "Telescope data analysis at the George Mason University Observatory; NASA mission details proposals.",
    ],
  },
];

const projects = [
  {
    when: "Jun 2026 – Present",
    title: "Independent AI Web-app & App Development",
    org: "Full-Stack Engineer",
    bullets: [
      "Designed and deployed 40+ full-stack products for practical, quality-of-life usage, including AI assistants, study tools, travel platforms, real-time marketplaces, and productivity systems.",
      "Engineered custom, production-ready web-apps and apps from idea to live deployment, transforming 30+ unique user requirements into scalable features, integrations, and polished end-to-end experiences.",
    ],
  },
  {
    when: "Aug 2024 – May 2025",
    title: "Language Learning App & Research Paper",
    org: "Full-Stack Developer & Research Author",
    bullets: [
      "Developed an interactive, video-based language-learning application for three languages and authored a ten-page research paper evaluating its design, methodology, and simulated language-learning results.",
      "Selected as 1 of 3 student speakers and 1 of 9 student authors at the ADNLP 2024 International Conference; the paper was later selected and published in a special issue across 10+ NLP journals.",
    ],
  },
  {
    when: "Ongoing",
    title: "This platform",
    org: "goat-ai-platform · gariyuuu.com",
    bullets: [
      "Self-hosted, OpenAI-compatible AI gateway (auth, rate limiting, usage tracking, LoRA fine-tuning pipeline) fronting an open-weight model, replacing direct calls to proprietary LLM APIs across a dozen personal apps.",
    ],
  },
];

const education = [
  {
    when: "Aug 2025 – May 2029",
    title: "University of California, Berkeley",
    org: "Bachelor's degree, Statistics · College of Computing, Data Science, and Society",
    bullets: [
      "Relevant coursework: Concepts of Probability (STAT 134), Concepts in Computing with Data (STAT 133), Linear Algebra & Differential Equations, Multivariable Calculus, Econometrics, Microeconomics (Quantitative), Macroeconomics (Quantitative)",
    ],
  },
  {
    when: "Aug 2025 – May 2029",
    title: "University of California, Berkeley",
    org: "Bachelor's degree, Data Science · College of Computing, Data Science, and Society",
    bullets: [],
  },
  {
    when: "Aug 2025 – May 2029",
    title: "University of California, Berkeley",
    org: "Bachelor's degree, Economics · College of Letters & Science",
    bullets: [],
  },
  {
    when: "Aug 2021 – Jun 2025",
    title: "St. Margaret’s Episcopal School",
    org: "High School Diploma",
    bullets: [],
  },
];

const skills: [string, string][] = [
  ["Programming", "Python, TypeScript, JavaScript, SQL, C++, Java, Swift, R, HTML/CSS"],
  [
    "AI & ML",
    "Large language models (LLMs), natural language processing (NLP), LLMOps, RLHF, PyTorch, RAG/LLM systems, model production/APIs, embeddings, vector search, fine-tuning, LangChain, Hugging Face, Pandas, NumPy, Scikit-learn, TensorFlow, statistical modeling, product analytics, data cleaning, time series analysis, regression, classification, clustering",
  ],
  [
    "Web Dev",
    "React, Next.js, Node.js, FastAPI, REST APIs, WebSockets, Tailwind CSS, GraphQL, Three.js, WebGL, WebRTC",
  ],
  [
    "Data & Cloud",
    "PostgreSQL, AWS, Redis, Prisma, Supabase, Vercel, Neon, Firebase, Cloudflare, Snowflake, DigitalOcean",
  ],
  ["DevOps", "Systems engineering, Git, Docker, GitHub Actions, Linux, Playwright/Jest, Jupyter"],
  ["Languages", "Chinese (native or bilingual), English (native or bilingual), Japanese (limited working)"],
];

const honors = [
  "U.S. Patent — ForeignLanguagePro: Interactive Language Learning Application (issued May 2024)",
  "Publication — “An Interactive and Helpful Program to Help Foreign Language Learners Learn New Languages through Videos,” Association for Digital NLP (Apr 2024)",
  "IEEE '26 — Institute of Electrical and Electronics Engineers",
  "ADNLP 2024 — Research Paper Recognition & Lead Speaker, Language Learning Application",
  "3x Presidential Service Gold Medalist — Presidential Service Awards (2022–2024)",
  "1st Place, IgniteCS Programming Expo",
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-10">
      <h2 className="meta mb-6 text-muted">{title}</h2>
      {children}
    </section>
  );
}

function Entry({ when, title, org, bullets }: { when: string; title: string; org: string; bullets: string[] }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
      <div className="text-sm text-muted">{when}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mb-2 text-sm text-muted">{org}</p>
        {bullets.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <header className="flex flex-col items-center gap-6 py-20 text-center sm:flex-row sm:text-left">
        <Image
          src="/avatar-2026-09.jpg"
          alt="Gary Wang"
          width={140}
          height={140}
          className="rounded-full border border-border object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Gary Wang</h1>
          <p className="mt-1 text-muted">
            stats, econ &amp; ds @ ucb · San Francisco Bay Area
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm sm:justify-start">
            <a href="https://github.com/Gariyuuu" className="text-accent hover:underline">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gary-wang-a912a0308/"
              className="text-accent hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://openreview.net/profile?id=~Shengyi_Wang5"
              className="text-accent hover:underline"
            >
              OpenReview
            </a>
            <a href="mailto:gywng006@gmail.com" className="text-accent hover:underline">
              Email
            </a>
          </div>
        </div>
      </header>

      <Section id="about" title="About">
        <p className="text-foreground/90">
          I&apos;m studying Statistics, Data Science, and Economics at UC Berkeley. I currently
          work as a URAP Research Assistant at UC Berkeley on AI nutrition and food systems
          research, an Undergraduate Research Assistant in the Data Science Discovery Program, a
          Student Researcher on the Rapid Reviews\Infectious Diseases AI peer-review evaluation
          team, and an Undergraduate Student Researcher at the William and Barbara Leonard
          Transportation Center. From May to August 2026 I was a Full Stack Engineer at Accio, an
          ML Researcher at Alibaba Cloud, and a Business Analyst at Alibaba Group, and I&apos;ve
          independently designed and deployed 40+ full-stack products — AI assistants, study
          tools, travel platforms, real-time marketplaces, and productivity systems. I hold a
          U.S. patent for a foreign-language-learning application, and my NLP research was
          presented at an international conference and published across 10+ journals.
        </p>
      </Section>

      <Section id="experience" title="Experience">
        <div className="divide-y divide-border">
          {experience.map((e) => (
            <Entry key={`${e.when}-${e.title}-${e.org}`} {...e} />
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <Entry key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <div className="divide-y divide-border">
          {education.map((e) => (
            <Entry key={e.org} {...e} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid gap-3">
          {skills.map(([label, vals]) => (
            <div key={label} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-sm text-foreground/85">{vals}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="honors" title="Honors">
        <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/85">
          {honors.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-foreground/90">
          The best way to reach me is by email at{" "}
          <a href="mailto:gywng006@gmail.com" className="text-accent hover:underline">
            gywng006@gmail.com
          </a>
          , or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/gary-wang-a912a0308/"
            className="text-accent hover:underline"
          >
            LinkedIn
          </a>
          . You can also check out my code on{" "}
          <a href="https://github.com/Gariyuuu" className="text-accent hover:underline">
            GitHub
          </a>{" "}
          or my published research on{" "}
          <a
            href="https://openreview.net/profile?id=~Shengyi_Wang5"
            className="text-accent hover:underline"
          >
            OpenReview
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
