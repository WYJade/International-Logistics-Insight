interface DutyLine {
  line: number;
  hts: string;
  description: string;
  qty: string;
  value: string;
  duty: string;
  rate: string;
  origin: string;
}

interface DutyDetail {
  title: string;
  status: string;
  cargoValue: string;
  totalDuty: string;
  mpf: string;
  hmf?: string;
  otherSurcharge?: string;
  lines: DutyLine[];
}

interface Props {
  detail: DutyDetail;
}

export function DutyTable({ detail }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h3 className="text-base font-semibold text-gray-900">进口清关关税明细</h3>
          <p className="text-xs text-gray-500 mt-0.5">{detail.title}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {detail.status}
        </span>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5 p-3 bg-gray-50 rounded-lg">
        <SummaryItem label="货物价值" value={detail.cargoValue} />
        <SummaryItem label="总关税" value={detail.totalDuty} />
        <SummaryItem label="MPF" value={detail.mpf} />
        {detail.hmf && <SummaryItem label="HMF" value={detail.hmf} />}
        {detail.otherSurcharge && <SummaryItem label="其他附加税" value={detail.otherSurcharge} />}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 px-2 text-left text-gray-500 font-medium">行</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">HTS 编码</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">商品描述</th>
              <th className="py-2 px-2 text-right text-gray-500 font-medium">数量</th>
              <th className="py-2 px-2 text-right text-gray-500 font-medium">申报货值</th>
              <th className="py-2 px-2 text-right text-gray-500 font-medium">税额</th>
              <th className="py-2 px-2 text-right text-gray-500 font-medium">税率</th>
              <th className="py-2 px-2 text-center text-gray-500 font-medium">产地</th>
            </tr>
          </thead>
          <tbody>
            {detail.lines.map((line, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-2 px-2 text-gray-600">{line.line}</td>
                <td className="py-2 px-2 font-mono text-gray-700">{line.hts}</td>
                <td className="py-2 px-2 text-gray-700">{line.description}</td>
                <td className="py-2 px-2 text-right text-gray-600">{line.qty}</td>
                <td className="py-2 px-2 text-right text-gray-600">{line.value}</td>
                <td className="py-2 px-2 text-right font-medium text-gray-800">{line.duty}</td>
                <td className="py-2 px-2 text-right text-gray-600">{line.rate}</td>
                <td className="py-2 px-2 text-center">
                  <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                    {line.origin}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-gray-400">{label}</div>
      <div className="text-sm font-semibold text-gray-800">{value}</div>
    </div>
  );
}
