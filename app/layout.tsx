import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
  display:'swap'
})


export const metadata: Metadata = {
  title: "AppTrackr",
  description: "Ease your job search process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ubuntu.className}
      >
        {children}
      </body>
    </html>
  );
}
