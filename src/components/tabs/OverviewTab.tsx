import { useState } from "react";
import {
  Package,
  Ship,
  FileCheck,
  Truck,
  Warehouse,
  AlertTriangle,
  ChevronRight,
  DollarSign,
  Search,
  ArrowRight,
  X,
  Clock,
  AlertOctagon,
  CalendarClock,
  ShieldAlert,
  CircleDollarSign,
} from "lucide-react";

interface Props {
  onNavigateToJourney: () => void;
}

// ─── Critical Alerts Data ─────────────────────────────────────────────────────
const criticalAlerts = [
  {
    id: 1,
    priority: "HIGH" as const,
    title: "Broker Hold — 文件缺失",
    container: "FANU3191648",
    customer: "ADOORN LLC",
    action: "Need Docs: 提交缺失 Packing List",
    owner: "Broker: JFS",
    stuckHours: 72,
  },
  {
    id: 2,
    priority: "HIGH" as const,
    title: "Broker Hold — Valuation Review",
    container: "TCKU7744001",
    customer: "SUMMIT SUPPLY",
    action: "Need Broker Follow-up: 估值复核",
    owner: "Broker: CHB Partners",
    stuckHours: 48,
  },
  {
    id: 3,
    priority: "HIGH" as const,
    title: "LFD 已超期 — 滞港费风险",
    container: "WHSU8555505",
    customer: "ADOORN LLC",
    action: "Need Pickup Appointment: 立即安排提柜",
    owner: "Dispatcher: UNIS TMS",
    stuckHours: 192,
  },
];

// ─── Due Today Data ───────────────────────────────────────────────────────────
const dueTodayItems = [
  { id: 1, action: "安排提柜 Pickup", container: "WHSU8555505", customer: "ADOORN LLC", phase: "Drayage", deadline: "LFD 已过期 8天", priority: "HIGH" as const },
  { id: 2, action: "提交清关文件", container: "HLXU3456789", customer: "CLEARVIEW", phase: "Customs", deadline: "ETA 前 3天", priority: "MEDIUM" as const },
  { id: 3, action: "确认 Broker 指派", container: "MSCU3399001", customer: "PACIFIC IMP", phase: "Customs", deadline: "今日截止", priority: "MEDIUM" as const },
  { id: 4, action: "WMS 入库预告单创建", container: "HAMU1732295", customer: "ADOORN LLC", phase: "WMS", deadline: "ETA 前 2天", priority: "LOW" as const },
  { id: 5, action: "ISF 10+2 申报", container: "WHSU6677002", customer: "ADOORN LLC", phase: "Customs", deadline: "开船前 24h", priority: "HIGH" as const },
];

// ─── ETA Risk Data ────────────────────────────────────────────────────────────
const etaRiskItems = [
  { container: "WHSU8555505", customer: "ADOORN LLC", eta: "Jun 13 (已到)", status: "到港未提", delayDays: 8, reason: "LFD 超期, 待安排 Drayage" },
  { container: "HLXU3456789", customer: "CLEARVIEW", eta: "Jul 02", status: "在途正常", delayDays: 0, reason: "ISF 待确认 Broker" },
  { container: "OOCU8777620", customer: "ADOORN LLC", eta: "Jun 14 (已到)", status: "到港待清关", delayDays: 2, reason: "等待 CBP 放行" },
  { container: "FANU3191648", customer: "ADOORN LLC", eta: "Jun 15 (已到)", status: "Broker Hold", delayDays: 5, reason: "文件缺失, Hold > 72h" },
];

// ─── Cost Risk Data ───────────────────────────────────────────────────────────
const costRiskItems = [
  { type: "Demurrage 滞箱费", container: "WHSU8555505", customer: "ADOORN LLC", amount: "$350/天", days: 8, total: "$2,800", urgency: "HIGH" as const },
  { type: "Detention 滞柜费", container: "FANU3191648", customer: "ADOORN LLC", amount: "$150/天", days: 5, total: "$750", urgency: "MEDIUM" as const },
  { type: "Storage 港口堆存", container: "OOCU8777620", customer: "ADOORN LLC", amount: "$75/天", days: 2, total: "$150", urgency: "LOW" as const },
];

