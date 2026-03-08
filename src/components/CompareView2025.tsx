import { motion } from "framer-motion";
import { compareItems } from "@/data/sopData";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function CompareView2025() {
  return (
    <section id="pembaruan-2025" className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="section-label mb-3">
            <RefreshCw className="w-3.5 h-3.5" /> Pembaruan 2025
          </div>
          <h2 className="text-2xl font-bold">Perbandingan SOP Penggalangan Dana</h2>
          <p className="text-muted-foreground mt-1">Apa yang tetap, berubah, dan ditambahkan di SOP 2025</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="badge-new">Baru</span>
          <span className="badge-revised">Direvisi</span>
          <span className="badge-same">Tetap</span>
        </div>

        {/* Compare cards */}
        <div className="space-y-3">
          {compareItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                {/* 2024 */}
                <div className="p-4 border-b md:border-b-0 md:border-r border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-wider font-bold">SOP 2024</span>
                    <span className="text-[0.6rem] px-2 py-0.5 rounded bg-secondary text-muted-foreground font-mono">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.item}</h4>
                  <p className="text-xs text-muted-foreground">{item.status2024}</p>
                </div>

                {/* 2025 */}
                <div className={`p-4 ${item.badge === "new" ? "bg-[hsl(var(--update-orange-light))]" : item.badge === "revised" ? "bg-amber-light" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[0.6rem] uppercase tracking-wider font-bold" style={{
                      color: item.badge === "new" ? "hsl(var(--update-orange))" : item.badge === "revised" ? "hsl(var(--amber))" : "hsl(var(--teal))"
                    }}>
                      Pembaruan 2025
                    </span>
                    <span className={item.badge === "new" ? "badge-new" : item.badge === "revised" ? "badge-revised" : "badge-same"}>
                      {item.badge === "new" ? "Baru" : item.badge === "revised" ? "Direvisi" : "Tetap"}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.item}</h4>
                  <p className="text-xs text-muted-foreground">{item.status2025}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="bg-[hsl(var(--update-orange-light))] rounded-xl p-5 border border-[hsl(var(--update-orange))/0.2]">
            <div className="text-3xl font-bold" style={{ color: "hsl(var(--update-orange))" }}>4</div>
            <div className="text-sm font-semibold mt-1">Ketentuan Baru</div>
            <div className="text-xs text-muted-foreground mt-1">Proyeksi 3 tahun, pleno donasi swasta, instrumen verifikasi, definisi organ yayasan</div>
          </div>
          <div className="bg-amber-light rounded-xl p-5 border border-amber-mid">
            <div className="text-3xl font-bold text-amber">3</div>
            <div className="text-sm font-semibold mt-1">Ketentuan Direvisi</div>
            <div className="text-xs text-muted-foreground mt-1">Spesifikasi rencana, klarifikasi proposal, perluasan tujuan</div>
          </div>
          <div className="bg-teal-light rounded-xl p-5 border border-teal-mid">
            <div className="text-3xl font-bold text-teal">1</div>
            <div className="text-sm font-semibold mt-1">Ketentuan Tetap</div>
            <div className="text-xs text-muted-foreground mt-1">Fee konsultan kompetisi 1%–3%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
