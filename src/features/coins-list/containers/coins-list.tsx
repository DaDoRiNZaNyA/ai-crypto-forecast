"use client";

import React from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { useInfiniteCoins } from "../hooks/useInfiniteCoins";
import { CoinItem } from "../ui/coin-item";

const LIMIT = 30;
const sym = "USD";

export const CoinsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCoins({ limit: LIMIT, sym });

  React.useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {data?.pages.flatMap((page) =>
          page.Data.map((coin) => (
            <CoinItem
              key={coin.CoinInfo.Id}
              name={coin.CoinInfo.Name}
              fullName={coin.CoinInfo.FullName}
              algorithm={coin.CoinInfo.Algorithm}
              coinId={coin.CoinInfo.Id}
              proofType={coin.CoinInfo.ProofType}
              image={coin.CoinInfo.ImageUrl}
              price={coin.DISPLAY?.[sym]?.PRICE}
              MKTCAP={coin.RAW?.[sym].MKTCAP}
              sym={sym}
            />
          ))
        )}
      </div>

      <div className="text-center mt-4">
        {isFetchingNextPage && <Spinner size="large" />}
      </div>
    </div>
  );
};
