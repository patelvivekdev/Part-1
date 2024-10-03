import React, { memo } from "react";

const ColorSelector = memo(
  ({
    selectedColor,
    setColor,
    colors,
  }: {
    selectedColor: string | undefined;
    setColor: (color: string) => void;
    colors: { value: string; title: string }[];
  }) => {
    console.log("color changed")
    return (
      <div>
        <label>Select Color</label>
        <select
          value={selectedColor || ""}
          onChange={(e) => setColor(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color.value} value={color.value}>
              {color.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default ColorSelector;
