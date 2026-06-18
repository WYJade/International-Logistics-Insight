export { shipmentCards } from "./shipments";
export type { Shipment, ShipmentCard, Phase, Status, TimelineEvent, KeyInfo } from "./shipments";
export { shipmentWHSU } from "./shipment-whsu";
export { shipmentMSCU } from "./shipment-mscu";
export { shipmentHLXU } from "./shipment-hlxu";

import { shipmentWHSU } from "./shipment-whsu";
import { shipmentMSCU } from "./shipment-mscu";
import { shipmentHLXU } from "./shipment-hlxu";
import { Shipment } from "./shipments";

export const shipmentsMap: Record<string, Shipment> = {
  WHSU8555505: shipmentWHSU,
  MSCU7234891: shipmentMSCU,
  HLXU3456789: shipmentHLXU,
};
