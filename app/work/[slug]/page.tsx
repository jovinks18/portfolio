import Link from "next/link";
import { notFound } from "next/navigation";
import { experience, profile } from "@/data/portfolioData";

export function generateStaticParams() {
  return experience.items.map((item) => ({ slug: item.slug }));
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const item = experience.items.find((i) => i.slug === params.slug);
  if (!item) notFound();

  return (
    <main className="work-detail">
      <div className="work-detail-inner">
        <Link href="/#work" className="work-back">
          ← Back
        </Link>

        <p className="work-kicker">{item.period}</p>
        <h1>{item.company}</h1>
        <p className="work-role">{item.role}</p>

        <p className="work-lead">{item.about}</p>

        <div className="work-cols">
          <div className="work-col">
            <h2>What I did</h2>
            <ul className="work-bullets">
              {item.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="work-col">
            <h2>Impact</h2>
            <ul className="work-bullets">
              {item.impact.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="work-tags">
          {item.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="work-detail-foot">
          <Link href="/#work">← All experience</Link>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </main>
  );
}
