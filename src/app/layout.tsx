import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
  weight: '100 900',
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
					${suit.variable}
          ${inter.variable}
          antialiased`
        }
      >
        {children}
      </body>
    </html>
  );
}
