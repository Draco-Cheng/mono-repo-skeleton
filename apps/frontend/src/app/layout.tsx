import type { Metadata, Viewport } from "next";
import "./globals.css";
import Menu from "../components/templates/Menu";
import UpdatePrompt from "../components/atoms/UpdatePrompt";

export const metadata: Metadata = {
  title: "Mono Repo Skeleton",
  description: "Mono Repo Skeleton - Next.js Frontend",
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
        <UpdatePrompt />
      </body>
    </html>
  );
}
