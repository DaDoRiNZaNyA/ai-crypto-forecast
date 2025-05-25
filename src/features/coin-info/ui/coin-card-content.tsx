import { DisplayData } from "@/entitites/cryptocompare/types";
import { CardContent } from "@/shared/components/ui/card";
import { InfoRow } from "./info-row";

export const CoinCardContent = (display: DisplayData) => {
  return (
    <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
      <InfoRow label="Price" value={display.PRICE} />
      <InfoRow
        label="Last Volume"
        value={`${display.LASTVOLUME} → ${display.LASTVOLUMETO}`}
      />
      <InfoRow label="Last Trade ID" value={display.LASTTRADEID} />

      <InfoRow
        label="24h High / Low"
        value={`${display.HIGH24HOUR} / ${display.LOW24HOUR}`}
      />
      <InfoRow
        label="24h Change"
        value={`${display.CHANGE24HOUR} (${display.CHANGEPCT24HOUR}%)`}
      />
      <InfoRow label="24h Open" value={display.OPEN24HOUR} />

      <InfoRow
        label="Volume Hour"
        value={`${display.VOLUMEHOUR} → ${display.VOLUMEHOURTO}`}
      />
      <InfoRow label="Open Hour" value={display.OPENHOUR} />
      <InfoRow
        label="High / Low Hour"
        value={`${display.HIGHHOUR} / ${display.LOWHOUR}`}
      />

      <InfoRow
        label="Volume Day"
        value={`${display.VOLUMEDAY} → ${display.VOLUMEDAYTO}`}
      />
      <InfoRow label="Open Day" value={display.OPENDAY} />
      <InfoRow
        label="High / Low Day"
        value={`${display.HIGHDAY} / ${display.LOWDAY}`}
      />

      <InfoRow
        label="Change Day"
        value={`${display.CHANGEDAY} (${display.CHANGEPCTDAY}%)`}
      />
      <InfoRow
        label="Change Hour"
        value={`${display.CHANGEHOUR} (${display.CHANGEPCTHOUR}%)`}
      />
      <InfoRow label="Last Update" value={display.LASTUPDATE} />

      <InfoRow label="Market Cap" value={display.MKTCAP} />
      <InfoRow label="Market Cap Penalty" value={display.MKTCAPPENALTY} />
      <InfoRow label="Supply" value={display.SUPPLY} />

      <InfoRow label="Circulating Supply" value={display.CIRCULATINGSUPPLY} />
      <InfoRow
        label="Circ. Supply MktCap"
        value={display.CIRCULATINGSUPPLYMKTCAP}
      />
      <InfoRow label="Conversion Type" value={display.CONVERSIONTYPE} />

      <InfoRow
        label="Conversion Symbol"
        value={display.CONVERSIONSYMBOL || "N/A"}
      />
      <InfoRow
        label="Conversion Last Update"
        value={display.CONVERSIONLASTUPDATE}
      />
      <InfoRow
        label="Top Tier Vol 24h"
        value={`${display.TOPTIERVOLUME24HOUR} → ${display.TOPTIERVOLUME24HOURTO}`}
      />

      <InfoRow
        label="Total Volume 24h"
        value={`${display.TOTALVOLUME24H} → ${display.TOTALVOLUME24HTO}`}
      />
      <InfoRow
        label="Total Top Tier Volume"
        value={`${display.TOTALTOPTIERVOLUME24H} → ${display.TOTALTOPTIERVOLUME24HTO}`}
      />
    </CardContent>
  );
};
