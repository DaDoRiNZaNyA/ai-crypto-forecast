import { PricePoint } from "@/entitites/cryptocompare/types";
import { ScaleLinear, ScaleTime } from "d3";
import { memo } from "react";

export const DataPoints = memo(
  ({
    data,
    xScale,
    yScale,
  }: {
    data: PricePoint[];
    xScale: ScaleTime<number, number>;
    yScale: ScaleLinear<number, number>;
  }) => (
    <>
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
    </>
  )
);

DataPoints.displayName = "DataPoints";
