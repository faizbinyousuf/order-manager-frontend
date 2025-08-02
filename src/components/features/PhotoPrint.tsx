import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { Cake } from "@/types/OrderTypes";
import { updateCake, setAdvancePayment } from "@/app/orderSlice";

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
      <div className=" flex items-center gap-3 ">
        <Checkbox
          id="photoprint"
          checked={photoPrint}
          onCheckedChange={handleToggle}

          // onCheckedChange={(checked: boolean) => setPhotoPrint(checked)}
        />
        <Label htmlFor="photoprint">Add photo print </Label>
      </div>
      {photoPrint && (
        <RadioGroup value={photoSize} onValueChange={handleSizeChange}>
          <Label className="mt-1 ml-4 font-[500]">Photo Size</Label>
          <div className=" flex items-center space-x-2    ml-4">
            <RadioGroupItem value="half" id="option-one" />
            <Label className="font-normal text-xs mr-8" htmlFor="option-one">
              Half Size
            </Label>
            <RadioGroupItem value="full" id="option-two" />
            <Label className="font-normal text-xs" htmlFor="option-two">
              Full Size
            </Label>
          </div>
          <div className=" mt-2 ml-4  w-full max-w-sm space-y-3">
            <Label className="  font-[500]">Upload Photo</Label>
            <Input id="picture" type="file" />
          </div>
        </RadioGroup>
      )}
    </div>
  );
}

export default PhotoPrint;
