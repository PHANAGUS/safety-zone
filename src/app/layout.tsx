import type { Metadata } from "next";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
// import AnimationLayout from "./animationLayout";

import "./globals.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <body>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </body>
    </html>
  );
}
