// import { getCryptocompareHistory } from "@/entitites/cryptocompare/server";
// import { CoinItem } from "@/features/charts/containers/coin-item";
import { getCryptocompareCoinsList } from "@/entitites/cryptocompare/services/get-crypromare-coins-list";
import { CoinsList } from "@/features/coins-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const LIMIT = 30;
const sym = "USD";

export default async function Home() {
  const queryClient = new QueryClient();
  // const data = {
  //   asset: "BTC",
  //   currency: "USD",
  //   limit: 24,
  // };

  // try {
  //   await queryClient.fetchQuery({
  //     queryKey: [
  //       "crypto-compare-history",
  //       data.asset,
  //       data.currency,
  //       data.limit,
  //     ],
  //     queryFn: async () =>
  //       getCryptocompareHistory({
  //         asset: data.asset,
  //         currency: data.currency,
  //         limit: data.limit,
  //       }),
  //   });
  // } catch (error) {
  //   console.error("Ошибка при предзагрузке данных в Home:", error);
  // }

  try {
    await queryClient.fetchInfiniteQuery({
      queryKey: ["coins", sym],
      queryFn: ({ pageParam }) =>
        getCryptocompareCoinsList({
          page: pageParam as number,
          sym,
          limit: LIMIT,
        }),
      initialPageParam: 0,
    });
  } catch (error) {
    console.error("Ошибка при предзагрузке данных в Home:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <CoinItem /> */}
      <CoinsList />
    </HydrationBoundary>
  );
}
