/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import orderService from "@/api/orders";

///sample data

const initialState: OrderData = {
  selectedCustomer: null,
  customers: [],
  cakes: [],
  selectedCakes: [],
  designs: [],
  shapes: [],
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
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.orderBackup = action.payload;
      //debugger;
      // return action.payload;
    },
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

      const formattedDate = convertDateFormat(action.payload);
      state.deliveryDate = formattedDate;
      console.log("Converted date:", formattedDate);
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
      action: PayloadAction<{ id: number; order: Order }>
    ) => {
      console.log("order status update XXX", action.payload);

      // const ord = state.orders.find((order) => order.id === action.payload.id);
      // console.log("order status update YYY", ord);
      // state.orders = state.orders.map((order) =>
      //   order.id === action.payload.id ? action.payload.order : order
      // );

      // const { id, status } = action.payload;
      // state.orders = state.orders.map((order) =>
      //   order.id === id ? { ..., order,  } : order
      // );
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

      // If both filters are "all", show all orders
      if (status === "all" && priority === "all") {
        state.orders = state.orderBackup;
        return;
      }

      // Filter based on the selected criteria
      state.orders = state.orderBackup.filter((order) => {
        const statusMatch = status === "all" || order.orderStatus === status;
        const priorityMatch = priority === "all" || order.priority === priority;

        // Both conditions must be true (if a filter is not "all", it must match)
        return statusMatch && priorityMatch;
      });
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
    // Handle fetchOrders
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.orderBackup = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle updateOrderStatus
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { id, order } = action.payload;
        // Update the order in both orders and orderBackup arrays
        state.orders = state.orders.map((existingOrder) =>
          existingOrder.id === id ? order : existingOrder
        );
        state.orderBackup = state.orderBackup.map((existingOrder) =>
          existingOrder.id === id ? order : existingOrder
        );
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle createOrder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.orderBackup.push(action.payload);
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Async thunks.........

export const fetchOrdersThunk = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await orderService.fetchOrders();
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch orders");
    }
  }
);

// Async thunk for updating order status
export const updateOrderStatusThunk = createAsyncThunk(
  "order/updateOrderStatus",
  async (
    { id, status }: { id: number; status: OrderStatus },
    { rejectWithValue }
  ) => {
    try {
      const updatedOrder = await orderService.updateOrder(id, {
        orderStatus: status,
      });
      return { id, order: updatedOrder };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update order status");
    }
  }
);

// Async thunk for creating a new order
export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { order: OrderData };
      const orderState = state.order;

      // Validate form before creating order
      const validation = selectIsFormValid(state);
      if (!validation.isValid) {
        return rejectWithValue(
          `Validation failed: ${validation.errors.join(", ")}`
        );
      }

      // Calculate totals
      const grandTotal = selectGrandTotal(state);
      const remainingBalance = selectRemainingBalance(state);

      // Prepare order data from Redux state
      const orderData: Omit<Order, "id"> = {
        customer: orderState.selectedCustomer!,
        cakes: orderState.selectedCakes,
        deliveryDate: orderState.deliveryDate,
        deliveryTime: orderState.deliveryTime,
        deliveryAddress: orderState.deliveryAddress,
        deliveryMode: orderState.deliveryMode,
        salesExecutive: orderState.salesExecutive,
        advancePayment: orderState.advancePayment,
        totalAmount: grandTotal,
        remainingBalance: remainingBalance,
        paymentStatus: "paid",
        paymentMode: "cash",

        notes: "",
        updatedAt: new Date().toISOString(),
        orderStatus: OrderStatus.PENDING, // Default status
        priority: "normal", // Default priority
        orderNumber: await generateOrderNumber(),
        createdAt: new Date().toISOString(),
      };

      const newOrder = await orderService.createOrder(orderData);
      return newOrder;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create order");
    }
  }
);

const generateOrderNumber = async () => {
  // const state = getState() as { order: OrderData };
  const orders = await orderService.fetchOrders();

  const lastOrder = orders[orders.length - 1];
  const orderNumberAsNumber = parseInt(lastOrder.orderNumber);
  return (orderNumberAsNumber + 1).toString();
};

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

        if (!cake.cakeId || cake.cakeId === 0) {
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
const allOrders = createSelector(
  (state: { order: OrderData }) => state.order.orders,
  (orders) => orders
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
