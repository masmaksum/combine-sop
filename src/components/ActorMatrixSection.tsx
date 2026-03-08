import { motion } from "framer-motion";
import { actors } from "@/data/sopData";
import { Users } from "lucide-react";

export default function ActorMatrixSection() {
  return (
    <section id="aktor-dokumen" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="section-label mb-3">
            <Users className="w-3.5 h-3.5" /> Aktor & Dokumen
          </div>
          <h2 className="text-2xl font-bold">Matriks Peran</h2>
          <p className="text-muted-foreground mt-1">Siapa melakukan apa, di SOP mana, dengan dokumen apa</p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">Aktor</th>
                  <th className="text-left px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">SOP Terkait</th>
                  <th className="text-left px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">Peran Utama</th>
                  <th className="text-left px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">Dokumen</th>
                  <th className="text-left px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">Titik Keputusan</th>
                </tr>
              </thead>
              <tbody>
                {actors.map((actor, i) => (
                  <motion.tr
                    key={actor.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-sm">{actor.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {actor.sops.map((sop) => (
                          <span key={sop} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {sop}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px]">{actor.mainRole}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {actor.documents.slice(0, 3).map((doc) => (
                          <span key={doc} className="workflow-node node-doc text-[0.6rem] py-0.5 px-1.5">{doc}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px]">
                      {actor.decisionPoints.slice(0, 2).join(" • ")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          {actors.map((actor, i) => (
            <motion.div
              key={actor.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <h4 className="font-bold text-sm mb-2">{actor.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{actor.mainRole}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {actor.sops.map((sop) => (
                  <span key={sop} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {sop}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {actor.documents.slice(0, 3).map((doc) => (
                  <span key={doc} className="workflow-node node-doc text-[0.6rem] py-0.5 px-1.5">{doc}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
