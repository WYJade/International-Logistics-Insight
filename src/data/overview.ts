// End-to-End Insights overview data (from document 2)

export const overviewStats = {
  totalBatches: 74,
  completedBatches: 18,
  inTransitBatches: 56,
  totalCargoValue: "$2,840,000",
  totalDuty: "$213,450",
  totalSurcharges: "$11,065",
  avgLeadTime: 38,
  onTimeRate: 79,
};

export const pipelineStages = [
  {
    label: "海运在途",
    inProgress: 31,
    completed: 28,
    details: "在途箱量 47 · 期内到港 28",
    alerts: "⚠ Broker Hold ×2",
  },
  {
    label: "清关办理",
    inProgress: 43,
    completed: 28,
    details: "待审核 11 · 已放行 28",
    alerts: "⚠ 需关注 ×7",
  },
  {
    label: "Drayage 短驳",
    inProgress: 8,
    completed: 27,
    details: "待提柜 3 · 运输中 5",
    alerts: "",
  },
  {
    label: "仓储入库",
    inProgress: 6,
    completed: 24,
    details: "待卸柜 2 · 卸柜中 2",
    alerts: "",
  },
];

export const leadTimeBreakdown = {
  ocean: 24,
  customs: 2.7,
  drayage: 1.9,
};

export const financeSummary = {
  declaredValue: "$2,840,000",
  totalDuty: "$213,450",
  surcharges: "$11,065",
};

export const alerts = [
  { label: "即将到港 (7天内)", count: 5 },
  { label: "待清关申报", count: 4 },
  { label: "Broker Hold", count: 2 },
  { label: "超期预警", count: 1 },
];

export const routeAnalysis = [
  { route: "VN → US · 萨凡纳 (USSAV)", avgDays: 68, onTime: 85, ocean: 52, customs: 3, drayage: 2 },
  { route: "CN → US · 洛杉矶 (USLAX)", avgDays: 47, onTime: 90, ocean: 25, customs: 2, drayage: 1 },
  { route: "VN → US · 纽约 (USNYC)", avgDays: 72, onTime: 75, ocean: 31, customs: 3, drayage: 2 },
];

export const upcomingArrivals = [
  { date: "Jun 15", count: 3, detail: "USSAV ×2 · USNYC ×1", note: "已到港" },
  { date: "Jun 17", count: 2, detail: "USSAV ×2" },
  { date: "Jun 22", count: 4, detail: "USLAX ×3 · USSAV ×1" },
  { date: "Jun 24", count: 2, detail: "USLAX ×2" },
  { date: "Jul 02", count: 1, detail: "USNYC ×1" },
];

export const routeDistribution = [
  { route: "VNHPH → USSAV", value: "$2.82M", tickets: 18, percent: 43 },
  { route: "CNSHA → USLAX", value: "$2.19M", tickets: 14, percent: 33 },
  { route: "VNSGN → USNYC", value: "$940K", tickets: 6, percent: 14 },
  { route: "CNSHA → USLGB", value: "$630K", tickets: 4, percent: 10 },
];

export const topSuppliers = [
  { name: "WIN WIN CORP", country: "VN", avgDays: 68, onTime: 88, tickets: 8, value: "$648K" },
  { name: "SHENZHEN TECH MFG", country: "CN", avgDays: 47, onTime: 92, tickets: 5, value: "$452K" },
  { name: "VN FURNITURE EXPORT", country: "VN", avgDays: 72, onTime: 75, tickets: 4, value: "$228K" },
  { name: "SUZHOU YOUI FOODS", country: "CN", avgDays: 55, onTime: 90, tickets: 3, value: "$184K" },
];

export const monthlyTrends = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  batches: [35, 38, 42, 48, 52, 42],
  onTimeRate: [80, 78, 78, 76, 72, 74],
  avgLeadTime: [39, 40, 40, 38, 39, 40],
  dutyRate: [8.8, 8.6, 8.9, 8.4, 8.2, 8.1],
};
