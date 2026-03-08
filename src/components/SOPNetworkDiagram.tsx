import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ── Custom SOP Node ── */
function SOPNode({ data }: NodeProps) {
  return (
    <div
      className="rounded-xl border-2 shadow-md px-5 py-4 min-w-[160px] text-center transition-shadow hover:shadow-lg"
      style={{
        background: data.bg as string,
        borderColor: data.border as string,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-4 !h-2" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-2 !h-4" />
      <div className="text-2xl mb-1">{data.emoji as string}</div>
      <div className="text-sm font-bold" style={{ color: data.textColor as string }}>
        {data.label as string}
      </div>
      <div className="text-[0.6rem] mt-1 opacity-70" style={{ color: data.textColor as string }}>
        {data.subtitle as string}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-4 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-2 !h-4" />
    </div>
  );
}

/* ── Process sub-node ── */
function ProcessNode({ data }: NodeProps) {
  return (
    <div
      className="rounded-lg border px-3 py-2 text-center shadow-sm min-w-[120px]"
      style={{
        background: data.bg as string,
        borderColor: data.border as string,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-3 !h-1" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-1 !h-3" />
      <div className="text-[0.65rem] font-semibold" style={{ color: data.textColor as string }}>
        {data.label as string}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-3 !h-1" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-1 !h-3" />
    </div>
  );
}

const nodeTypes = { sopNode: SOPNode, processNode: ProcessNode };

/* ── Palette ── */
const palette = {
  keuangan: { bg: "#FFF8ED", border: "#D4A024", text: "#8B6914", emoji: "💰" },
  sdm: { bg: "#EDFAF5", border: "#3D9B7A", text: "#1A6B52", emoji: "👥" },
  ppks: { bg: "#FFF0F0", border: "#C44D4D", text: "#963636", emoji: "🛡️" },
  pd2024: { bg: "#EDF4FF", border: "#4A78B4", text: "#2C5A8C", emoji: "📋" },
  pd2025: { bg: "#F5EDFF", border: "#7B4DB8", text: "#5A3090", emoji: "🔄" },
  pengadaan: { bg: "#EDF4FF", border: "#4A6FA5", text: "#2B5280", emoji: "📦" },
  perjalanan: { bg: "#F3EDFF", border: "#6B4DA0", text: "#4A3080", emoji: "✈️" },
};

const initialNodes: Node[] = [
  // Main SOP nodes - repositioned for 7 nodes
  {
    id: "keuangan",
    type: "sopNode",
    position: { x: 420, y: 10 },
    data: { label: "SOP Keuangan", subtitle: "2022 • Pengelolaan dana", emoji: palette.keuangan.emoji, bg: palette.keuangan.bg, border: palette.keuangan.border, textColor: palette.keuangan.text },
  },
  {
    id: "sdm",
    type: "sopNode",
    position: { x: 30, y: 180 },
    data: { label: "SOP SDM", subtitle: "2023 • Manajemen pekerja", emoji: palette.sdm.emoji, bg: palette.sdm.bg, border: palette.sdm.border, textColor: palette.sdm.text },
  },
  {
    id: "ppks",
    type: "sopNode",
    position: { x: 30, y: 420 },
    data: { label: "SOP PPKS", subtitle: "2024 • Pencegahan kekerasan", emoji: palette.ppks.emoji, bg: palette.ppks.bg, border: palette.ppks.border, textColor: palette.ppks.text },
  },
  {
    id: "pd2024",
    type: "sopNode",
    position: { x: 800, y: 180 },
    data: { label: "SOP PD 2024", subtitle: "Penggalangan dana", emoji: palette.pd2024.emoji, bg: palette.pd2024.bg, border: palette.pd2024.border, textColor: palette.pd2024.text },
  },
  {
    id: "pd2025",
    type: "sopNode",
    position: { x: 800, y: 420 },
    data: { label: "SOP PD 2025", subtitle: "Pembaruan fundraising", emoji: palette.pd2025.emoji, bg: palette.pd2025.bg, border: palette.pd2025.border, textColor: palette.pd2025.text },
  },
  {
    id: "pengadaan",
    type: "sopNode",
    position: { x: 200, y: 560 },
    data: { label: "SOP Pengadaan", subtitle: "2021 • Barang & jasa", emoji: palette.pengadaan.emoji, bg: palette.pengadaan.bg, border: palette.pengadaan.border, textColor: palette.pengadaan.text },
  },
  {
    id: "perjalanan",
    type: "sopNode",
    position: { x: 620, y: 560 },
    data: { label: "SOP Perjalanan Dinas", subtitle: "2023 • Travel & PJUM", emoji: palette.perjalanan.emoji, bg: palette.perjalanan.bg, border: palette.perjalanan.border, textColor: palette.perjalanan.text },
  },

  // Process sub-nodes
  {
    id: "payroll",
    type: "processNode",
    position: { x: 220, y: 80 },
    data: { label: "Payroll & Kompensasi", bg: "#F0FDF9", border: "#86CEBC", textColor: "#1A6B52" },
  },
  {
    id: "reimbursement",
    type: "processNode",
    position: { x: 260, y: 160 },
    data: { label: "Reimbursement", bg: "#FFFBEB", border: "#E5C158", textColor: "#8B6914" },
  },
  {
    id: "laporan-donor",
    type: "processNode",
    position: { x: 620, y: 90 },
    data: { label: "Laporan ke Donor", bg: "#EEF2FF", border: "#7B9DD4", textColor: "#2C5A8C" },
  },
  {
    id: "rekrutmen-proyek",
    type: "processNode",
    position: { x: 480, y: 270 },
    data: { label: "Rekrutmen Staf Proyek", bg: "#F0FDF9", border: "#86CEBC", textColor: "#1A6B52" },
  },
  {
    id: "sanksi",
    type: "processNode",
    position: { x: 30, y: 330 },
    data: { label: "Sanksi & PHK", bg: "#FFF0F0", border: "#E08A8A", textColor: "#963636" },
  },
  {
    id: "background-check",
    type: "processNode",
    position: { x: 180, y: 380 },
    data: { label: "Background Check & Pakta", bg: "#F0FDF9", border: "#86CEBC", textColor: "#1A6B52" },
  },
  {
    id: "pencatatan-hibah",
    type: "processNode",
    position: { x: 620, y: 320 },
    data: { label: "Pencatatan Dana Hibah", bg: "#FFFBEB", border: "#E5C158", textColor: "#8B6914" },
  },
  {
    id: "proposal",
    type: "processNode",
    position: { x: 780, y: 320 },
    data: { label: "Proposal & MoU", bg: "#EEF2FF", border: "#7B9DD4", textColor: "#2C5A8C" },
  },
  {
    id: "bayar-vendor",
    type: "processNode",
    position: { x: 300, y: 480 },
    data: { label: "Pembayaran Vendor", bg: "#FFFBEB", border: "#E5C158", textColor: "#8B6914" },
  },
  {
    id: "uang-muka",
    type: "processNode",
    position: { x: 530, y: 470 },
    data: { label: "Uang Muka & PJUM", bg: "#F3EDFF", border: "#9B86CE", textColor: "#4A3080" },
  },
];

const edgeDefaults = {
  type: "smoothstep" as const,
  animated: true,
  style: { strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
};

const initialEdges: Edge[] = [
  // SDM → Keuangan (via payroll/reimbursement)
  { id: "e-sdm-payroll", source: "sdm", target: "payroll", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.sdm.border }, label: "" },
  { id: "e-payroll-keu", source: "payroll", target: "keuangan", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.sdm.border } },
  { id: "e-sdm-reimb", source: "sdm", target: "reimbursement", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.keuangan.border }, animated: false },
  { id: "e-reimb-keu", source: "reimbursement", target: "keuangan", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.keuangan.border }, animated: false },

  // PD → Keuangan (via laporan donor & pencatatan hibah)
  { id: "e-pd24-lapdon", source: "pd2024", target: "laporan-donor", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.pd2024.border } },
  { id: "e-lapdon-keu", source: "laporan-donor", target: "keuangan", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.pd2024.border } },
  { id: "e-pd24-hibah", source: "pd2024", target: "pencatatan-hibah", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.keuangan.border }, animated: false },
  { id: "e-hibah-keu", source: "pencatatan-hibah", target: "keuangan", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.keuangan.border }, animated: false },

  // PD → SDM (rekrutmen proyek)
  { id: "e-pd24-rekrut", source: "pd2024", target: "rekrutmen-proyek", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.pd2024.border }, animated: false },
  { id: "e-rekrut-sdm", source: "rekrutmen-proyek", target: "sdm", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.sdm.border }, animated: false },

  // PPKS ↔ SDM (sanksi & background check)
  { id: "e-ppks-sanksi", source: "ppks", target: "sanksi", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.ppks.border } },
  { id: "e-sanksi-sdm", source: "sanksi", target: "sdm", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.ppks.border } },
  { id: "e-sdm-bgcheck", source: "sdm", target: "background-check", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.sdm.border }, animated: false },
  { id: "e-bgcheck-ppks", source: "background-check", target: "ppks", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.sdm.border }, animated: false },

  // PD2025 → PD2024 (pembaruan)
  { id: "e-pd25-pd24", source: "pd2025", target: "pd2024", ...edgeDefaults, label: "Pembaruan", style: { ...edgeDefaults.style, stroke: palette.pd2025.border, strokeDasharray: "6 3" } },
  // PD2025 → Keuangan (via proposal)
  { id: "e-pd25-proposal", source: "pd2025", target: "proposal", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.pd2025.border }, animated: false },
  { id: "e-proposal-keu", source: "proposal", target: "keuangan", ...edgeDefaults, style: { ...edgeDefaults.style, stroke: palette.pd2025.border }, animated: false },
];

export default function SOPNetworkDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[520px] rounded-xl border border-border bg-card overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} className="!bg-background" />
        <Controls
          showInteractive={false}
          className="!bg-card !border-border !shadow-sm [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-secondary"
        />
      </ReactFlow>
    </div>
  );
}
