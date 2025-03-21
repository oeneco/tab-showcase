import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ViewProviderWrapper from "@/components/ViewProviderWrapper";
import { ViewProvider } from "@/contexts/ViewContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cursor Show",
  description: "Experience Cursor without downloading it",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/GT-America-Standard-Medium-Trial.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ViewProviderWrapper>
          <ViewProvider>{children}</ViewProvider>
        </ViewProviderWrapper>
      </body>
    </html>
  );
}
