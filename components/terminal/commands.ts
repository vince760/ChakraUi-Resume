import { terminalResume } from "../../data/terminalResume";

export const SECTIONS = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "background",
  "contact"
] as const;

export type SectionKey = (typeof SECTIONS)[number];

export type Tone = "fg" | "dim" | "green" | "blue" | "amber" | "red";

// One rendered block of terminal output.
export type HistoryItem =
  | { kind: "cmd"; cmd: string } // echoed prompt line
  | { kind: "welcome" }
  | { kind: "help" }
  | { kind: "ls" }
  | { kind: "section"; key: SectionKey }
  | { kind: "text"; tone: Tone; text: string };

export interface RunResult {
  items: HistoryItem[];
  clear?: boolean;
  open?: string; // url for the component to open (window access stays there)
}

// Help table: drives both the `help` output and Tab autocomplete.
export const COMMANDS: Array<[string, string]> = [
  ["ls", "list resume sections"],
  ["cat <section>", "read a section (e.g. cat experience)"],
  ["whoami", "the short version"],
  ["message", "send me a message, right here"],
  ["open <linkedin|github|site>", "open a link"],
  ["email", "compose an email to me"],
  ["clear", "clear the screen"]
];

// The contact form is interactive/stateful, so the Terminal handles these
// commands directly instead of routing them through runCommand.
export const CONTACT_COMMANDS = ["message", "msg", "hire"];

export const isContactCommand = (raw: string): boolean =>
  CONTACT_COMMANDS.includes(raw.trim().toLowerCase());

// Aliases that map typed words onto a real section.
const SECTION_ALIASES: Record<string, SectionKey> = {
  about: "about",
  summary: "about",
  experience: "experience",
  exp: "experience",
  work: "experience",
  projects: "projects",
  project: "projects",
  finsight: "projects",
  skills: "skills",
  stack: "skills",
  education: "education",
  edu: "education",
  background: "background",
  usmc: "background",
  military: "background",
  contact: "contact"
};

const text = (tone: Tone, t: string): RunResult => ({ items: [{ kind: "text", tone, text: t }] });

export function runCommand(raw: string): RunResult {
  const cmd = raw.trim();
  const [name = "", ...args] = cmd.split(/\s+/);
  const arg = (args[0] || "").toLowerCase();
  const lower = name.toLowerCase();

  switch (lower) {
    case "":
      return { items: [] };
    case "help":
      return { items: [{ kind: "help" }] };
    case "ls":
    case "dir":
      return { items: [{ kind: "ls" }] };
    case "whoami":
      return { items: [{ kind: "section", key: "about" }] };
    case "clear":
    case "cls":
      return { items: [], clear: true };
    case "open": {
      const link = terminalResume.links[arg as keyof typeof terminalResume.links];
      if (link) return { ...text("green", `opening ${arg} -> ${link}`), open: link };
      return text("red", `open: no link '${arg}'. try: linkedin, github, site`);
    }
    case "email":
      return { ...text("blue", `-> ${terminalResume.email}`), open: `mailto:${terminalResume.email}` };
    case "cat":
    case "show": {
      const key = SECTION_ALIASES[arg];
      if (key) return { items: [{ kind: "section", key }] };
      return text("red", `cat: '${arg}' not found. type 'ls' to list sections.`);
    }
    case "sudo":
      return text("amber", "nice try. this Marine doesn't escalate privileges for strangers.");
    case "exit":
    case "quit":
      return text("dim", "there's no escape. the resume is everywhere. (try 'help')");
    default:
      if ((SECTIONS as readonly string[]).includes(lower)) {
        return { items: [{ kind: "section", key: lower as SectionKey }] };
      }
      return text("red", `command not found: ${name}. type 'help' for options.`);
  }
}

// Tab autocomplete: match the typed prefix against the full command vocabulary.
export function autocomplete(input: string): string | null {
  const partial = input.trim().toLowerCase();
  if (!partial) return null;
  const pool = [
    "help",
    "ls",
    "clear",
    "whoami",
    "message",
    "email",
    ...SECTIONS.map((s) => `cat ${s}`),
    ...Object.keys(terminalResume.links).map((l) => `open ${l}`)
  ];
  return pool.find((c) => c.startsWith(partial)) ?? null;
}
