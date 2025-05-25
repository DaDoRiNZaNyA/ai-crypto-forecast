import axios from "axios";
import { CryptoComparePriceResponse } from "../types";

export const getCryptocompareCoinInfo = async ({
  asset,
  currency,
}: {
  asset: string;
  currency: string;
}) => {
  const url = `${
    process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URL
  }/data/pricemultifull?fsyms=${asset.toUpperCase()}&tsyms=${currency.toUpperCase()}`;
  const data = await axios.get<CryptoComparePriceResponse>(url);

  return data.data;
};
