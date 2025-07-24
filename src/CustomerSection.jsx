import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  User,
  Cake,
  Palette,
  Camera,
  CreditCard,
  Truck,
} from "lucide-react";

import CustomerDropDown from "./widgets/CustomerDropDown";

export function CustomerSection() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <h1 className="text-2xl">Customer Details</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-semibold text-sm">Select Customer</p>
            <CustomerDropDown />
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
