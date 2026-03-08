import { motion } from "framer-motion";
import { sopModules } from "@/data/sopData";
import { ArrowRight, Users, FileText } from "lucide-react";

interface SOPSummaryCardsProps {
  onSelectSOP: (id: string) => void;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: "bg-amber-light", text: "text-amber", border: "border-amber-mid" },
  teal: { bg: "bg-teal-light", text: "text-teal", border: "border-teal-mid" },
  coral: { bg: "bg-coral-light", text: "text-coral", border: "border-coral-mid" },
  emerald: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  "update-orange": { bg: "bg-amber-light", text: "text-amber", border: "border-amber-mid" },
};

export default function SOPSummaryCards({ onSelectSOP }: SOPSummaryCardsProps) {
  return (
    <section id="ringkasan" className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <div className="section-label mb-3">Ringkasan SOP</div>
          <h2 className="text-2xl font-bold">5 Modul Workflow Aktif</h2>
          <p className="text-muted-foreground mt-1">Klik kartu untuk melihat detail workflow masing-masing SOP</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sopModules.map((sop, i) => {
            const colors = colorMap[sop.color] || colorMap.teal;
            return (
              <motion.div
                key={sop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectSOP(sop.id)}
                className="group bg-card rounded-xl border border-border p-5 cursor-pointer sop-card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{sop.icon}</span>
                  <span className={`font-mono text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                    {sop.year}
                  </span>
                </div>

                <h3 className="font-bold text-sm mb-1">{sop.shortName}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {sop.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {sop.processCount} proses
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {sop.keyActors.length} aktor
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {sop.keyActors.slice(0, 3).map((actor) => (
                    <span
                      key={actor}
                      className="text-[0.65rem] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                    >
                      {actor}
                    </span>
                  ))}
                  {sop.keyActors.length > 3 && (
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      +{sop.keyActors.length - 3}
                    </span>
                  )}
                </div>

                <div className={`flex items-center gap-1 text-xs font-semibold ${colors.text} group-hover:gap-2 transition-all`}>
                  Lihat Workflow <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
