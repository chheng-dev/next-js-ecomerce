import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

const ColorComp = ({ items, selectedColors, onChangeColor, isInValidColor }) => {
  return (
      <Select
        label="Colors"
        labelPlacement="outside"
        placeholder="Select a color"
        selectionMode="multiple"
        className="max-w-xs"
        value={selectedColors} 
        onChange={onChangeColor}
        isInvalid={isInValidColor}
        errorMessage="Please select valid colors"
      >
      {items.map((item) => (
        <SelectItem key={item.name} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <span
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: item.code }}
            ></span>
            {item.name}
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};

export default ColorComp;
