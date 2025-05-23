"use client";
import { useState } from "react";
import { useCryptoCompareHistory } from "../hooks/use-crypto-compare-history";
import { D3Chart } from "../ui/d3-chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Skeleton } from "@/shared/components/ui/skeleton";

const LIMITS = [12, 24, 48, 72];

export const CoinItem = () => {
  const [limit, setLimit] = useState(24);

  const { data, isLoading, isError } = useCryptoCompareHistory({
    asset: "BTC",
    currency: "USD",
    limit,
  });

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6 flex items-center space-x-4">
        <Label className="text-lg font-semibold">BTC price history for:</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {limit} hours
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LIMITS.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setLimit(item)}>
                {item} hours
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="md:w-[704px] w-full h-[402px] flex items-center justify-center overflow-x-auto border shadow-lg rounded-lg">
        {isLoading && <Skeleton />}
        {isError && (
          <Label className="text-2xl font-bold text-red-600">
            Error loading data
          </Label>
        )}
        {data && <D3Chart data={data} />}
      </div>
    </div>
  );
};
