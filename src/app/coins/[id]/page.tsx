import {
  getCryptocompareCoinInfo,
  getCryptocompareHistory,
} from "@/entitites/cryptocompare/server";
import { CoinInfo } from "@/features/coin-info";
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
      <CoinInfo asset={asset} />
    </HydrationBoundary>
  );
}
