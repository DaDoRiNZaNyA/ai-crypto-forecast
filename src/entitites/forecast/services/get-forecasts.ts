"use server";

import { forecastRepository } from "../repositories/forecast";
import { GetForecastsParams } from "../types";

export const getForecasts = async (params: GetForecastsParams) => {
  return await forecastRepository.getForecasts(params);
};
