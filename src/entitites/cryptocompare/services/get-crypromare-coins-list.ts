import axios from "axios";
import { CryptoCompareListResponse } from "../types";
export const getCryptocompareCoinsList = async ({
  page,
  sym,
  limit,
}: {
  limit: number;
  page: number;
  sym: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URL}/data/top/mktcapfull?limit=${limit}&tsym=${sym}&page=${page}`;
  const data = await axios.get<CryptoCompareListResponse>(url);

  return data.data;
};
//https://www.cryptocompare.com/media/37746251/btc.png
