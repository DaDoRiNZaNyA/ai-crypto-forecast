"use server";

import { forecastRepository } from "../repositories/forecast";

export const createForecast = async ({
  asset,
  text,
}: {
  asset: string;
  text: string;
}) => {
  return await forecastRepository.createForecast({
    asset,
    text,
  });
};
