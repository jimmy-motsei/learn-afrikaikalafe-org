import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afrika Ikalafe — A Literary Gathering Programme",
  description:
    "A seven-gathering programme bringing together African writers, thinkers, and storytellers across the continent and diaspora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
