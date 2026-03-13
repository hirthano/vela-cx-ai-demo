import { motion } from "framer-motion";

const VelaHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="pt-16 pb-4 text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        AI-Powered Customer Operations
      </div>
      <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
        VelaCX AI Customer Operations Assistant
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Ask about customer support automation, workflows, or AI-human collaboration.
      </p>
    </motion.section>
  );
};

export default VelaHero;
