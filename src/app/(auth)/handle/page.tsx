import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    code?: string;
    message?: string;
    error_description?: string;
  }>;
}

export default async function AuthHandlePage({ searchParams }: Props) {
  const { code, message, error_description } = await searchParams;

  let content = {
    title: "Статус",
    text: "Сообщение не получено",
    color: "",
  };

  if (error_description) {
    content = {
      title: "Error",
      text: error_description,
      color: "text-red-600",
    };
  } else if (message) {
    content = {
      title: "Message",
      text: message,
      color: "text-green-600",
    };
  } else if (code) {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-lg shadow p-8">
        <CardHeader className={`text-2xl font-bold mb-4 ${content.color}`}>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>{content.text}</CardContent>
      </Card>
    </main>
  );
}
