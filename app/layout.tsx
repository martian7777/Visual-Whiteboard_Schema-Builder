import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whiteboard → Schema",
  description: "Sketch an ER diagram, get Prisma + SQL + Mermaid in one shot."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
