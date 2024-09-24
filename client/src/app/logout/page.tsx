"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/");
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [router]);

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
