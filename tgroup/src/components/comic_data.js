"use client";
import notify_success, { notify_error } from "@/utility/notify";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Comic_data_without_chapter = ({ params }) => {
    //edit mode or not
    let [edit, set_edit] = useState(false);
    const [data, setData] = useState(null);
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    //update data
    let [artist, set_artist] = useState("");
    let [alternative_title, set_alternative_title] = useState(null);
    let [rating, set_rating] = useState("");
    let [status, set_status] = useState("");

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

    //handle update
    async function handleUpdate() {
        try {
            let response = await fetch(
                `${base_url}/update_comic/:${params.comicId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        alternative_title,
                        rating,
                        artist,
                        status,
                    }),
                }
            );
            let data = await response.json();
            notify_success(data.message || "something went wrong");
        } catch (error) {
            notify_error(error.message);
        }
    }

    //edit
    function toggle_edit() {
        set_edit((previous) => !previous);
        edit
            ? notify_success("Edit Mode Turned Off")
            : notify_success("Edit mode turned On");
    }

    //handling swl
    async function handleUpdateSwl(text) {
        let res = await Swal.fire({
            title: `are you sure you want ${text} it?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#FF0000",
            confirmButtonColor: "#008000",
        });
        if (res.isConfirmed) {
            Swal.fire({
                title: "submitted",
                text: "your request has been submitted. an admin will review your request.",
                icon: "success",
                confirmButtonColor: "#008000",
            });
        }
    }

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
                        {/* conditional redering */}

                        <p className="text-gray-700 mb-4 flex items-center gap-2">
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
                        {/* conditional redering  */}
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
                        <button onClick={toggle_edit}>Edit</button>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center mt-5">
                {edit ? (
                    <div>
                        <button
                            onClick={() => handleUpdateSwl("Update")}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Request Update
                        </button>
                        <button
                            onClick={() => handleUpdateSwl("Delete")}
                            className="bg-red-500 text-white font-bold ml-3 py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Request Delete
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Comic_data_without_chapter;
