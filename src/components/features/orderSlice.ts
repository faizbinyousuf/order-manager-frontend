import type { Cake, Customer, OrderData, Shape } from "@/types/OrderTypes";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";

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

const flavors: Cake[] = [
  {
    id: 1,
    name: "Vanilla",
    price: 50,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
  },
  {
    id: 2,
    name: "Chocolate",
    price: 60,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
  },
  {
    id: 3,
    name: "Strawberry",
    price: 55,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
  },
  {
    id: 4,
    name: "Lemon",
    price: 45,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
  },
  {
    id: 5,
    name: "Mint",
    price: 40,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
  },
  {
    id: 6,
    name: "Raspberry",
    price: 55,
    searchCode: null,
    quantity: 0,
    flavorId: 0,
    halfPhoto: false,
    fullPhoto: false,
    cakeShapeId: null,
    selectedDesignChargeIds: [],
    additionalDesign: "",
    customDesignCharge: 0,
    inscription: "",
    notes: "",
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
    setAdvancePayment: (state, action: PayloadAction<number>) => {
      state.advancePayment = action.payload;
    },
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
} = orderSlice.actions;

export default orderSlice.reducer;
