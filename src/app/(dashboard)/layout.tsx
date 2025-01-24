import type { Metadata } from "next";
import "../globals.css";
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
      <div className={styles.header}>
        <p>Comfy Breath Room</p>
      </div>
      <div className={styles.area}>{children}</div>
    </div>
  );
}
