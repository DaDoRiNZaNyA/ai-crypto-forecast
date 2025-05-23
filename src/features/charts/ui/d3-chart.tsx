import { PricePoint } from "@/entitites/cryptocompare/types";
import {
  extent,
  scaleLinear,
  scaleTime,
  line as d3Line,
  curveMonotoneX,
  timeFormat,
} from "d3";

export const D3Chart = ({ data }: { data: PricePoint[] }) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 70 };
  const width = 670 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, (d) => d.time) as [Date, Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([
      Math.min(...data.map((d) => d.price)) * 0.95,
      Math.max(...data.map((d) => d.price)) * 1.05,
    ])
    .range([height, 0]);

  const lineGenerator = d3Line<PricePoint>()
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.price))
    .curve(curveMonotoneX);

  const pathD = lineGenerator(data) ?? "";

  const xTicks = xScale.ticks(6);
  const yTicks = yScale.ticks(6);

  const formatTime = timeFormat("%H:%M");

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className="px-4"
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xTicks.map((tick, i) => {
          const x = xScale(tick);
          return (
            <line
              key={`x-grid-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
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
              x2={width}
              y2={y}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
            />
          );
        })}

        {xTicks.map((tick, i) => {
          const x = xScale(tick);
          return (
            <g key={`x-axis-${i}`} transform={`translate(${x},${height})`}>
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

        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          className="stroke-fuchsia-400 dark:stroke-fuchsia-300"
          strokeWidth={3}
        />

        {data.map((d, i) => (
          <circle
            key={`point-${i}`}
            cx={xScale(d.time)}
            cy={yScale(d.price)}
            r={3}
            fill="currentColor"
            className="fill-fuchsia-700 dark:fill-fuchsia-400"
          />
        ))}
      </g>
    </svg>
  );
};
