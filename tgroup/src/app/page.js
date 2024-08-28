"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mangaData = [
    { id: 1, title: "Title 1", image: "/testing/1.jpg" },
    { id: 2, title: "Title 2", image: "/testing/2.jpg" },
    { id: 3, title: "Title 3", image: "/testing/3.jpg" },
    { id: 4, title: "Title 4", image: "/testing/4.jpg" },
    { id: 5, title: "Title 5", image: "/testing/5.jpg" },
];

export default function Home() {
    let [login, setLogin] = useState(false);
    let [loading, setLoading] = useState(true);
    let router = useRouter();

    useEffect(() => {
        const localStorageData = localStorage.getItem("login");
        if (localStorageData === "true") {
            setLogin(true);
        } else {
            router.push("/login");
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking login status
    }

    if (!login) {
        return null; // Prevent rendering the page content if not logged in
    }

    function sendToComicId(id) {
        router.push(`/${id}`);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {mangaData.map((manga) => (
                    <div
                        key={manga.id}
                        className="flex items-center p-4 bg-gray-100 rounded-lg w-full cursor-pointer"
                        onClick={() => sendToComicId(manga.id)}
                    >
                        <Image
                            src={manga.image}
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
        </div>
    );
}
