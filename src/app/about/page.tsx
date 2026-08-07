import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Gary Wang",
  description: "Gary Wang — Statistics & Economics student at UC Berkeley, machine learning researcher.",
};

const experience = [
  {
    when: "May 2026 – Present",
    title: "Business Analyst",
    org: "Alibaba Cross-Border E-commerce Service Center · Hangzhou, China",
    bullets: [
      "Built evaluation frameworks to measure experimentation efficiency and performance across AI-driven e-commerce initiatives.",
      "Analyzed scalable AI marketplace solutions using econometric modeling and statistical methods to inform strategic decision-making.",
    ],
  },
  {
    when: "Jan 2026 – Present",
    title: "Machine Learning Researcher",
    org: "University of California, Riverside · Riverside, CA",
    bullets: [
      "Applied tensor decomposition, CP decomposition, and related machine learning techniques to classify and categorize AI-generated responses from university chatbot interactions.",
      "Evaluated contextual accuracy across diverse student inquiry categories, analyzing response quality and identifying performance trends in information retrieval and question answering.",
    ],
  },
  {
    when: "Oct 2025 – Present",
    title: "Machine Learning Engineer",
    org: "William and Barbara Leonard Transportation Center · San Bernardino, CA",
    bullets: [
      "Developed reward-modeling pipelines and evaluation frameworks for chatbot systems, measuring confidence calibration and faithfulness across LLM-generated outputs.",
      "Implemented automated experiments and data analysis workflows to assess model truthfulness under varying prompts and conversational contexts.",
    ],
  },
  {
    when: "May 2023 – Aug 2023",
    title: "Software Engineer",
    org: "MP Biomedicals, Inc. · Santa Ana, CA",
    bullets: [
      "Full-stack development on features for a customer support portal supporting nucleic acid homogenizer systems.",
      "Collaborated with engineers and stakeholders to test, debug, and deploy application features, improving system usability and customer support workflows.",
    ],
  },
];

const projects = [
  {
    when: "Sep 2024 – Dec 2024",
    title: "Job Salary Prediction Model for the IT Field",
    org: "Data Analyst & Developer · Pomona, CA",
    bullets: [
      "Designed a salary prediction system with 10+ customizable job-description inputs using multiple machine learning algorithms including KNN and linear regression, trained on 53,000+ real-world records.",
      "Performed feature engineering, data preprocessing, and model validation to improve prediction accuracy and assess model performance across diverse job profiles.",
    ],
  },
  {
    when: "Jan 2024 – Apr 2024",
    title: "Language Learning Model Research Paper",
    org: "Author · Irvine, CA",
    bullets: [
      "Developed an interactive, video-based language-learning app and authored a ten-page paper analyzing its design and research findings.",
      "Selected as 1 of 3 student speakers and 1 of 9 student authors at the ADNLP 2024 International Conference; paper later published in a special issue across 6+ NLP journals.",
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

const skills: [string, string][] = [
  ["Programming", "Python, SQL, R, Java, C++, HTML/CSS"],
  [
    "ML & Data",
    "Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, regression, classification, clustering, time series analysis, statistical modeling, RAG systems",
  ],
  ["Tools", "Git, Linux, Snowflake, Firebase, Jupyter, VS Code, MATLAB, Android Studio"],
  ["Languages", "English (fluent), Mandarin Chinese (fluent)"],
];

const honors = [
  "ADNLP 2024 recognition of Language Learning App research paper and lead speaker",
  "US Patent on Foreign Language Learning App and NLP methods",
  "First Place, Ignite CS Programming Expo",
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-10">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">{title}</h2>
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
        <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <header className="flex flex-col items-center gap-6 py-20 text-center sm:flex-row sm:text-left">
        <Image
          src="/photo.jpg"
          alt="Gary Wang"
          width={140}
          height={140}
          className="rounded-full border border-border object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Gary Wang</h1>
          <p className="mt-1 text-muted">
            Statistics &amp; Economics student at UC Berkeley · Business Analyst &amp;
            Machine Learning Researcher
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
            <a href="mailto:gywng006@gmail.com" className="text-accent hover:underline">
              Email
            </a>
          </div>
        </div>
      </header>

      <Section id="about" title="About">
        <p className="text-foreground/90">
          I&apos;m a Statistics and Economics student at UC Berkeley, minoring in Data
          Science. I currently work as a Business Analyst at Alibaba&apos;s Cross-Border
          E-commerce Service Center, and as a Machine Learning Researcher at UC Riverside
          and the William and Barbara Leonard Transportation Center, where I build
          reward-modeling and tensor decomposition tools to improve the accuracy of a
          university chatbot. I&apos;m interested in applying statistics and machine
          learning to real-world problems in language, finance, and education, and
          I&apos;ve published NLP research and presented it at an international
          conference.
        </p>
      </Section>

      <Section id="experience" title="Experience">
        <div className="divide-y divide-border">
          {experience.map((e) => (
            <Entry key={e.title} {...e} />
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
        <Entry
          when="2024 – 2028"
          title="University of California, Berkeley"
          org="B.A. Statistics & Economics, Minor in Data Science"
          bullets={[
            "Relevant coursework: STAT 134 (Concepts of Probability), STAT 133 (Concepts in Computing with Data), MATH 54 (Linear Algebra & Differential Equations), MATH 53 (Multivariable Calculus), ECON 140 (Econometrics), OIDD 0001 (Prescriptive Analytics: Business Optimization, UPenn)",
          ]}
        />
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
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
