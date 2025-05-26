import { getOrCreateTodayForecast } from "@/entitites/forecast/server";
import { useQuery } from "@tanstack/react-query";

export const useAiForecastAssetPrice = ({
  asset,
  currency,
  limit,
}: {
  asset: string;
  currency: string;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["ai-forecast-asset-price", asset, currency, limit],
    queryFn: async () => getOrCreateTodayForecast({ asset, currency, limit }),
    staleTime: 1000 * 60 * 5,
  });
};
