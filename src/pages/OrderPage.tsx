import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ArrowLeft,
  Badge,
  Bell,
  Cake,
  Camera,
  ChefHatIcon,
  ClipboardListIcon,
  EyeIcon,
  Package,
  Palette,
  RefreshCcw,
  Search,
  SearchIcon,
  Timer,
  Truck,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function OrderPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
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
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      console.log("time set");
      setCurrentTime(now);

      // Calculate milliseconds until next minute
      const millisecondsUntilNextMinute =
        60000 - now.getSeconds() * 1000 - now.getMilliseconds();

      // Schedule next update at the beginning of the next minute
      timer = setTimeout(() => {
        updateTime();
      }, millisecondsUntilNextMinute);
    };

    let timer: NodeJS.Timeout;
    updateTime(); // Initial call

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty depe

  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const numbers = [1, 2, 3, 4, 5];
  const [activeTab, setActiveTab] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = ["pending", "in progress", "completed"];
  const priorities = ["urgetn", "high", "medium", "low"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto  ">
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
                  })}
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
        {/* <div className="max-w-7xl mx-auto px-6 py-6 bg-red-100"> */}
        <Tabs defaultValue="orders">
          <TabsList className="w-full ">
            <TabsTrigger className="rounded-none" value="orders">
              <ClipboardListIcon className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger className="rounded-none" value="overview">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardContent>
                <div className="flex items-center  flex-col md:flex-row justify-between gap-3">
                  <div className="flex-1 min-w-64 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search orders, customers, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10   rounded-sm border-slate-300 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="flex  max-sm:w-full max-sm:justify-between gap-3">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={priorityFilter}
                      onValueChange={setPriorityFilter}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overview">Overview content</TabsContent>
        </Tabs>

        {/* Order Grids */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
          {numbers.map((number) => (
            <Card
              key={number}
              className="bg-red-100 hover:shadow-lg transition-all duration-200 border-slate-200"
            >
              <CardContent className="p-3  ">
                <div className="flex flex-col space-y-2 ">
                  <div className="flex items-center gap-2">
                    <div className="p-2 size-8  bg-gradient-to-br from-rose-500 to-pink-600 rounded-md">
                      <Cake className="h-4 w-4 text-white" />
                    </div>
                    <div className=" flex flex-col items-start ">
                      <p className="text-lg font-semibold text-gray-900">
                        ORD-24015-001
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentTime.toLocaleDateString("en-US", {
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
                                Make changes to your profile here. Click save
                                when you&apos;re done.
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
                  <div className="flex items-start">
                    <div className="border text-xs bg-green-300 px-2 py-1  rounded-full ">
                      <p className="text-[10px] text-gray-500">COMPLETED</p>
                    </div>
                    <div className="border text-xs bg-red-300 px-2 py-1  rounded-full ">
                      <p className="text-[10px] text-red-900">URGENT</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`${getStatusColor("pending")} border text-xs`}
                    >
                      completed
                    </Badge>
                    <Badge
                      className={`${getStatusColor(
                        "in-progress"
                      )} border text-xs`}
                    >
                      pending
                    </Badge>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <User className="h-6 w-6text-xs text-slate-600" />
                    <p className="text-xs   text-slate-600">John Doe</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    {"" === "takeaway" ? (
                      <Package className="h-3 w-3" />
                    ) : (
                      <Truck className="h-3 w-3" />
                    )}
                    <span>
                      {"24-07-2025"} at {formatTime(currentTime.toISOString())}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 text-left">Cakes:</p>
                  {/* <div className=" flex flex-col space-y-2 items-start  justify-start  bg-slate-50 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      2x 6 inch Chocolate Cake with vanilla icing
                    </p>
                    <p className="text-xs text-slate-600 bg-yellow-50 p-2   border-l-2 border-yellow-400 mb-2">{`"Happy Birthday"`}</p>
                    <p className="text-xs text-slate-600 bg-blue-50 p-2   border-l-2 border-blue-400 mb-2">
                      {`"Notes Here...`}
                    </p>
                  </div> */}

                  <div key={1} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm text-slate-900">
                        {1}x {"flavor"} {"cake.shape"}
                      </p>
                      <div className="flex items-center gap-1">
                        <Timer className="h-3 w-3 text-slate-500" />
                        <span className="text-xs text-slate-600">{3}h</span>
                      </div>
                    </div>
                    {currentTime && (
                      <p className="text-xs text-left text-slate-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400 mb-2">
                        "{"inscription here..."}"
                      </p>
                    )}
                    {currentTime && (
                      <p className="text-xs text-left text-slate-600 bg-blue-50 p-2 rounded border-l-2 border-blue-400 mb-2">
                        {" notes here..."}
                      </p>
                    )}
                    <div className="flex   items-center justify-between   text-xs">
                      {currentTime && (
                        <div className="flex items-center gap-1">
                          <Palette className="size-4 text-slate-500" />
                          <span className="text-slate-600">
                            {"Floral Design"}
                          </span>
                        </div>
                      )}
                      {currentTime && (
                        <div className="flex items-center gap-1">
                          <Camera className="size-4 text-slate-500" />
                          <span className="text-slate-600">{"full"} photo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}

export default OrderPage;
