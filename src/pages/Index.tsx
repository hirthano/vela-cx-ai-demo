import { useState } from "react";
import VelaNavbar from "@/components/VelaNavbar";
import VelaHero from "@/components/VelaHero";
import VelaPrompts from "@/components/VelaPrompts";
import VelaChatCard from "@/components/VelaChatCard";
import VelaCapabilities from "@/components/VelaCapabilities";
import VelaChannels from "@/components/VelaChannels";
import VelaCTA from "@/components/VelaCTA";

const Index = () => {
  const [inputValue, setInputValue] = useState("");

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <VelaNavbar />
      <main className="px-4 sm:px-6">
        <VelaHero />
        <VelaPrompts onSelect={handlePromptSelect} />
        <VelaChatCard inputValue={inputValue} setInputValue={setInputValue} />
        <VelaCapabilities />
        <VelaChannels />
        <VelaCTA />
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 VelaCX. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
