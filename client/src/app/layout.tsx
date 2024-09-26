import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/theme_provider";
import { Provider } from "jotai";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "MangaX",
    description: "Best Site to Read Manga",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-slate-800`}
            >
                <Provider>
                    {" "}
                    <ThemeProvider>{children}</ThemeProvider>
                    <Toaster position="top-center" reverseOrder={false} />
                </Provider>
            </body>
        </html>
    );
}
