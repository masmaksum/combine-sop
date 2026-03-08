import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";
import SOPNetworkDiagram from "./SOPNetworkDiagram";
type ViewType = "per-sop" | "antar-sop" | "per-aktor";

const connections = [
  { from: "Penggalangan Dana", to: "Keuangan", label: "Dana hibah/donasi masuk ke pencatatan keuangan", color: "text-primary" },
  { from: "Penggalangan Dana", to: "SDM", label: "Rekrutmen staf proyek dari hibah baru", color: "text-primary" },
  { from: "SDM", to: "Keuangan", label: "Payroll, reimbursement perjalanan, kompensasi", color: "text-teal" },
  { from: "PPKS", to: "SDM", label: "Sanksi pekerja, PHK karena kasus PPKS", color: "text-coral" },
  { from: "Keuangan", to: "Penggalangan Dana", label: "Laporan keuangan untuk donor & proposal baru", color: "text-amber" },
  { from: "SDM", to: "PPKS", label: "Background check rekrutmen, Pakta Integritas", color: "text-teal" },
];

const actorFlows = [
  { actor: "Direktur", flows: ["Persetujuan RAB (Keuangan)", "Pengangkatan pekerja (SDM)", "Persetujuan proposal (PD)", "Approver internet banking"] },
  { actor: "Manajer Keuangan", flows: ["Verifikasi PAR", "Negosiasi upah (SDM)", "Proyeksi 3 tahun (PD)", "Pencatatan dana hibah"] },
  { actor: "Pelaksana SDM", flows: ["Rekrutmen (SDM)", "Background check PPKS", "Induksi pekerja baru (SDM)"] },
  { actor: "Focal Point", flows: ["Terima aduan PPKS", "Eskalasi ke Dewan", "Koordinasi pencegahan"] },
];

export default function IntegratedWorkflow() {
  const [viewType, setViewType] = useState<ViewType>("antar-sop");

  return (
    <section id="terintegrasi" className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="section-label mb-3">Workflow Terintegrasi</div>
          <h2 className="text-2xl font-bold">Hubungan Antar-SOP</h2>
          <p className="text-muted-foreground mt-1">Visualisasi keterhubungan proses di seluruh SOP CRI</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-0.5 w-fit">
          {[
            { value: "antar-sop" as const, label: "Hubungan Antar-SOP" },
            { value: "per-aktor" as const, label: "Per Aktor" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setViewType(opt.value)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
                viewType === opt.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {viewType === "antar-sop" && (
          <div className="space-y-3">
            {connections.map((conn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`font-semibold text-sm ${conn.color} min-w-[140px]`}>
                    {conn.from}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-sm min-w-[140px]">
                    {conn.to}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">{conn.label}</span>
              </motion.div>
            ))}
          </div>
        )}

        {viewType === "per-aktor" && (
          <div className="grid md:grid-cols-2 gap-4">
            {actorFlows.map((af, i) => (
              <motion.div
                key={af.actor}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <h4 className="font-bold text-sm">{af.actor}</h4>
                </div>
                <ul className="space-y-1.5">
                  {af.flows.map((flow) => (
                    <li key={flow} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">›</span>
                      {flow}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Network Diagram */}
        <div className="mt-8">
          <div className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-widest mb-4">
            Peta Relasi Visual — Drag & zoom untuk eksplorasi
          </div>
          <SOPNetworkDiagram />
          <div className="text-center text-xs text-muted-foreground mt-3">
            Drag node untuk mengatur posisi • Scroll untuk zoom • Semua SOP saling terhubung melalui proses dan aktor yang sama
          </div>
        </div>
      </div>
    </section>
  );
}
