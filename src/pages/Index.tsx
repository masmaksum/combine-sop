import { useState } from "react";
import CRINavbar from "@/components/CRINavbar";
import HeroSection from "@/components/HeroSection";
import SOPSummaryCards from "@/components/SOPSummaryCards";
import SOPDetailPanel from "@/components/SOPDetailPanel";
import AllSOPSection from "@/components/AllSOPSection";
import IntegratedWorkflow from "@/components/IntegratedWorkflow";
import ActorMatrixSection from "@/components/ActorMatrixSection";
import CompareView2025 from "@/components/CompareView2025";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  const [viewMode, setViewMode] = useState<"card" | "diagram">("card");
  const [selectedSOP, setSelectedSOP] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <CRINavbar viewMode={viewMode} onViewModeChange={setViewMode} />
      <HeroSection />
      <SOPSummaryCards onSelectSOP={setSelectedSOP} />
      <AllSOPSection viewMode={viewMode} />
      <IntegratedWorkflow />
      <ActorMatrixSection />
      <CompareView2025 />
      <FAQSection />

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-[0.6rem] font-bold">C</div>
            <span className="font-bold text-sm">Combine Resource Institution</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Peta Workflow SOP Internal — Dokumen ini bersifat internal dan rahasia
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Terakhir diperbarui: Februari 2025
          </p>
        </div>
      </footer>

      {/* Detail panel */}
      <SOPDetailPanel sopId={selectedSOP} onClose={() => setSelectedSOP(null)} />
    </div>
  );
};

export default Index;
