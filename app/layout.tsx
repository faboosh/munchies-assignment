import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { FilterContextProvider } from "@/context/FilterContext";
import { RestaurantContextProvider } from "@/context/RestaurantContext";

const sfPro = localFont({ src: "./SF-Pro.ttf" });

export const metadata: Metadata = {
  title: "Munchies",
  description:
    "Find the best restaurants in your city and get it delivered to your place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sfPro.className}>
        <FilterContextProvider>
          <RestaurantContextProvider>{children}</RestaurantContextProvider>
        </FilterContextProvider>
      </body>
    </html>
  );
}
