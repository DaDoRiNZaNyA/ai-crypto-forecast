"use server";
import { generateContent } from "@/entitites/ai/server";
import {
  getCryptocompareCoinInfo,
  getCryptocompareHistory,
} from "@/entitites/cryptocompare/server";

export const aiForecastAssetPrice = async ({
  asset,
  currency,
  limit,
}: {
  asset: string;
  currency: string;
  limit: number;
}) => {
  const [info, history] = await Promise.all([
    getCryptocompareCoinInfo({ asset, currency }),
    getCryptocompareHistory({ asset, currency, limit }),
  ]);

  const historyText = history
    .map(
      (item) =>
        `Time: ${item.time.toISOString()}, Closing Price: ${item.price.toFixed(
          2
        )}`
    )
    .join("\n");

  const generalInfoText = JSON.stringify(info.DISPLAY[asset]?.USD, null, 2);

  const prompt = `
    You are a financial analyst. Analyze the cryptocurrency ${asset.toUpperCase()} based on the following data.
    
    General Information:
    ${generalInfoText}
    
    Price History (last ${limit} hours):
    ${historyText}
    
    Provide a detailed forecast for the next 24 hours including:
    - Possible price levels (minimum, maximum, average)
    - Risks and potential causes of volatility
    - Technical analysis insights (if possible)
    
    Write your response in English, as a professional financial analyst.
    `;

  const result = await generateContent(prompt);
  return result;
};
