import { ScaleLinear, ScaleTime } from "d3";
import { memo } from "react";
import { HEIGHT } from "../consts/sizes";
import { formatTime } from "../utils/format-time";

export const Axis = memo(
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
  }) => (
    <>
      {xTicks.map((tick, i) => {
        const x = xScale(tick);
        return (
          <g key={`x-axis-${i}`} transform={`translate(${x},${HEIGHT})`}>
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={6}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-300"
            />
            <text
              y={20}
              textAnchor="middle"
              className="text-xs fill-current text-gray-600 dark:text-gray-300"
            >
              {formatTime(tick)}
            </text>
          </g>
        );
      })}
      {yTicks.map((tick, i) => {
        const y = yScale(tick);
        return (
          <g key={`y-axis-${i}`} transform={`translate(0,${y})`}>
            <line
              x1={-6}
              y1={0}
              x2={0}
              y2={0}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-300"
            />
            <text
              x={-10}
              dy="0.32em"
              textAnchor="end"
              className="text-xs fill-current text-gray-600 dark:text-gray-300"
            >
              {tick.toFixed(2)}
            </text>
          </g>
        );
      })}
    </>
  )
);

Axis.displayName = "Axis";
