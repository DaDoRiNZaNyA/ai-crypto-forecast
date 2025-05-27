"use server";

import { forecastRepository } from "../repositories/forecast";
import { aiForecastAssetPrice } from "@/entitites/forecast/server";

export const getOrCreateTodayForecast = async ({
  asset,
  currency,
  limit,
}: {
  asset: string;
  currency: string;
  limit: number;
}) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const existingForecasts = await forecastRepository.getForecasts({
    asset,
    skip: 0,
    take: 1,
    order: "desc",
  });

  const latestForecast = existingForecasts[0];

  if (
    latestForecast &&
    new Date(latestForecast.createdAt) > twentyFourHoursAgo
  ) {
    return latestForecast;
  }

  const forecastText = await aiForecastAssetPrice({ asset, currency, limit });

  const newForecast = await forecastRepository.createForecast({
    asset,
    text: forecastText,
  });

  return newForecast;
};
