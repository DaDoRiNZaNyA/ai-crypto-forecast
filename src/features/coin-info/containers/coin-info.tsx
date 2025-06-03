import { ChatDrawer } from "./chat-drawer";
import { CoinCard } from "./coin-card";
import { CoinChart } from "./coin-chart";
import { CoinForecast } from "./coin-forecast";

export const CoinInfo = ({ asset }: { asset: string }) => {
  return (
    <div className="flex flex-col p-8 min-h-screen gap-8">
      <ChatDrawer asset={asset} />
      <div className="flex xl:flex-row flex-col gap-8">
        <CoinCard asset={asset} />
        <CoinChart asset={asset} />
      </div>
      <div className="flex flex-row w-full">
        <CoinForecast asset={asset} />
      </div>
    </div>
  );
};
