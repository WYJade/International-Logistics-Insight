import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { shipmentCards, shipmentsMap } from "../../data";
import { ShipmentDetail } from "../journey/ShipmentDetail";

export function JourneyTrackingTab() {
  const [selectedId, setSelectedId] = useState<string>(shipmentCards[0].id);
  const selectedShipment = shipmentsMap[selectedId];

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="输入 Container No / Shipment No / HBL / MBL / 客户名 / 供应商名 查询供应链全链路数据..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all"
        />
      </div>

      {/* Search Hint */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 px-1">
        <span>可输入：Container No · e.g. WHSU8555505</span>
        <span>MBL · e.g. 039GX40070</span>
        <span>HBL · e.g. SSGNS2607829</span>
        <span>Shipment No · e.g. SSHAS2608072</span>
        <span>客户/供应商名 · e.g. ADOORN LLC</span>
      </div>

      {/* Shipment Selector + Detail — integrated container */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {/* Selector Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/80">
          {shipmentCards.map((card) => {
            const isActive = card.id === selectedId;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedId(card.id)}
                className={`relative flex-1 px-4 py-3.5 text-left transition-all duration-200 border-r last:border-r-0 border-gray-200 ${
                  isActive
                    ? "bg-white shadow-[inset_0_-2px_0_0_#7c3aed]"
                    : "hover:bg-gray-100/80"
                }`}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <div className="absolute top-2.5 left-2 h-2 w-2 rounded-full bg-violet-500" />
                )}
                <div className="flex items-center gap-1.5 pl-2">
                  <MapPin className={`h-3 w-3 shrink-0 ${isActive ? "text-violet-500" : "text-gray-400"}`} />
                  <span className={`text-xs leading-tight ${isActive ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                    {card.route}
                  </span>
                </div>
                <div className={`mt-1 pl-2 text-sm font-mono font-semibold ${isActive ? "text-violet-700" : "text-gray-500"}`}>
                  {card.containerNo}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Section */}
        <div className="bg-white p-6">
          {selectedShipment && <ShipmentDetail shipment={selectedShipment} />}
        </div>
      </div>
    </div>
  );
}
