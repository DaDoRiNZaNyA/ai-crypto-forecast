import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const encodedEmail = Buffer.from(user.email).toString("base64");
    supabaseResponse.headers.set("x-user-email", encodedEmail);
  } else {
    supabaseResponse.headers.delete("x-user-email");
  }

  //   if (
  //     !user &&
  //     !request.nextUrl.pathname.startsWith("/login") &&
  //     !request.nextUrl.pathname.startsWith("/auth")
  //   ) {
  //     // no user, potentially respond by redirecting the user to the login page
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  return supabaseResponse;
}
