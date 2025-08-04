/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import type { Cake, Design } from "@/types/OrderTypes";
import { useAppSelector } from "@/app/hooks";
import { updateCake } from "@/app/orderSlice";
interface DesignSelectionProps {
  cake: Cake;
  onDesignChange: (ids: number[]) => void;
}
function DesignSelection({ cake, onDesignChange }: DesignSelectionProps) {
  const [selectedDesignIds, setSelectedDesignIds] = React.useState<number[]>(
    cake.selectedDesignChargeIds || []
  );
  const selectedCakes = useAppSelector((state) => state.order.selectedCakes);

  const designs = useAppSelector((state) => state.order.designs);
  // Sync local state with cake prop when it changes
  React.useEffect(() => {
    setSelectedDesignIds(cake.selectedDesignChargeIds || []);
  }, [cake.selectedDesignChargeIds]);

  const onTapDesign = (id: number) => {
    setSelectedDesignIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((designId) => designId !== id)
        : [...prev, id];

      console.log("sdsd", newIds);

      // Call onDesignChange in a separate effect or use setTimeout to avoid calling during render
      //   use setTimeout with 0 delay to defer the call to the next tick
      setTimeout(() => {
        onDesignChange(newIds);
      }, 0);
      return newIds;
    });
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignCard
            design={design}
            key={design.id}
            onTapDesign={onTapDesign}
            isSelected={
              cake.selectedDesignChargeIds.includes(design.id) || false
            }
          />
        ))}
      </div>
    </div>
  );
}

interface DesignCardProps {
  design: Design;
  onTapDesign: (id: number) => void;
  isSelected: boolean;
}
const DesignCard = (props: DesignCardProps) => {
  const design = props.design;
  const isSelected = props.isSelected;
  const style = isSelected
    ? "border-1  bg-pink-50 border-pink-400 rounded-lg p-4 cursor-pointer text-left"
    : "border  rounded-lg p-4 cursor-pointer text-left";

  return (
    <div className={style} onClick={() => props.onTapDesign(design.id)}>
      <img
        src={design.image}
        alt="design images"
        className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
      />
      <h4 className="font-medium text-gray-900 text-sm">{design.name}</h4>
      <p className="text-gray-600 text-sm">₹{design.price}</p>
    </div>
  );
};

export default DesignSelection;
