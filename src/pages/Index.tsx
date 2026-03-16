import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2, ArrowUpRight } from "lucide-react";

const sampleResponses: Record<string, string> = {
  "Do you ship internationally?":
  "Yes! We offer international shipping to most countries. Delivery times vary by region — typically 7-14 business days. Free shipping is available for orders over $100 within select regions.",
  "What is your return policy?":
  "We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
  "How long does delivery take?":
  "Domestic orders: 3-5 business days\nRegional (Southeast Asia): 5-10 business days\nInternational: 7-14 business days\n\nExpedited shipping options are available at checkout."
};

const prompts = [
"Do you ship internationally?",
"What is your return policy?",
"How long does delivery take?"];


const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{role: "user" | "assistant";content: string;}[]>([]);
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
      <nav className="relative z-10 flex items-center justify-between px-6 py-3 backdrop-blur-md" style={{ background: "linear-gradient(135deg, hsl(230 80% 56%), hsl(260 70% 52%))" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight text-primary-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            VelaCX
          </span>
        </div>
        <a
          href="https://reorc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium text-primary-foreground/90 backdrop-blur-sm transition-all hover:bg-primary-foreground/20 hover:text-primary-foreground">
          
          reorc.com
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </nav>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 flex-col items-center px-4 py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 text-center">
          
          <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            Try Your AI Customer Assistant
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            Built from your public website - ask questions like a real customer would.
          </p>
        </motion.div>

        {/* Key benefits */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 flex flex-wrap justify-center gap-3">
          
          {[
          { icon: "🤖", text: "AI handles repetitive questions" },
          { icon: "🤝", text: "AI + human collaboration" },
          { icon: "⚙️", text: "Custom workflows & escalation" }].
          map((b, i) =>
          <div
            key={i}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            
              <span>{b.icon}</span>
              {b.text}
            </div>
          )}
        </motion.div>

        {/* Chat card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex w-full max-w-2xl min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg"
          style={{ boxShadow: "var(--shadow-chat)" }}>
          
          {/* Chat header */}
          <div className="flex items-center gap-2.5 border-b border-border/60 px-4 py-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: "var(--gradient-cta)" }}>
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">VelaCX Assistant</span>
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "hsl(160 84% 39%)" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(160 84% 39%)" }} />
              </span>
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 && !isTyping &&
            <div className="flex h-full flex-col items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent">
                  <Sparkles className="h-4 w-4 text-accent-foreground" />
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Ask a question or tap a prompt above to get started.
                </p>
              </div>
            }
            {messages.map((msg, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`mb-3 ${msg.role === "user" ? "flex justify-end" : ""}`}>
              
                {msg.role === "user" ?
              <div className="max-w-[75%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-primary-foreground" style={{ background: "var(--gradient-cta)" }}>
                    {msg.content}
                  </div> :

              <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-border/50 bg-accent/30 px-4 py-3 text-sm leading-relaxed text-foreground whitespace-pre-line">
                    {msg.content}
                  </div>
              }
              </motion.div>
            )}
            {isTyping &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-muted-foreground">
              
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) =>
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-primary/50"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} />

                )}
                </div>
                <span className="text-xs">Thinking…</span>
              </motion.div>
            }
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border/60 bg-background/50 px-3 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-sm transition-all focus-within:border-primary/40 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/10">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
              
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground transition-all disabled:opacity-30"
                style={{ background: !inputValue.trim() || isTyping ? "hsl(var(--primary) / 0.3)" : "var(--gradient-cta)" }}>
                
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="mt-3 max-w-lg text-center text-[10px] leading-relaxed text-muted-foreground">
          ⚡ This demo is based on limited public data only. After onboarding, our team will optimise your AI - building custom workflows, deeper knowledge bases, and fine-tuned responses for significantly better results.
        </p>
      </div>
    </div>);

};

export default Index;