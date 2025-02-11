import type { Metadata } from "next";
import "../globals.css";
import Header from "./components/Header";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Dashboard - Comfy Breath Room",
  description: "Dashboard - Comfy Breath Room",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        width: "100dvw",
        maxWidth: "100dvw",
      }}
    >
      <Header />
      {children}
    </div>
  );
}
