import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import "../globals.css";
import ReactQueryProvider from "../QueryProvider";
import { ReusableSnackBar } from "@/Components/Snackbar/Snackbar";
import { getMessages } from "next-intl/server";
import ClientOnly from "@/Components/ClientOnly/ClientOnly";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CryptoLab",
  description: "CryptoLab Website",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: any };
}>) {
  const messages = await getMessages(locale);
  return (
    <html dir={locale === "en" ? "ltr" : "rtl"} lang={locale}>
      <body className={`${notoKufiArabic.variable} antialiased`}>
        <ReactQueryProvider>
          <ClientOnly>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
            <ReusableSnackBar />
          </ClientOnly>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
