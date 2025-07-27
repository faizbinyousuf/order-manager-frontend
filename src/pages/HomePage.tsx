import CustomerDetails from "@/components/features/CustomerDetails";
import DesignSelection from "@/components/features/DesignSelection";
import ItemConfiguration from "@/components/features/ItemConfiguration";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-6  ">
          <CustomerDetails />
          <ItemConfiguration />
          <DesignSelection />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
