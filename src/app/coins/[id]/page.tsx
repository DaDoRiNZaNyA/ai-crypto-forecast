import { getCryptocompareHistory } from "@/entitites/cryptocompare/server";
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
  const data = {
    asset: id,
    currency: "USD",
    limit: 24,
  };

  try {
    await queryClient.fetchQuery({
      queryKey: [
        "crypto-compare-history",
        data.asset,
        data.currency,
        data.limit,
      ],
      queryFn: async () =>
        getCryptocompareHistory({
          asset: data.asset,
          currency: data.currency,
          limit: data.limit,
        }),
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinChart name={id} />
    </HydrationBoundary>
  );
}
