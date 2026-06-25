import { useState } from "react";
import { OverviewTab } from "../components/tabs/OverviewTab";
import { JourneyTrackingTab } from "../components/tabs/JourneyTrackingTab";

type Tab = "insights" | "journey";

export function InsightPage() {
  const [activeTab, setActiveTab] = useState<Tab>("insights");

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">
          International Logistics Insight · End-to-End
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          供应商发货 → 国际海运 → 报关清关 → Drayage 短驳 → 仓储入库 · 全链路可视化分析
        </p>
      </div>

      {/* Tabs + Content as one integrated block */}
      <div>
        {/* Tab Buttons */}
        <div className="flex items-end gap-0">
          <TabButton
            active={activeTab === "insights"}
            onClick={() => setActiveTab("insights")}
            title="End-to-End Insights"
            subtitle="运营概览 · 链路统计 · 时效 / 财务"
          />
          <TabButton
            active={activeTab === "journey"}
            onClick={() => setActiveTab("journey")}
            title="Journey Tracking"
            subtitle="按单号 / 客户 / 供应商查询详情"
          />
        </div>

        {/* Content Panel */}
        <div className="rounded-b-2xl rounded-tr-2xl border border-gray-200 bg-white shadow-sm p-6">
          {activeTab === "insights" && (
            <OverviewTab onNavigateToJourney={() => setActiveTab("journey")} />
          )}
          {activeTab === "journey" && (
            <JourneyTrackingTab onNavigateToInsights={() => setActiveTab("insights")} />
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 text-left transition-all rounded-t-xl border border-b-0 ${
        active
          ? "bg-white border-gray-200 text-violet-700 z-10 -mb-px"
          : "bg-gray-50 border-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className={`text-sm font-semibold ${active ? "text-violet-700" : ""}`}>{title}</div>
      <div className="text-[10px] text-gray-400 mt-0.5">{subtitle}</div>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
      )}
    </button>
  );
}
