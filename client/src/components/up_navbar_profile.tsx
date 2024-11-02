"use client";
import React from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegFaceFlushed } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/api/api";
import CryptoJS from "crypto-js";

const UpNavbarProfile: React.FC = () => {
    const { data, isError } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
        retry: false,
    });

    const emailHash = data?.email
        ? CryptoJS.MD5(data.email.trim().toLowerCase()).toString()
        : "";
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=200&d=mp`;

    return (
        <div>
            {/* Display user's profile if logged in */}
            {data ? (
                <div className="overflow-hidden bg-white dark:bg-gray-800 w-[35px] h-[35px]">
                    {data.email ? (
                        <Image
                            src={gravatarUrl}
                            width={45}
                            height={45}
                            alt="Profile Picture"
                            className="rounded-full object-cover w-full h-full"
                        />
                    ) : (
                        <FaRegFaceFlushed size={35} />
                    )}
                </div>
            ) : (
                // Display default icon if not logged in
                <div className="rounded-full -mt-5">
                    <span className="text-sm sm:text-base ml-2 dark:text-gray-200">
                        <CgProfile size={30} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default UpNavbarProfile;
