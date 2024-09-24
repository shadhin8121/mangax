"use client";
import React from "react";
import Image from "next/image";

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 pb-20 dark:bg-slate-900 dark:text-gray-200">
            {/* Cover Photo */}
            <div className="w-full">
                <div
                    className="relative h-64 bg-cover bg-center "
                    style={{ backgroundImage: "url('/images/lol.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 md:left-8 lg:left-16 p-4  z-10">
                        <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-green-700 overflow-hidden -mt-16">
                            <Image
                                src="/images/lol.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="Profile"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-2 dark:text-gray-200">
                            John Doe
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
