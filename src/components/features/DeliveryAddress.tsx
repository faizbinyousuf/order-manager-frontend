/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cake, Package, Truck } from "lucide-react";
import { Label } from "../ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  createOrderThunk,
  selectGrandTotal,
  selectIsFormValid,
  selectIsFormValidBoolean,
  // selectIsFormValidBoolean,
} from "../../app/orderSlice";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "../ui/textarea";
import {
  setDeliveryDate,
  setDeliveryAddress,
  setDeliveryTime,
  setDeliveryMode,
} from "../../app/orderSlice";
import TimePicker from "../custom/time-picker";
import { toast } from "sonner";

function DeliveryAddress() {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;
  const maxDate = new Date(maxYear, 11, 31);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState("");
  const [openDate, setOpenDate] = React.useState(false);

  const [address, setAddress] = React.useState("");
  const dispatch = useAppDispatch();

  const handleDeliveryDateSelection = (date: string) => {
    console.log("date selected  :", date);
    dispatch(setDeliveryDate(date));
  };

  const handleDeliveryAddressSelection = (address: string) => {
    console.log("addres selected  :", address);
    setAddress(address);
    dispatch(setDeliveryAddress(address));
  };

  const handleDeliveryTimeSelection = (time: string) => {
    console.log("time selected  :", time);
    dispatch(setDeliveryTime(time));
  };

  const formValidation = useAppSelector(selectIsFormValid);
  const isFormValid = useAppSelector(selectIsFormValidBoolean);
  const deliveryMode = useAppSelector((state) => state.order.deliveryMode);
  const state = useAppSelector((state) => state.order);

  const grandTotal = useAppSelector(selectGrandTotal);

  const placeOrder = async () => {
    console.log("place order", state);
    if (!formValidation.isValid) {
      // Show validation errors
      alert(
        `Please fix the following errors:\n${formValidation.errors.join("\n")}`
      );
      return;
    }

    try {
      // Dispatch the createOrder thunk - it will automatically get data from Redux state
      const result = await dispatch(createOrderThunk()).unwrap();

      // Success handling
      alert(`Order created successfully! Order ID: ${result.orderNumber}`);
      // Optionally redirect to orders list or order details
      // navigate('/orders');
    } catch (error) {
      // Error is already handled in the slice, but you can add additional UI feedback
      alert(`Failed to create order: ${error}`);
    }

    // toast("Order placed", {
    //   dismissible: true,

    //   style: {
    //     justifyContent: "flex-start",
    //     textAlign: "left",
    //     background: "#C1F5C1",
    //     color: "#065F46",
    //   },
    //   duration: 1500,
    //   actionButtonStyle: {
    //     background: "#065F46",
    //     // color: "#C1F5C1",
    //     color: "white",
    //     border: "1px solid #065F46",
    //     borderRadius: "5px",
    //     padding: "5px 10px",
    //     cursor: "pointer",
    //   },
    //   // description: "Sunday, December 03, 2023 at 9:00 AM",
    //   action: {
    //     label: "Close",

    //     onClick: () => console.log("Close"),
    //   },
    // });
  };
  return (
    <>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <Truck className="h-5 w-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              type="button"
              onClick={() => dispatch(setDeliveryMode("takeaway"))}
              variant={"link"}
              className={`hover:no-underline  relative p-4 rounded-lg border-2 cursor-pointer transition-all  min-h-18 text-left flex flex-col items-start shadow-none hover:shadow-none ${
                deliveryMode === "takeaway"
                  ? "border-rose-500 bg-rose-50  "
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="absolute top-3 right-3 border-rose-400" />
              <div className="space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-rose-600" />
                  <span className="font-semibold text-gray-800">Takeaway</span>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  Customer will pick up from store
                </p>
              </div>
            </Button>

            <Button
              onClick={() => dispatch(setDeliveryMode("home_delivery"))}
              variant={"link"}
              type="button"
              className={`hover:no-underline relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md min-h-18 text-left flex flex-col items-start ${
                deliveryMode === "home_delivery"
                  ? "border-rose-500 bg-rose-50 shadow-sm"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="absolute top-3 right-3 border-rose-400" />
              <div className="space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-rose-600" />
                  <span className="font-semibold text-gray-800">
                    Home Delivery
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  We will deliver to customer address
                </p>
              </div>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivery Date and Time Selector */}
            <div className="grid text-left  gap-2">
              <Label htmlFor="date">
                {deliveryMode === "takeaway" ? "Pickup Date" : "Delivery Date"}
              </Label>
              <div>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="date"
                      className="w-full rounded-sm justify-between font-normal"
                      // className={
                      //   !formValidation.errors.includes(
                      //     "Delivery date is required"
                      //   )
                      //     ? "w-full rounded-sm justify-between font-normal"
                      //     : "w-full rounded-sm justify-between font-normal border-red-500  "
                      // }
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      hidden={{
                        before: new Date(),
                        after: maxDate,
                      }}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        handleDeliveryDateSelection(date!.toString());
                        setDate(date);
                        setOpenDate(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid text-left  gap-2">
              <Label htmlFor="time">
                {deliveryMode === "takeaway" ? "Pickup Time" : "Delivery Time"}
              </Label>
              <div>
                <TimePicker
                  value={time}
                  onChange={handleDeliveryTimeSelection}
                  placeholder="Choose time"
                  className="w-full  h-9 px-4 py-2 text-left border border-gray-300 rounded-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-50 focus:border-gray-500 flex items-center justify-between"
                  // className={
                  //   !formValidation.errors.includes("Delivery time is required")
                  //     ? "w-full  h-9 px-4 py-2 text-left border border-gray-300 rounded-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-50 focus:border-gray-500 flex items-center justify-between"
                  //     : "w-full  h-9 px-4 py-2 text-left border border-red-500 rounded-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-50 focus:border-gray-500 flex items-center justify-between  "
                  // }
                />
              </div>
            </div>
          </div>
          {/*  deliveryMode === "takeaway" */}
          {deliveryMode === "home_delivery" && (
            <div className="grid text-left  gap-2 mt-5">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="deliveryAddress"
                value={address}
                onChange={(e) => handleDeliveryAddressSelection(e.target.value)}
                placeholder="Enter complete delivery address"
                rows={3}
                // className={`border-gray-300 rounded-sm focus:border-rose-500 focus:ring-rose-500 ${
                //   formValidation.errors.includes("Delivery address is required")
                //     ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                //     : ""
                // }`}
                className=" border-gray-300 rounded-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
          )}
          <Button
            type="button"
            disabled={!isFormValid}
            onClick={placeOrder}
            className={`${
              !isFormValid
                ? "opacity-50 cursor-not-allowed w-full text-white py-3 text-base font-medium mt-5"
                : "w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-base font-medium mt-5"
            }`}
            // className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-base font-medium mt-5"
          >
            Create Order
          </Button>
          {!isFormValid && (
            // <div className="text-red-500 mt-2">
            //   {formValidation.errors.map((error) => (
            //     <p key={error}>{error}</p>
            //   ))}
            // </div>
            <p className="text-sm text-red-500 mt-3 text-center">
              Please fill in all required fields to submit the order
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default DeliveryAddress;
