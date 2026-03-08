import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Users, Target, ChevronDown } from "lucide-react";
import { sopModules } from "@/data/sopData";
import WorkflowStepper from "./WorkflowStepper";
import { useState } from "react";

interface SOPDetailPanelProps {
  sopId: string | null;
  onClose: () => void;
}

export default function SOPDetailPanel({ sopId, onClose }: SOPDetailPanelProps) {
  const sop = sopModules.find((s) => s.id === sopId);
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  if (!sop) return null;

  return (
    <AnimatePresence>
      {sopId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-card border-l border-border overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sop.icon}</span>
                <div>
                  <h3 className="font-bold text-sm">{sop.name}</h3>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">{sop.year}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 lg:p-6">
              {/* Overview */}
              <div className="bg-primary/5 border border-primary/15 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[0.6rem] text-primary uppercase tracking-wider font-bold">Tujuan</span>
                    <p className="text-sm text-foreground mt-1">{sop.objective}</p>
                  </div>
                </div>
              </div>

              {/* Actors */}
              <div className="mb-6">
                <div className="section-label mb-3">
                  <Users className="w-3.5 h-3.5" /> Aktor yang Terlibat
                </div>
                <div className="flex flex-wrap gap-2">
                  {sop.keyActors.map((actor) => (
                    <span key={actor} className="workflow-node node-action text-xs">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <div className="section-label mb-3">
                  <FileText className="w-3.5 h-3.5" /> Dokumen Utama
                </div>
                <div className="flex flex-wrap gap-2">
                  {sop.documents.map((doc) => (
                    <span key={doc} className="workflow-node node-doc text-xs">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workflow tabs */}
              {sop.workflows.length > 1 && (
                <div className="flex gap-1 mb-4 overflow-x-auto">
                  {sop.workflows.map((wf, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveWorkflow(i)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                        activeWorkflow === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {wf.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Active workflow */}
              <WorkflowStepper
                title={sop.workflows[activeWorkflow].title}
                description={sop.workflows[activeWorkflow].description}
                steps={sop.workflows[activeWorkflow].steps}
              />

              {/* Categories */}
              <div className="mt-6">
                <div className="section-label mb-3">Kategori Proses</div>
                <div className="flex flex-wrap gap-2">
                  {sop.categories.map((cat) => (
                    <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
