import { useRef, useState, type FormEvent } from "react";
import { socials } from "../data/content";

type Status = "idle" | "sending" | "sent" | "failed" | "offline";
type Errors = Partial<Record<"user_name" | "user_email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const env = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
};

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("user_name") ?? "").trim()) errors.user_name = "Add your name so I know who is writing.";
  const email = String(data.get("user_email") ?? "").trim();
  if (!email) errors.user_email = "Add an email address so I can reply.";
  else if (!EMAIL.test(email)) errors.user_email = "That address looks incomplete. Write it as name@example.com.";
  if (String(data.get("message") ?? "").trim().length < 10) errors.message = "Write a little more: at least a sentence.";
  return errors;
}

export default function Contact({ resumeUrl }: { resumeUrl: string | null }) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    if (String(data.get("company") ?? "")) { setStatus("sent"); return; } // honeypot: bots fill it, people never see it

    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) { (el.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }

    if (!env.service || !env.template || !env.key) { setStatus("offline"); return; }

    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(env.service, env.template, el, { publicKey: env.key });
      el.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const field = (name: keyof Errors) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
    onInput: () => errors[name] && setErrors((x) => ({ ...x, [name]: undefined })),
  });

  const message: Record<Status, string> = {
    idle: "",
    sending: "Sending your message.",
    sent: "Thanks, your message is on its way. I will reply by email.",
    failed: "That did not go through. Try again in a minute, or reach me on LinkedIn.",
    offline: "Nothing was sent: this form is not connected yet. Reach me on LinkedIn for now.",
  };

  return (
    <section id="contact" className="contact mb-5" aria-labelledby="contact-q">
      <div className="contact__media" aria-hidden="true">
        <img src="/photos/glow-1920.webp" srcSet="/photos/glow-960.webp 960w, /photos/glow-1440.webp 1440w, /photos/glow-1920.webp 1920w" sizes="100vw" width={1920} height={1440} alt="" loading="lazy" />
      </div>
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2 id="contact-q" data-head>Let's talk</h2>
          <p className="lead" data-rise>Tell me about the role or the project. The message comes straight to my inbox.</p>
          <ul className="contact__links" data-rise>
            <li><a className="link" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="link" href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            {resumeUrl && <li><a className="link" href={resumeUrl} target="_blank" rel="noopener noreferrer">CV</a></li>}
          </ul>
        </div>

        <form ref={form} className="form glass" onSubmit={onSubmit} noValidate data-rise>
          <div className="form__field">
            <label htmlFor="f-user_name">Name</label>
            <input type="text" autoComplete="name" required {...field("user_name")} />
            {errors.user_name && <p className="form__error" id="e-user_name">{errors.user_name}</p>}
          </div>
          <div className="form__field">
            <label htmlFor="f-user_email">Email</label>
            <input type="email" autoComplete="email" inputMode="email" required {...field("user_email")} />
            {errors.user_email && <p className="form__error" id="e-user_email">{errors.user_email}</p>}
          </div>
          <div className="form__field">
            <label htmlFor="f-message">Message</label>
            <textarea rows={5} required {...field("message")} />
            {errors.message && <p className="form__error" id="e-message">{errors.message}</p>}
          </div>
          <div className="form__trap" aria-hidden="true">
            <label htmlFor="f-company">Company</label>
            <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form__foot">
            <button className="btn" type="submit" disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
              {status === "sending" ? "Sending" : "Send message"}
            </button>
            <p className={`form__status form__status--${status}`} role="status" aria-live="polite">{message[status]}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
