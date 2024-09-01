"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import notify_success, { notify_error } from "@/utility/notify";
import Link from "next/link";

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, isLoading] = useState(false);
    const base_url = "http://localhost:4043/login_translator";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            isLoading(true);
            const response = await fetch(base_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                //set in local storage: login=true
                localStorage.setItem("login", "true");
                notify_success("logged in successfully");
                router.push("/");
            } else {
                notify_error(data.message);
            }
            isLoading(false);
        } catch (error) {
            isLoading(false);
            notify_error(error.message);
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Login Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-blue-600">
                        <span>
                            <Link href="/register" className="hover:underline">
                                Register
                            </Link>
                        </span>
                        <span className="hover:underline cursor-pointer">
                            forgot password
                        </span>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? "Submitting..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
