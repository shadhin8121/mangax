import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Mangax",
    description: "Free Manga reading website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark:bg-slate-800`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