// ─── Pipeline Data ────────────────────────────────────────────────────────────
const pipelineData = [
  { phase: "供应商发货", phaseEn: "Supplier Dispatch", icon: Package, color: "text-slate-700", iconBg: "bg-slate-100", borderColor: "border-slate-200", bgColor: "bg-slate-50/60", sourceBadge: "Cube Ship GTM", sourceBadgeColor: "bg-slate-100 border-slate-200 text-slate-600", inProgress: 12, completed: 62, keyQuestion: "哪些待装柜?", details: [{ label: "备货中", value: "7" }, { label: "待装柜", value: "5" }] },
  { phase: "国际海运", phaseEn: "Ocean Freight", icon: Ship, color: "text-blue-600", iconBg: "bg-blue-100", borderColor: "border-blue-200", bgColor: "bg-blue-50/40", sourceBadge: "Cube Ship GTM", sourceBadgeColor: "bg-blue-100 border-blue-200 text-blue-600", inProgress: 31, completed: 28, keyQuestion: "哪些快到港? 哪些延误?", details: [{ label: "在途", value: "31" }, { label: "ETA<3天", value: "5" }] },
  { phase: "报关清关", phaseEn: "Customs Clearance", icon: FileCheck, color: "text-purple-600", iconBg: "bg-purple-100", borderColor: "border-purple-200", bgColor: "bg-purple-50/40", sourceBadge: "Cube Ship GTM", sourceBadgeColor: "bg-purple-100 border-purple-200 text-purple-600", inProgress: 43, completed: 28, keyQuestion: "哪些资料缺失? 哪些被 Hold?", details: [{ label: "审核中", value: "11" }, { label: "On Hold", value: "4" }] },
  { phase: "Drayage 短驳", phaseEn: "Drayage", icon: Truck, color: "text-orange-600", iconBg: "bg-orange-100", borderColor: "border-orange-200", bgColor: "bg-orange-50/40", sourceBadge: "UNIS TMS", sourceBadgeColor: "bg-orange-100 border-orange-200 text-orange-600", inProgress: 8, completed: 27, keyQuestion: "哪些会产生 demurrage?", details: [{ label: "待提柜", value: "3" }, { label: "运输中", value: "5" }] },
  { phase: "仓储入库", phaseEn: "Warehouse Receipt", icon: Warehouse, color: "text-emerald-600", iconBg: "bg-emerald-100", borderColor: "border-emerald-200", bgColor: "bg-emerald-50/40", sourceBadge: "WMS", sourceBadgeColor: "bg-emerald-100 border-emerald-200 text-emerald-600", inProgress: 6, completed: 24, keyQuestion: "什么时候到仓? 仓库准备好了吗?", details: [{ label: "待到柜", value: "2" }, { label: "卸柜中", value: "2" }] },
];

// ─── Dialog data types ────────────────────────────────────────────────────────
type DialogContent = { title: string; items: { label: string; detail: string }[] } | null;

