import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/shared/components/ui/card";

export const AuthFormLayout = ({
  title,
  description,
  link,
  form,
}: {
  title: string;
  description: string;
  link: React.ReactNode;
  form: React.ReactNode;
}) => (
  <Card className="w-full min-h-[300px]">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{form}</CardContent>
    <CardFooter>{link}</CardFooter>
  </Card>
);
