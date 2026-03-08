import { motion } from "framer-motion";
import { ArrowDown, GitBranch } from "lucide-react";
import { sopModules } from "@/data/sopData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-6">
              <GitBranch className="w-3.5 h-3.5" />
              Peta Workflow Internal
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
              Workflow SOP
              <br />
              <span className="text-primary">Combine Resource Institution</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Peta interaktif alur kerja, peran, dokumen, dan titik keputusan
              dalam tata kelola CRI
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#semua-sop"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Jelajahi Workflow
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#terintegrasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg font-semibold text-sm hover:bg-secondary transition-colors"
              >
                Lihat SOP Terintegrasi
              </a>
            </div>
          </motion.div>

          {/* Abstract flow diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative bg-card rounded-2xl border border-border p-8 shadow-sm">
              <div className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-widest mb-6">
                Alur Kerja Terintegrasi
              </div>

              {/* Mini flow diagram */}
              <div className="space-y-3">
                {[
                  { label: "Penggalangan Dana", color: "bg-primary/10 text-primary border-primary/20" },
                  { label: "Keuangan", color: "bg-amber-light text-amber border-amber-mid" },
                  { label: "SDM", color: "bg-teal-light text-teal border-teal-mid" },
                  { label: "PPKS", color: "bg-coral-light text-coral border-coral-mid" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${item.color} min-w-[160px]`}>
                      {item.label}
                    </div>
                    {i < 3 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <div className="w-8 h-px bg-border" />
                        <span className="text-[0.6rem] font-mono">terkait</span>
                        <div className="w-8 h-px bg-border" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-[0.7rem] text-muted-foreground">SOP Aktif</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-[0.7rem] text-muted-foreground">Aktor Kunci</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">40+</div>
                  <div className="text-[0.7rem] text-muted-foreground">Proses</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
