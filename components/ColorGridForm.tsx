"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ColorInput from "./ColorInput";

const ColorGridForm = () => {
  const [colors, setColors] = useState(["#ffffff", "#000000"]);
  const router = useRouter();

  const handleForm = (formData: FormData) => {
    const rawFormData = {
      gridWidth: formData.get("gridWidth"),
      gridHeight: formData.get("gridHeight"),
      colors: colors.map((_, i) => formData.get(`colors[${i}]`)),
    };

    router.push(
      `/grid?gridWidth=${rawFormData.gridWidth}&gridHeight=${
        rawFormData.gridHeight
      }&${rawFormData.colors
        .map((c) => `colors=${c?.toString().replaceAll("#", "")}` as string)
        .join("&")}`
    );
  };

  return (
    <div>
      <form action={handleForm}>
        <div className="flex flex-col w-96">
          <label
            htmlFor="gridWidth"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Grid Width:
          </label>
          <input
            aria-describedby="amount of grid columns"
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="number"
            name="gridWidth"
            id="gridWidth"
            placeholder="20"
          />
          <label
            htmlFor="gridHeight"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Grid Height:
          </label>
          <input
            aria-describedby="amount of grid rows"
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="number"
            name="gridHeight"
            id="gridHeight"
            placeholder="20"
          />
          <p className="block mb-2 text-sm font-medium text-gray-900">
            Colors:
          </p>
          <div className="mb-3 w-full">
            <div className="grid grid-cols-4">
              {colors.map((c, i) => (
                <ColorInput key={i} defaultValue={c} name={`colors[${i}]`} />
              ))}
            </div>
            <button
              onClick={() => {
                setColors((p) => [...p, "#ffffff"]);
              }}
              className=" mb-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              type="button"
            >
              Add Color
            </button>
          </div>
          <button
            className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
            type="submit"
          >
            Create Grid
          </button>
        </div>
      </form>
    </div>
  );
};

export default ColorGridForm;
