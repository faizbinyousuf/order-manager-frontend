import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Bell,
  BellDot,
  ChefHatIcon,
  RefreshCcw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrderPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty depe
  // const formatTime = (date) => {
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "PM" : "AM";

  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // Convert 0 to 12

  //   return `${hours}:${minutes} ${ampm}`;
  // };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="rounded-none shadow-none">
        <CardContent className="flex items-center">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Booking
            </Button>
          </Link>
          <div className="flex items-center justify-start w-full gap-4 ml-4">
            <ChefHatIcon className="size-10 rounded-full bg-rose-200 p-2 text-rose-600" />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-semibold">Order Dashboard</h1>
              <p className="text-slate-600 text-sm">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {formatTime(currentTime.toISOString())}
              </p>
            </div>
            <div className="ml-auto ">
              <Button className="rounded-sm " variant="outline">
                <RefreshCcw className="size-4 text-slate-600 hover:text-slate-900 mr-2" />
                Refresh
              </Button>
            </div>
            <Bell className="size-6 text-slate-600 hover:text-slate-900 mr-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderPage;
