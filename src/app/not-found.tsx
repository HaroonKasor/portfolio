import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Outfit, Prompt, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import LocaleNotFound from "./[locale]/not-found";
import messages from "../../messages/en.json";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found — Haroon Kasor",
  robots: { index: false, follow: true },
};

/**
 * Root fallback for requests that never resolve a locale segment.
 * The root layout is a passthrough, so this page owns <html>/<body>.
 */
export default function RootNotFound() {
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={`${outfit.variable} ${prompt.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            locale={routing.defaultLocale}
            messages={messages}
          >
            <LocaleNotFound />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
