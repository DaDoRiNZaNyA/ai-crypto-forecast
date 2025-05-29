import { NextResponse } from "next/server";
import { routes } from "@/kernel/routes";
import { createClient } from "@/shared/lib/sse/supabaseServerClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const baseUrl = `${url.protocol}//${url.host}`;

  const forwardParams = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    if (key !== "code") {
      forwardParams.append(key, value);
    }
  });
  const suffix = forwardParams.toString() ? `?${forwardParams.toString()}` : "";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const params = new URLSearchParams(forwardParams);
      params.set("error_description", error.message);
      return NextResponse.redirect(
        `${baseUrl}${routes.authHandle()}?${params.toString()}`
      );
    }
    return NextResponse.redirect(`${baseUrl}${routes.profile()}`);
  }

  return NextResponse.redirect(`${baseUrl}${routes.authHandle()}${suffix}`);
}
