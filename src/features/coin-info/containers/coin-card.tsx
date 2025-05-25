"use client";

import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Image from "next/image";
import { useCoinInfo } from "../hooks/use-coin-info";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CoinCardContent } from "../ui/coin-card-content";

export const CoinCard = ({ asset }: { asset: string }) => {
  const { data, isLoading, isError } = useCoinInfo({
    asset,
    currency: "USD",
  });

  const display = data?.DISPLAY[asset]?.USD;
  const raw = data?.RAW[asset]?.USD;

  return (
    <Card className="w-full h-fit shadow-xl rounded-2xl p-6">
      {isLoading && <Skeleton className="min-h-[846px]" />}
      {isError && (
        <Label className="text-2xl font-bold text-red-600">
          Error loading data
        </Label>
      )}
      {display && raw && (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                {display.FROMSYMBOL} / {display.TOSYMBOL}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Market: {display.MARKET}
              </p>
              <p className="text-muted-foreground text-sm">
                Last Market: {display.LASTMARKET}
              </p>
            </div>
            {raw.IMAGEURL && (
              <Image
                src={`https://www.cryptocompare.com${raw.IMAGEURL}`}
                alt={`${asset} logo`}
                width={48}
                height={48}
              />
            )}
          </CardHeader>

          <CoinCardContent {...display} />
        </>
      )}
    </Card>
  );
};
