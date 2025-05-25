import { getCryptocompareCoinInfo } from "@/entitites/cryptocompare/services/get-coin-info";
import { useQuery } from "@tanstack/react-query";

export const useCoinInfo = ({
  asset,
  currency,
}: {
  asset: string;
  currency: string;
}) => {
  return useQuery({
    queryKey: ["coin-info", asset, currency],
    queryFn: async () => getCryptocompareCoinInfo({ asset, currency }),
    staleTime: 1000 * 60 * 5,
  });
};
