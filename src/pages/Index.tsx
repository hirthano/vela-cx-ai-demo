import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

const sampleResponses: Record<string, string> = {
  "Do you ship internationally?":
    "Yes! We offer international shipping to most countries. Delivery times vary by region — typically 7-14 business days. Free shipping is available for orders over $100 within select regions.",
  "What is your return policy?":
    "We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
  "How long does delivery take?":
    "Domestic orders: 3-5 business days\nRegional (Southeast Asia): 5-10 business days\nInternational: 7-14 business days\n\nExpedited shipping options are available at checkout.",
};

const benefits = [
  "AI handles repetitive questions",
  "AI + human collaboration",
  "Custom workflows & escalation",
];

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = (text || inputValue).trim();
    if (!msg || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInputValue("");
    setIsTyping(true);
    const response =
      sampleResponses[msg] ||
      "Great question! In a full deployment, I'd pull answers directly from your knowledge base and support systems to give accurate, real-time responses.";
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 800 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span
            className="text-lg font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            VelaCX
          </span>
        </div>
        <a
          href="https://reorc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-foreground bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-all hover:bg-transparent hover:text-foreground"
        >
          reorc.com
        </a>
      </nav>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 flex-col items-center px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Try your AI customer assistant
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Built from your public website — ask questions like a real customer would.
          </p>
        </motion.div>

        {/* Key benefits */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 flex flex-wrap justify-center gap-4"
        >
          {benefits.map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-accent-foreground" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Chat card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex w-full max-w-2xl min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-chat)" }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
              <span className="text-xs font-semibold text-background">V</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              VelaCX Assistant
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {messages.length === 0 && !isTyping && (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <span className="text-base font-semibold text-foreground">V</span>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Ask a question to get started.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm text-background">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground whitespace-pre-line">
                    {msg.content}
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: d * 0.15,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs">Thinking…</span>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-all focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-foreground/10">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background transition-all disabled:opacity-20"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="mt-4 max-w-lg text-center text-[11px] leading-relaxed text-muted-foreground">
          This demo is based on limited public data only. After onboarding, our team
          will optimise your AI — building custom workflows, deeper knowledge bases,
          and fine-tuned responses for significantly better results.
        </p>
      </div>
    </div>
  );
};

export default Index;