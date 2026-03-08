import { useState } from "react";
import { motion } from "framer-motion";
import { sopModules } from "@/data/sopData";
import WorkflowStepper from "./WorkflowStepper";
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react";

interface AllSOPSectionProps {
  viewMode: "card" | "diagram";
}

export default function AllSOPSection({ viewMode }: AllSOPSectionProps) {
  const [expandedSOP, setExpandedSOP] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActor, setSelectedActor] = useState<string>("");
  const [selectedProcess, setSelectedProcess] = useState<string>("");

  const allActors = [...new Set(sopModules.flatMap((s) => s.keyActors))].sort();
  const processTypes = ["Pengajuan", "Verifikasi", "Persetujuan", "Pelaksanaan", "Pelaporan", "Arsip"];

  const filteredModules = sopModules.filter((sop) => {
    const matchesSearch = searchTerm === "" ||
      sop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sop.workflows.some(wf => wf.steps.some(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    const matchesActor = selectedActor === "" || sop.keyActors.some(a => a.includes(selectedActor));
    return matchesSearch && matchesActor;
  });

  return (
    <section id="semua-sop" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="section-label mb-3">Detail Workflow</div>
          <h2 className="text-2xl font-bold">Semua SOP</h2>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari proses, aktor, atau istilah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
            <select
              value={selectedActor}
              onChange={(e) => setSelectedActor(e.target.value)}
              className="px-3 py-2 text-sm bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary/30 outline-none"
            >
              <option value="">Semua Aktor</option>
              {allActors.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="px-3 py-2 text-sm bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary/30 outline-none"
            >
              <option value="">Semua Proses</option>
              {processTypes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* SOP Accordions */}
        <div className="space-y-3">
          {filteredModules.map((sop) => (
            <motion.div
              key={sop.id}
              layout
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedSOP(expandedSOP === sop.id ? null : sop.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sop.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-sm">{sop.name}</h3>
                    <p className="text-xs text-muted-foreground">{sop.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block font-mono text-[0.65rem] text-muted-foreground">{sop.year}</span>
                  {expandedSOP === sop.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedSOP === sop.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 pb-5 border-t border-border pt-4"
                >
                  {/* Overview */}
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 mb-5">
                    <p className="text-sm">{sop.objective}</p>
                  </div>

                  {/* Key info */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="section-label mb-2">Aktor Kunci</div>
                      <div className="flex flex-wrap gap-1">
                        {sop.keyActors.map((a) => (
                          <span key={a} className="workflow-node node-action text-[0.65rem] py-0.5 px-2">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="section-label mb-2">Dokumen Utama</div>
                      <div className="flex flex-wrap gap-1">
                        {sop.documents.slice(0, 5).map((d) => (
                          <span key={d} className="workflow-node node-doc text-[0.65rem] py-0.5 px-2">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Workflows */}
                  {sop.workflows.map((wf, i) => (
                    <WorkflowStepper
                      key={i}
                      title={wf.title}
                      description={wf.description}
                      steps={wf.steps}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
