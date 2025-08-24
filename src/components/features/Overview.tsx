import React from "react";
import { Card, CardContent } from "../ui/card";
import { OrderStatus } from "@/types/OrderTypes";

function Overview() {
  const statuses: OrderStatus[] = [
    OrderStatus.PENDING,
    OrderStatus.ACCEPTED,
    OrderStatus.IN_PROGRESS,
    OrderStatus.COMPLETED,
    OrderStatus.REJECTED,
    OrderStatus.CANCELLED,
  ];
  return (
    <>
      <Card>
        <CardContent className="  bg-white   ">
          <div className="flex justify-between">
            {statuses.map((status) => (
              <div key={status}>
                <div className="bg-amber-200 min-w-40 h-24 p-3 m-3">
                  <h1 className="text-2xl font-bold">{status}</h1>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Overview;
