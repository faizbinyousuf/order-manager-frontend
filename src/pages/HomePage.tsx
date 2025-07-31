import CustomerDetails from "@/components/features/CustomerDetails";
import DeliveryAddress from "@/components/features/DeliveryAddress";
import ItemConfiguration from "@/components/features/ItemConfiguration";
import PaymentDetails from "@/components/features/PaymentDetails";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200 p-4  ">
      <div className="max-w-3xl mx-auto ">
        <div className="grid gap-6  ">
          <CustomerDetails />
          <ItemConfiguration />
          {/* <DesignSelection /> */}
          {/* <PhotoPrint /> */}
          <PaymentDetails />
          <DeliveryAddress />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
