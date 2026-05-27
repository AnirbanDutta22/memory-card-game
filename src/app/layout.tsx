import React from "react";
import "./globals.css";

export const metadata = {
  title: "MEMORA — Memory Card Game",
  description: "Test your memory. Beat the clock.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <section>{children}</section>
      </body>
    </html>
  );
}
