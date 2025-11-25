import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";


const UbuntuFont = Ubuntu({
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Multi-step form",
  description: "Challenge by Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>        
      </head>
      <body
        className={`${UbuntuFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
