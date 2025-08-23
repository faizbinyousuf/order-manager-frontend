import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { Cake } from "@/types/OrderTypes";
import { updateCake, setAdvancePayment } from "@/app/orderSlice";
import { CameraIcon, Image, Images, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface PhotoPrintProps {
  cake: Cake;
}
function PhotoPrint({ cake }: PhotoPrintProps) {
  const [photoPrint, setPhotoPrint] = React.useState(false);
  const [photoSize, setPhotoSize] = useState("");
  const selectedCakes = useAppSelector((state) => state.order.selectedCakes);
  const [fileName, setFileName] = useState("");

  const dispatch = useAppDispatch();
  const handleToggle = (option: boolean) => {
    console.log(selectedCakes);
    if (selectedCakes[0].cakeId === 0) {
      toast("Please select cake Flavor", {
        dismissible: true,
        // description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "close",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }
    console.log("toggle photo", option);

    setPhotoPrint(option);
    if (cake.quantity > 1) {
      handleSizeChange("full");
    } else {
      handleSizeChange("half");
    }

    if (!option) {
      // When turning off photo print, reset the size selection
      setPhotoSize("");
      setFileName("");
      const cakeIndex = selectedCakes.findIndex((c) => c.id === cake.id);

      dispatch(
        updateCake({
          index: cakeIndex,

          changes: {
            halfPhoto: false,
            fullPhoto: false,
            file: "",
          },
        })
      );
      dispatch(setAdvancePayment(0));
    }
  };

  const handleFileUpload = (
    cakeId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cake = selectedCakes.find((c) => c.id === cakeId);
    console.log("cake id in photoPrint ", cake?.id);
    const cakeIndex = selectedCakes.findIndex((c) => c.id === cake!.id);
    console.log("cake index found", cakeIndex);
    const file = event.target.files?.[0];

    if (file) {
      const convertedFile = URL.createObjectURL(file);
      setFileName(file.name);

      dispatch(
        updateCake({
          index: cakeIndex,
          changes: {
            ...{
              file: convertedFile,
            },
          },
        })
      );
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

  const handleRemovePhoto = (id: number) => {
    const cakeIndex = selectedCakes.findIndex((c) => c.id === id);
    dispatch(
      updateCake({
        index: cakeIndex,
        changes: {
          ...{
            file: "",
          },
        },
      })
    );

    setFileName("");
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
          <p className="text-xs text-rose-600">
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
                type="button"
                onClick={() => handleSizeChange("half")}
                variant={"link"}
                className={`hover:no-underline flex-1 relative p-4 rounded-lg border-2 cursor-pointer transition-all  min-h-24 text-left flex flex-col items-start shadow-none hover:shadow-none ${
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
                type="button"
                onClick={() => handleSizeChange("full")}
                variant={"link"}
                className={` flex-1  relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md hover:no-underline min-h-24 text-left flex flex-col items-start ${
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

            <div className="  mt-4">
              <Label className="text-sm font-semibold text-gray-800 mb-3  flex items-center gap-2">
                <div className="p-1 bg-rose-100 rounded">
                  <Plus className="h-3 w-3 text-rose-600" />
                </div>
                Upload Your Photo (Optional)
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(cake.id, e)}
                className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                id={`photo-upload-${cake.id}`}
              />

              {cake.file && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-rose-200 shadow-sm">
                  <div className="flex items-start justify-start  gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={cake.file || "/placeholder.svg"}
                        alt="Selected photo"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-rose-200"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 mb-1 text-left">
                        Selected Photo
                      </p>
                      <p className="text-xs text-gray-600 truncate text-left">
                        {fileName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 text-left">
                        Size: {cake.halfPhoto === true ? "Half" : "Full"} •
                        Price: ₹{cake.halfPhoto === true ? 100 : 200}
                      </p>
                    </div>
                    {/* <Trash2
                      className="h-5 w-5 text-rose-600 ml-auto self-center mr-1"
                      onClick={() => handleRemovePhoto(cake.id)}
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoPrint;
