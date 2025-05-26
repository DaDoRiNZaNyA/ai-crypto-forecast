import { useInfiniteQuery } from "@tanstack/react-query";
import { CryptoCompareListResponse } from "@/entitites/cryptocompare/types";
import { getCryptocompareCoinsList } from "@/entitites/cryptocompare/server";

export const useInfiniteCoins = ({
  limit,
  sym,
}: {
  limit: number;
  sym: string;
}) => {
  return useInfiniteQuery<CryptoCompareListResponse, Error>({
    queryKey: ["coins", sym],
    queryFn: ({ pageParam }) =>
      getCryptocompareCoinsList({
        page: pageParam as number,
        sym,
        limit,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.Data.length === limit ? allPages.length : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};
