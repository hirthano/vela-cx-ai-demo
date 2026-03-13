import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Users, Settings, Sparkles, Send, Loader2 } from "lucide-react";

const sampleResponses: Record<string, string> = {
  "Do you ship internationally?":
    "Yes! We offer international shipping to most countries. Delivery times vary by region — typically 7-14 business days for international orders. Shipping costs are calculated at checkout based on your location and order weight. Free shipping is available for orders over $100 within select regions.",
  "What is your return policy?":
    "We offer a 30-day return policy for unused items in original packaging. To initiate a return, simply contact our support team with your order number. Refunds are processed within 5-7 business days after we receive the returned item. Please note that sale items are final sale.",
  "How long does delivery take?":
    "Delivery times depend on your location:\n\n• Domestic orders: 3-5 business days\n• Regional (Southeast Asia): 5-10 business days\n• International: 7-14 business days\n\nExpedited shipping options are available at checkout for faster delivery.",
};

const prompts = [
  "Do you ship internationally?",
  "What is your return policy?",
  "How long does delivery take?",
];

const valueProps = [
  {
    icon: Bot,
    title: "AI handles repetitive questions",
    description: "Instantly resolve common inquiries like order status, shipping, and returns.",
  },
  {
    icon: Users,
    title: "AI + human collaboration for complex cases",
    description: "Smart escalation routes nuanced issues to your team with full context.",
  },
  {
    icon: Settings,
    title: "Workflow and escalation setup after deployment",
    description: "Custom workflows tailored to your business processes and support needs.",
  },
];

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const msg = (text || inputValue).trim();
    if (!msg || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInputValue("");
    setIsTyping(true);

    const response =
      sampleResponses[msg] ||
      "Thanks for your question! In a live deployment, I'd pull answers from your knowledge base and support systems to provide accurate, real-time responses.";

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Header */}
      <section className="px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            VelaCX AI Customer Operations Assistant
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            We scraped your public website/store to create a basic AI assistant for your business. Try asking questions like a real customer.
          </p>
        </motion.div>
      </section>

      {/* Section 2: Value Props */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="mb-8 text-center text-lg font-semibold text-foreground">
            How VelaCX Helps Your Customer Operations
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {valueProps.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This demo uses publicly available information from your website/store. With full deployment, VelaCX can integrate deeper with your knowledge base and support systems.
          </p>
        </motion.div>
      </section>

      {/* Section 3: Chat Demo */}
      <section className="mx-auto max-w-2xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-4 text-center text-lg font-semibold text-foreground">
            Try Your AI Customer Assistant
          </h2>

          {/* Prompt chips */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat card */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Chat header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">VelaCX Assistant</span>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto px-4 py-4 sm:h-80">
              {messages.length === 0 && !isTyping && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-center text-sm text-muted-foreground">
                    Click a prompt above or type your own question.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.role === "user" ? "flex justify-end" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="max-w-[80%] rounded-xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-border bg-secondary/50 px-3.5 py-2.5 text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span className="text-xs">Typing…</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border px-3 py-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:border-primary/40">
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
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
