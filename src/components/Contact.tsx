import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted transition-colors duration-200 ease-out-strong focus:border-green-bright";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailValid(EMAIL_PATTERN.test(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid || !formRef.current) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      toast.success("Message sent — thanks for reaching out!");
      formRef.current.reset();
      setIsEmailValid(true);
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-6 pt-28 pb-20 sm:px-10 lg:pt-32 lg:pb-24"
    >
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20">
        <div className="text-center lg:text-left">
          <div className="mx-auto mb-8 h-px w-[130px] bg-gradient-to-r from-green to-transparent lg:mx-0" />
          <h2 className="font-head text-[clamp(44px,6vw,84px)] leading-[1.05] font-normal tracking-[-0.04em]">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            INTERESTING.
          </h2>
          <p className="mx-auto mt-7 max-w-[440px] text-sm leading-relaxed text-text-secondary lg:mx-0">
            Open to front-end and full-stack roles, freelance projects, and
            interesting collaborations.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          aria-label="Contact form"
          className="glass mx-auto flex w-full max-w-[480px] flex-col gap-4 rounded-[10px] p-6 text-left sm:p-8 lg:max-w-none"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="user_name"
              className="text-xs text-text-secondary uppercase tracking-[0.08em]"
            >
              Name
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="user_email"
              className="text-xs text-text-secondary uppercase tracking-[0.08em]"
            >
              Email
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              onChange={handleEmailChange}
              aria-invalid={!isEmailValid}
              className={`${inputClasses} ${isEmailValid ? "" : "border-red-500 focus:border-red-500"}`}
            />
            {!isEmailValid && (
              <span className="text-xs text-red-400">
                Please enter a valid email address.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-xs text-text-secondary uppercase tracking-[0.08em]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="What are you building?"
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-full border border-green/40 bg-green/[0.08] px-6 py-3.5 text-sm text-text transition-[background-color,border-color] duration-200 ease-out-strong hover:border-green-bright hover:bg-green/[0.14] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
