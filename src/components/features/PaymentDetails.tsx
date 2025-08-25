/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCardIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import {
  selectGrandTotal,
  selectRemainingBalance,
  setAdvancePayment,
  setSalesExecutive,
} from "@/app/orderSlice";
function PaymentDetails() {
  const salesExecutives = useAppSelector(
    (state) => state.order.salesExecutives
  );
  console.log("RTRTR", salesExecutives);
  const remainingBalance = useAppSelector(selectRemainingBalance);
  const grandTotal = useAppSelector(selectGrandTotal);
  const advanceAmount = useAppSelector((state) => state.order.advancePayment);
  const dispatch = useAppDispatch();

  const handleSalesExecutiveSelection = (salesExecutive: string) => {
    console.log("Selected sales executive:", salesExecutive);
    dispatch(setSalesExecutive(salesExecutive));
  };

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
              <Input
                id="advance"
                type="number"
                max={grandTotal}
                value={advanceAmount}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  console.log("input value:", inputValue);

                  // Handle empty string case
                  if (inputValue === "") {
                    dispatch(setAdvancePayment(0));
                    return;
                  }

                  const value = parseInt(inputValue);
                  console.log("parsed value:", value);

                  // Check for valid number and non-negative
                  if (!isNaN(value) && value >= 0) {
                    // dispatch(setAdvancePayment(value));
                    // Restrict to grand total in component
                    const restrictedValue = Math.min(value, grandTotal);
                    dispatch(setAdvancePayment(restrictedValue));

                    // Optional: Update input to show restricted value
                    if (restrictedValue !== value) {
                      e.target.value = restrictedValue.toString();
                    }
                  }
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
                onWheel={(e) => {
                  // Prevent scroll wheel from changing the value
                  e.currentTarget.blur();
                }}
                onBlur={(e) => {
                  // const value = Math.max(1, parseInt(e.target.value) || 1);
                  // updateCakeProperty(index, { quantity: value });
                  // e.target.value = value.toString(); // Force correct value in input
                }}
                // placeholder="0"
              />
            </div>
            <div className="grid  gap-2">
              <Label htmlFor="salesExecutive">Sales Executive</Label>
              <Select
                onValueChange={(value) => handleSalesExecutiveSelection(value)}
              >
                <SelectTrigger className="border-gray-300 w-full ">
                  <SelectValue placeholder="Select sales executive" />
                </SelectTrigger>
                <SelectContent>
                  {salesExecutives.map((exec) => (
                    <SelectItem key={exec.id} value={exec.name}>
                      {exec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-5" />
          <div className="bg-gray-100 rounded-sm p-4 space-y-3">
            {/* <div className="flex justify-between text-gray-700">
              <p>Base Price</p>
              <p>$50</p>
            </div> */}
            {/* <Separator /> */}
            <div className="flex justify-between text-gray-700 font-medium text-lg">
              <span>Total Amount</span>
              <p>₹{grandTotal}</p>
            </div>
            <div className="flex justify-between text-gray-600  ">
              <span>Advance Paid</span>
              <p>₹{advanceAmount}</p>
            </div>
            <div className="flex justify-between font-medium text-gray-900  ">
              <span>Remaining</span>
              <p>₹{remainingBalance}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PaymentDetails;
