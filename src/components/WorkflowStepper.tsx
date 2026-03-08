import { motion } from "framer-motion";
import type { WorkflowStep } from "@/data/sopData";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  title: string;
  description: string;
}

const nodeColors: Record<string, string> = {
  action: "node-action",
  doc: "node-doc",
  decision: "node-decision",
  approve: "node-approve",
  alert: "node-alert",
  end: "node-end",
};

export default function WorkflowStepper({ steps, title, description }: WorkflowStepperProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <div className="mb-8">
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex"
          >
            {/* Step number */}
            <div className="flex flex-col items-center mr-0">
              <div className={`w-10 min-h-[2.5rem] flex items-center justify-center font-mono text-xs font-bold border border-border bg-secondary flex-shrink-0 ${
                i === 0 ? "rounded-tl-md" : ""
              } ${i === steps.length - 1 ? "rounded-bl-md" : ""}`}>
                <span className="text-primary">{step.number}</span>
              </div>
            </div>

            {/* Step content */}
            <div
              className={`flex-1 border border-l-0 border-border p-3 cursor-pointer hover:bg-secondary/50 transition-colors ${
                i === 0 ? "rounded-tr-md" : ""
              } ${i === steps.length - 1 ? "rounded-br-md" : ""}`}
              onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{step.title}</span>
                    {step.isDecision && <span className="badge-revised">Keputusan</span>}
                    {step.isApproval && <span className="badge-same">Approval</span>}
                  </div>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span className={`workflow-node text-[0.65rem] py-0.5 px-2 ${nodeColors[step.nodeType || "action"]}`}>
                      {step.actor}
                    </span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-1">
                  {expandedStep === step.number ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {expandedStep === step.number && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 pt-2 border-t border-border"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  {step.input && (
                    <div className="mt-2">
                      <span className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-wider">Input: </span>
                      <span className="text-xs text-foreground">{step.input}</span>
                    </div>
                  )}
                  {step.output && (
                    <div className="mt-1">
                      <span className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-wider">Output: </span>
                      <span className="text-xs text-foreground">{step.output}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
