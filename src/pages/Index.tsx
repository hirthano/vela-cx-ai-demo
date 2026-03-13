import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2, ExternalLink } from "lucide-react";

const sampleResponses: Record<string, string> = {
  "Do you ship internationally?":
    "Yes! We offer international shipping to most countries. Delivery times vary by region — typically 7-14 business days. Free shipping is available for orders over $100 within select regions.",
  "What is your return policy?":
    "We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
  "How long does delivery take?":
    "Domestic orders: 3-5 business days\nRegional (Southeast Asia): 5-10 business days\nInternational: 7-14 business days\n\nExpedited shipping options are available at checkout.",
};

const prompts = [
  "Do you ship internationally?",
  "What is your return policy?",
  "How long does delivery take?",
];

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
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
      <nav className="flex items-center justify-between border-b border-border/60 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            VelaCX
          </span>
        </div>
        <a
          href="https://reorc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          reorc.com
          <ExternalLink className="h-3 w-3" />
        </a>
      </nav>

      {/* Main content - fills remaining space */}
      <div className="flex min-h-0 flex-1 flex-col items-center px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-center"
        >
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Try Your AI Customer Assistant
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            Built from your public website — ask questions like a real customer would.
          </p>
        </motion.div>

        {/* Prompt chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 flex flex-wrap justify-center gap-2"
        >
          {prompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:shadow-sm"
            >
              {p}
            </button>
          ))}
        </motion.div>

        {/* Chat card - flexes to fill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex w-full max-w-2xl min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          {/* Chat header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="h-2.5 w-2.5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-foreground">VelaCX Assistant</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "hsl(160, 84%, 39%)" }} />
              Online
            </span>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 && !isTyping && (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-xs text-muted-foreground">
                  Click a prompt above or type your own question.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2.5 ${msg.role === "user" ? "flex justify-end" : ""}`}>
                {msg.role === "user" ? (
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-secondary/40 px-3.5 py-2.5 text-sm leading-relaxed text-foreground whitespace-pre-line">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                <span className="text-xs">Typing…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-colors focus-within:border-primary/40">
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
                className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Demo built from publicly available info · Full deployment integrates with your knowledge base & support systems
        </p>
      </div>
    </div>
  );
};

export default Index;
