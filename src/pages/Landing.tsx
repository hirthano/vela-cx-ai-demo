import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, MessageSquare, Zap, Globe } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Support",
    desc: "Handle repetitive customer questions automatically — 24/7, in any language.",
  },
  {
    icon: Zap,
    title: "Seamless Handoff",
    desc: "AI handles routine queries while your team focuses on complex issues.",
  },
  {
    icon: Globe,
    title: "Works With Your Store",
    desc: "Connect your TikTok Shop, Lazada, Shopee store, or any public website.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", storeUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.storeUrl.trim()) return;

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success("We'll send you an email shortly to get started!");
      setTimeout(() => navigate("/demo"), 1200);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <span
          className="text-lg font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          VelaCX
        </span>
        <a
          href="https://reorc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-foreground bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-all hover:bg-transparent hover:text-foreground"
        >
          reorc.com
        </a>
      </nav>

      <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xl text-center"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your AI customer assistant,
            <br />
            built from your store.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            VelaCX creates an AI assistant trained on your public website or
            e-commerce store — so your customers get instant, accurate answers.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-12 grid w-full max-w-2xl gap-4 sm:grid-cols-3"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <f.icon className="mb-3 h-5 w-5 text-accent-foreground" />
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-xl border border-border bg-card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-chat)" }}
          >
            <h2 className="text-lg font-semibold text-foreground">
              Try it with your store
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              We'll build a demo AI assistant from your website and email you
              the link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Store / Website URL
                </label>
                <input
                  name="storeUrl"
                  type="url"
                  required
                  value={form.storeUrl}
                  onChange={handleChange}
                  placeholder="https://shopee.com/your-store"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                />
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  TikTok Shop, Lazada, Shopee, or any public website
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Get my AI demo"}
                {!submitting && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
            After submitting, our team will build your custom AI assistant and
            send you a link to test it — typically within 24 hours.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
