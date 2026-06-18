import { KeyInfo } from "../../data/shipments";
import { Ship, FileCheck, Truck, Warehouse } from "lucide-react";

interface Props {
  items: KeyInfo[];
}

const sectionIcons = [Ship, FileCheck, Truck, Warehouse];

const statusColorMap: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  gray: "bg-gray-50 text-gray-600 border-gray-200",
};

export function KeyInfoCards({ items }: Props) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">各环节关键信息</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const Icon = sectionIcons[idx] || Ship;
          return (
            <div
              key={idx}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                    <div className="text-[11px] font-mono text-gray-400">{item.subtitle}</div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium mb-3 ${
                  statusColorMap[item.statusColor] || statusColorMap.gray
                }`}
              >
                {item.status}
              </span>

              {/* Fields */}
              <div className="space-y-2">
                {item.fields.map((field, fIdx) => (
                  <div key={fIdx} className="flex justify-between gap-2">
                    <span className="text-[11px] text-gray-500 shrink-0">{field.label}</span>
                    <span className="text-[11px] text-gray-800 font-medium text-right truncate">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
