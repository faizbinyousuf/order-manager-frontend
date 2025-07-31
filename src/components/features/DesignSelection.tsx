import React from "react";

interface Design {
  id: number;
  name: string;
  price: number;
  image: string;
}
function DesignSelection() {
  const designs: Design[] = [
    {
      id: 1,
      name: "Floral Pattern",
      price: 25,
      image: "https://picsum.photos/200/100",
    },
    {
      id: 2,
      name: "Geometric Pattern",
      price: 30,
      image: "https://picsum.photos/200/100",
    },
    {
      id: 3,
      name: "Abstract Pattern",
      price: 20,
      image: "https://picsum.photos/200/100",
    },
    {
      id: 4,
      name: "Floral Pattern",
      price: 25,
      image: "https://picsum.photos/200/100",
    },
    {
      id: 5,
      name: "Geometric Pattern",
      price: 30,
      image: "https://picsum.photos/200/100",
    },
    {
      id: 6,
      name: "Abstract Pattern",
      price: 20,
      image: "https://picsum.photos/200/100",
    },
  ];

  const [selectedDesignIds, setSelectedDesignIds] = React.useState<number[]>(
    []
  );
  const onTapDesign = (id: number) => {
    if (selectedDesignIds.includes(id)) {
      setSelectedDesignIds(
        selectedDesignIds.filter((designId) => designId !== id)
      );
    } else {
      setSelectedDesignIds([...selectedDesignIds, id]);
    }
    console.log(selectedDesignIds);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignCard
            design={design}
            key={design.id}
            onTapDesign={onTapDesign}
            isSelected={selectedDesignIds.includes(design.id)}
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
    ? "border-1  bg-purple-50 border-purple-400 rounded-lg p-4 cursor-pointer text-left"
    : "border  rounded-lg p-4 cursor-pointer text-left";

  return (
    <div className={style} onClick={() => props.onTapDesign(design.id)}>
      <img
        src={design.image}
        alt="design images"
        className="w-full h-20 object-cover rounded mb-3 bg-gray-100"
      />
      <h4 className="font-medium text-gray-900 text-sm">{design.name}</h4>
      <p className="text-gray-600 text-sm">${design.price}</p>
    </div>
  );
};

export default DesignSelection;
