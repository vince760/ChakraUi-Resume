import { useCallback, useRef, useState } from "react";
import { HistoryItem, Tone } from "./commands";

type Step = "name" | "email" | "message" | "sending";

interface FormState {
  step: Step;
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK = "could not send. email Vincent.Vitale87@gmail.com directly.";

const txt = (tone: Tone, text: string): HistoryItem => ({ kind: "text", tone, text });

export interface ContactForm {
  form: FormState | null;
  start: () => void;
  submitLine: (raw: string) => void;
  cancel: () => void;
}

// Drives the interactive, in-terminal contact form: name -> email -> message,
// then POSTs to the Netlify Function. `append` writes lines into the shell
// history so the conversation reads like normal terminal output.
export function useContactForm(append: (items: HistoryItem[]) => void): ContactForm {
  const [form, setForm] = useState<FormState | null>(null);
  const formRef = useRef<FormState | null>(form);
  formRef.current = form;

  const send = useCallback(
    async (data: FormState) => {
      setForm({ ...data, step: "sending" });

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wait = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
      const log = (tone: Tone, text: string) => append([txt(tone, text)]);

      log("dim", "$ send --to vincent --secure");
      await wait(220);
      log("dim", "[*] opening secure channel ...");
      await wait(240);
      log("dim", "[*] encoding envelope (name, email, body)");
      await wait(240);
      log("blue", "[*] POST /.netlify/functions/contact");

      const t0 = typeof performance !== "undefined" ? performance.now() : 0;
      try {
        const res = await fetch("/.netlify/functions/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: data.name, email: data.email, message: data.message })
        });
        const body = await res.json().catch(() => ({}));
        const ms = t0 ? Math.round(performance.now() - t0) : 0;

        log(
          res.ok ? "green" : "red",
          `[${res.status}] ${res.statusText || (res.ok ? "OK" : "ERR")}  ${ms}ms`
        );
        await wait(200);

        if (res.ok && body.ok) {
          log("dim", `[*] resend: accepted${body.id ? ` id=${body.id}` : ""}`);
          await wait(260);
          log("green", "[ok] delivered to inbox");
          await wait(140);
          log("green", `message sent. thanks ${data.name}. ok`);
        } else {
          log("red", `[err] ${body.error || FALLBACK}`);
        }
      } catch {
        log("red", "[err] could not reach the server.");
        log("dim", FALLBACK);
      } finally {
        setForm(null);
      }
    },
    [append]
  );

  const start = useCallback(() => {
    setForm({ step: "name", name: "", email: "", message: "" });
    append([
      txt("green", "// new message  ·  press Esc to cancel"),
      txt("dim", "what's your name?")
    ]);
  }, [append]);

  const submitLine = useCallback(
    (raw: string) => {
      const current = formRef.current;
      if (!current || current.step === "sending") return;
      const value = raw.trim();

      if (current.step === "name") {
        if (!value) return append([txt("amber", "please enter your name (or Esc to cancel)")]);
        append([txt("fg", `name › ${value}`), txt("dim", "your email?")]);
        setForm({ ...current, step: "email", name: value });
      } else if (current.step === "email") {
        if (!EMAIL_RE.test(value)) return append([txt("amber", "that email looks off, try again")]);
        append([txt("fg", `email › ${value}`), txt("dim", "your message?  (Enter to send)")]);
        setForm({ ...current, step: "message", email: value });
      } else if (current.step === "message") {
        if (!value) return append([txt("amber", "type a message (or Esc to cancel)")]);
        append([txt("fg", `message › ${value}`)]);
        void send({ ...current, message: value });
      }
    },
    [append, send]
  );

  const cancel = useCallback(() => {
    setForm(null);
    append([txt("dim", "message cancelled.")]);
  }, [append]);

  return { form, start, submitLine, cancel };
}
