/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CakeIcon, Edit3, Plus, Settings, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import DesignSelection from "./DesignSelection";
import PhotoPrint from "./PhotoPrint";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import type { Cake } from "@/types/OrderTypes";
import { addSelectedCake, removeCakeSelection, updateCake } from "./orderSlice";
function ItemConfiguration() {
  const dispatch = useAppDispatch();
  const cakes = useAppSelector((state) => state.order.cakes);
  const shapes = useAppSelector((state) => state.order.shapes);
  const selectedCakes = useAppSelector((state) => state.order.selectedCakes);

  const addNewCake = () => {
    const newCake: Cake = {
      id: selectedCakes.length + 1,
      name: " ",
      cakeShapeId: null,
      selectedDesignChargeIds: [],
      additionalDesign: "",
      customDesignCharge: 0,
      inscription: "",
      notes: "",
      searchCode: null,
      halfPhoto: false,
      fullPhoto: false,
      price: 0,
      quantity: 0,
      flavorId: 0,
    };

    dispatch(addSelectedCake(newCake));
  };

  const removeCake = (id: number) => {
    dispatch(removeCakeSelection(id));
  };
  const handleFlavorSelection = (index: number, id: string) => {
    console.log(" id", id);

    updateCakeProperty(index, {
      flavorId: parseInt(id),
      price: cakes.find((c) => c.id === parseInt(id))?.price || 0,
      name: cakes.find((c) => c.id === parseInt(id))?.name || "",
    });
  };

  const handleShapeSelection = (index: number, id: string) => {
    // setShape(shape);
    console.log("Selected shape: at index", index, id);
    updateCakeProperty(index, { cakeShapeId: parseInt(id) });
    console.log("handle shape log", selectedCakes);
  };

  const updateCakeProperty = (
    index: number,
    updates: Partial<Omit<Cake, "id">>
  ) => {
    console.log("Updating cake at index:", index, updates);
    dispatch(
      updateCake({
        index: index,
        changes: {
          ...updates,
        },
      })
    );
  };

  return (
    <div>
      <Card className="border border-gray-200 shadow-sm  ">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <Settings />
            <h3>Items ({selectedCakes.length}) </h3>
            <Button
              onClick={addNewCake}
              variant="outline"
              className="bg-red   ml-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCakes.length === 0 && (
            <div className="w-full  flex flex-col items-center space-y-3   p-8 bg-white">
              <CakeIcon color="#E5E7EB" className="h-10 w-10 " />
              <p className="text-sm text-gray-500">No cakes added yet</p>
              <Button
                onClick={addNewCake}
                variant="outline"
                className="max-w-[200px]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          )}

          {selectedCakes.map((cake, index) => (
            <div
              key={cake.id}
              className="w-full space-y-8 border border-gray-200 rounded-md p-6 bg-gray-50 mb-8"
            >
              {/* 3 columns grid */}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-gray-400" />
                  Item #{selectedCakes.indexOf(cake) + 1}
                </h3>
                <Button
                  variant="outline"
                  onClick={() => removeCake(cake.id)}
                  size="sm"
                  className="border-red-300   text-red-600 hover:bg-red-50 hover:border-red-400 rounded-sm"
                >
                  <Trash2 strokeWidth={1} className="h-1 w-1 " />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6  ">
                <div>
                  <Label htmlFor="flavor" className="mb-2   text-gray-700   ">
                    Item Flavor
                  </Label>
                  <Select
                    key={cake.id}
                    // value={cake.flavorId?.toString() || ""}
                    value={cake.flavorId ? cake.flavorId.toString() : undefined}
                    onValueChange={(value) =>
                      handleFlavorSelection(index, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Flavour</SelectLabel>
                        {cakes.map((cake) => (
                          <SelectItem key={cake.id} value={cake.id.toString()}>
                            {cake.name}
                          </SelectItem>
                        ))}

                        {/* {cakes.map((cake) => (
                          <SelectItem key={cake.id} value={cake.id.toString()}>
                            {cake.name}
                          </SelectItem>
                        ))} */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="shape" className="mb-2   text-gray-700    ">
                    Item Shape
                  </Label>
                  <Select
                    value={
                      cake.cakeShapeId ? cake.cakeShapeId.toString() : undefined
                    }
                    onValueChange={(value) =>
                      handleShapeSelection(index, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Shape</SelectLabel>

                        {shapes.map((shape) => (
                          <SelectItem
                            key={shape.id}
                            value={shape.id.toString()}
                          >
                            {shape.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="quantity"
                    className="mb-2   text-gray-700    "
                  >
                    Quantity
                  </Label>
                  <Input id="quantity" type="number" placeholder="1" />
                </div>
              </div>

              {/* 2 column grid  */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2   text-gray-700" htmlFor="inscription">
                    Inscription
                  </Label>
                  <Textarea
                    id="inscription"
                    value={cake.inscription}
                    onChange={(e) =>
                      updateCakeProperty(index, {
                        inscription: e.target.value,
                      })
                    }
                    placeholder="Enter text to be written on the item"
                    rows={3}
                    className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <Label className="mb-2   text-gray-700" htmlFor="notes">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={cake.notes}
                    onChange={(e) =>
                      updateCakeProperty(index, {
                        notes: e.target.value,
                      })
                    }
                    placeholder="Enter special instructions"
                    rows={3}
                    className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="w-[50%] pr-3">
                <Label className=" mb-2   text-gray-700" htmlFor="price">
                  Base Price
                </Label>
                <Input readOnly defaultValue={selectedCakes?.length}></Input>
              </div>
              <Label
                className="mb-2 mt-2   text-gray-700"
                htmlFor="design selection"
              >
                Design Selection
              </Label>
              <DesignSelection />

              {/* Photo print section */}
              <PhotoPrint />
              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Cake Total:
                </span>
                <span className="text-lg font-medium text-gray-900">
                  $80
                  {/* {(
                    (cake.basePrice +
                      (cake.selectedDesign?.charge || 0) +
                      (cake.photoOption.enabled
                        ? cake.photoOption.size === "half"
                          ? 10
                          : 20
                        : 0)) *
                    cake.quantity
                  ).toFixed(2)} */}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default ItemConfiguration;
