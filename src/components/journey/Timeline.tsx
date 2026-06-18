import { TimelineEvent, Phase } from "../../data/shipments";
import {
  CheckCircle2,
  Circle,
  Clock,
  Ship,
  Truck,
  FileCheck,
  Warehouse,
  Package,
} from "lucide-react";

interface Props {
  events: TimelineEvent[];
}

const phaseIcons: Record<Phase, React.ElementType> = {
  supplier: Package,
  ocean: Ship,
  customs: FileCheck,
  drayage: Truck,
  wms: Warehouse,
};

const phaseColors: Record<Phase, { bg: string; border: string; icon: string; line: string }> = {
  supplier: { bg: "bg-slate-50", border: "border-slate-300", icon: "text-slate-600", line: "bg-slate-300" },
  ocean: { bg: "bg-blue-50", border: "border-blue-300", icon: "text-blue-600", line: "bg-blue-300" },
  customs: { bg: "bg-teal-50", border: "border-teal-300", icon: "text-teal-600", line: "bg-teal-300" },
  drayage: { bg: "bg-amber-50", border: "border-amber-300", icon: "text-amber-600", line: "bg-amber-300" },
  wms: { bg: "bg-purple-50", border: "border-purple-300", icon: "text-purple-600", line: "bg-purple-300" },
};

export function Timeline({ events }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        全链路业务时间线 · Business Milestone Timeline
      </h3>
      <div className="mt-6 space-y-0">
        {events.map((event, idx) => {
          const Icon = phaseIcons[event.phase];
          const colors = phaseColors[event.phase];
          const isLast = idx === events.length - 1;

          return (
            <div key={idx} className="relative flex gap-4">
              {/* Vertical line */}
              {!isLast && (
                <div className={`absolute left-[19px] top-12 bottom-0 w-0.5 ${colors.line} opacity-40`} />
              )}

              {/* Phase Icon */}
              <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${colors.border} ${colors.bg}`}>
                <Icon className={`h-4.5 w-4.5 ${colors.icon}`} />
              </div>

              {/* Phase Content */}
              <div className={`flex-1 pb-6 ${isLast ? "pb-0" : ""}`}>
                {/* Phase Header */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900">{event.phaseLabel}</span>
                  <span className="text-xs text-gray-400 font-mono">{event.source}</span>
                  <StatusBadge status={event.status} />
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {event.duration}
                  </span>
                </div>

                {/* Phase subtitle */}
                <div className="mt-0.5 text-[11px] text-gray-400">{event.phaseLabelEn}</div>

                {/* Ref Numbers */}
                {event.refNumbers && (
                  <div className="mt-1.5 text-[11px] text-gray-400 font-mono">{event.refNumbers}</div>
                )}

                {/* Events */}
                <div className="mt-3 space-y-3">
                  {event.events.map((evt, evtIdx) => (
                    <div
                      key={evtIdx}
                      className={`rounded-lg border p-3 ${
                        evt.isEstimated
                          ? "border-dashed border-gray-200 bg-gray-50/50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {evt.isEstimated ? (
                          <Clock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-800">{evt.title}</span>
                            {evt.isEstimated && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                                预计
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-xs text-gray-500 font-mono">{evt.date}</div>
                          <div className="mt-1 text-xs text-gray-500 leading-relaxed">{evt.description}</div>
                          {evt.refLabel && (
                            <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-[11px] font-mono text-gray-600">
                              <span>{evt.refLabel}:</span>
                              <span className="font-semibold">{evt.refValue}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "completed" | "in-progress" | "pending" }) {
  if (status === "completed")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="h-3 w-3" /> 完成
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-700 border border-orange-200">
        <Circle className="h-3 w-3 fill-orange-400" /> 进行中
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500 border border-gray-200">
      <Circle className="h-3 w-3" /> 待执行
    </span>
  );
}
