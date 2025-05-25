import { ScaleLinear, ScaleTime } from "d3";
import { memo } from "react";
import { HEIGHT, WIDTH } from "../consts/sizes";

export const GridLines = memo(
  ({
    xTicks,
    yTicks,
    xScale,
    yScale,
  }: {
    xTicks: Date[];
    yTicks: number[];
    xScale: ScaleTime<number, number>;
    yScale: ScaleLinear<number, number>;
  }) => {
    return (
      <>
        {xTicks.map((tick, i) => {
          const x = xScale(tick);
          return (
            <line
              key={`x-grid-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={HEIGHT}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
            />
          );
        })}
        {yTicks.map((tick, i) => {
          const y = yScale(tick);
          return (
            <line
              key={`y-grid-${i}`}
              x1={0}
              y1={y}
              x2={WIDTH}
              y2={y}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
            />
          );
        })}
      </>
    );
  }
);

GridLines.displayName = "GridLines";
