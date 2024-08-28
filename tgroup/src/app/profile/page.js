"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import notify_success, { notify_error } from "../../utility/notify";

const Page = () => {
    const router = useRouter();

    //base url
    const base_url = "http://localhost:4043/translator_profile_data"; // Added http://

    //useState hook for data
    let [data, setData] = useState({});

    //logout function
    const handleLogout = () => {
        // Remove login=true from localStorage
        localStorage.removeItem("login");

        //toast
        notify_success("Logged out successfully");

        // Redirect to the login page
        router.push("/login");
    };

    async function fetching_user_information() {
        try {
            let response = await fetch(base_url, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                notify_error("Something went wrong");
                throw new Error("Network response was not ok");
            }

            let data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error("Failed to fetch user information:", error);
        }
    }

    useEffect(() => {
        fetching_user_information();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-xl font-semibold mb-2">
                    User name: <span className="text-blue-500">{data.username}</span>
                </p>
                <p className="text-lg mb-2">
                    User ID: <span className="text-gray-700">{data.id}</span>
                </p>
                <p className="text-lg mb-2">
                    Translation Group:{" "}
                    <span className="text-gray-700">{data.translator_group}</span>
                </p>
                <p className="text-lg">
                    Total Comics: <span className="text-green-500">12</span>
                </p>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Page;
