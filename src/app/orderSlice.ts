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
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchOrders, updateOrder } from "@/api/orders";

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
  orders: [],
  orderBackup: [],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
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

    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.orderBackup = action.payload;
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
      const term = action.payload.toLowerCase();
      if (!term || term === "") {
        state.orders = state.orderBackup;
        return;
      }
      state.orders = state.orderBackup.filter(
        (order) =>
          order.customer.name.toLowerCase().includes(term) ||
          order.customer.phone?.toLowerCase().startsWith(term) ||
          order.orderNumber.toLowerCase().includes(term) ||
          order.orderStatus.toLowerCase().startsWith(term) ||
          order.priority.toLowerCase().startsWith(term)
      );
    },

    filterOrdersByStatusAndPriority: (
      state,
      action: PayloadAction<{ status: string; priority: string }>
    ) => {
      const { status, priority } = action.payload;
      if (status === "all" && priority === "all") {
        state.orders = state.orderBackup;
        return;
      }
      state.orders = state.orderBackup.filter(
        (order) => order.orderStatus === status && order.priority === priority
      );
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        console.log("payload  in fetchOrdersThunk pending:");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        console.log("payload  in fetchOrdersThunk fulfilled:", action.payload);
        state.loading = false;
        state.orders = action.payload;
        state.orderBackup = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        console.log("payload  in fetchOrdersThunk rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      //// update extra reducers
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = false;
        state.error = null;

        console.log("payload  in updateOrderStatusThunk pending:");
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        console.log("payload  in updateOrderStatusThunk fulfilled:", action);

        const { id, orderStatus } = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === id ? { ...order, orderStatus: orderStatus } : order
        );
        state.orderBackup = state.orderBackup.map((order) =>
          order.id === id ? { ...order, orderStatus: orderStatus } : order
        );
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/////////////////////////// Thunks /////////////////////////

export const fetchOrdersThunk = createAsyncThunk(
  "fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrders();
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   dispatch(setLoading(true));
    //   const orders = await fetchOrders();
    //   dispatch(setOrders(orders));
    //   dispatch(setLoading(false));
    // } catch (error: unknown) {
    //   dispatch(setLoading(false));
    //   console.log("Thunk error:", error);
    //   return rejectWithValue(error.message);
    // }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "updateStatus",
  async (
    { id, status }: { id: number; status: OrderStatus },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // In a real app, you would call your API here
      const response = await updateOrder(id, { orderStatus: status });
      dispatch(updateOrderStatus({ id, status }));
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update order status";
      return rejectWithValue(message);
    }
  }
);

////////////// Thunks Ends //////////////

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
  searchOrders,
  setError,
  setLoading,
  setOrders,

  filterOrdersByStatusAndPriority,
} = orderSlice.actions;

export default orderSlice.reducer;
