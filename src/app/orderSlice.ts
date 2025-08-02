import type {
  Cake,
  Customer,
  Design,
  OrderData,
  // PhotoOption,
  Shape,
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

    // updateCake: (
    //   state,
    //   action: PayloadAction<Partial<Cake> & { id: number }>
    // ) => {
    //   console.log("Updating in slice:", action.payload);
    //   state.selectedCakes = state.selectedCakes.map((cake) =>
    //     cake.id === action.payload.id ? { ...cake, ...action.payload } : cake
    //   );
    // },

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
    // updateCakePhotoOption: (
    //   state,
    //   action: PayloadAction<{
    //     cakeId: number;
    //     photoOption: Partial<PhotoOption>;
    //   }>
    // ) => {
    //   const { cakeId, photoOption } = action.payload;
    //   const cakeIndex = state.selectedCakes.findIndex(
    //     (cake) => cake.id === cakeId
    //   );
    //   if (cakeIndex >= 0) {
    //     state.selectedCakes[cakeIndex].photoOption = {
    //       ...state.selectedCakes[cakeIndex].photoOption,
    //       ...photoOption,
    //     } as PhotoOption;
    //   }
    // },

    /////////////////
    // setInscription: (state, action: PayloadAction<string>) => {
    //   state.inscription = action.payload;
    // },
    // setSelectedDesigns: (state, action: PayloadAction<Design[]>) => {
    //   state.selectedDesigns = action.payload;
    // },
    // setPhotoOption: (state, action: PayloadAction<PhotoOption>) => {
    //   state.photoOption = action.payload;
    // },
    // setBasePrice: (state, action: PayloadAction<number>) => {
    //   state.basePrice = action.payload;
    // },

    setSalesExecutive: (state, action: PayloadAction<string>) => {
      state.salesExecutive = action.payload;
    },
    setDeliveryDate: (state, action: PayloadAction<string>) => {
      state.deliveryDate = action.payload;
    },
    setDeliveryTime: (state, action: PayloadAction<string>) => {
      state.deliveryTime = action.payload;
    },
    setDeliveryAddress: (state, action: PayloadAction<string>) => {
      state.deliveryAddress = action.payload;
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
  ],
  (
    selectedCustomer,
    selectedCakes,
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    salesExecutive
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
          cakeErrors.push(`Item ${index + 1}: Flavor must be selected`);
        }

        if (!cake.cakeShapeId) {
          cakeErrors.push(`Item ${index + 1}: Shape must be selected`);
        }

        if (!cake.quantity || cake.quantity <= 0) {
          cakeErrors.push(`Item ${index + 1}: Quantity must be greater than 0`);
        }

        if (cake.price <= 0) {
          cakeErrors.push(`Item ${index + 1}: Invalid price`);
        }

        return cakeErrors;
      })
      .flat();

    errors.push(...cakeValidationErrors);

    // // Check required fields
    // if (!deliveryDate.trim()) {
    //   errors.push("Delivery date is required");
    // }

    // if (!deliveryTime.trim()) {
    //   errors.push("Delivery time is required");
    // }

    // if (!deliveryAddress.trim()) {
    //   errors.push("Delivery address is required");
    // }

    // if (!salesExecutive.trim()) {
    //   errors.push("Sales executive is required");
    // }
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
} = orderSlice.actions;

export default orderSlice.reducer;
