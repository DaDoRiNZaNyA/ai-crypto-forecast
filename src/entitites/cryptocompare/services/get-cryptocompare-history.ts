import axios from "axios";
import { CryptoCompareHistoryResponse } from "../types";

export const getCryptocompareHistory = async ({
  asset,
  currency,
  limit,
}: {
  asset: string;
  currency: string;
  limit: number;
}) => {
  const url = `${
    process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URL
  }/data/v2/histohour?fsym=${asset.toUpperCase()}&tsym=${currency.toUpperCase()}&limit=${limit}`;
  const data = await axios.get<CryptoCompareHistoryResponse>(url);

  return data?.data?.Data.Data.map((item) => ({
    time: new Date(item.time * 1000),
    price: item.close,
  }));
};
//https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD - текущая цена
//https://min-api.cryptocompare.com/data/top/mktcapfull?limit=1&tsym=USD&page=3
