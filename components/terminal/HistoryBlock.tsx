import React from "react";
import styles from "./terminal.module.css";
import { terminalResume } from "../../data/terminalResume";
import { COMMANDS, HistoryItem, SECTIONS, Tone } from "./commands";
import Prompt from "./Prompt";
import Section from "./Section";

const TONE_CLASS: Record<Tone, string> = {
  fg: "text-terminal-fg",
  dim: "text-terminal-dim",
  green: "text-terminal-green",
  blue: "text-terminal-blue",
  amber: "text-terminal-amber",
  red: "text-terminal-red"
};

const WELCOME_CHIPS = ["help", "ls", "cat experience", "cat skills", "message"];

// ASCII banner spelling "Vitale".
const BANNER = String.raw`
 __     __  _   _              _
 \ \   / / (_) | |_    __ _   | |   ___
  \ \ / /  | | | __|  / _\ |  | |  / _ \
   \ V /   | | | |_  | (_| |  | | |  __/
    \_/    |_|  \__|  \__,_|  |_|  \___|
`;

interface Props {
  item: HistoryItem;
  run: (cmd: string) => void;
}

const HistoryBlock: React.FC<Props> = ({ item, run }) => {
  switch (item.kind) {
    case "cmd":
      return (
        <div className="mt-1">
          <Prompt dim />
          <span className="text-terminal-bright">{item.cmd}</span>
        </div>
      );

    case "text":
      return <div className={`mb-1.5 ${TONE_CLASS[item.tone]}`}>{item.text}</div>;

    case "welcome":
      return (
        <div className="mb-3.5">
          <pre
            className={`${styles.glow} mb-3.5 whitespace-pre font-mono leading-tight text-terminal-green`}
            style={{ fontSize: "clamp(7px, 1.9vw, 12px)" }}
            aria-label={terminalResume.name}
          >
            {BANNER}
          </pre>
          <div>
            Hi, I&apos;m{" "}
            <span className="font-semibold text-terminal-bright">{terminalResume.name}</span>,{" "}
            <span className="text-terminal-green">{terminalResume.role}</span>.
          </div>
          <div className="mt-1 text-terminal-dim">
            This resume is a filesystem. Type a command, or click any{" "}
            <span className="text-terminal-amber">highlighted</span> word.
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {WELCOME_CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                className="term-chip"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => run(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      );

    case "help":
      return (
        <div className="mb-2">
          <div className="text-terminal-bright">available commands:</div>
          {COMMANDS.map(([c, d]) => {
            const base = c.split(" ")[0];
            const target = base === "cat" ? "cat experience" : base;
            return (
              <div key={c} className="flex gap-3">
                <button
                  type="button"
                  className="term-cmd min-w-[200px] text-left text-terminal-green"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => run(target)}
                >
                  {c}
                </button>
                <span className="text-terminal-dim">{d}</span>
              </div>
            );
          })}
          <div className="mt-2 text-[12.5px] text-terminal-dim">
            tip: up/down for history, Tab to autocomplete.
          </div>
        </div>
      );

    case "ls":
      return (
        <div className="mb-2 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-4">
          {SECTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="term-cmd text-left text-terminal-blue"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => run(`cat ${s}`)}
            >
              {s}/
            </button>
          ))}
        </div>
      );

    case "section":
      return <Section section={item.key} run={run} />;

    default:
      return null;
  }
};

export default HistoryBlock;
