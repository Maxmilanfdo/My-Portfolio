import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type FormData = { name: string; email: string; subject: string; message: string };

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    // Wire EmailJS here — using service/template IDs from env.
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 3200);
  };

  const info = [
    { icon: MapPin, label: "Location", value: "Chennai · Remote" },
    { icon: Mail, label: "Email", value: "maxmilanfdo2003@gmail.com" },
    { icon: Phone, label: "Phone", value: "(+91) 8903139019" },
  ];

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something considered."
          description="Have a project in mind, or just want to say hi? The inbox is open — I usually reply within a day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8"
          >
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl" />
            <h3 className="relative font-display text-2xl font-semibold">Reach out directly</h3>
            <p className="relative mt-3 text-sm text-muted-foreground">
              Prefer email? Grab any of the details below and drop me a line.
            </p>
            <ul className="relative mt-8 space-y-4">
              {info.map((it) => {
                const Icon = it.icon;
                return (
                  <li key={it.label} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-accent">
                      <Icon size={16} />
                    </span>
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {it.label}
                      </div>
                      <div className="text-sm">{it.value}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-strong grid gap-4 rounded-3xl p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                error={errors.name?.message}
                {...register("name", { required: "Name is required" })}
              />
              <Field
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                })}
              />
            </div>
            <Field
              label="Subject"
              error={errors.subject?.message}
              {...register("subject", { required: "Subject is required" })}
            />
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                rows={5}
                {...register("message", { required: "Message is required" })}
                className="w-full resize-none rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-brand/50 transition-shadow focus:ring-2"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || sent}
              whileTap={{ scale: 0.97 }}
              className="mt-2 inline-flex items-center justify-center gap-2 self-start overflow-hidden rounded-full bg-gradient-to-r from-brand-secondary via-brand to-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(108,99,255,0.7)] transition-all disabled:opacity-70"
            >
              {sent ? (
                <>
                  <Check size={16} /> Message sent
                </>
              ) : isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send message <Send size={14} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const Field = ({
  label,
  error,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) => (
  <div>
    <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </label>
    <input
      type={type}
      {...rest}
      className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-brand/50 transition-shadow focus:ring-2"
    />
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);