"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export const HandleCard = ({
  color,
  text,
  title,
}: {
  color: string;
  title: string;
  text: string;
}) => {
  return (
    <Card className="max-w-md w-full rounded-lg shadow p-8">
      <CardHeader className={`text-2xl font-bold mb-4 ${color}`}>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{text}</CardContent>
    </Card>
  );
};
