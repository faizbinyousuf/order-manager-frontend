import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;

export default store;
