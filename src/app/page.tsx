import { getCryptocompareCoinsList } from "@/entitites/cryptocompare/services/get-crypromare-coins-list";
import { CoinsList } from "@/features/coins-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const LIMIT = 30;
const SYM = "USD";

export default async function Home() {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchInfiniteQuery({
      queryKey: ["coins", SYM],
      queryFn: ({ pageParam }) =>
        getCryptocompareCoinsList({
          page: pageParam as number,
          sym: SYM,
          limit: LIMIT,
        }),
      initialPageParam: 0,
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinsList sym={SYM} limit={LIMIT} />
    </HydrationBoundary>
  );
}
