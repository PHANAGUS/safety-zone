import type { Metadata } from "next";
import "../globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Auto Comfort Air System",
  description: "Auto Comfort Air System",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles["page-layout"]}>{children}</div>;
}
