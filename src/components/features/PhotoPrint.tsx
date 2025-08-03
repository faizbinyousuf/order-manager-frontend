import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { Cake } from "@/types/OrderTypes";
import { updateCake, setAdvancePayment } from "@/app/orderSlice";
import { Camera, CameraIcon, Image, Images } from "lucide-react";
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

            <div className="flex justify-between items-center">
              <div className=" mt-3 w-1/2 space-y-3 pr-2 ">
                <Label className=" font-semibold text-sm">Upload Photo </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(cake.id, e)}
                  className=" w-full  mr-3"
                  id={`photo-upload-${cake.id}`}
                />

                {/* <div className="relative ">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(cake.id, e)}
                  className="hidden"
                  id={`photo-upload-${cake.id}`}
                />
                <label
                  htmlFor={`photo-upload-${cake.id}`}
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-rose-300 rounded-xl cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all group"
                >
                  <div className="p-3 bg-rose-100 rounded-full group-hover:bg-rose-200 transition-colors mb-3">
                    <Camera className="h-6 w-6 text-rose-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Click to upload photo
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    PNG, JPG up to 10MB
                    <br />
                    High resolution recommended for best quality
                  </p>
                </label>
              </div> */}
              </div>
              <div className="mt-5 mr-8 rounded-2xl">
                <img
                  src={cake.file}
                  alt="photo_cake_image"
                  className="h-32 w-32 rounded-lg"
                />
              </div>
            </div>

            {/*  */}
            {/* <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Camera className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold text-green-800">
                    Photo uploaded successfully!
                  </p>
                  <p className="text-xs text-green-600">{"file_name"}</p>
                </div>
                <div className="text-green-600 ml-auto">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoPrint;
