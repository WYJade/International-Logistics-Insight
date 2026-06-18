import { DrayageRecord } from "../../data/shipments";

interface Props {
  records: DrayageRecord[];
  customer: string;
}

export function DrayageTable({ records, customer }: Props) {
  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900">关联拖柜载运记录</h3>
          <p className="text-xs text-gray-500 mt-0.5">{customer} · 数据来源 UNIS TMS</p>
        </div>
        <div className="text-center py-8 text-sm text-gray-400">
          <p>拖柜记录待到港后创建</p>
          <p className="mt-1 text-xs">CBP 放行后 UNIS TMS 将生成拖柜指令</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">关联拖柜载运记录</h3>
        <p className="text-xs text-gray-500 mt-0.5">{customer} · 当批次全部拖柜记录 · 数据来源 UNIS TMS</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 px-2 text-left text-gray-500 font-medium">Load #</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">状态</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">Container</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">提柜点</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">目的仓</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-50 hover:bg-gray-50/50 ${
                  record.isCurrent ? "bg-violet-50/50" : ""
                }`}
              >
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-gray-700 font-medium">{record.loadNo}</span>
                    {record.isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200 font-medium">
                        本批次
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <StatusBadge status={record.status} />
                </td>
                <td className="py-2 px-2 font-mono text-gray-700">{record.container}</td>
                <td className="py-2 px-2 text-gray-600">{record.pickup}</td>
                <td className="py-2 px-2 text-gray-600">{record.destination}</td>
                <td className="py-2 px-2 text-gray-600">{record.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let colors = "bg-gray-50 text-gray-600 border-gray-200";
  if (status === "COMPLETED" || status === "DELIVERED") {
    colors = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (status === "PENDING") {
    colors = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (status === "DROPCONTAINER_ARRIVED") {
    colors = "bg-blue-50 text-blue-700 border-blue-200";
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${colors}`}>
      {status}
    </span>
  );
}
