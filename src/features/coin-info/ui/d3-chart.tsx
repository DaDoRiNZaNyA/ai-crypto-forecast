"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import {
  extent,
  scaleLinear,
  scaleTime,
  line as d3Line,
  curveMonotoneX,
} from "d3";
import { PricePoint } from "@/entitites/cryptocompare/types";
import { DataPoints } from "./data-points";
import { Axis } from "./axis";
import { GridLines } from "./grid-lines";
import { HEIGHT, MARGIN, WIDTH } from "../consts/sizes";
import { formatTime } from "../utils/format-time";

export const D3Chart = memo(({ data }: { data: PricePoint[] }) => {
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    time: Date;
    price: number;
  } | null>(null);

  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(data, (d) => d.time) as [Date, Date])
      .range([0, WIDTH]);
  }, [data]);

  const yScale = useMemo(() => {
    const prices = data.map((d) => d.price);
    return scaleLinear()
      .domain([Math.min(...prices) * 0.95, Math.max(...prices) * 1.05])
      .range([HEIGHT, 0]);
  }, [data]);

  const pathD = useMemo(() => {
    const lineGenerator = d3Line<PricePoint>()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.price))
      .curve(curveMonotoneX);
    return lineGenerator(data) ?? "";
  }, [data, xScale, yScale]);

  const xTicks = useMemo(() => xScale.ticks(6), [xScale]);
  const yTicks = useMemo(() => yScale.ticks(6), [yScale]);

  const interpolatePrice = useCallback(
    (time: Date) => {
      let leftIndex = 0;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].time <= time && time <= data[i + 1].time) {
          leftIndex = i;
          break;
        }
      }
      const left = data[leftIndex];
      const right = data[leftIndex + 1];
      if (!right) return left.price;

      const t0 = left.time.getTime();
      const t1 = right.time.getTime();
      const p0 = left.price;
      const p1 = right.price;

      const t = time.getTime();

      return p0 + ((t - t0) / (t1 - t0)) * (p1 - p0);
    },
    [data]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement>) => {
      const { left } = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - left;

      if (x < 0 || x > WIDTH) {
        setHover(null);
        return;
      }

      const hoveredTime = xScale.invert(x);
      const interpolatedPrice = interpolatePrice(hoveredTime);
      const y = yScale(interpolatedPrice);

      setHover({ x, y, time: hoveredTime, price: interpolatedPrice });
    },
    [xScale, yScale, interpolatePrice]
  );

  const handleMouseLeave = useCallback(() => {
    setHover(null);
  }, []);

  return (
    <svg
      width={WIDTH + MARGIN.left + MARGIN.right}
      height={HEIGHT + MARGIN.top + MARGIN.bottom}
      className="px-4 w-full min-w-[700px]"
    >
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <GridLines
          xTicks={xTicks}
          yTicks={yTicks}
          xScale={xScale}
          yScale={yScale}
        />
        <Axis xTicks={xTicks} yTicks={yTicks} xScale={xScale} yScale={yScale} />

        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          className="stroke-fuchsia-400 dark:stroke-fuchsia-300"
          strokeWidth={3}
        />

        <DataPoints data={data} xScale={xScale} yScale={yScale} />

        <rect
          width={WIDTH}
          height={HEIGHT}
          fill="transparent"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "crosshair" }}
        />

        {hover && (
          <>
            <line
              x1={hover.x}
              x2={hover.x}
              y1={0}
              y2={HEIGHT}
              stroke="gray"
              strokeDasharray="4"
              pointerEvents="none"
            />
            <circle
              cx={hover.x}
              cy={hover.y}
              r={5}
              fill="white"
              stroke="fuchsia"
              strokeWidth={2}
              pointerEvents="none"
            />
            <text
              x={hover.x < WIDTH / 2 ? hover.x + 10 : hover.x - 110}
              y={hover.y - 10}
              pointerEvents="none"
              className="text-xs fill-current text-black dark:text-white"
            >
              {`${formatTime(hover.time)} — $${hover.price.toFixed(2)}`}
            </text>
          </>
        )}
      </g>
    </svg>
  );
});

D3Chart.displayName = "D3Chart";
