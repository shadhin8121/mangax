"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const localStorageData = localStorage.getItem("login");
        if (localStorageData === "true") {
            setLogin(true);
        } else {
            router.push("/login");
        }
        setLoading(false);
    }, [router]);

    async function getting_data() {
        try {
            const response = await fetch(
                "http://localhost:4043/get_translator_home_page_data",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const result = await response.json();
            setData(result.message || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data.");
        }
    }

    useEffect(() => {
        if (login) {
            getting_data();
        }
    }, [login]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!login) {
        return <div>Access denied. Please log in to view this page.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="space-y-4">
                    {data.map((manga) => (
                        <div
                            key={manga.id}
                            className="flex items-center p-4 bg-gray-100 rounded-lg w-full cursor-pointer"
                            onClick={() => router.push(`/${manga.id}`)}
                        >
                            <Image
                                src={`http://${window.location.hostname}:4043/cover_image/${manga.cover_image}`}
                                width={100}
                                height={150}
                                alt={manga.title}
                                className="rounded-lg"
                            />
                            <h1 className="ml-4 text-lg font-semibold">
                                {manga.title}
                            </h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
