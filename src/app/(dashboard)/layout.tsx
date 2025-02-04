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
    <div>
      <Header />
      {children}
    </div>
  );
}
