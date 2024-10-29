"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileData } from "@/api/api";
import Link from "next/link";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoIosWarning } from "react-icons/io";
import notify_success, { notify_error } from "@/utility/host_toast";

const ProfilePage: React.FC = () => {
    const queryClient = useQueryClient(); // Initialize Query Client
    const { data, isLoading } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
    });

    const [modal, setModal] = useState<boolean>(false);
    const [imageLink, setImageLink] = useState<string>("");

    interface ProfileData {
        cover_image: string;
        username: string;
        // Add other fields as necessary
    }

    function toggleModal() {
        setModal(!modal);
    }

    // Handle Update
    const handleUpdate = async () => {
        if (!imageLink.trim()) {
            alert("Please enter a valid image URL."); // Alert if input is empty
            return;
        }

        const response = await fetch("http://localhost:4043/upload_profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageLink }), // Send as JSON
            credentials: "include",
        });

        if (response.ok) {
            notify_success("Updated Successfully!");

            // Update the query data immediately with proper typing
            queryClient.setQueryData<ProfileData>(
                ["profile_data"],
                (oldData) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            cover_image: imageLink, // Update the cover_image with new link
                        };
                    }
                    return oldData; // In case oldData is undefined (should not happen)
                }
            );

            // Optionally, refetch to ensure the server state is in sync
            queryClient.invalidateQueries({
                queryKey: ["profile_data"],
            });
        } else {
            notify_error("Failed to Update");
        }

        toggleModal(); // Close modal after submission
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 pb-20 dark:bg-gray-900 dark:text-gray-300">
                {/* Cover Photo Skeleton */}
                <div className="w-full">
                    <div className="relative h-64 bg-gray-200 animate-pulse dark:bg-gray-800">
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute bottom-0 md:left-8 lg:left-16 p-4 z-10">
                            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-600 bg-gray-300 animate-pulse dark:bg-gray-700 -mt-16"></div>
                            <div className="mt-2 ml-4">
                                <div className="h-6 w-40 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info Skeleton */}
                <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-500 p-4 rounded-lg shadow dark:bg-gray-800 animate-pulse">
                        <div className="h-6 w-24 bg-gray-300 rounded dark:bg-gray-700 mb-2"></div>
                        <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-600"></div>
                    </div>
                </div>

                {/* Posts Skeleton */}
                <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-gray-500 p-4 rounded-lg shadow mb-6 dark:bg-gray-800 animate-pulse">
                                <div className="h-6 w-24 bg-gray-300 rounded dark:bg-gray-700 mb-2"></div>
                                <div className="space-y-4">
                                    <div className="bg-gray-200 p-4 rounded-lg dark:bg-gray-700">
                                        <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-600"></div>
                                    </div>
                                    <div className="bg-gray-200 p-4 rounded-lg dark:bg-gray-700">
                                        <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-600"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-20 dark:bg-slate-900 dark:text-gray-200 relative">
            {/* Cover Photo */}
            <div className="w-full">
                <div
                    className="relative h-64 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/lol.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                    <div className="absolute bottom-0 md:left-8 lg:left-16 p-4 z-10">
                        <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-green-700 overflow-hidden -mt-16">
                            {data?.cover_image ? (
                                <Image
                                    src={`${data?.cover_image}`}
                                    width={500}
                                    height={500}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Link href="/profile/upload_cover">
                                    <Image
                                        src="/images/lol.jpg"
                                        width={500}
                                        height={500}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            )}
                        </div>
                        <h1
                            className="absolute -top-6 right-8 text-green-500 cursor-pointer"
                            onClick={toggleModal}
                        >
                            <GrDocumentUpdate size={20} />
                        </h1>
                        <h1 className="text-2xl font-bold text-white mt-2 ml-4 dark:text-gray-200">
                            {data?.username}
                        </h1>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 ">
                <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800 ">
                    <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
                        About
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer nec odio. Praesent libero. Sed cursus ante
                        dapibus diam.
                    </p>
                </div>
            </div>

            {/* Posts */}
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 ">
                        <div className="bg-white p-4 rounded-lg shadow mb-6 dark:bg-slate-800">
                            <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
                                Posts
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-gray-100 p-4 rounded-lg dark:bg-slate-700">
                                    <p className="text-gray-700 dark:text-gray-100">
                                        This is a post content.
                                    </p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg dark:bg-slate-700">
                                    <p className="text-gray-700 dark:text-gray-100">
                                        This is another post content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {modal && (
                <>
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-65 pointer-events-auto"></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="w-[600px] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-gray-800">
                            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
                                Update Profile Image
                            </h2>
                            <input
                                type="text"
                                placeholder="Enter Image URL"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="w-full p-2 border rounded mb-4 dark:bg-gray-600 dark:text-gray-200"
                            />

                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={toggleModal}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                            >
                                Cancel
                            </button>

                            <div className="flex flex-col items-start justify-center p-2">
                                <IoIosWarning
                                    className="text-red-500"
                                    size={25}
                                />
                                <span className="text-sm text-red-600 dark:text-red-400">
                                    Please make sure the image URL is valid.
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
