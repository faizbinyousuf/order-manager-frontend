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

///sample data

export const sampleOrders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2023-001",
    customer: {
      id: "cust-001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+919876543210",
    },
    cakes: [
      {
        id: 101,
        name: "Chocolate Truffle",
        searchCode: "CT-001",
        price: 1200,
        quantity: 1,
        halfPhoto: false,
        fullPhoto: true,
        flavorId: 1,
        cakeShapeId: 2,
        selectedDesignChargeIds: [1, 3],
        additionalDesign: "Birthday Theme",
        customDesignCharge: 300,
        inscription: "Happy Birthday Riya!",
        notes: "Add extra chocolate shavings",
        file: "design1.jpg",
      },
    ],
    deliveryMode: DeliveryMode.HOME_DELIVERY,
    deliveryDate: "2023-12-25",
    deliveryTime: "14:00 PM",
    deliveryAddress: "12, MG Road, Bangalore",
    totalAmount: 1500,
    advancePayment: 500,
    remainingBalance: 1000,
    paymentStatus: "partial",
    paymentMode: "UPI",
    orderStatus: OrderStatus.ACCEPTED,
    priority: "high",
    salesExecutive: "Priya Patel",
    createdAt: "2023-12-20T10:30:00Z",
    updatedAt: "2023-12-20T10:30:00Z",
    notes: "Customer requested pink roses decoration",
  },
  {
    id: 2,
    orderNumber: "ORD-2023-002",
    customer: {
      id: "cust-002",
      name: "Neha Gupta",
      phone: "+919876543211",
    },
    cakes: [
      {
        id: 102,
        name: "Vanilla Sponge",
        searchCode: "VS-002",
        price: 800,
        quantity: 2,
        halfPhoto: true,
        fullPhoto: false,
        flavorId: 2,
        cakeShapeId: 1,
        selectedDesignChargeIds: [2],
        additionalDesign: "Anniversary",
        customDesignCharge: 200,
        inscription: "Happy Anniversary",
        notes: "",
        file: "design2.jpg",
      },
    ],
    deliveryMode: DeliveryMode.TAKEAWAY,
    deliveryDate: "2023-12-24",
    deliveryTime: "18:00 PM",
    deliveryAddress: "",
    totalAmount: 1800,
    advancePayment: 1800,
    remainingBalance: 0,
    paymentStatus: "paid",
    paymentMode: "cash",
    orderStatus: OrderStatus.IN_PROGRESS,
    priority: "normal",
    salesExecutive: "Amit Singh",
    createdAt: "2023-12-18T14:15:00Z",
    updatedAt: "2023-12-20T09:45:00Z",
  },
  {
    id: 3,
    orderNumber: "ORD-2023-003",
    customer: {
      id: "cust-003",
      name: "Arjun Reddy",
      email: "arjun@yahoo.com",
    },
    cakes: [
      {
        id: 103,
        name: "Red Velvet",
        searchCode: "RV-003",
        price: 1500,
        quantity: 1,
        halfPhoto: true,
        fullPhoto: false,
        flavorId: 3,
        cakeShapeId: 3,
        selectedDesignChargeIds: [3],
        additionalDesign: "Graduation",
        customDesignCharge: 500,
        inscription: "Congratulations Dr. Reddy!",
        notes: "Medical symbol topper required",
        file: "design3.jpg",
      },
      {
        id: 104,
        name: "Cheesecake",
        searchCode: "CC-004",
        price: 900,
        quantity: 1,
        halfPhoto: true,
        fullPhoto: false,
        flavorId: 4,
        cakeShapeId: null,
        selectedDesignChargeIds: [],
        additionalDesign: "",
        customDesignCharge: 0,
        inscription: "",
        notes: "No sugar version",
        file: "",
      },
    ],
    deliveryMode: DeliveryMode.HOME_DELIVERY,
    deliveryDate: "2023-12-26",
    deliveryTime: "19:30 PM",
    deliveryAddress: "45, Jubilee Hills, Hyderabad",
    totalAmount: 2900,
    advancePayment: 1500,
    remainingBalance: 1400,
    paymentStatus: "partial",
    paymentMode: "card",
    orderStatus: OrderStatus.PENDING,
    priority: "urgent",
    salesExecutive: "Priya Patel",
    createdAt: "2023-12-21T16:20:00Z",
    updatedAt: "2023-12-21T16:20:00Z",
  },
  {
    id: 4,
    orderNumber: "ORD-2023-004",
    customer: {
      id: "cust-004",
      name: "Sunita Mehta",
      email: "sunitam@gmail.com",
      phone: "+919876543212",
    },
    cakes: [
      {
        id: 105,
        name: "Black Forest",
        searchCode: "BF-005",
        price: 1100,
        quantity: 1,
        halfPhoto: true,
        fullPhoto: true,
        flavorId: 5,
        cakeShapeId: 2,
        selectedDesignChargeIds: [4],
        additionalDesign: "",
        customDesignCharge: 0,
        inscription: "Happy Retirement!",
        notes: "Extra cherries please",
        file: "design4.jpg",
      },
    ],
    deliveryMode: DeliveryMode.HOME_DELIVERY,
    deliveryDate: "2023-12-23",
    deliveryTime: "12:00 PM",
    deliveryAddress: "78, Sector 15, Gurgaon",
    totalAmount: 1100,
    advancePayment: 0,
    remainingBalance: 1100,
    paymentStatus: "pending",
    paymentMode: "cash",
    orderStatus: OrderStatus.REJECTED,
    priority: "low",
    salesExecutive: "Rajiv Khanna",
    createdAt: "2023-12-17T11:10:00Z",
    updatedAt: "2023-12-19T15:30:00Z",
    notes: "Customer requested delivery date change but wasn't available",
  },
  {
    id: 5,
    orderNumber: "ORD-2023-005",
    customer: {
      id: "cust-005",
      name: "Vikram Joshi",
      phone: "+919876543213",
    },
    cakes: [
      {
        id: 106,
        name: "Butterscotch",
        searchCode: "BS-006",
        price: 950,
        quantity: 3,
        halfPhoto: false,
        fullPhoto: false,
        flavorId: 6,
        cakeShapeId: 1,
        selectedDesignChargeIds: [],
        additionalDesign: "",
        customDesignCharge: 0,
        inscription: "",
        notes: "Office party - simple packaging",
        file: "",
      },
    ],
    deliveryMode: DeliveryMode.TAKEAWAY,
    deliveryDate: "2023-12-22",
    deliveryTime: "16:00 PM",
    deliveryAddress: "",
    totalAmount: 2850,
    advancePayment: 2850,
    remainingBalance: 0,
    paymentStatus: "paid",
    paymentMode: "UPI",
    orderStatus: OrderStatus.COMPLETED,
    priority: "medium",
    salesExecutive: "Amit Singh",
    createdAt: "2023-12-15T09:45:00Z",
    updatedAt: "2023-12-22T17:30:00Z",
  },
];
