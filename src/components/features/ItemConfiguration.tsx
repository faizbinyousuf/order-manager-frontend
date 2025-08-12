/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Beaker,
  CakeIcon,
  CakeSlice,
  Edit3,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import type { Cake, Design } from "@/types/OrderTypes";
import {
  addSelectedCake,
  removeCakeSelection,
  selectCakeTotal,
  selectGrandTotal,
  selectRemainingBalance,
  updateCake,
} from "../../app/orderSlice";
function ItemConfiguration() {
  const dispatch = useAppDispatch();
  const cakes = useAppSelector((state) => state.order.cakes);
  const shapes = useAppSelector((state) => state.order.shapes);
  const selectedCakes = useAppSelector((state) => state.order.selectedCakes);
  const designs = useAppSelector((state) => state.order.designs);

  // Total Related Selectors
  const grandTotal = useAppSelector(selectGrandTotal);

  const remainingBalance = useAppSelector(selectRemainingBalance);
  const generateUniqueIntegerId = () => {
    const maxId = cakes.reduce((maxId, cake) => Math.max(maxId, cake.id), 0);
    return maxId + 1;
  };
  const addNewCake = () => {
    const newCake: Cake = {
      id: generateUniqueIntegerId(),
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
      file: "",
      // photoOption: null,
    };

    dispatch(addSelectedCake(newCake));
  };
  const calculateCakeTotal = (cake: Cake): number => {
    // Base cake price
    let total = cake.price * cake.quantity;
    console.log("qty", cake.quantity);

    // Photo charges
    if (cake.halfPhoto) {
      total += 100;
    } else if (cake.fullPhoto) {
      total += 200;
    }

    // Design charges (assuming selectedDesignChargeIds contains design IDs)
    // You'll need to access your designs array to get prices
    console.log("des ids", cake.selectedDesignChargeIds);
    const designCharges = cake.selectedDesignChargeIds.reduce(
      (sum, designId) => {
        const design = designs.find((d) => d.id === designId);
        return sum + (design?.price || 0);
      },
      0
    );
    console.log("des charges in config", designCharges);

    total += designCharges;

    // Additional custom design charge
    total += cake.customDesignCharge;
    console.log("total in config", total);

    return total;
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
      quantity: 1,
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
            <CakeSlice />
            <h3>Cakes ({selectedCakes.length}) </h3>
            <Button
              onClick={addNewCake}
              variant="outline"
              className="bg-red   ml-auto hover:border-rose-500 hover:text-rose-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Cake
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCakes.length === 0 && (
            <div className="w-full  flex flex-col items-center space-y-3   p-8 bg-white">
              <CakeIcon color="#f43f5e" className="h-10 w-10 " />
              <p className="text-sm text-gray-500">No cakes added yet</p>
              <Button
                onClick={addNewCake}
                variant="outline"
                className="hover:border-rose-500 hover:text-rose-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Cake
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
                  Cake #{selectedCakes.indexOf(cake) + 1}
                </h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      // onClick={() => removeCake(cake.id)}
                      size="sm"
                      className="border-red-300   text-red-600 hover:bg-red-50 hover:border-red-400 rounded-sm"
                    >
                      <Trash2 strokeWidth={1} className="h-1 w-1 " />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the current selected cake and all the
                        informations associated with it. Click continue to
                        remove.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          removeCake(cake.id);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    step="1"
                    defaultValue={1}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        updateCakeProperty(index, { quantity: value });
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
                      const value = Math.max(1, parseInt(e.target.value) || 1);
                      updateCakeProperty(index, { quantity: value });
                      e.target.value = value.toString(); // Force correct value in input
                    }}
                    placeholder="1"
                  />
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

                <Input readOnly value={cake.price} />
              </div>
              <Label
                className="mb-2 mt-2   text-gray-700"
                htmlFor="design selection"
              >
                Design Selection
              </Label>
              <DesignSelection
                cake={cake}
                onDesignChange={(selectedIds) => {
                  console.log("sds in config", selectedIds);
                  updateCakeProperty(index, {
                    selectedDesignChargeIds: selectedIds,
                  });
                }}
              />

              {/* Photo print section */}
              <PhotoPrint cake={cake} />
              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Cake Total:
                </span>
                <span className="text-lg font-medium text-gray-900">
                  ₹{calculateCakeTotal(cake).toFixed(2)}
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
