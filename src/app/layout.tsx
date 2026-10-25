import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BELOG",
  description: "흩어져 있던 모임의 모든 순간을 하나로",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BELOG",
  },
  openGraph: {
    title: "BELOG",
    description: "흩어져 있던 모임의 모든 순간을 하나로",
    url: "https://belog.co.kr",
    siteName: "BELOG",
    images: [
      {
        url: "https://belog.co.kr/icons/OG-tag.png",
        width: 1200,
        height: 630,
        alt: "BELOG",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
