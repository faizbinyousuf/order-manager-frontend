export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export const DeliveryMode = {
  HOME_DELIVERY: "home_delivery",
  TAKEAWAY: "takeaway",
} as const;
export type DeliveryMode = (typeof DeliveryMode)[keyof typeof DeliveryMode];
// export type DeliveryMode = "home_delivery" | "takeaway";

export interface OrderData {
  selectedCustomer: Customer | null;
  customers: Customer[];
  cakes: Cake[];
  selectedCakes: Cake[];
  shapes: Shape[];
  designs: Design[];
  advancePayment: number;
  salesExecutive: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  deliveryMode: DeliveryMode;
}

export interface Design {
  id: number;
  name: string;
  price: number;
  image: string;
}
export interface Cake {
  id: number;
  name: string;
  searchCode: string | null;
  price: number;
  quantity: number;
  halfPhoto: boolean;
  fullPhoto: boolean;
  flavorId: number;
  cakeShapeId: number | null;
  selectedDesignChargeIds: number[];
  additionalDesign: string;
  customDesignCharge: number;
  inscription: string;
  notes: string;
  // photoOption:PhotoOption | null
}

export interface Shape {
  id: number;
  name: string;
}
