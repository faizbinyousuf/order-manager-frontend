import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCardIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

function PaymentDetails() {
  const salesExecutives = [
    "Alice Cooper",
    "Bob Wilson",
    "Carol Brown",
    "David Lee",
    "Emma White",
  ];

  return (
    <>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <CreditCardIcon className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid  gap-2">
              <Label htmlFor="advance">Advance Payment</Label>
              <Input defaultValue="0"></Input>
            </div>
            <div className="grid  gap-2">
              <Label htmlFor="salesExecutive">Sales Executive</Label>
              <Select
              // onValueChange={(value) =>
              //   setOrderData({ ...orderData, salesExecutive: value })
              // }
              >
                <SelectTrigger className="border-gray-300 w-full ">
                  <SelectValue placeholder="Select sales executive" />
                </SelectTrigger>
                <SelectContent>
                  {salesExecutives.map((exec) => (
                    <SelectItem key={exec} value={exec}>
                      {exec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-5" />
          <div className="bg-gray-100 rounded-sm p-4 space-y-3">
            <div className="flex justify-between text-gray-700">
              <p>Base Price</p>
              <p>$50</p>
            </div>
            <Separator />
            <div className="flex justify-between text-gray-700 font-medium text-lg">
              <span>Total Amount</span>
              <p>$50</p>
            </div>
            <div className="flex justify-between text-gray-600  ">
              <span>Advance Paid</span>
              <p>$30</p>
            </div>
            <div className="flex justify-between font-medium text-gray-900  ">
              <span>Remaining</span>
              <p>$30</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PaymentDetails;
