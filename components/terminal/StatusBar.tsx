import React from "react";
import { SECTIONS, SectionKey } from "./commands";

interface Props {
  focused: boolean;
  active: SectionKey | null;
  time: string;
  run: (cmd: string) => void;
}

// tmux/vim-style status bar. The mode chip reflects prompt focus; the numbered
// tabs jump to a section; the right side carries the live clock.
const StatusBar: React.FC<Props> = ({ focused, active, time, run }) => (
  <footer className="flex items-center gap-3 overflow-x-auto border-t border-terminal-border bg-terminal-chrome px-3 py-1.5 text-[12px]">
    <span
      className={`w-[96px] shrink-0 rounded px-2 py-0.5 text-center font-bold ${
        focused ? "bg-terminal-green text-terminal-bg" : "bg-terminal-border text-terminal-dim"
      }`}
    >
      {focused ? "-- INSERT --" : "NORMAL"}
    </span>

    <nav className="flex items-center gap-1">
      {SECTIONS.map((s, i) => {
        const isActive = active === s;
        return (
          <button
            key={s}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => run(`cat ${s}`)}
            className={`rounded px-2 py-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green ${
              isActive
                ? "bg-terminal-green/15 text-terminal-green"
                : "text-terminal-dim hover:text-terminal-fg"
            }`}
          >
            <span className="text-terminal-amber">{i + 1}</span> {s}
          </button>
        );
      })}
    </nav>

    <div className="ml-auto flex shrink-0 items-center gap-2 text-terminal-dim">
      <span className="hidden text-terminal-dim sm:inline">resume.sh</span>
      <span className="text-terminal-green">{time || "--:--:--"}</span>
    </div>
  </footer>
);

export default StatusBar;
