import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const CoinItem = ({
  fullName,
  name,
  algorithm,
  proofType,
  MKTCAP,
  price,
  image,
  sym,
}: {
  coinId: string;
  fullName: string;
  name: string;
  algorithm: string;
  proofType: string;
  price: string;
  MKTCAP: number;
  image: string;
  sym: string;
}) => {
  return (
    <Link href={"/"}>
      <Card className="shadow-md hover:shadow-lg hover:scale-105 duration-150 ease-in-out h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image
              src={`https://www.cryptocompare.com${image}`}
              alt={fullName}
              className="w-8 h-8 rounded-full"
              loading="lazy"
              width={32}
              height={32}
            />
            {fullName} ({name})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Algorithm: <strong>{algorithm || "N/A"}</strong>
          </p>
          <p>
            Proof Type: <strong>{proofType || "N/A"}</strong>
          </p>
          <p>
            Market Cap:{" "}
            <strong>
              {MKTCAP
                ? MKTCAP.toLocaleString("en-US", {
                    style: "currency",
                    currency: sym,
                  })
                : "N/A"}
            </strong>
          </p>
          <p>
            Price: <strong>{price ?? "N/A"}</strong>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
