import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/data/sopData";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="section-label mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Panduan Pengguna
          </div>
          <h2 className="text-2xl font-bold">Pertanyaan Umum</h2>
          <p className="text-muted-foreground mt-1">Jawaban cepat tentang navigasi dan penggunaan SOP</p>
        </div>

        <div className="max-w-3xl space-y-2">
          {faqItems.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-sm pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openFAQ === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
