import {
  overviewStats,
  pipelineStages,
  leadTimeBreakdown,
  alerts,
  routeAnalysis,
  upcomingArrivals,
  routeDistribution,
  topSuppliers,
  monthlyTrends,
} from "../../data/overview";
import { AlertTriangle, Clock, DollarSign, TrendingUp, Ship, Truck, Warehouse, FileCheck } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">全链路进口运营概览</h2>
        <p className="text-xs text-gray-500">国际进口 → 清关 → 配送 → 仓储 · 全业务周期汇总</p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 w-fit">
        {["7天", "30天", "90天", "自定义"].map((p, i) => (
          <button
            key={p}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              i === 1 ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="期内批次"
          value={`${overviewStats.totalBatches}`}
          sub={`${overviewStats.completedBatches} 已完成 · ${overviewStats.inTransitBatches} 在途`}
          icon={<Ship className="h-4 w-4" />}
        />
        <StatCard
          label="总货值"
          value={overviewStats.totalCargoValue}
          sub="Declared Cargo Value (FOB)"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          label="已缴关税"
          value={overviewStats.totalDuty}
          sub={`Total Duty · 附加费 $${overviewStats.totalSurcharges.replace("$", "")}`}
          icon={<FileCheck className="h-4 w-4" />}
        />
        <StatCard
          label="全程平均时效"
          value={`${overviewStats.avgLeadTime}天`}
          sub={`准时率 ${overviewStats.onTimeRate}%`}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Pipeline Stages */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">业务链路 · 各环节在途批次</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipelineStages.map((stage, idx) => {
            const icons = [Ship, FileCheck, Truck, Warehouse];
            const Icon = icons[idx];
            const total = stage.inProgress + stage.completed;
            const progressPct = total > 0 ? (stage.completed / total) * 100 : 0;
            return (
              <div key={idx} className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">{stage.label}</span>
                </div>
                {stage.alerts && (
                  <div className="text-[10px] text-amber-600 mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {stage.alerts}
                  </div>
                )}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold text-gray-900">{stage.inProgress}</span>
                  <span className="text-xs text-gray-500">在途</span>
                  <span className="text-xs text-emerald-600 ml-1">✓ {stage.completed} 完成</span>
                </div>
                <div className="text-[11px] text-gray-400 mb-2">{stage.details}</div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>{stage.inProgress} 在途</span>
                  <span>{stage.completed} 完成</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Time & Finance Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lead time */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">时效表现</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-bold text-gray-900">{overviewStats.avgLeadTime}天</span>
            <span className="text-xs text-gray-500">全链路平均全程</span>
          </div>
          <div className="text-sm text-gray-600 mb-3">{overviewStats.onTimeRate}% 准时到港率</div>
          <div className="space-y-2">
            <LeadTimeBar label="海运" days={leadTimeBreakdown.ocean} max={30} color="bg-blue-400" />
            <LeadTimeBar label="清关" days={leadTimeBreakdown.customs} max={30} color="bg-teal-400" />
            <LeadTimeBar label="配送" days={leadTimeBreakdown.drayage} max={30} color="bg-amber-400" />
          </div>
        </div>

        {/* Finance */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">财务摘要</h3>
          <div className="space-y-3">
            <div>
              <div className="text-[11px] text-gray-400">申报总货值 (Total Entered Value)</div>
              <div className="text-lg font-bold text-gray-900">$2,840,000</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-400">期内已缴关税 (Total Duty)</div>
              <div className="text-lg font-bold text-gray-900">$213,450</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-400">附加费合计 (Total Surcharges)</div>
              <div className="text-lg font-bold text-gray-900">$11,065</div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">需要关注</h3>
          <div className="space-y-2.5">
            {alerts.map((alert, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{alert.label}</span>
                <span className="text-sm font-bold text-gray-900">{alert.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-[11px] text-amber-700">⚠ 存在需立即处理的异常项，请及时跟进</p>
          </div>
        </div>
      </div>

      {/* Route Analysis */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">时效分析 · 航线维度</h3>
        <div className="space-y-4">
          {routeAnalysis.map((route, idx) => (
            <div key={idx} className="rounded-lg border border-gray-50 p-4 bg-gray-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">{route.route}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">均程 {route.avgDays} 天</span>
                  <span className="text-xs text-emerald-600">{route.onTime}% 准时</span>
                </div>
              </div>
              <div className="flex items-center gap-1 h-5">
                <div
                  className="h-full bg-blue-400 rounded-l"
                  style={{ width: `${(route.ocean / route.avgDays) * 100}%` }}
                  title={`海运 ${route.ocean}d`}
                />
                <div
                  className="h-full bg-teal-400"
                  style={{ width: `${(route.customs / route.avgDays) * 100}%` }}
                  title={`清关 ${route.customs}d`}
                />
                <div
                  className="h-full bg-amber-400 rounded-r"
                  style={{ width: `${(route.drayage / route.avgDays) * 100}%` }}
                  title={`配送 ${route.drayage}d`}
                />
              </div>
              <div className="flex gap-4 mt-1.5 text-[10px] text-gray-500">
                <span>海运 {route.ocean}d</span>
                <span>清关 {route.customs}d</span>
                <span>配送 {route.drayage}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Arrivals & Route Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arrivals */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">近期到港预告</h3>
          <p className="text-[11px] text-gray-400 mb-3">未来 14 天</p>
          <div className="space-y-2.5">
            {upcomingArrivals.map((arr, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-700 w-12">{arr.date}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                  {arr.count}
                </span>
                <span className="text-xs text-gray-500 flex-1">{arr.detail}</span>
                {arr.note && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {arr.note}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-400">共 56 票在途 · 以上为预计到港时间 · 可能因航运延误调整</p>
        </div>

        {/* Route Distribution */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">货运航线分布 · 票量占比</h3>
          <p className="text-[11px] text-gray-400 mb-3">共 74 票</p>
          <div className="space-y-3">
            {routeDistribution.map((r, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{r.route}</span>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span>{r.value}</span>
                    <span>{r.tickets} 票</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-400 transition-all"
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
                <div className="text-right text-[10px] text-gray-400 mt-0.5">{r.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Suppliers */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">核心供应商 · 货量排行</h3>
        <div className="space-y-3">
          {topSuppliers.map((s, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-bold shrink-0">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800">{s.name}</div>
                <div className="text-[11px] text-gray-400">
                  {s.country} · 均程 {s.avgDays} 天 · 准时 {s.onTime}%
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-gray-900">{s.tickets} 票</div>
                <div className="text-[11px] text-gray-500">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">历史趋势 · 近6个月</h3>
        <p className="text-[11px] text-gray-400 mb-4">2026.01 — 2026.06 · 月度统计维度</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TrendChart
            title="月度批次量"
            subtitle="进口票数 (票)"
            value="42 票"
            note="↘ vs 5月 52票"
            data={monthlyTrends.months.map((m, i) => ({ month: m, value: monthlyTrends.batches[i] }))}
            color="#7c3aed"
          />
          <TrendChart
            title="准时到港率"
            subtitle="按票统计 (%)"
            value="74%"
            note="↘ vs 3月均值"
            data={monthlyTrends.months.map((m, i) => ({ month: m, value: monthlyTrends.onTimeRate[i] }))}
            color="#10b981"
          />
          <TrendChart
            title="全程平均时效"
            subtitle="供应商 → 入库 (天)"
            value="40 天"
            note="→ 基本稳定"
            data={monthlyTrends.months.map((m, i) => ({ month: m, value: monthlyTrends.avgLeadTime[i] }))}
            color="#f59e0b"
          />
          <TrendChart
            title="有效关税率"
            subtitle="关税 ÷ 申报货值 (%)"
            value="8.1%"
            note="↘ 税负下降 0.8pp"
            data={monthlyTrends.months.map((m, i) => ({ month: m, value: monthlyTrends.dutyRate[i] }))}
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          {icon}
        </div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

function LeadTimeBar({
  label,
  days,
  max,
  color,
}: {
  label: string;
  days: number;
  max: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-8">{label}</span>
      <div className="flex-1 h-4 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(days / max) * 100}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-700 w-12 text-right">{days}天</span>
    </div>
  );
}

function TrendChart({
  title,
  subtitle,
  value,
  note,
  data,
  color,
}: {
  title: string;
  subtitle: string;
  value: string;
  note: string;
  data: { month: string; value: number }[];
  color: string;
}) {
  return (
    <div className="p-3 rounded-lg border border-gray-50">
      <div className="text-xs font-medium text-gray-700">{title}</div>
      <div className="text-[10px] text-gray-400">{subtitle}</div>
      <div className="flex items-baseline gap-2 mt-1 mb-2">
        <span className="text-lg font-bold text-gray-900">{value}</span>
        <span className="text-[10px] text-gray-500">{note}</span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
