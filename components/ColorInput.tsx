"use client";

import { useState } from "react";

const ColorInput = ({
  defaultValue,
  name,
}: {
  defaultValue: string;
  name: string;
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="w-full h-full flex flex-col">
      <input
        className="mb-3 cursor-pointer"
        type="color"
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        name={name}
      />
      <p className="block mb-2 text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
};

export default ColorInput;
