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
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);

  const existingForecasts = await forecastRepository.getForecasts({
    asset,
    skip: 0,
    take: 1,
    order: "desc",
  });

  if (existingForecasts.length > 0) {
    return existingForecasts[0];
  }

  const forecastText = await aiForecastAssetPrice({ asset, currency, limit });

  const newForecast = await forecastRepository.createForecast({
    asset,
    text: forecastText,
  });

  return newForecast;
};
