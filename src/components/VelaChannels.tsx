import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Globe, Phone } from "lucide-react";

const channels = [
  { name: "Shopee", icon: ShoppingBag },
  { name: "Lazada", icon: ShoppingBag },
  { name: "TikTok Shop", icon: ShoppingBag },
  { name: "WhatsApp", icon: Phone },
  { name: "Website Chat", icon: Globe },
  { name: "Messenger", icon: MessageCircle },
];

const VelaChannels = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl py-8 text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Supported Channels</p>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {channels.map((ch, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ch.icon className="h-3 w-3" />
            {ch.name}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default VelaChannels;
