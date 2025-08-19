/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ArrowLeft,
  Bell,
  ChefHatIcon,
  ClipboardListIcon,
  Loader,
  RefreshCcw,
  Search,
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

import OrderCard from "@/components/features/OrderCard";
import { OrderStatus, type Order } from "@/types/OrderTypes";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  updateOrderStatus,
  searchOrders,
  filterOrdersByStatusAndPriority,
  fetchOrdersThunk,
  updateOrderStatusThunk,
} from "@/app/orderSlice";
import { useSelector } from "react-redux";

function OrderPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, []);

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

  // const [activeTab, setActiveTab] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // const allOrders = useAppSelector((state) => state.order.orders);
  const allOrders = useSelector((state: any) => state.order.orders);
  //debugger;
  const { loading, error } = useAppSelector((state) => state.order);

  // const [orders, setOrders] = useState<Order[]>(state.order.orders);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(searchOrders(query));
  };

  const handleStatusFilter = (filter: string) => {
    setStatusFilter(filter);
    console.log("filter", filter, priorityFilter);
    dispatch(
      filterOrdersByStatusAndPriority({
        status: filter,
        priority: priorityFilter,
      })
    );
  };

  const handlePriorityFilter = (filter: string) => {
    console.log("handlePriorityFilter", statusFilter, filter);
    setPriorityFilter(filter);
    dispatch(
      filterOrdersByStatusAndPriority({
        status: statusFilter,
        priority: filter,
      })
    );
  };

  // Update order status
  const handleStatusUpdate = (id: number, status: any) => {
    dispatch(updateOrderStatusThunk({ id, status }));
  };

  if (error)
    return (
      <div className=" flex items-center justify-center w-full min-h-screen">
        Error: {error.toString()}
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative ">
      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 "
          style={{
            // Block all pointer events
            pointerEvents: "auto",
            // Prevent text selection
            userSelect: "none",
            // Disable touch actions
            touchAction: "none",
          }}
        >
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
            <Loader className="h-12 w-12 animate-spin text-rose-500" />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto  ">
        <Card className="rounded-none shadow-none ">
          <CardContent className="flex items-center">
            <Link to="/">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
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
                  {" • "}
                  {formatTime(currentTime.toISOString())}
                </p>
              </div>
              <div className="ml-auto ">
                <Button
                  className="rounded-sm "
                  variant="outline"
                  onClick={() => console.log("Refresh")}
                >
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
                        placeholder="Search orders, customers"
                        value={searchQuery}
                        style={{
                          color: "gray",
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 rounded-sm border-slate-300  focus:!ring-transparent placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex  max-sm:w-full max-sm:justify-between gap-3">
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilter}
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
                      onValueChange={handlePriorityFilter}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Order Grids */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5 ">
                  {allOrders.map((order: Order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleUpdateOrderStatus={handleStatusUpdate}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overview">Overview content</TabsContent>
        </Tabs>

        {/* </div> */}
      </div>
    </div>
  );
}

export default OrderPage;
