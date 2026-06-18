export type Phase = "supplier" | "ocean" | "customs" | "drayage" | "wms";
export type Status = "completed" | "in-progress" | "pending";

export interface ShipmentCard {
  id: string;
  containerNo: string;
  route: string;
  routeFrom: string;
  routeTo: string;
}

export interface TimelineEvent {
  phase: Phase;
  phaseLabel: string;
  phaseLabelEn: string;
  source: string;
  duration: string;
  status: Status;
  refNumbers?: string;
  events: {
    title: string;
    date: string;
    isEstimated?: boolean;
    description: string;
    refLabel?: string;
    refValue?: string;
  }[];
}

export interface KeyInfo {
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  fields: { label: string; value: string }[];
}

export interface DutyLine {
  line: number;
  hts: string;
  description: string;
  qty: string;
  value: string;
  duty: string;
  rate: string;
  origin: string;
}

export interface WmsItem {
  sku: string;
  product: string;
  spec: string;
  expected: number;
  received?: number;
  unit: string;
  status?: string;
}

export interface DrayageRecord {
  loadNo: string;
  status: string;
  container: string;
  pickup: string;
  destination: string;
  eta: string;
  isCurrent?: boolean;
}

export interface Shipment {
  id: string;
  customer: string;
  statusLabel: string;
  statusColor: string;
  routeFull: string;
  vesselInfo: string;
  supplierInfo: string;
  receiverInfo: string;
  containerNo: string;
  hbl: string;
  mbl: string;
  cargoValue: string;
  duty: string;
  dutyNote: string;
  weight: string;
  weightNote: string;
  progress: number;
  progressNote: string;
  timeline: TimelineEvent[];
  keyInfo: KeyInfo[];
  dutyDetail: {
    title: string;
    status: string;
    cargoValue: string;
    totalDuty: string;
    mpf: string;
    hmf?: string;
    otherSurcharge?: string;
    lines: DutyLine[];
  };
  wmsItems: WmsItem[];
  drayageRecords: DrayageRecord[];
}

export const shipmentCards: ShipmentCard[] = [
  {
    id: "WHSU8555505",
    containerNo: "WHSU8555505",
    route: "Haiphong, VN (VNHPH) → Savannah, US (USSAV)",
    routeFrom: "VNHPH",
    routeTo: "USSAV",
  },
  {
    id: "MSCU7234891",
    containerNo: "MSCU7234891",
    route: "Shanghai, CN (CNSHA) → Los Angeles, US (USLAX · 2704)",
    routeFrom: "CNSHA",
    routeTo: "USLAX",
  },
  {
    id: "HLXU3456789",
    containerNo: "HLXU3456789",
    route: "Ho Chi Minh City, VN (VNSGN) → New York, US (USNYC · 1001)",
    routeFrom: "VNSGN",
    routeTo: "USNYC",
  },
];
