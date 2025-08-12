import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cake,
  Camera,
  CheckCircle,
  CircleCheck,
  CircleXIcon,
  EyeIcon,
  Package,
  Palette,
  Play,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { OrderStatus, type Order, type Priority } from "@/types/OrderTypes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

  return (
    <>
      <Card
        key={order.id}
        className={`bg-white hover:shadow-lg transition-all duration-200 border x   py-2 px-3  ${getBorderColor(
          order.createdAt
        )} ${order.orderStatus === "rejected" ? "bg-red-50" : ""}  `}
        // className={
        //   "bg-white hover:shadow-lg transition-all duration-200 border py-2 px-3 " +
        //   (order.status === "rejected"
        //     ? "  border-red-200 border-b-rose-500 border-b-4  bg-red-50"
        //     : "border-slate-200")
        // }
      >
        <CardContent className="p-3   ">
          <div className="flex flex-col space-y-3.5 ">
            <div className="flex items-center gap-2">
              <div className="p-2 size-8  bg-gradient-to-br from-rose-500 to-pink-600 rounded-md">
                <Cake className="h-4 w-4 text-white" />
              </div>
              <div className=" flex flex-col items-start ">
                <p className="text-lg font-semibold text-gray-900">
                  {order.orderNumber}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="ml-auto" id="dialog-order-detail">
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => setSelectedOrder(order)}
                        className="border-gray-300 hover:border-rose-500 hover:text-rose-600 rounded-sm"
                      >
                        <EyeIcon className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Name</Label>
                          <Input
                            id="name-1"
                            name="name"
                            defaultValue="Pedro Duarte"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="username-1">Username</Label>
                          <Input
                            id="username-1"
                            name="username"
                            defaultValue="@peduarte"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge
                className={`${getStatusColor(
                  order.orderStatus
                )} border text-xs font-medium`}
              >
                {order.orderStatus.replace("_", " ").toUpperCase()}
              </Badge>
              <Badge
                className={`${getPriorityColor(order.priority)} border text-xs`}
              >
                {order.priority.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {/* <User className="size-4 text-xs text-slate-600" /> */}
              <Avatar>
                <AvatarImage
                  //   src="https://github.com/shadcn.pngs"
                  alt="@shadcn"
                />
                <AvatarFallback className={getAvatarColor(order.customer.id)}>
                  {/* {order.customer.name.charAt(0) +
                    order.customer.name.charAt(1).toUpperCase()} */}
                  {order.customer.name.charAt(0).toUpperCase()}
                  {order.customer.name.split(" ")[1]?.charAt(0).toUpperCase() ??
                    ""}
                </AvatarFallback>
              </Avatar>

              <p className="text-xs font-bold   text-slate-600">
                {order.customer.name}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              {order.deliveryMode === "takeaway" ? (
                <Package className="size-5" />
              ) : (
                <Truck className="size-5" />
              )}
              <span>
                {order.deliveryDate} at {order.deliveryTime}
                {/* {formatTime(new Date(order.deliveryTime).toISOString())} */}
              </span>
            </div>

            <div
              key={1}
              className={
                "p-3  rounded-lg" +
                (order.orderStatus === "rejected"
                  ? " bg-red-50"
                  : " bg-slate-50")
              }
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-left text-sm text-slate-900">
                  {1}x {"6 inch Chocolate Cake with vanilla icing "}
                </p>
              </div>
              {order.createdAt && (
                <p className="text-xs text-left text-slate-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400 mb-2">
                  "{"inscription here..."}"
                </p>
              )}
              {order.createdAt && (
                <p className="text-xs text-left text-slate-600 bg-blue-50 p-2 rounded border-l-2 border-blue-400 mb-2">
                  {" notes here..."}
                </p>
              )}
              <div className="flex   items-center justify-between   text-xs">
                {order.createdAt && (
                  <div className="flex items-center gap-1">
                    <Palette className="size-4 text-slate-500" />
                    <span className="text-slate-600">{"Floral Design"}</span>
                  </div>
                )}
                {order.createdAt && (
                  <div className="flex items-center gap-1">
                    <Camera className="size-4 text-slate-500" />
                    <span className="text-slate-600">{"full"} photo</span>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-2 justify-end">
              {order.orderStatus === "pending" && (
                <>
                  <Button
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
