import { motion } from "framer-motion";
import { MessageSquareText, BarChart3, Target, BookOpen, UserCheck } from "lucide-react";

const capabilities = [
  { icon: MessageSquareText, label: "AI Customer Replies", color: "var(--capability-1)" },
  { icon: BarChart3, label: "Conversation Insights", color: "var(--capability-2)" },
  { icon: Target, label: "Intent Detection", color: "var(--capability-3)" },
  { icon: BookOpen, label: "Knowledge Base Answers", color: "var(--capability-4)" },
  { icon: UserCheck, label: "Human Agent Escalation", color: "var(--capability-5)" },
];

const VelaCapabilities = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl pt-16 pb-8 text-center"
    >
      <h2 className="mb-2 text-lg font-bold text-foreground">What VelaCX can help with</h2>
      <p className="mb-8 text-sm text-muted-foreground">Comprehensive AI-powered customer operations</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
              style={{ backgroundColor: `hsl(${cap.color} / 0.1)` }}
            >
              <cap.icon className="h-5 w-5" style={{ color: `hsl(${cap.color})` }} />
            </div>
            <span className="text-xs font-medium text-foreground">{cap.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default VelaCapabilities;
