import {
  DeliveryMode,
  OrderStatus,
  type Cake,
  type Customer,
  type Design,
  type Order,
  type OrderData,
  // PhotoOption,
  type Shape,
} from "@/types/OrderTypes";
import {
  createSelector,
  createSlice,
  current,
  type PayloadAction,
} from "@reduxjs/toolkit";

const customers = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1234567890",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1234567891",
    email: "sarah@example.com",
  },
  {
    id: "3",
    name: "Mike Davis",
    phone: "+1234567892",
    email: "mike@example.com",
  },
];
const designs: Design[] = [
  {
    id: 1,
    name: "Floral Pattern",
    price: 25,
    image: "https://picsum.photos/200/100",
  },
  {
    id: 2,
    name: "Geometric Pattern",
    price: 30,
    image: "https://picsum.photos/200/100",
  },
  {
    id: 3,
    name: "Abstract Pattern",
    price: 20,
    image: "https://picsum.photos/200/100",
  },
  {
    id: 4,
    name: "Floral Pattern",
    price: 25,
    image: "https://picsum.photos/200/100",
  },
  {
    id: 5,
    name: "Geometric Pattern",
    price: 30,
    image: "https://picsum.photos/200/100",
  },
  {
    id: 6,
    name: "Abstract Pattern",
    price: 20,
    image: "https://picsum.photos/200/100",
  },
];
const flavors: Cake[] = [
  {
    id: 1,
    name: "Vanilla",
    price: 600,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
  {
    id: 2,
    name: "Chocolate",
    price: 650,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
  {
    id: 3,
    name: "Strawberry",
    price: 700,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
  {
    id: 4,
    name: "Lemon",
    price: 750,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
  {
    id: 5,
    name: "Mint",
    price: 800,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
  {
    id: 6,
    name: "Raspberry",
    price: 850,
    searchCode: null,
    quantity: 1,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
    file: "",
    //photoOption: null,
  },
];

const shapes: Shape[] = [
  {
    id: 1,
    name: "Heart",
  },
  {
    id: 2,
    name: "Square",
  },
  {
    id: 3,
    name: "Circle",
  },
  {
    id: 4,
    name: "Rectangle",
  },
  {
    id: 5,
    name: "Custom",
  },
];

///sample data

export const sampleOrders: Order[] = [
  {
    id: 1,
    orderNumber: "116852",
    customer: {
      id: "cust-001",
      name: "Rahul Sharma Rahul Sharma ",
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
    orderNumber: "116852",
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
    orderNumber: "116854",
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
        selectedDesignChargeIds: [5],
        additionalDesign: "Graduation",
        customDesignCharge: 500,
        inscription: "Congratulations Dr. Reddy!",
        notes: "Eggless, with extra chocolate toppings",
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
        inscription: "Happy Birthday",
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
    orderNumber: "116855",
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
    orderNumber: "116856",
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
  {
    id: 6,
    orderNumber: "116857",
    customer: {
      id: "cust-005",
      name: "Faiz Yusuf",
      phone: "+918606654906",
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
        notes: "",
        file: "",
      },
      {
        id: 104,
        name: "Cheesecake",
        searchCode: "CC-004",
        price: 900,
        quantity: 1,
        halfPhoto: false,
        fullPhoto: false,
        flavorId: 4,
        cakeShapeId: null,
        selectedDesignChargeIds: [],
        additionalDesign: "",
        customDesignCharge: 0,
        inscription: "",
        notes: "",
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
    salesExecutive: "Malik",
    createdAt: "2023-12-15T09:45:00Z",
    updatedAt: "2023-12-22T17:30:00Z",
  },
  {
    id: 7,
    orderNumber: "116858",
    customer: {
      id: "cust-005",
      name: "Faiz Yusuf",
      phone: "+918606654906",
    },
    cakes: [
      {
        id: 106,
        name: "Butterscotch",
        searchCode: "BS-006",
        price: 950,
        quantity: 10,
        halfPhoto: false,
        fullPhoto: false,
        flavorId: 6,
        cakeShapeId: 1,
        selectedDesignChargeIds: [],
        additionalDesign: "",
        customDesignCharge: 0,
        inscription: "",
        notes: "10 x 1Kg cakes",
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
    orderStatus: OrderStatus.PENDING,
    priority: "medium",
    salesExecutive: "Malik",
    createdAt: "2023-12-15T09:45:00Z",
    updatedAt: "2023-12-22T17:30:00Z",
  },
  {
    id: 8,
    orderNumber: "116859",
    customer: {
      id: "cust-005",
      name: "Faiz Yusuf",
      phone: "+918606654906",
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
        notes: "",
        file: "",
      },
      {
        id: 106,
        name: "Mango Vanilla",
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
        notes: "",
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
    orderStatus: OrderStatus.CANCELLED,
    priority: "medium",
    salesExecutive: "Malik",
    createdAt: "2023-12-15T09:45:00Z",
    updatedAt: "2023-12-22T17:30:00Z",
  },
];

const initialState: OrderData = {
  selectedCustomer: null,
  customers: customers,
  cakes: flavors,
  selectedCakes: [],
  designs: designs,
  shapes: shapes,
  advancePayment: 0,
  salesExecutive: "",
  deliveryDate: "",
  deliveryTime: "",
  deliveryAddress: "",
  deliveryMode: DeliveryMode.TAKEAWAY,
  totalAmount: 0,
  remainingBalance: 0,
  orders: sampleOrders,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    setCakes: (state, action: PayloadAction<Cake[]>) => {
      state.cakes = action.payload;
    },
    setShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = action.payload;
    },
    addSelectedCake: (state, action: PayloadAction<Cake>) => {
      state.selectedCakes.push(action.payload);
    },
    removeCakeSelection(state, action: PayloadAction<number>) {
      state.selectedCakes = state.selectedCakes.filter(
        (cake) => cake.id !== action.payload
      );
    },

    updateInscription: (
      state,
      action: PayloadAction<{ id: number; inscription: string }>
    ) => {
      state.cakes = state.cakes.map((cake) =>
        cake.id === action.payload.id
          ? { ...cake, inscription: action.payload.inscription }
          : cake
      );
    },

    updateCake: (
      state,
      action: PayloadAction<{
        index: number;
        changes: Partial<Cake>;
      }>
    ) => {
      const { index, changes } = action.payload;
      console.log("payload   in slice:", index, changes);
      state.selectedCakes[index] = {
        ...state.selectedCakes[index],
        ...changes,
      };
      console.log("Updated   in slice:", state.selectedCakes[index]);
      console.log("Current all in slice:", current(state.selectedCakes));
    },
    setAdvancePayment: (state, action: PayloadAction<number>) => {
      state.advancePayment = action.payload;
    },

    setDeliveryMode: (state, action: PayloadAction<DeliveryMode>) => {
      state.deliveryMode = action.payload;
    },

    setSalesExecutive: (state, action: PayloadAction<string>) => {
      console.log("Sales executive in slice:", action.payload);
      state.salesExecutive = action.payload;
    },
    setDeliveryDate: (state, action: PayloadAction<string>) => {
      console.log("Delivery date in slice:", action.payload);
      state.deliveryDate = action.payload;
    },
    setDeliveryTime: (state, action: PayloadAction<string>) => {
      console.log("Delivery time in slice:", action.payload);
      state.deliveryTime = action.payload;
    },
    setDeliveryAddress: (state, action: PayloadAction<string>) => {
      console.log("Delivery address in slice:", action.payload);
      state.deliveryAddress = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: number; status: OrderStatus }>
    ) => {
      console.log("order status update", action.payload);
      const { id, status } = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === id ? { ...order, orderStatus: status } : order
      );
    },
    searchOrders: (state, action: PayloadAction<string>) => {
      console.log("search query in slice:", action.payload);
      state.orders = state.orders.filter((order) => {});
    },

    resetOrder: (state) => {
      state.selectedCustomer = null;
      state.customers = [];
      state.cakes = [];
      state.shapes = [];
      state.selectedCakes = [];
      state.advancePayment = 0;
      state.salesExecutive = "";
      state.deliveryDate = "";
      state.deliveryTime = "";
      state.deliveryAddress = "";
    },
  },
});

// Selector to check if the order form is valid
export const selectIsFormValid = createSelector(
  [
    (state: { order: OrderData }) => state.order.selectedCustomer,
    (state: { order: OrderData }) => state.order.selectedCakes,
    (state: { order: OrderData }) => state.order.deliveryDate,
    (state: { order: OrderData }) => state.order.deliveryTime,
    (state: { order: OrderData }) => state.order.deliveryAddress,
    (state: { order: OrderData }) => state.order.salesExecutive,
    (state: { order: OrderData }) => state.order.deliveryMode,
  ],
  (
    selectedCustomer,
    selectedCakes,
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    salesExecutive,
    deliveryMode
  ) => {
    // Check if customer is selected
    if (!selectedCustomer) {
      return { isValid: false, errors: ["Customer must be selected"] };
    }

    // Check if at least one cake is selected
    if (selectedCakes.length === 0) {
      return { isValid: false, errors: ["At least one item must be added"] };
    }

    const errors: string[] = [];

    // Validate each cake
    const cakeValidationErrors = selectedCakes
      .map((cake, index) => {
        const cakeErrors: string[] = [];

        if (!cake.flavorId || cake.flavorId === 0) {
          cakeErrors.push(`item${index + 1}: Flavor must be selected`);
        }

        if (!cake.cakeShapeId) {
          cakeErrors.push(`item${index + 1}: Shape must be selected`);
        }

        if (!cake.quantity || cake.quantity <= 0) {
          cakeErrors.push(`item${index + 1}: Quantity must be greater than 0`);
        }

        if (cake.price <= 0) {
          cakeErrors.push(`item${index + 1}: Invalid price`);
        }

        return cakeErrors;
      })
      .flat();

    errors.push(...cakeValidationErrors);

    // // Check required fields
    if (!deliveryDate.trim()) {
      errors.push("Delivery date is required");
    }

    if (!deliveryTime.trim()) {
      errors.push("Delivery time is required");
    }

    if (deliveryMode === "home_delivery" && !deliveryAddress.trim()) {
      errors.push("Delivery address is required");
    }

    // if (!deliveryAddress.trim()) {
    //   errors.push("Delivery address is required");
    // }
    if (!salesExecutive.trim()) {
      errors.push("Sales executive is required");
    }
    console.log("ERRORS", errors);

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
);

export const selectIsFormValidBoolean = createSelector(
  [selectIsFormValid],

  (validation) => validation.isValid
);

export const selectCakeTotal = createSelector(
  [
    (state: { order: OrderData }) => state.order.designs,
    (_: unknown, cake: Cake) => cake,
  ],
  (designs, cake) => {
    // Base cake price
    let total = cake.price * cake.quantity;

    // Photo charges
    if (cake.halfPhoto) {
      total += 100;
    } else if (cake.fullPhoto) {
      total += 200;
    }

    // Design charges
    const designCharges = cake.selectedDesignChargeIds.reduce(
      (sum, designId) => {
        const design = designs.find((d) => d.id === designId);
        return sum + (design?.price || 0);
      },
      0
    );

    total += designCharges;

    // Additional custom design charge
    total += cake.customDesignCharge;

    return total;
  }
);

// Selector to calculate grand total for all selected cakes
export const selectGrandTotal = createSelector(
  [
    (state: { order: OrderData }) => state.order.selectedCakes,
    (state: { order: OrderData }) => state.order.designs,
  ],
  (selectedCakes, designs) => {
    return selectedCakes.reduce((grandTotal, cake) => {
      // Base cake price
      let cakeTotal = cake.price * cake.quantity;

      // Photo charges
      if (cake.halfPhoto) {
        cakeTotal += 100;
      } else if (cake.fullPhoto) {
        cakeTotal += 200;
      }

      // Design charges
      const designCharges = cake.selectedDesignChargeIds.reduce(
        (sum, designId) => {
          const design = designs.find((d) => d.id === designId);
          return sum + (design?.price || 0);
        },
        0
      );

      cakeTotal += designCharges;

      // Additional custom design charge
      cakeTotal += cake.customDesignCharge * cake.quantity;

      return grandTotal + cakeTotal;
    }, 0);
  }
);

// Selector to get total with advance payment
export const selectRemainingBalance = createSelector(
  [
    selectGrandTotal,
    (state: { order: OrderData }) => state.order.advancePayment,
  ],
  (grandTotal, advancePayment) => grandTotal - advancePayment
);

export const {
  setCustomer,
  setCakes,
  setShapes,
  addCustomer,
  addSelectedCake,
  updateCake,
  updateInscription,
  removeCakeSelection,
  resetOrder,
  setAdvancePayment,
  setDeliveryAddress,
  setDeliveryDate,
  setDeliveryTime,
  setSalesExecutive,
  setDeliveryMode,
  updateOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
