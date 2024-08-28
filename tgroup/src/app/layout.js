import { Inter } from "next/font/google";
import "./globals.css";
import Exclude_signup_login from "@/components/Exclude_signup_login";
import { Toaster } from "react-hot-toast"; // Import Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Translator",
    description: "Just For Translators. No General Public is allowed",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Exclude_signup_login />
                {children}

                {/* toast */}
                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}
