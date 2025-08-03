import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { Cake } from "@/types/OrderTypes";
import { updateCake, setAdvancePayment } from "@/app/orderSlice";
import {
  CameraIcon,
  Image,
  ImageOff,
  Images,
  Package,
  Printer,
  Truck,
} from "lucide-react";
import { Button } from "../ui/button";

interface PhotoPrintProps {
  cake: Cake;
}
function PhotoPrint({ cake }: PhotoPrintProps) {
  const [photoPrint, setPhotoPrint] = React.useState(false);
  const [photoSize, setPhotoSize] = useState("");
  const selectedCakes = useAppSelector((state) => state.order.selectedCakes);

  const dispatch = useAppDispatch();
  const handleToggle = (option: boolean) => {
    console.log(selectedCakes);
    if (selectedCakes[0].flavorId === 0) {
      toast("Please select cake Flavor", {
        dismissible: true,
        // description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "close",
          onClick: () => console.log("Undo"),
        },
      });
      return; // Only return if flavor is not selected
    }
    console.log("toggle photo", option);

    setPhotoPrint(option);
    if (!option) {
      // When turning off photo print, reset the size selection
      setPhotoSize("");
      const cakeIndex = selectedCakes.findIndex((c) => c.id === cake.id);

      dispatch(
        updateCake({
          index: cakeIndex,

          changes: {
            halfPhoto: false,
            fullPhoto: false,
          },
        })
      );
      dispatch(setAdvancePayment(0));
    }
  };

  const handleSizeChange = (value: string) => {
    const isHalf = value === "half" ? true : false;
    const isFull = value === "half" ? false : true;
    console.log("photo size", value);
    setPhotoSize(value);
    const cakeIndex = selectedCakes.findIndex((c) => c.id === cake.id);
    dispatch(setAdvancePayment(0));
    dispatch(
      updateCake({
        index: cakeIndex,
        changes: {
          ...{
            halfPhoto: isHalf,
            fullPhoto: isFull,
          },
        },
      })
    );
  };

  return (
    <div className="space-y-5 ">
      <div className="py-4 flex items-center gap-3 bg-gradient-to-r from-rose-50 to-pink-50  border border-rose-200 rounded-xl min-h-12">
        <Checkbox
          className=" ml-4 border-rose-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
          id="photoprint"
          checked={photoPrint}
          onCheckedChange={handleToggle}
        />
        <div className="bg-red-100 rounded-full w-7 h-7 flex items-center justify-center">
          <CameraIcon className="w-3.5 h-3.5 text-red-600" />
        </div>
        <div>
          <Label
            htmlFor="photoprint"
            className="text-sm font-semibold text-rose-800 cursor-pointer"
          >
            Add Photo Print to Cake
          </Label>
          <p className="text-[10px] text-rose-600">
            Make your cake stand out with a photo
          </p>
        </div>
      </div>
      {photoPrint && (
        <div className="p-5    gap-3 bg-white  border-2 border-rose-200 rounded-xl   ">
          <div id="photosize-radio ">
            <div className="   gap-1 flex  items-center ">
              <Image className="w-4 h-4 text-rose-600" />
              <Label className=" font-semibold text-sm">
                Choose Photo Size
              </Label>
            </div>

            <div className="flex justify-between w-full  gap-4   mt-3">
              <Button
                onClick={() => setPhotoSize("half")}
                variant={"ghost"}
                className={` flex-1 relative p-4 rounded-lg border-2 cursor-pointer transition-all  min-h-24 text-left flex flex-col items-start shadow-none hover:shadow-none ${
                  photoSize === "half"
                    ? "border-rose-500 bg-rose-50  "
                    : "border-gray-200 hover:border-rose-300"
                }`}
              >
                <div className="absolute top-3 right-3 border-rose-400" />
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-rose-600" />
                    <span className="font-semibold text-gray-800">
                      Half Size
                    </span>
                  </div>
                  <p className="text-xs text-gray-600   text-left">
                    Perfect for 1Kg cakes
                  </p>
                  <p>
                    <span className="font-bold text-rose-600"> ₹100 </span>
                  </p>
                </div>
              </Button>

              <Button
                onClick={() => setPhotoSize("full")}
                variant={"ghost"}
                className={` flex-1  relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md min-h-24 text-left flex flex-col items-start ${
                  photoSize === "full"
                    ? "border-rose-500 bg-rose-50 shadow-sm"
                    : "border-gray-200 hover:border-rose-300"
                }`}
              >
                <div className="absolute top-3 right-3 border-rose-400" />
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2 ">
                    <Images className="h-7 w-7 text-rose-600" />
                    <span className="font-semibold text-gray-800">
                      Full Size
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 text-left">
                    Perfect for 2Kg+ cakes
                  </p>
                  <p>
                    <span className="font-bold text-rose-600">₹200 </span>
                  </p>
                </div>
              </Button>
            </div>

            <div className=" mt-3  w-full max-w-sm space-y-3">
              <Label className="  font-[500]">Upload Photo</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoPrint;
