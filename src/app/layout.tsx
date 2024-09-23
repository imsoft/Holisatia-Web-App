import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Toaster } from "../components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Holistia",
  description: "Holistia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body className={`${nunito.className} antialiased`}>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
