"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
    interface login_data_type {
        email: string;
        password: string;
    }

    const router = useRouter();
    const [formData, setFormData] = useState<login_data_type>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false); // Change: Explicitly typed state

    const handleSubmitButton = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        // Change: Typed event parameter
        event.preventDefault();

        try {
            setLoading(true);
            const response = await fetch("http://localhost:4043/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                }),
            });

            if (response.ok) {
                // Handle successful login (e.g., store token, redirect)
                router.push("/");
            } else {
                // Handle failed login (e.g., show error message)
                console.error("Login failed:", response.statusText);
            }
            setLoading(false);
        } catch (error) {
            // Handle network error or other exceptions
            setLoading(false);
            console.error("Error logging in:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Change: Typed event parameter
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
            <form
                onSubmit={handleSubmitButton}
                className="bg-white p-6 rounded-lg shadow-md lg:w-96 md:w-72 w-full -mt-52 dark:bg-slate-800"
            >
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-slate-600 dark:text-gray-200"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-slate-600 dark:text-gray-200"
                    />
                </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <span className="text-blue-500 cursor-pointer">
                            <Link href="/register">Create Account</Link>
                        </span>
                    </div>
                    <div className="mb-4 text-right">
                        <span className="text-blue-500 cursor-pointer">
                            Forgot password?
                        </span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
