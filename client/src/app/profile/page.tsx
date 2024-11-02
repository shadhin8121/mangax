"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/api/api";
import { GrDocumentUpdate } from "react-icons/gr";
import CryptoJS from "crypto-js";

const ProfilePage: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
        staleTime: 30000,
        gcTime: 500000,
    });

    const emailHash = data
        ? CryptoJS.MD5(data.email.trim().toLowerCase()).toString()
        : "";

    // Changed Gravatar URL to use the default image parameter correctly
    const gravatarUrl = emailHash
        ? `https://www.gravatar.com/avatar/${emailHash}?s=200&d=mp`
        : "/images/lol.jpg";

    // Modified Gravatar data fetch to handle 404 properly
    const { data: gravatarData, isLoading: isGravatarLoading } = useQuery({
        queryKey: ["gravatar_data", emailHash],
        queryFn: async () => {
            if (!emailHash) return null;
            try {
                const response = await fetch(
                    `https://en.gravatar.com/${emailHash}.json`
                );
                if (!response.ok) {
                    if (response.status === 404) {
                        return null;
                    }
                    throw new Error("Failed to fetch Gravatar data");
                }
                return await response.json();
            } catch (error) {
                console.error("Gravatar fetch error:", error);
                return null;
            }
        },
        enabled: !!emailHash,
        retry: false, // Prevent retrying on 404
    });

    const bio = gravatarData?.entry?.[0]?.aboutMe || "Nothing to say";

    if (isLoading || isGravatarLoading) {
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
                    style={{
                        backgroundImage: `url('${gravatarUrl}')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                    {/* Gravatar icon positioned independently */}

                    <div className="absolute bottom-0 md:left-8 lg:left-16 p-4 z-10">
                        <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-green-700 overflow-hidden -mt-16">
                            <Image
                                src={gravatarUrl}
                                width={500}
                                height={500}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-2 ml-4 dark:text-gray-200 flex items-center justify-center">
                            {data?.username}{" "}
                            <div className="pl-6">
                                <a
                                    href="https://gravatar.com/"
                                    target="_blank"
                                    className="text-green-500 hover:text-green-400"
                                >
                                    <GrDocumentUpdate size={20} />
                                </a>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
                    <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
                        About
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">{bio}</p>
                </div>
            </div>

            {/* Posts */}
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
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
