import React from "react";
import styles from "./terminal.module.css";
import { terminalResume } from "../../data/terminalResume";

// ASCII "VV" monogram (ANSI Shadow). The signature mark of the rail.
const MONOGRAM = [
  "██╗   ██╗██╗   ██╗",
  "██║   ██║██║   ██║",
  "██║   ██║██║   ██║",
  "╚██╗ ██╔╝╚██╗ ██╔╝",
  " ╚████╔╝  ╚████╔╝ ",
  "  ╚═══╝    ╚═══╝  "
].join("\n");

// neofetch-style readout. Values are real resume data; the OS/Kernel/Shell
// rows are interface flavor (the "machine" metaphor), not resume claims.
const R = terminalResume;
const STATS: Array<[string, string]> = [
  ["OS", "Vitale-OS (full-stack)"],
  ["Host", R.experience[0].org],
  ["Kernel", "ASP.NET Core · Next.js"],
  ["Shell", "resume.sh"],
  ["Experience", "6+ years"],
  ["Role", "Full-Stack Engineer"],
  ["Location", R.location],
  ["Education", "M.S. Data Science '26"],
  ["Service", "USMC Veteran '04–'13"]
];

const SWATCHES = [
  "bg-terminal-green",
  "bg-terminal-blue",
  "bg-terminal-amber",
  "bg-terminal-red",
  "bg-terminal-fg",
  "bg-terminal-dim"
];

interface Props {
  run: (cmd: string) => void;
  uptime: string;
  className?: string;
}

const SystemInfo: React.FC<Props> = ({ run, uptime, className = "" }) => (
  <aside className={`flex-col gap-4 overflow-y-auto bg-terminal-chrome/40 px-5 py-5 ${className}`}>
    <pre
      className={`${styles.glow} whitespace-pre text-terminal-green`}
      style={{ fontSize: "9px", lineHeight: 1.1 }}
      aria-label={`${R.name} monogram`}
    >
      {MONOGRAM}
    </pre>

    <div>
      <div className="text-terminal-green">
        vince<span className="text-terminal-dim">@</span>
        <span className="text-terminal-blue">vitale-os</span>
      </div>
      <div className="text-terminal-dim">{"-".repeat(20)}</div>
      <dl className="mt-1">
        {STATS.map(([k, v]) => (
          <div key={k} className="flex gap-2 py-px">
            <dt className="w-[92px] shrink-0 whitespace-nowrap text-terminal-amber">{k}</dt>
            <dd className="whitespace-nowrap text-terminal-fg">{v}</dd>
          </div>
        ))}
        <div className="flex gap-2 py-px">
          <dt className="w-[92px] shrink-0 whitespace-nowrap text-terminal-amber">Uptime</dt>
          <dd className="whitespace-nowrap text-terminal-green">{uptime || "00:00"}</dd>
        </div>
      </dl>
      <div className="mt-2.5 flex gap-1" aria-hidden="true">
        {SWATCHES.map((c) => (
          <span key={c} className={`h-3 w-5 rounded-sm ${c}`} />
        ))}
      </div>
    </div>

    <div className="border-t border-terminal-border pt-3">
      <div className="mb-1.5 text-[11px] uppercase tracking-widest text-terminal-dim">// links</div>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run("open linkedin")}
        className="term-link block"
      >
        linkedin
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run("open github")}
        className="term-link block"
      >
        github
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run("open site")}
        className="term-link block"
      >
        {R.links.site.replace(/^https?:\/\//, "")}
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run("email")}
        className="term-link block"
      >
        email
      </button>
    </div>

    <div className="mt-auto border-t border-terminal-border pt-3 text-[11px] text-terminal-dim">
      type <span className="text-terminal-green">help</span> or pick a tab below to explore.
    </div>
  </aside>
);

export default SystemInfo;
