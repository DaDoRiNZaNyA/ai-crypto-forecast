import { getCryptocompareHistory } from "@/entitites/cryptocompare/server";
import { getCryptocompareCoinInfo } from "@/entitites/cryptocompare/services/get-coin-info";
import { CoinCard } from "@/features/coin-info/containers/coin-card";
import { CoinChart } from "@/features/coin-info/containers/coin-chart";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Coin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const asset = id;
  const currency = "USD";
  const limit = 24;

  try {
    await Promise.all([
      queryClient.fetchQuery({
        queryKey: ["crypto-compare-history", asset, currency, limit],
        queryFn: () =>
          getCryptocompareHistory({
            asset,
            currency,
            limit,
          }),
      }),

      queryClient.fetchQuery({
        queryKey: ["coin-info", asset, currency],
        queryFn: () =>
          getCryptocompareCoinInfo({
            asset,
            currency,
          }),
      }),
    ]);
  } catch (err) {
    console.error(err);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex xl:flex-row flex-col p-8 min-h-screen gap-8">
        <CoinCard asset={id} />
        <CoinChart name={id} />
      </div>
    </HydrationBoundary>
  );
}
