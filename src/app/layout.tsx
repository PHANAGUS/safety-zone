import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comfy Breath Room",
  description: "Comfy Breath Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
