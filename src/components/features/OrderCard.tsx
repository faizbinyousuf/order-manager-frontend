/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bike,
  Cake,
  CakeIcon,
  CakeSlice,
  Camera,
  CheckCircle,
  CircleCheck,
  CircleXIcon,
  EyeIcon,
  ImageIcon,
  ListOrdered,
  LocationEditIcon,
  Package,
  Palette,
  Play,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { OrderStatus, type Order, type Priority } from "@/types/OrderTypes";

interface OrderCardProps {
  order: Order;
  handleUpdateOrderStatus: (orderId: number, newStatus: OrderStatus) => void;
}

function OrderCard({ order, handleUpdateOrderStatus }: OrderCardProps) {
  const getBorderColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-b-yellow-500";
      case "accepted":
        return "border-b-blue-800";
      case "in_progress":
        return "border-b-purple-800";
      case "completed":
        return "border-b-green-800";
      case "rejected":
        return "border-b-rose-800";
      default:
        return "border-b-slate-200";
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getPriorityColor = (priority: Priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-300",
      normal: "bg-blue-100 text-blue-800 border-blue-300",
      low: "bg-gray-100 text-gray-800 border-gray-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      high: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function getAvatarColor(str: string) {
    // Simple hash function to convert string to numeric hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Map hash to Tailwind color classes
    const colors = [
      "bg-red-100 text-red-800", // 0
      "bg-orange-100 text-orange-800", // 1
      "bg-amber-100 text-amber-800", // 2
      "bg-yellow-100 text-yellow-800", // 3
      "bg-lime-100 text-lime-800", // 4
      "bg-green-100 text-green-800", // 5
      "bg-emerald-100 text-emerald-800", // 6
      "bg-teal-100 text-teal-800", // 7
      "bg-cyan-100 text-cyan-800", // 8
      "bg-sky-100 text-sky-800", // 9
      "bg-blue-100 text-blue-800", // 10
      "bg-indigo-100 text-indigo-800", // 11
      "bg-violet-100 text-violet-800", // 12
      "bg-purple-100 text-purple-800", // 13
      "bg-fuchsia-100 text-fuchsia-800", // 14
      "bg-pink-100 text-pink-800", // 15
    ];

    // Ensure index is within array bounds
    const index = Math.abs(hash) % colors.length;
    console.log("col", index, colors[index]);
    return colors[index];
  }

  const getDesignName = (designId: number): string => {
    const designNames: Record<number, string> = {
      1: "Floral Design",
      2: "Birthday Special",
      3: "Wedding Elegance",
      4: "Kids Cartoon",
      5: "Corporate Theme",
      6: "Anniversary Gold",
      7: "Baby Shower",
      8: "Graduation Cap",
    };
    return designNames[designId] || `Design #${designId}`;
  };

  const getShapeName = (shapeId: number): string => {
    const designNames: Record<number, string> = {
      1: "Floral Design",
      2: "Birthday Special",
      3: "Wedding Elegance",
      4: "Kids Cartoon",
      5: "Corporate Theme",
      6: "Anniversary Gold",
      7: "Baby Shower",
      8: "Graduation Cap",
    };
    return designNames[shapeId] || `Shape #${shapeId}`;
  };
  return (
    <>
      <Card
        key={order.id}
        className={`bg-white hover:shadow-lg transition-all duration-200 border x   py-2 px-2  ${getBorderColor(
          order.createdAt
        )} ${
          order.orderStatus === "rejected" || order.orderStatus === "cancelled"
            ? "bg-red-50"
            : ""
        }  `}
        // className={
        //   "bg-white hover:shadow-lg transition-all duration-200 border py-2 px-3 " +
        //   (order.status === "rejected"
        //     ? "  border-red-200 border-b-rose-500 border-b-4  bg-red-50"
        //     : "border-slate-200")
        // }
      >
        <CardContent className="p-1  ">
          <div className="flex flex-col space-y-2 ">
            <div className="flex items-center  gap-2 ">
              {/* <div className="  size-7  flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-600 rounded-md">
                <ListOrdered className="size-4 text-white" />
              </div> */}
              <div className=" flex flex-col  items-start ">
                <p className="text-lg font-semibold text-gray-900">
                  #{order.orderNumber}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {/* {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
                </p>
              </div>

              {/* Status Chips */}

              <div className="flex items-center  gap-1 ml-auto ">
                <Badge
                  className={`${getStatusColor(
                    order.orderStatus
                  )} border  text-xs font-medium `}
                >
                  {order.orderStatus.replace("_", " ").toUpperCase()}
                </Badge>
                {order.priority === "urgent" && (
                  <Badge
                    className={`${getPriorityColor(
                      order.priority
                    )} border text-xs font-medium`}
                  >
                    {order.priority.toUpperCase()}
                  </Badge>
                )}
              </div>

              {/* Status Chips */}

              <div className="mr-1" id="dialog-order-detail">
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        // onClick={() => setSelectedOrder(order)}
                        className="border-gray-300 hover:border-rose-500 hover:text-rose-600 rounded-full size-7"
                      >
                        <EyeIcon className="size-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-3xl sm:max-w-[425px] max-h-[80vh] overflow-y-auto  ">
                      <DialogHeader>
                        <DialogTitle className="text-md ">
                          Order Details - {order.orderNumber}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="bg-slate-100 p-3 rounded-sm space-y-1">
                        <div className="flex gap-x-2 ">
                          <User className="size-4" />
                          <p className="font-semibold text-sm">
                            Customer Information
                          </p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="space-y-5">
                            <div>
                              <p className="font-semibold">Name:</p>
                              <p>{order.customer.name}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Email:</p>
                              <p>{order.customer.email}</p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <p className="font-semibold">Phone:</p>
                              <p>{order.customer.phone}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Sales Executive:</p>
                              <p>{order.salesExecutive}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery info */}
                      <div className="bg-slate-100 p-3 rounded-sm space-y-1 text-sm">
                        <div className="flex gap-x-2 ">
                          <LocationEditIcon className="size-4" />
                          <p className="font-semibold">Delivery Information</p>
                        </div>
                        <div className="flex justify-between">
                          <div className="space-y-5">
                            <div>
                              <p className="font-semibold">Mode:</p>
                              <p>
                                {order.deliveryMode
                                  .replace("_", " ")
                                  .toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold">Address:</p>
                              <p>{order.deliveryAddress}</p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <p className="font-semibold">Date & Time:</p>
                              <p>
                                {order.deliveryDate} at {order.deliveryTime}
                              </p>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex space-x-2 ">
                          <CakeIcon className="size-4" />
                          <h3 className="font-semibold text-sm">
                            Cake Details
                          </h3>
                        </div>
                        {order.cakes.map((cake, index) => {
                          const isPhotoCake =
                            cake.halfPhoto === true || cake.fullPhoto === true;
                          return (
                            <div
                              key={index}
                              className="border rounded-sm border-gray-300 p-3 mt-1.5 text-sm"
                            >
                              <p className="font-semibold">Cake #{index + 1}</p>
                              <div className="flex justify-between text-sm">
                                <div className="flex">
                                  <div>
                                    <p>Flavor:</p>
                                    <p className="font-semibold">
                                      {"Chocolate"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex ">
                                  <div>
                                    <p>Shape:</p>
                                    <p className="font-semibold">
                                      {cake.cakeShapeId}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <p> Quantity:</p>
                                    <p className="font-semibold">
                                      {cake.quantity}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {cake.inscription && (
                                  <div>
                                    <p className="text-sm">Inscription:</p>
                                    <p className="text-xs text-left text-slate-600 font-medium bg-[#f3f7fd] p-2 rounded-r-sm border-l-3 border-[#5095d5] mb-2">
                                      "{cake.inscription}"
                                    </p>
                                  </div>
                                )}

                                {cake.notes && (
                                  <div>
                                    <p className="text-sm">Notes:</p>
                                    <p className="text-xs text-left font-medium text-slate-600 bg-[#fbf5f4] p-2 rounded-r-sm border-l-3 border-[#d5857a] mb-2">
                                      {cake.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                              {cake.selectedDesignChargeIds.length != 0 && (
                                <div>
                                  <p className="text-sm mt-2 mb-1">Design:</p>
                                  <div className="flex   items-center justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                      {cake.selectedDesignChargeIds.length !=
                                        0 && (
                                        <div className="flex items-center gap-1">
                                          <Palette className="size-3 shrink-0  text-rose-700" />
                                          <span className=" text-slate-600  font-medium">
                                            {cake.selectedDesignChargeIds
                                              .map((id) => getDesignName(id))
                                              .join(", ")}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <p className="text-sm mt-2">Photo Print:</p>
                              <p className="inline-block text-xs">
                                {cake.fullPhoto
                                  ? "Full Size :   "
                                  : "Half Size :  "}
                              </p>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <button className="text-slate-600 underline text-sm blue-red-700 cursor-pointer pl-2">
                                    {cake.file}
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[60vw] max-h-[80vh] overflow-auto">
                                  <div className="flex flex-col items-center p-4">
                                    <h3 className="text-lg font-semibold mb-4">
                                      {cake.file}
                                    </h3>
                                    <img
                                      src={cake.file}
                                      alt={cake.file || "Cake photo"}
                                      className="max-w-full max-h-[70vh] object-contain"
                                      onError={(e) => {
                                        // Fallback if image fails to load
                                        e.currentTarget.style.display = "none";
                                        console.error(
                                          "Image failed to load:",
                                          cake.file
                                        );
                                      }}
                                    />
                                    {cake.file && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {cake.file}
                                      </p>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          );
                        })}

                        <div
                          className={`p-3 rounded-sm space-y-2 mt-2 ${
                            order.paymentStatus == "paid"
                              ? "bg-[#ceefce]"
                              : "bg-slate-100"
                          }`}
                        >
                          <p className="font-semibold text-sm">
                            Payment Information
                          </p>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm">Total:</p>
                              <p className="font-semibold">
                                {order.totalAmount}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm">Advance:</p>
                              <p className="font-semibold">
                                {" "}
                                {order.advancePayment}{" "}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm">Balance:</p>
                              <p className="font-semibold">
                                {order.remainingBalance}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter> */}
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-xs font-bold   text-slate-600  max-w-28">
                {order.customer.name}
              </p>
              <div className="ml-auto flex items-center gap-2 text-xs text-slate-600">
                {order.deliveryMode === "takeaway" ? (
                  <Package className="size-4 shrink-0" />
                ) : (
                  <Truck className="size-4 shrink-0" />
                )}
                <span className="font-medium">
                  {order.deliveryDate} at {order.deliveryTime}
                  {/* {formatTime(new Date(order.deliveryTime).toISOString())} */}
                </span>
              </div>
            </div>

            {/* <p>Cakes: {order.cakes.length}</p> */}
            {order.cakes.map((cake, index) => {
              const isPhotoCake =
                cake.halfPhoto === true || cake.fullPhoto === true;
              return (
                <div key={index}>
                  <div
                    className={
                      "p-2  rounded-sm border" +
                      (order.orderStatus === "rejected" ||
                      order.orderStatus === "cancelled"
                        ? " bg-transparent"
                        : " bg-white ")
                    }
                  >
                    <div className="flex items-center justify-start mb-2">
                      <p className="flex font-medium text-left text-sm text-slate-900">
                        <CakeSlice className="mr-1 size-4 text-rose-700" />
                      </p>
                      <p className="font-semibold text-sm text-slate-900">
                        {cake.name} - {cake.quantity}Kg
                      </p>
                    </div>
                    {cake.inscription && (
                      <p className="text-xs text-left text-slate-600 font-medium bg-[#f3f7fd] p-2 rounded-r-sm border-l-3 border-[#5095d5] mb-2">
                        "{cake.inscription}"
                      </p>
                    )}
                    {cake.notes && (
                      <p className="text-xs text-left font-medium text-slate-600 bg-[#fbf5f4] p-2 rounded-r-sm border-l-3 border-[#d5857a] mb-2">
                        {cake.notes}
                      </p>
                    )}
                    <div className="flex   items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {cake.selectedDesignChargeIds.length != 0 && (
                          <div className="flex items-center gap-1">
                            <Palette className="size-3 shrink-0  text-rose-700" />
                            <span className=" text-slate-600  font-medium">
                              {cake.selectedDesignChargeIds
                                .map((id) => getDesignName(id))
                                .join(", ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {isPhotoCake && (
                        <div className="flex items-center   gap-1">
                          <ImageIcon className="size-4 text-slate-500" />
                          <span className="text-slate-600 font-medium"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <Separator className="my-2" /> */}
            <div className="flex gap-2 justify-end">
              {order.orderStatus === "pending" && (
                <>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleUpdateOrderStatus(order.id, OrderStatus.REJECTED)
                    }
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      handleUpdateOrderStatus(order.id, OrderStatus.ACCEPTED)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                </>
              )}
              {order.orderStatus === "accepted" && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    handleUpdateOrderStatus(order.id, "in_progress")
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </Button>
              )}
              {order.orderStatus === "in_progress" && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    handleUpdateOrderStatus(order.id, OrderStatus.COMPLETED)
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CircleCheck className="h-3 w-3 mr-1" />
                  Complete
                </Button>
              )}
              {order.orderStatus === "rejected" && (
                <Badge
                  className="bg-red-100 text-red-800 border-red-200"
                  // size="sm"
                  // onClick={() => toast("Order is Rejected")}
                  // className="bg-red-800 hover:bg-red-900 text-white w-full"
                >
                  <CircleXIcon className="h-3 w-3 mr-1" />
                  Rejected
                </Badge>
              )}
              {order.orderStatus === "completed" && (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Done
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderCard;
