import { prisma } from "@/shared/lib/sse/db";
import { GetForecastsParams } from "../types";

const createForecast = async ({
  asset,
  text,
}: {
  asset: string;
  text: string;
}) => {
  return prisma.forecast.create({
    data: {
      asset,
      text,
    },
  });
};

const getForecasts = async ({
  asset,
  skip = 0,
  take = 10,
  order = "desc",
}: GetForecastsParams) => {
  const where = asset ? { asset } : {};

  return prisma.forecast.findMany({
    where,
    skip,
    take,
    orderBy: {
      createdAt: order,
    },
  });
};

export const forecastRepository = { createForecast, getForecasts };
