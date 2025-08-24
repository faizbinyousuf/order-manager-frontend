import React from "react";
import { Card, CardContent } from "../ui/card";
import { OrderStatus } from "@/types/OrderTypes";
import {
  ActivityIcon,
  AppWindow,
  CheckCircle,
  CircleCheckBigIcon,
  Clock,
  TriangleAlertIcon,
} from "lucide-react";

function Overview() {
  const statuses = [
    OrderStatus.PENDING,
    OrderStatus.ACCEPTED,
    OrderStatus.IN_PROGRESS,
    OrderStatus.COMPLETED,
    // OrderStatus.REJECTED,
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
      <Card className="px-5 shadow-none bg-transparent border-none">
        <CardContent>
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
                      <div
                        className={`p-2 rounded-lg ${getIconColor(status)}`}
                        // className="p-2 bg-purple-500 rounded-lg"
                      >
                        {getLucidIcon(status)}
                      </div>
                      <div>
                        <p
                          className={`text-2xl font-bold ${getFontColor(
                            status,
                            900
                          )}`}
                        >
                          {status.length}
                        </p>
                        <p className={`text-xs ${getFontColor(status, 700)}`}>
                          {capitalizeFirstLetter(status.replace("_", " "))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* <div className="bg-teal-200 h-24 p-3 rounded-lg flex justify-start items-center gap-2 ">
                  <div className=" bg-yellow-600 p-2 rounded-md">
                    <TimerIcon className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span>1</span>
                    <span>
                      {capitalizeFirstLetter(status.replace("_", " "))}
                    </span>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center bg-red-200">
        <Card className="flex-2">
          <CardContent>Production stats</CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent>Urgent orders</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Overview;
