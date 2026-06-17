import { Resend } from "resend";

// Serverless contact endpoint. The terminal form POSTs here so the Resend API
// key never reaches the browser. Reached at /.netlify/functions/contact.

const TO = "Vincent.Vitale87@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" }
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  if (!process.env.RESEND_API_KEY) {
    return json({ error: "Email is not configured yet." }, 500);
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) return json({ error: "All fields are required." }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "That email address looks invalid." }, 400);
  if (message.length > 5000) return json({ error: "Message is too long." }, 400);

  console.log(`[contact] incoming message from ${name} <${email}> (${message.length} chars)`);

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      // Must be an address on a Resend-verified domain. redline-commerce.com is
      // verified on the account; the mailbox need not exist (it is just the
      // From header). Replies go to the visitor via replyTo below.
      from: "Resume Terminal <resume@redline-commerce.com>",
      to: [TO],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });
    if (error) {
      console.error("[contact] resend error:", error);
      return json({ error: error.message || "Resend rejected the message." }, 502);
    }
    console.log(`[contact] sent ok, resend id=${data?.id}`);
    return json({ ok: true, id: data?.id ?? null }, 200);
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return json({ error: err instanceof Error ? err.message : "Unexpected server error." }, 502);
  }
};
