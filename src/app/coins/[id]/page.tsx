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

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const asset = id;
  return {
    title: `${asset} Forecast | AI Crypto Analysis`,
    description: `View in-depth forecast and analysis for ${asset} powered by artificial intelligence. See if it's worth investing.`,
    keywords: [
      asset,
      "crypto forecast",
      "AI crypto analysis",
      "should I buy",
      "crypto prediction",
    ],
    openGraph: {
      title: "AI Crypto Forecast | Top Coins",
      description:
        "Discover trending cryptocurrencies with forecasts powered by AI. Stay informed and make smart decisions.",
      url: "https://ai-crypto-forecast.vercel.app",
      siteName: "CryptoForecastAI",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Coin({ params }: Props) {
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
