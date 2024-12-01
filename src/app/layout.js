import {
  Inter,
  IBM_Plex_Sans,
  Tajawal,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./QueryProvider";
import { ToastContainer } from "react-toastify";
import GoogleAnalytics from "@/components/home/components/GoogleAnalytics";
import GoogleAnalyticsDev from "@/components/home/components/GoogleAnalyticsDev";
import ReactGA from "react-ga4";

const inter = Inter({ subsets: ["latin"] });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Import all weights
});
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  variable: "--font-ibm-arabic",
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Import all weights
});
const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"], // Import all weights
});
export const metadata = {
  title: "Sabika",
  description: "Sabika Landing Page",
};

ReactGA.initialize("G-YKN6CKCNDG");

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${ibm.variable} ${tajawal.variable} ${ibmArabic.variable}`}
      >
        <GoogleAnalytics />
        <GoogleAnalyticsDev />
        <ToastContainer />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
