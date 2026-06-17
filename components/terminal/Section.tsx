import React from "react";
import { terminalResume } from "../../data/terminalResume";
import { SectionKey } from "./commands";

const R = terminalResume;

// Small shared building blocks so each section stays declarative.
const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-2 text-xs uppercase tracking-widest text-terminal-amber"># {children}</div>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-1.5 flex gap-2">
    <span className="shrink-0 text-terminal-green">{">"}</span>
    <span>{children}</span>
  </div>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded border border-terminal-border bg-terminal-chip px-2 py-0.5 text-[12.5px]">
    {children}
  </span>
);

interface SectionProps {
  section: SectionKey;
  run: (cmd: string) => void;
}

const Section: React.FC<SectionProps> = ({ section, run }) => {
  switch (section) {
    case "about":
      return (
        <div className="mb-3">
          <Header>about</Header>
          <div className="text-base text-terminal-bright">{R.name}</div>
          <div className="mb-2 text-terminal-green">
            {R.role} · {R.location}
          </div>
          <p className="max-w-2xl">{R.summary}</p>
        </div>
      );

    case "experience":
      return (
        <div className="mb-3">
          <Header>experience</Header>
          {R.experience.map((e) => (
            <div key={e.org} className="mb-4 border-l border-terminal-border pl-3">
              <div className="flex flex-wrap justify-between gap-1.5">
                <span className="font-bold text-terminal-bright">{e.org}</span>
                <span className="text-[12.5px] text-terminal-dim">{e.time}</span>
              </div>
              <div className="text-[13px] text-terminal-blue">{e.title}</div>
              <div className="my-1 text-xs italic text-terminal-dim">{e.sub}</div>
              {e.points.map((p, i) => (
                <Bullet key={i}>{p}</Bullet>
              ))}
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="mb-3">
          <Header>projects</Header>
          <div className="flex flex-wrap justify-between gap-1.5">
            <span className="font-bold text-terminal-bright">{R.project.name}</span>
            <span className="text-[12.5px] text-terminal-dim">{R.project.context}</span>
          </div>
          <div className="my-1 text-[12.5px] text-terminal-amber">{R.project.stack}</div>
          {R.project.points.map((p, i) => (
            <Bullet key={i}>{p}</Bullet>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="mb-3">
          <Header>skills</Header>
          {R.skills.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-[minmax(90px,110px)_1fr] items-start gap-3 py-1"
            >
              <span className="text-[12.5px] text-terminal-dim">{group.label}</span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="mb-3">
          <Header>education</Header>
          {R.education.map((ed) => (
            <div key={ed.deg} className="flex flex-wrap justify-between gap-1.5 py-1">
              <div>
                <div className="text-terminal-bright">{ed.deg}</div>
                <div className="text-[12.5px] text-terminal-dim">
                  {ed.focus ? `${ed.focus} · ` : ""}
                  {ed.school}
                </div>
              </div>
              <span className="text-[12.5px] text-terminal-green">{ed.time}</span>
            </div>
          ))}
        </div>
      );

    case "background":
      return (
        <div className="mb-3">
          <Header>additional background</Header>
          <p className="max-w-2xl border-l-2 border-terminal-amber pl-3">{R.background}</p>
        </div>
      );

    case "contact":
      return (
        <div className="mb-3">
          <Header>contact</Header>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => run("message")}
            className="term-chip mb-2.5"
          >
            send a message ›
          </button>
          <div className="flex gap-2.5">
            <span className="min-w-[70px] text-terminal-dim">email</span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => run("email")}
              className="term-link"
            >
              {R.email}
            </button>
          </div>
          <div className="flex gap-2.5">
            <span className="min-w-[70px] text-terminal-dim">phone</span>
            <span>{R.phone}</span>
          </div>
          {(Object.keys(R.links) as Array<keyof typeof R.links>).map((key) => (
            <div key={key} className="flex gap-2.5">
              <span className="min-w-[70px] text-terminal-dim">{key}</span>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => run(`open ${key}`)}
                className="term-link"
              >
                {R.links[key]}
              </button>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

export default Section;
