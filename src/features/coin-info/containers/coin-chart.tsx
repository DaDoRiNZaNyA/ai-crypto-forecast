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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const LIMITS = [12, 24, 48, 72];

export const CoinChart = ({ asset }: { asset: string }) => {
  const [limit, setLimit] = useState(24);

  const { data, isLoading, isError } = useCryptoCompareHistory({
    asset,
    currency: "USD",
    limit,
  });

  return (
    <Card className="w-full h-full shadow-xl rounded-2xl p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="mb-6 flex items-center space-x-4">
          <CardTitle className="text-lg font-semibold">
            {asset} price history for:
          </CardTitle>
          <DropdownMenu modal={false}>
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
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <div className="w-fit h-[420px]">
          {isLoading && <Skeleton />}
          {isError && (
            <Label className="text-2xl font-bold text-red-600">
              Error loading data
            </Label>
          )}
          <div className="w-fit border shadow-lg rounded-lg">
            {data && <D3Chart data={data} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
