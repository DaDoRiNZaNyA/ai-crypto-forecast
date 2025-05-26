"use client";
import { marked } from "marked";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAiForecastAssetPrice } from "../hooks/use-ai-forecast-asses-price";

export const CoinForecast = ({ asset }: { asset: string }) => {
  const { data, isLoading, isError } = useAiForecastAssetPrice({
    asset,
    currency: "USD",
    limit: 48,
  });

  return (
    <Card className="w-full h-fit shadow-xl rounded-2xl p-6">
      {isLoading && <Skeleton className="min-h-[846px]" />}
      {isError && (
        <Label className="text-2xl font-bold text-red-600">
          Error loading data
        </Label>
      )}
      {data && (
        <>
          <CardHeader className="flex flex-col">
            <CardTitle className="text-xl font-bold">
              Cryptocurrency Price Forecast for{" "}
              {data.createdAt.toLocaleDateString()}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Analysis and forecast of the{" "}
              <span className="font-semibold">{asset.toUpperCase()}</span> price
              dynamics based on historical data and AI models for the next 24-48
              hours.
            </p>
          </CardHeader>

          <CardContent>
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(data.text) }}
              className="prose"
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};
