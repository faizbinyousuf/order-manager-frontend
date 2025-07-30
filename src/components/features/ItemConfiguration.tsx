import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
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
function ItemConfiguration() {
  const dispatch = useAppDispatch();
  const cakes = useAppSelector((state) => state.order.cakes);
  const shapes = useAppSelector((state) => state.order.shapes);
  const selectedCake = useAppSelector((state) => state.order.selectedCake);

  return (
    <div>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-3">
            <Settings />
            <h3>Item Configuration </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-3">
            <div className="grid md:grid-cols-2 gap-6  ">
              <div>
                <Label
                  htmlFor="flavor"
                  className="mb-1 text-sm font-medium text-gray-700   "
                >
                  Item Flavor
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Flavour</SelectLabel>
                      {cakes.map((cake) => (
                        <SelectItem key={cake.id} value={cake.name}>
                          {cake.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="flavor"
                  className="mb-1 text-sm font-medium text-gray-700    "
                >
                  Item Shape
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Shape</SelectLabel>

                      {shapes.map((shape) => (
                        <SelectItem key={shape.id} value={shape.name}>
                          {shape.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="inscription"
              >
                Inscription
              </Label>
              <Textarea
                id="inscription"
                // value={orderData.inscription}
                // onChange={(e) =>
                //   setOrderData({ ...orderData, inscription: e.target.value })
                // }
                placeholder="Enter text to be written on the item"
                rows={3}
                className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
            <div className="col-span-2">
              <Label
                className=" mb-1 text-sm font-medium text-gray-700"
                htmlFor="price"
              >
                Base Price
              </Label>
              <Input readOnly defaultValue="0">
                {selectedCake?.price}
              </Input>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ItemConfiguration;
