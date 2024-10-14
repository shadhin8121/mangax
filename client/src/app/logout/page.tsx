"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import notify_success, { notify_error } from "@/utility/host_toast";
import { useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/api/api";

const Page: React.FC = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        logging_out();
        const timeout = setTimeout(() => {
            router.push("/");
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [router]);

    async function logging_out() {
        try {
            const data = await logoutUser(); // Directly call the logout function

            if (data) {
                notify_success("Logout successful");

                // Invalidate the cache and refetch profile data
                await queryClient.invalidateQueries({
                    queryKey: ["profile_data"],
                    exact: true,
                });
                await queryClient.refetchQueries({
                    queryKey: ["profile_data"],
                });

                // Optionally force re-render if needed
                queryClient.resetQueries({
                    queryKey: ["profile_data"],
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.name, error.message);
                notify_error(error.message);
            } else {
                console.error("unknown error");
                notify_error("Unknown error occurred while logging out.");
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
