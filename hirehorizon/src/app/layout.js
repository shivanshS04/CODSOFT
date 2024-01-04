"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider as NextThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
