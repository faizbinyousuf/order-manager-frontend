import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Truck } from "lucide-react";
import { Label } from "../ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
function DeliveryAddress() {
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid text-left  gap-2">
              <Label htmlFor="date">Delivery Date</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full rounded-sm justify-between font-normal"
                    >
                      {/* {date ? date.toLocaleDateString() : "Select date"} */}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      // selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        //   setDate(date)
                        //   setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid text-left  gap-2">
              <Label htmlFor="time">Delivery Time</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="time"
                      className="w-full rounded-sm justify-between font-normal"
                    >
                      {/* {date ? date.toLocaleDateString() : "Select date"} */}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      // selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        //   setDate(date)
                        //   setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="grid text-left  gap-2 mt-5">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              value="address line 1"
              onChange={(e) => console.log(e.target.value)}
              // onChange={(e) => setOrderData({ ...orderData, deliveryAddress: e.target.value })}
              placeholder="Enter complete delivery address"
              rows={3}
              className="border-gray-300 rounded-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-base font-medium mt-5">
            Submit Order
          </Button>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Please fill in all required fields to submit the order
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default DeliveryAddress;
