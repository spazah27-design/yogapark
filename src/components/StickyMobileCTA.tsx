import { useEffect, useState } from "react";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/90 backdrop-blur-md border-t border-border md:hidden">
      <a
        href="#final-cta"
        className="block w-full py-3 rounded-lg bg-primary text-primary-foreground text-center font-medium transition hover:opacity-90"
      >
        Записаться на пробное
      </a>
    </div>
  );
};

export default StickyMobileCTA;
