"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import notify_success, { notify_error } from "@/utility/host_toast";

const Page: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        logging_out();
        const timeout = setTimeout(() => {
            router.push("/");
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [router]);

    async function logging_out() {
        try {
            const response = await fetch("http://localhost:4043/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                localStorage.removeItem("login");
                notify_success("logged out successfully");
            } else {
                notify_error(`Failed to log out: ${response.statusText}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.name);
                console.log(error.message);
                notify_error(error.message);
            } else {
                notify_error("unknown error");
                console.log("unknown error");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center dark:bg-slate-800">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Logout Successful
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-200">
                    Redirecting to homepage...
                </p>
            </div>
        </div>
    );
};

export default Page;
