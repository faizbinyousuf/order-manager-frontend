/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Plus, User, ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { addCustomer, setCustomer } from "./orderSlice";
import type { Customer } from "@/types/OrderTypes";

function CustomerDetails() {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [value, setValue] = React.useState("");
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // const selectedCustomer = useAppSelector(
  //   (state) => state.order.selectedCustomer
  // );

  const customers = useAppSelector((state) => state.order.customers);

  const handleCustomerChange = (value: Customer) => {
    dispatch(setCustomer(value));
  };

  const handleAddCustomer = () => {
    console.log(name + phone + email);

    const customer: Customer = {
      id: Date.now().toString(),
      name: name,
      phone: phone,
      email: email,
    };
    setName("");
    setPhone("");
    setEmail("");
    setOpenDialog(false);
    dispatch(addCustomer(customer));
  };

  return (
    <div className="w-full">
      {/* Ensure full width */}
      <Card className="border border-gray-200 shadow-sm w-full">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          {/* Add responsive padding */}
          {/* Changed to responsive flex layout */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full">
            <div className="flex-1 w-full min-w-0 text-left">
              {/* min-w-0 prevents flex item from overflowing */}
              <Label className="block mb-2" htmlFor="customer">
                Select Customer
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? customers.find((customer) => customer.name === value)
                          ?.name
                      : "Select customer..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search customers..." />
                    <CommandList>
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer.id}
                            value={customer.name}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                              handleCustomerChange(customer);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === customer.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {customer.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent w-full sm:w-auto sm:mt-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogDescription className="sr-only">
                  Add a new customer to the order
                </DialogDescription>
                {/* Make dialog responsive */}
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                  <Button
                    disabled={name.trim().length < 3 || phone.trim().length < 8}
                    className="   w-full"
                    onClick={handleAddCustomer}
                  >
                    Add Customer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerDetails;
