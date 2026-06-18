import { WmsItem } from "../../data/shipments";

interface Props {
  items: WmsItem[];
  customer: string;
}

export function WmsTable({ items, customer }: Props) {
  const totalExpected = items.reduce((sum, i) => sum + i.expected, 0);
  const totalReceived = items.reduce((sum, i) => sum + (i.received || 0), 0);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">WMS 入库货品明细</h3>
        <p className="text-xs text-gray-500 mt-0.5">{customer} · 数据来源 WMS-Inbound</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 px-2 text-left text-gray-500 font-medium">SKU</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">商品</th>
              <th className="py-2 px-2 text-left text-gray-500 font-medium">规格</th>
              <th className="py-2 px-2 text-right text-gray-500 font-medium">预期</th>
              {items.some((i) => i.received !== undefined) && (
                <th className="py-2 px-2 text-right text-gray-500 font-medium">已收</th>
              )}
              <th className="py-2 px-2 text-center text-gray-500 font-medium">单位</th>
              {items.some((i) => i.status) && (
                <th className="py-2 px-2 text-center text-gray-500 font-medium">状态</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-2 px-2 font-mono text-gray-700 text-[11px]">{item.sku}</td>
                <td className="py-2 px-2 text-gray-700">{item.product}</td>
                <td className="py-2 px-2 text-gray-500">{item.spec}</td>
                <td className="py-2 px-2 text-right text-gray-700 font-medium">{item.expected}</td>
                {items.some((i) => i.received !== undefined) && (
                  <td className="py-2 px-2 text-right text-gray-700 font-medium">{item.received ?? "—"}</td>
                )}
                <td className="py-2 px-2 text-center text-gray-500">{item.unit}</td>
                {items.some((i) => i.status) && (
                  <td className="py-2 px-2 text-center">
                    {item.status && (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="border-t border-gray-200 font-medium">
              <td className="py-2 px-2 text-gray-800" colSpan={3}>合计</td>
              <td className="py-2 px-2 text-right text-gray-800">{totalExpected}</td>
              {items.some((i) => i.received !== undefined) && (
                <td className="py-2 px-2 text-right text-gray-800">{totalReceived}</td>
              )}
              <td></td>
              {items.some((i) => i.status) && <td></td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
