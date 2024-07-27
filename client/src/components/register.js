"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    let router = useRouter();
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function makeAnAccount(event) {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://" + window.location.hostname + ":4043/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.name.trim(),
                        email: formData.email.trim(),
                        password: formData.password.trim(),
                    }),
                }
            );
            if (response.ok) {
                router.push("/login");
            } else {
                console.log("Register failed: ", response.statusText);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-slate-800">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center dark:text-gray-200">
                    Register
                </h1>
                <form onSubmit={makeAnAccount}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="shadow appearance-none dark:bg-slate-700 dark:text-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="shadow appearance-none dark:bg-slate-700 dark:text-gray-200 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="shadow appearance-none dark:bg-slate-700 dark:text-gray-200 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
