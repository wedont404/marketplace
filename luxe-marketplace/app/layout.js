import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/app/Providers";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata = {
  title: "Luxe Marketplace",
  description: "Premium frontend-only template marketplace with contributor portal and Google Sheets backend integration.",
  keywords: ["Next.js marketplace", "frontend templates", "UI kits", "Google Sheets CMS", "contributor portal"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${sans.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