export function OverviewTab({ onNavigateToJourney }: Props) {
  const [dialog, setDialog] = useState<DialogContent>(null);

  const openCriticalDialog = () => {
    setDialog({
      title: "Critical Alerts / 高风险异常",
      items: criticalAlerts.map((a) => ({
        label: `[${a.priority}] ${a.title}`,
        detail: `${a.container} · ${a.customer} · ${a.action} · 负责: ${a.owner} · 卡住 ${a.stuckHours}h`,
      })),
    });
  };

  const openDueTodayDialog = () => {
    setDialog({
      title: "Due Today / 今日待办",
      items: dueTodayItems.map((d) => ({
        label: `[${d.priority}] ${d.action}`,
        detail: `${d.container} · ${d.customer} · ${d.phase} · ${d.deadline}`,
      })),
    });
  };

  const openEtaRiskDialog = () => {
    setDialog({
      title: "ETA Risk / 到港与入库风险",
      items: etaRiskItems.map((e) => ({
        label: `${e.container} · ${e.customer}`,
        detail: `ETA ${e.eta} · ${e.status} · ${e.delayDays > 0 ? `延误 ${e.delayDays}天` : "正常"} · ${e.reason}`,
      })),
    });
  };

  const openCostRiskDialog = () => {
    setDialog({
      title: "Cost Risk / 滞港费·滞箱费·异常费用",
      items: costRiskItems.map((c) => ({
        label: `${c.type} · ${c.container}`,
        detail: `${c.customer} · ${c.amount} × ${c.days}天 = ${c.total} · 紧急度: ${c.urgency}`,
      })),
    });
  };

  const totalCostRisk = costRiskItems.reduce((sum, c) => sum + parseInt(c.total.replace(/[$,]/g, "")), 0);

  return (
    <div className="space-y-5">
      {/* Action Required Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Critical Alerts */}
        <ActionCard
          icon={<AlertOctagon className="h-4 w-4" />}
          iconBg="bg-red-100 text-red-600"
          label="Critical Alerts"
          sublabel="高风险异常"
          value={`${criticalAlerts.length}`}
          note="Stuck > 48h · 需立即处理"
          borderColor="border-red-200"
          bgColor="bg-red-50/40"
          valueColor="text-red-700"
          onClick={openCriticalDialog}
        />
        {/* Due Today */}
        <ActionCard
          icon={<CalendarClock className="h-4 w-4" />}
          iconBg="bg-amber-100 text-amber-600"
          label="Due Today"
          sublabel="今日待办"
          value={`${dueTodayItems.length}`}
          note="需要今日完成的操作"
          borderColor="border-amber-200"
          bgColor="bg-amber-50/40"
          valueColor="text-amber-700"
          onClick={openDueTodayDialog}
        />
        {/* ETA Risk */}
        <ActionCard
          icon={<ShieldAlert className="h-4 w-4" />}
          iconBg="bg-blue-100 text-blue-600"
          label="ETA Risk"
          sublabel="到港与入库风险"
          value={`${etaRiskItems.filter(e => e.delayDays > 0).length}`}
          note="已到港未处理 / 延误中"
          borderColor="border-blue-200"
          bgColor="bg-blue-50/40"
          valueColor="text-blue-700"
          onClick={openEtaRiskDialog}
        />
        {/* Cost Risk */}
        <ActionCard
          icon={<CircleDollarSign className="h-4 w-4" />}
          iconBg="bg-violet-100 text-violet-600"
          label="Cost Risk"
          sublabel="滞港费·滞箱费"
          value={`$${totalCostRisk.toLocaleString()}`}
          note={`${costRiskItems.length} 个柜产生额外费用`}
          borderColor="border-violet-200"
          bgColor="bg-violet-50/40"
          valueColor="text-violet-700"
          onClick={openCostRiskDialog}
        />
      </div>

      {/* Due Today List — quick glance */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900">Due Today / 今日待办</h3>
          </div>
          <button
            onClick={openDueTodayDialog}
            className="text-xs text-violet-600 font-medium hover:underline"
          >
            查看全部 →
          </button>
        </div>
        <div className="space-y-2">
          {dueTodayItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={openDueTodayDialog}
            >
              <PriorityDot priority={item.priority} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 truncate">{item.action}</div>
                <div className="text-[10px] text-gray-500">{item.container} · {item.customer}</div>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0 bg-gray-100 px-2 py-0.5 rounded">{item.phase}</span>
              <span className={`text-[10px] shrink-0 font-medium ${item.priority === "HIGH" ? "text-red-600" : item.priority === "MEDIUM" ? "text-amber-600" : "text-gray-500"}`}>
                {item.deadline}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Pipeline Overview / 链路总览</h3>
            <p className="text-xs text-gray-500 mt-0.5">各环节在途状态 · 点击卡片跳转单号查询</p>
          </div>
          <button
            onClick={onNavigateToJourney}
            className="flex items-center gap-1.5 text-xs text-violet-600 font-medium hover:text-violet-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-violet-50"
          >
            <Search className="h-3.5 w-3.5" />
            按单号查询详情
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {pipelineData.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === pipelineData.length - 1;

            return (
              <div key={idx} className="relative">
                {!isLast && (
                  <div className="hidden md:flex absolute -right-3 top-8 z-10 items-center">
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                )}
                <div
                  className={`rounded-xl border ${stage.borderColor} ${stage.bgColor} p-3.5 h-full hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={onNavigateToJourney}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${stage.iconBg} shrink-0`}>
                      <Icon className={`h-4 w-4 ${stage.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-bold ${stage.color} truncate`}>{stage.phase}</div>
                      <div className="text-[9px] text-gray-400">{stage.phaseEn}</div>
                    </div>
                  </div>

                  {/* Source */}
                  <div className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-medium mb-2 ${stage.sourceBadgeColor}`}>
                    {stage.sourceBadge}
                  </div>

                  {/* Numbers */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-2xl font-bold text-gray-900">{stage.inProgress}</span>
                    <span className="text-[10px] text-gray-500">在途</span>
                    <span className="text-[10px] text-emerald-600 ml-auto">✓{stage.completed}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 mb-2 text-[10px]">
                    {stage.details.map((d, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-500">{d.label}</span>
                        <span className="text-gray-800 font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key question */}
                  <div className="mt-2 p-2 rounded-lg bg-white/60 border border-gray-100">
                    <div className="text-[9px] text-gray-500 italic">{stage.keyQuestion}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Finance + Cost Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-gray-900">财务摘要</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[11px] text-gray-400">期内申报总货值</div>
              <div className="text-2xl font-bold text-gray-900">$2,840,000</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-gray-400">已缴关税</div>
                <div className="text-base font-bold text-gray-900">$213,450</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400">附加费</div>
                <div className="text-base font-bold text-gray-900">$11,065</div>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">有效关税率</span>
                <span className="font-bold text-gray-800">8.1%</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">关税 ÷ 申报货值 · vs 上月 ↘ 0.8pp</div>
            </div>
          </div>
        </div>

        {/* Cost Risk Detail */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-semibold text-gray-900">Cost Risk / 异常费用</h3>
            </div>
            <button onClick={openCostRiskDialog} className="text-xs text-violet-600 font-medium hover:underline">详情 →</button>
          </div>
          <div className="space-y-2.5">
            {costRiskItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:bg-red-50/30 cursor-pointer transition-colors"
                onClick={openCostRiskDialog}
              >
                <PriorityDot priority={item.urgency} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800">{item.type}</div>
                  <div className="text-[10px] text-gray-500">{item.container} · {item.customer}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-red-600">{item.total}</div>
                  <div className="text-[9px] text-gray-400">{item.amount} × {item.days}天</div>
                </div>
              </div>
            ))}
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex justify-between items-center">
              <span className="text-[11px] text-red-700 font-medium">累计异常费用风险</span>
              <span className="text-sm font-bold text-red-700">${totalCostRisk.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onNavigateToJourney}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors"
        >
          <Search className="h-4 w-4" />
          按单号追踪全链路详情
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Dialog */}
      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDialog(null)}>
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">{dialog.title}</h3>
              <button
                onClick={() => setDialog(null)}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {dialog.items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs font-medium text-gray-800">{item.label}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{item.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setDialog(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActionCard({
  icon,
  iconBg,
  label,
  sublabel,
  value,
  note,
  borderColor,
  bgColor,
  valueColor,
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel: string;
  value: string;
  note: string;
  borderColor: string;
  bgColor: string;
  valueColor: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-xl border ${borderColor} ${bgColor} p-4 cursor-pointer hover:shadow-md transition-all group`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconBg}`}>
          {icon}
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-800">{label}</div>
          <div className="text-[9px] text-gray-400">{sublabel}</div>
        </div>
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-[10px] text-gray-500 mt-1">{note}</div>
      <div className="mt-2 text-[10px] text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        点击查看详情 →
      </div>
    </div>
  );
}

function PriorityDot({ priority }: { priority: "HIGH" | "MEDIUM" | "LOW" }) {
  const colors = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-amber-500",
    LOW: "bg-gray-400",
  };
  return <div className={`h-2 w-2 rounded-full shrink-0 ${colors[priority]}`} />;
}
