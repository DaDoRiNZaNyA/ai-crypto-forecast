import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/providers/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/shared/components/ui/navbar";
import BProgressProvider from "@/shared/components/providers/bprogress-provider";
import QueryClientProvider from "@/shared/components/providers/query-client-provider";
import { headers } from "next/headers";
import { logout } from "@/entitites/user/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Crypto Forecast | Top Coins",
  description:
    "Browse the top cryptocurrencies with AI-generated forecasts. Discover promising coins and stay ahead of market trends.",
  keywords: [
    "cryptocurrency",
    "AI forecast",
    "crypto analysis",
    "bitcoin prediction",
    "ethereum forecast",
    "crypto AI",
  ],
  openGraph: {
    title: "AI Crypto Forecast | Top Coins",
    description:
      "Discover trending cryptocurrencies with forecasts powered by AI. Stay informed and make smart decisions.",
    url: "https://ai-crypto-forecast.vercel.app",
    siteName: "CryptoForecastAI",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const encodedEmail = hdrs.get("x-user-email") ?? "";
  const email = encodedEmail
    ? Buffer.from(encodedEmail, "base64").toString("utf8")
    : null;

  const logoutAction = async () => {
    "use server";
    await logout();
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BProgressProvider>
              <Toaster
                toastOptions={{
                  closeButton: true,
                }}
                richColors
              />
              <Navbar email={email} logoutAction={logoutAction} />
              <main className="pt-16">
                {children}
                <Analytics />
                <SpeedInsights />
              </main>
            </BProgressProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
