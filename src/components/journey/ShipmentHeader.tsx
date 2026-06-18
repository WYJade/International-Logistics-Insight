import { Shipment } from "../../data/shipments";

interface Props {
  shipment: Shipment;
}

export function ShipmentHeader({ shipment }: Props) {
  const statusColors: Record<string, string> = {
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="flex items-start justify-between flex-wrap gap-4 pb-5 border-b border-gray-100">
      {/* Customer & Status */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold text-sm shrink-0">
          {shipment.customer.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-gray-900">{shipment.customer}</h2>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                statusColors[shipment.statusColor] || statusColors.gray
              }`}
            >
              {shipment.statusLabel}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500 max-w-2xl leading-relaxed">{shipment.routeFull}</p>
        </div>
      </div>

      {/* Reference Numbers */}
      <div className="flex flex-wrap gap-2">
        <RefBadge label="Container" value={shipment.containerNo} color="violet" />
        <RefBadge label="HBL" value={shipment.hbl} color="blue" />
        <RefBadge label="MBL" value={shipment.mbl} color="teal" />
      </div>
    </div>
  );
}

function RefBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "violet" | "blue" | "teal";
}) {
  const colors = {
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono ${colors[color]}`}>
      <span className="font-medium text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}
