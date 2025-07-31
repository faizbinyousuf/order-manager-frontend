import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";

function PhotoPrint() {
  const [photoPrint, setPhotoPrint] = React.useState(false);

  return (
    <div className="space-y-5 ">
      <div className=" flex items-center gap-3 ">
        <Checkbox
          id="photoprint"
          checked={photoPrint}
          onCheckedChange={(checked: boolean) => setPhotoPrint(checked)}
        />
        <Label htmlFor="photoprint">Add photo print </Label>
      </div>
      {photoPrint && (
        <RadioGroup defaultValue="option-one">
          <Label className="mt-1 ml-4 font-[500]">Photo Size</Label>
          <div className=" flex items-center space-x-2    ml-4">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label className="font-normal text-xs mr-8" htmlFor="option-one">
              Half Size
            </Label>
            <RadioGroupItem value="option-two" id="option-two" />
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
