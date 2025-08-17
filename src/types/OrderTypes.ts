export type Priority = "urgent" | "normal" | "low" | "medium" | "high";
export type PaymentMode = "cash" | "card" | "UPI";
export const OrderStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  IN_PROGRESS: "in_progress",
  REJECTED: "rejected",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

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

export interface Order {
  id: number;
  orderNumber: string;
  customer: Customer;
  cakes: Cake[];

  // Delivery fields
  deliveryMode: DeliveryMode;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;

  // Payment fields
  totalAmount: number;
  advancePayment: number;
  remainingBalance: number;
  paymentStatus: "pending" | "partial" | "paid";
  paymentMode: PaymentMode;

  // Other fields
  orderStatus: OrderStatus;
  priority: Priority;
  salesExecutive: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface OrderData {
  selectedCustomer: Customer | null;
  customers: Customer[];
  cakes: Cake[];
  selectedCakes: Cake[];
  shapes: Shape[];
  designs: Design[];
  advancePayment: number;
  totalAmount: number;
  remainingBalance: number;

  salesExecutive: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  deliveryMode: DeliveryMode;

  orders: Order[];
  orderBackup: Order[];

  loading: boolean;
  error: string | null;
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
  file: string;
}

export interface Shape {
  id: number;
  name: string;
}
