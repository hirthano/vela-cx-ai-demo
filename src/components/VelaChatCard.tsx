import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";

const sampleResponses: Record<string, string> = {
  "Show an example of AI customer reply":
    "**Example AI Reply:**\n\nCustomer: *\"Where is my order? I placed it 3 days ago.\"*\n\nVelaCX AI: *\"Hi! I've checked your order #12847 — it shipped yesterday and is expected to arrive by Friday, March 15. Here's your tracking link: [track.example.com/12847]. Let me know if you need anything else!\"*\n\nThis response was generated in **0.8 seconds**, pulling real-time data from your order management system.",
  "What customer inquiries can AI automate?":
    "VelaCX can automate a wide range of repetitive inquiries:\n\n• **Order status & tracking** — 35% of all tickets\n• **Return & refund requests** — guided workflows\n• **Product information** — specs, availability, pricing\n• **Shipping policies** — delivery times, costs\n• **Account issues** — password resets, profile updates\n\nOn average, our AI resolves **68% of inquiries** without human intervention, reducing first-response time from hours to seconds.",
  "How does AI + human collaboration work?":
    "VelaCX uses an intelligent **triage system**:\n\n1. **AI First** — Every inquiry is analyzed by AI for intent and sentiment\n2. **Auto-resolve** — Simple, repetitive queries are handled instantly\n3. **Smart Escalation** — Complex, emotional, or high-value cases are routed to human agents with full context\n4. **Agent Assist** — Even during human conversations, AI suggests responses and surfaces relevant knowledge\n\nHuman agents focus on what matters most, while AI handles the volume.",
  "How can VelaCX reduce support workload?":
    "Businesses using VelaCX typically see:\n\n• **60-70% reduction** in ticket volume handled by humans\n• **85% faster** first-response times\n• **40% improvement** in customer satisfaction scores\n• **3x more efficient** agent productivity\n\nBy automating repetitive inquiries and providing agents with AI-powered suggestions, your team can handle growing customer demand without scaling headcount proportionally.",
};

interface VelaChatCardProps {
  inputValue: string;
  setInputValue: (v: string) => void;
}

const VelaChatCard = ({ inputValue, setInputValue }: VelaChatCardProps) => {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInputValue("");
    setIsTyping(true);

    const response =
      sampleResponses[text] ||
      "Thanks for your question! VelaCX can help automate customer operations across multiple channels. In a live environment, I'd connect to your knowledge base and order systems to provide real-time answers. Would you like to explore a specific capability?";

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>');
      
      if (processed.startsWith("• ")) {
        processed = `<span class="ml-1">•</span> ${processed.slice(2)}`;
        return <div key={i} className="flex gap-1 py-0.5" dangerouslySetInnerHTML={{ __html: processed }} />;
      }
      return <p key={i} className={line === "" ? "h-2" : "py-0.5"} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-chat)" }}>
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">VelaCX Assistant</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "hsl(160, 84%, 39%)" }} />
            Online
          </span>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto px-5 py-4 sm:h-96">
          {messages.length === 0 && !isTyping && (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-sm text-muted-foreground">
                Try a suggested prompt above, or type your own question.
              </p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[90%]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                        <Sparkles className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">VelaCX</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-md border border-border bg-secondary/50 px-4 py-3 text-sm leading-relaxed text-foreground">
                      {renderMarkdown(msg.content)}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="h-2.5 w-2.5 text-primary" />
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-2">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                <span className="text-xs">Thinking…</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about customer support automation, workflows, or AI replies..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VelaChatCard;
