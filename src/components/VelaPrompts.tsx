import { motion } from "framer-motion";
import { MessageSquare, Zap, Users, TrendingDown } from "lucide-react";

const prompts = [
  { text: "Show an example of AI customer reply", icon: MessageSquare },
  { text: "What customer inquiries can AI automate?", icon: Zap },
  { text: "How does AI + human collaboration work?", icon: Users },
  { text: "How can VelaCX reduce support workload?", icon: TrendingDown },
];

interface VelaPromptsProps {
  onSelect: (prompt: string) => void;
}

const VelaPrompts = ({ onSelect }: VelaPromptsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2.5 pb-8"
    >
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(p.text)}
          className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
        >
          <p.icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
          {p.text}
        </button>
      ))}
    </motion.div>
  );
};

export default VelaPrompts;
