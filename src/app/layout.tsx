import type { Metadata } from "next";
import { AuthProvider } from "./components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financeiro",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
