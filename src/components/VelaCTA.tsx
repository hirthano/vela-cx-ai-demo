import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VelaCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl py-16 text-center"
    >
      <h2 className="mb-3 text-2xl font-bold text-foreground">
        Ready to upgrade your customer operations?
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        See how VelaCX can transform your support team's efficiency.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg"
        style={{ background: "var(--gradient-cta)" }}
      >
        Book a CX Consultation
        <ArrowRight className="h-4 w-4" />
      </a>
    </motion.section>
  );
};

export default VelaCTA;
