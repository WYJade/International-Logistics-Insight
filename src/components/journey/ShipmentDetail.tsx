import { Shipment } from "../../data/shipments";
import { ShipmentHeader } from "./ShipmentHeader";
import { Timeline } from "./Timeline";
import { KeyInfoCards } from "./KeyInfoCards";
import { DutyTable } from "./DutyTable";
import { WmsTable } from "./WmsTable";
import { DrayageTable } from "./DrayageTable";

interface Props {
  shipment: Shipment;
}

export function ShipmentDetail({ shipment }: Props) {
  return (
    <div className="space-y-6" key={shipment.id}>
      {/* Header with customer info */}
      <ShipmentHeader shipment={shipment} />

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="货物价值"
          value={shipment.cargoValue}
          sub="Declared · USD"
          icon="$"
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          label="进口关税"
          value={shipment.duty}
          sub={shipment.dutyNote}
          icon="📋"
          iconBg="bg-blue-50 text-blue-600"
        />
        <MetricCard
          label="货重/体积"
          value={shipment.weight}
          sub={shipment.weightNote}
          icon="📦"
          iconBg="bg-amber-50 text-amber-600"
        />
        <MetricCard
          label="链路进度"
          value={`${shipment.progress}%`}
          sub={shipment.progressNote}
          icon="🚀"
          iconBg="bg-violet-50 text-violet-600"
          progress={shipment.progress}
        />
      </div>

      {/* Timeline */}
      <Timeline events={shipment.timeline} />

      {/* Key Info Cards */}
      <KeyInfoCards items={shipment.keyInfo} />

      {/* Duty Detail */}
      <DutyTable detail={shipment.dutyDetail} />

      {/* WMS Items */}
      <WmsTable items={shipment.wmsItems} customer={shipment.customer} />

      {/* Drayage Records */}
      <DrayageTable records={shipment.drayageRecords} customer={shipment.customer} />
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  icon,
  iconBg,
  progress,
}: {
  label: string;
  value: string;
  sub: string;
  icon: string;
  iconBg: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 hover:bg-white hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{label}</span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${iconBg}`}>
          {icon}
        </span>
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      {progress !== undefined && (
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200/60 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              progress === 100
                ? "bg-emerald-500"
                : progress >= 50
                ? "bg-orange-400"
                : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="mt-1.5 text-[11px] text-gray-400 leading-relaxed line-clamp-2">{sub}</div>
    </div>
  );
}
