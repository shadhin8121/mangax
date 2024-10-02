"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/api/api";
import Link from "next/link";

const ProfilePage: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
    });

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
                        {/* Main Column Skeleton */}
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

    // Render the actual content after loading
    return (
        <div className="min-h-screen bg-gray-100 pb-20 dark:bg-slate-900 dark:text-gray-200">
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
                                    src={data?.cover_image}
                                    width={500}
                                    height={500}
                                    alt="Profile"
                                />
                            ) : (
                                <Link href="/profile/upload_cover">
                                    <Image
                                        src="/images/lol.jpg"
                                        width={500}
                                        height={500}
                                        alt="Profile"
                                    />
                                </Link>
                            )}
                        </div>
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
                    {/* Main Column */}
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
        </div>
    );
};

export default ProfilePage;
