import CustomerDetails from "@/components/features/CustomerDetails";
import DeliveryAddress from "@/components/features/DeliveryAddress";
import Header from "@/components/features/Header";
import ItemConfiguration from "@/components/features/ItemConfiguration";
import PaymentDetails from "@/components/features/PaymentDetails";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchInitialData } from "@/app/orderSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  const initialDataFetched = useAppSelector(
    (state) => state.order.initialDataFetched
  );

  useEffect(() => {
    console.log("XXXXXXX");
    if (!initialDataFetched) {
      console.log("ZZZZZZZ");
      dispatch(fetchInitialData());
    }
  }, [initialDataFetched, dispatch]);

  // useEffect(() => {
  //   dispatch(fetchInitialData());
  // }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-4  ">
      <div className="max-w-3xl mx-auto ">
        <div className="grid gap-6  ">
          <Header />
          <CustomerDetails />
          <ItemConfiguration />
          <PaymentDetails />
          <DeliveryAddress />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
