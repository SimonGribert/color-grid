"use client";

import ColorGrid from "@/components/ColorGrid";
import { useSearchParams } from "next/navigation";
import React from "react";

const Grid = () => {
  const searchParams = useSearchParams();

  const gridWidth = searchParams.get("gridWidth");
  const gridHeight = searchParams.get("gridHeight");
  const colors = searchParams.getAll("colors");

  return (
    <div className="bg-gray-200 min-h-screen p-4">
        <ColorGrid
          gridHeight={Number(gridHeight)}
          gridWidth={Number(gridWidth)}
          colors={
            colors != null && colors.length > 0
              ? colors.map((c) => `#${c}`)
              : undefined
          }
        />
    </div>
  );
};

export default Grid;
