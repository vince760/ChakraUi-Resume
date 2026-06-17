import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./terminal.module.css";
import { autocomplete, HistoryItem, isContactCommand, runCommand, SectionKey } from "./commands";
import HistoryBlock from "./HistoryBlock";
import Prompt from "./Prompt";
import SystemInfo from "./SystemInfo";
import StatusBar from "./StatusBar";
import { useClock } from "./useClock";
import { useContactForm } from "./useContactForm";

const BOOT = [
  { t: "vitale-os v2.6.0 ... booting", d: 90 },
  { t: "loading kernel modules ......... ok", d: 70 },
  { t: "mounting /resume ............... ok", d: 70 },
  { t: "starting career.service ........ ok", d: 70 },
  { t: "establishing secure shell ...... ok", d: 90 },
  { t: "", d: 40 }
];

const Terminal: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState<SectionKey | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useRef(false);
  const clock = useClock();

  const append = useCallback(
    (items: HistoryItem[]) => setHistory((prev) => [...prev, ...items]),
    []
  );
  const { form, start: startForm, submitLine, cancel: cancelForm } = useContactForm(append);

  const finishBoot = useCallback(() => {
    setBooted(true);
    setHistory([{ kind: "welcome" }]);
  }, []);

  // Boot sequence. Reveals lines one at a time, or instantly under reduced motion.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (reducedMotion.current) {
      setBootLines(BOOT.map((b) => b.t));
      finishBoot();
      return;
    }

    let cancelled = false;
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      if (cancelled) return;
      if (i >= BOOT.length) {
        timers.push(setTimeout(() => !cancelled && finishBoot(), 200));
        return;
      }
      // Capture the entry now: the setState updater runs later, after `i` has
      // already advanced, so it must not read BOOT[i] itself.
      const entry = BOOT[i];
      setBootLines((prev) => [...prev, entry.t]);
      i += 1;
      timers.push(setTimeout(step, entry.d));
    };
    timers.push(setTimeout(step, 250));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [finishBoot]);

  // Keep the newest output in view, and focus the input once booted.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, bootLines]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const focusInput = () => inputRef.current?.focus();

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();

      // The contact form is interactive, so it is handled here rather than in
      // runCommand: echo the command, then hand off to the form state machine.
      if (isContactCommand(cmd)) {
        append([{ kind: "cmd", cmd }]);
        setCmdHistory((prev) => [cmd, ...prev].slice(0, 50));
        setHistIdx(-1);
        setInput("");
        startForm();
        return;
      }

      const result = runCommand(raw);

      if (result.clear) {
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, { kind: "cmd", cmd }, ...result.items]);
      }
      if (cmd) setCmdHistory((prev) => [cmd, ...prev].slice(0, 50));
      setHistIdx(-1);
      setInput("");

      // Light up the matching status-bar tab when a section is shown.
      const section = result.items.find((it) => it.kind === "section");
      if (section && section.kind === "section") setActive(section.key);

      // Guarded window access lives here, never in SSR-evaluated module code.
      if (result.open && typeof window !== "undefined") {
        window.open(result.open, "_blank", "noopener,noreferrer");
      }
    },
    [append, startForm]
  );

  // Click-to-run shares the exact same path as typing.
  const runFromClick = useCallback(
    (cmd: string) => {
      if (!booted) finishBoot();
      run(cmd);
      inputRef.current?.focus();
    },
    [booted, finishBoot, run]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // While the contact form is open, the prompt feeds the form, not commands.
    if (form) {
      if (form.step === "sending") {
        e.preventDefault();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        submitLine(input);
        setInput("");
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelForm();
        setInput("");
      }
      return;
    }

    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = autocomplete(input);
      if (match) setInput(match);
    }
  };

  return (
    <div
      onClick={focusInput}
      className={`${styles.app} flex h-screen flex-col font-mono text-[13.5px] leading-relaxed text-terminal-fg`}
    >
      {/* Title bar */}
      <header className="flex items-center gap-2 border-b border-terminal-border bg-terminal-chrome px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2.5 text-[12.5px] text-terminal-dim">vince@vitale-os: ~/resume</span>
        <div className="ml-auto flex items-center gap-3 text-[12px] text-terminal-dim">
          {!booted ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finishBoot();
              }}
              className="rounded border border-terminal-border px-2.5 py-0.5 text-[11px] hover:bg-terminal-border hover:text-terminal-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green"
            >
              skip ›
            </button>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className={styles.rec} aria-hidden="true" />
              REC
            </span>
          )}
        </div>
      </header>

      {/* Body: system-info rail + main terminal */}
      <div className="flex min-h-0 flex-1">
        <SystemInfo
          run={runFromClick}
          uptime={clock.uptime}
          className="hidden w-[350px] shrink-0 border-r border-terminal-border lg:flex"
        />

        <main
          ref={scrollRef}
          className={`${styles.scanlines} ${styles.scroll} min-h-0 flex-1 overflow-y-auto px-5 py-5`}
        >
          {!booted &&
            bootLines.map((l, i) => {
              const hasOk = l.endsWith("ok");
              return (
                <div
                  key={i}
                  className={hasOk ? "text-terminal-fg" : "text-terminal-dim"}
                  aria-live="polite"
                >
                  {hasOk ? (
                    <>
                      <span>{l.slice(0, -2)}</span>
                      <span className="text-terminal-green">ok</span>
                    </>
                  ) : (
                    l
                  )}
                </div>
              );
            })}

          {booted &&
            history.map((item, i) => <HistoryBlock key={i} item={item} run={runFromClick} />)}

          {/* Live input line */}
          {booted && (
            <div className="relative flex flex-wrap items-center rounded-sm focus-within:ring-2 focus-within:ring-terminal-green">
              {form ? (
                <span className="whitespace-pre font-bold text-terminal-amber">{form.step} › </span>
              ) : (
                <Prompt />
              )}
              <span className={`${styles.glow} text-terminal-bright`}>{input}</span>
              <span className={styles.cursor} aria-hidden="true" />
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command input. Type a command such as help, ls, or cat experience, then
                press Enter.
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                aria-describedby="terminal-help"
                className="absolute h-px w-px border-none p-0 opacity-0"
              />
              <p id="terminal-help" className="sr-only">
                Available commands: help, ls, cat, whoami, message, open, email, clear. Use Tab to
                autocomplete and the up and down arrows for command history.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Status bar */}
      <StatusBar focused={focused} active={active} time={clock.time} run={runFromClick} />
    </div>
  );
};

export default Terminal;
