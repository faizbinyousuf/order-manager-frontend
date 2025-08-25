import { Card, CardContent } from "../ui/card";

import {
  ActivityIcon,
  AppWindow,
  BanIcon,
  CheckCircle,
  CircleCheckBigIcon,
  ClipboardList,
  Clock,
  TriangleAlertIcon,
} from "lucide-react";
import { useAppSelector } from "@/app/hooks";
function Overview() {
  const orders = useAppSelector((state) => state.order.orders);
  console.log(orders[2]);
  const statuses = [
    "pending", //4
    "accepted", //2
    "in_progress", //2
    "completed", //4
    // "rejected", // 2
    "urgent",
  ];
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const getFontColor = (status: string, weight: number) => {
    switch (status) {
      case "pending":
        return `text-amber-${weight}`;
      case "accepted":
        return `text-blue-${weight}`;
      case "in_progress":
        return `text-purple-${weight}`;
      case "completed":
        return `text-emerald-${weight}`;

      case "urgent":
        return `text-rose-${weight}`;
      default:
        return `text-rose`;
    }
  };
  const getStatusGradient = (status: string) => {
    switch (status) {
      case "pending":
        return "from-amber-50 to-amber-100";
      case "accepted":
        return "from-blue-50 to-blue-100";
      case "in_progress":
        return "from-purple-50 to-purple-100";
      case "completed":
        return "from-emerald-50 to-emerald-100";
      case "urgent":
        return "from-red-50 to-red-100";

      default:
        return "from-rose-50 to-rose-100";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500";
      case "accepted":
        return "bg-blue-500";
      case "in_progress":
        return "bg-purple-500";
      case "completed":
        return "bg-emerald-500";
      case "urgent":
        return "bg-rose-500";

      default:
        return "bg-slate-500";
    }
  };
  const getLucidIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-white" />;
      case "accepted":
        return <CheckCircle className="h-5 w-5 text-white" />;
      case "in_progress":
        return <ActivityIcon className="h-5 w-5 text-white" />;
      case "completed":
        return <CircleCheckBigIcon className="h-5 w-5 text-white" />;
      case "urgent":
        return <TriangleAlertIcon className="h-5 w-5 text-white" />;

      default:
        return <AppWindow className="h-5 w-5 text-white" />;
    }
  };
  //
  return (
    <div className="min-h-screen">
      <Card className="shadow-none bg-transparent border-none">
        <CardContent className=" p-0 m-0">
          <div className="flex flex-wrap justify-center gap-3  ">
            {statuses.map((status) => (
              <div key={status} className="flex-1 min-w-40">
                <Card
                  className={`${getStatusGradient(
                    status
                  )} border  text-xs font-medium  bg-gradient-to-br flex justify-center items-start  pl-3 h-20`}
                >
                  <CardContent className="p-2">
                    <div className="flex items-center justify-start gap-3">
                      <div className={`p-2 rounded-lg ${getIconColor(status)}`}>
                        {getLucidIcon(status)}
                      </div>
                      <div>
                        <p
                          className={`text-2xl font-bold ${getFontColor(
                            status,
                            900
                          )}`}
                        >
                          {
                            orders.filter(
                              (order) =>
                                order.orderStatus === status ||
                                order.priority === status
                            ).length
                          }
                        </p>
                        <p className={`text-xs ${getFontColor(status, 700)}`}>
                          {capitalizeFirstLetter(status.replace("_", " "))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center   gap-10">
        <Card className="flex-3   max-h-60">
          <CardContent>
            <div>
              <h2 className="text-xl font-bold">Today's Production</h2>
              <div className="flex flex-col space-y-2.5 mt-6 text-gray-700 font-[500]">
                <div className="flex gap-5 justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-rose-500" />
                    <p>Total</p>
                  </div>
                  <p className="font-bold">{orders.length}</p>
                </div>
                <div className="flex gap-5 justify-between">
                  <div className="flex items-center gap-2">
                    <CircleCheckBigIcon className="h-4 w-4 text-emerald-500" />
                    <p>Completed</p>
                  </div>
                  <p className="font-bold">
                    {
                      orders.filter(
                        (order) => order.orderStatus === "completed"
                      ).length
                    }
                  </p>
                </div>
                <div className="flex gap-5 justify-between">
                  <div className="flex items-center gap-2">
                    <ActivityIcon className="h-4 w-4 text-purple-500" />
                    <p>In Progress</p>
                  </div>
                  <p className="font-bold">
                    {
                      orders.filter(
                        (order) => order.orderStatus === "in_progress"
                      ).length
                    }
                  </p>
                </div>
                <div className="flex gap-5 justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <p>Pending</p>
                  </div>
                  <p className="font-bold">
                    {
                      orders.filter((order) => order.orderStatus === "pending")
                        .length
                    }
                  </p>
                </div>
                <div className="flex gap-5 justify-between">
                  <div className="flex items-center gap-2">
                    <BanIcon className="h-4 w-4 text-rose-700" />
                    <p className="text-rose-700">Rejected</p>
                  </div>
                  <p className="font-bold">
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "rejected" ||
                          order.orderStatus === "cancelled"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-2">
          <CardContent>
            <div className="w-full">
              <h2 className="text-xl font-bold">Urgent Orders</h2>
              <div className="overflow-auto   max-h-80 mt-5 ">
                {orders
                  .filter((order) => order.priority === "urgent")
                  .map((order) => (
                    <div key={order.id}>
                      <div className="border-rose-300 border rounded-sm bg-rose-50 p-3 my-3  text-sm">
                        <p className="font-semibold text-rose-800">
                          {order.orderNumber}{" "}
                        </p>
                        <p className="text-rose-700">{order.customer.name}</p>
                        <p className="text-rose-800">At {order.deliveryTime}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Overview;
