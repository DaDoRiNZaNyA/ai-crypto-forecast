import { getCryptocompareHistory } from "@/entitites/cryptocompare/server";
import { useQuery } from "@tanstack/react-query";

export const useCryptoCompareHistory = ({
  asset,
  currency,
  limit,
}: {
  asset: string;
  currency: string;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["crypto-compare-history", asset, currency, limit],
    queryFn: async () => getCryptocompareHistory({ asset, currency, limit }),
    staleTime: 1000 * 60 * 5,
  });
};
