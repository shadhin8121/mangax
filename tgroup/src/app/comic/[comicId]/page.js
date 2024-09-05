"use client";
import { notify_error } from "@/utility/notify";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    //image url
    const imageUrl = `${base_url}/cover_image/${data?.cover_image}`;

    //converting year
    const year = new Date(data?.release_date).getFullYear();

    useEffect(() => {
        async function fetching_comic_data() {
            try {
                const response = await fetch(
                    `${base_url}/get_manga_data/${params.comicId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    notify_error("Network response was not ok");
                    throw new Error("Network response was not ok");
                }

                const res_data = await response.json();
                setData(res_data.data);
            } catch (error) {
                console.error("Fetching error:", error.message);
                setData(null); // Handle error state if needed
                notify_error(error.message);
            }
        }

        fetching_comic_data();
    }, [base_url, params.comicId]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            {data && (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <Image
                            src={imageUrl}
                            width={450}
                            height={350}
                            alt={data?.title || "cover image"}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-4">
                            {data?.title}
                        </h1>
                        <p className="text-gray-700 mb-4">
                            <strong>Alternative Titles: </strong>
                            {data?.alternative_titles.join(", ")}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Description: </strong>
                            {data?.description}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Type: </strong>
                            {data?.type}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Status: </strong>
                            {data?.status}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <strong>Publisher: </strong>
                            {data?.publishers.join(", ")}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Genres: </strong>
                            {data?.genres.join(", ")}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Theme: </strong>
                            {data?.theme.join(", ") || "..?"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Format: </strong>
                            {data?.format.join(", ") || "..?"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Rating: </strong>
                            {data?.rating || "..?"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Release Date: </strong>
                            {data.release_date ? year : "...?"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Authors: </strong>
                            {data?.authors.join(", ")}
                        </p>

                        <p className="text-gray-700">
                            <strong>Artists: </strong>
                            {data?.artists.join(", ")}
                        </p>
                    </div>
                    <div>
                        <button>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
