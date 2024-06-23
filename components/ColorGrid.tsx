"use client";

import { getRandomInteger } from "@/utils/numbers";
import { toPng } from "html-to-image";
import { useCallback, useMemo, useRef } from "react";

const ColorGrid = ({
  gridWidth,
  gridHeight,
  colors = ["white", "black"],
}: {
  gridWidth: number;
  gridHeight: number;
  colors?: string[];
}) => {
  const grid = useMemo(() => {
    var tempGrid = [];

    for (var i = 0; i < gridHeight; i++) {
      var row = [];
      for (var j = 0; j < gridWidth; j++) {
        row.push(getRandomInteger(0, colors.length));
      }
      tempGrid.push(row);
    }

    return tempGrid;
  }, [gridHeight, gridWidth, colors]);

  const gridRef = useRef<HTMLDivElement>(null);

  const saveImage = useCallback(() => {
    if (gridRef.current === null) {
      return;
    }

    toPng(gridRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "grid.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gridRef]);

  const getColor = (row: number) => {
    return `${colors[row]}`;
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-fit" ref={gridRef}>
        {grid.map((c, i) => (
          <div key={i} className="h-2 flex w-fit">
            {c.map((r, j) => (
              <div
                style={{
                  background: getColor(r),
                }}
                key={`${i}_${j}}`}
                className={"h-2 w-2"}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={saveImage}
          className="mb-3 ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default ColorGrid;
