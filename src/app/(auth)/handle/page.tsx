import { HandleCard } from "@/features/auth";

interface Props {
  searchParams: Promise<{
    code?: string;
    message?: string;
    error_description?: string;
  }>;
}

export default async function AuthHandlePage({ searchParams }: Props) {
  const { message, error_description } = await searchParams;

  let content = {
    title: "",
    text: "",
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
  }

  return (
    <main className="flex items-center justify-center p-4">
      <HandleCard
        color={content.color}
        text={content.text}
        title={content.title}
      />
    </main>
  );
}
