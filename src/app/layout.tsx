import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

// 한글 폰트
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: "웰리 - 해외 여행 | 요가 여행 | 웰니스 트립 | 온라인 요가",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable} 
          ${notoSansKr.variable} 
          antialiased`
        }
      >
        {children}
      </body>
    </html>
  );
}
