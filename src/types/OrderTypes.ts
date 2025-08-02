export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

// export interface PhotoOption {
//   enabled: boolean;
//   size: "half" | "full";
//   file: File | null;
// }

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
