"use client";
import React from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegFaceFlushed } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/api/api";

const UpNavbarProfile: React.FC = () => {
    const { data, isError } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
        retry: false,
    });

    return (
        <div>
            {/* Display user's profile if logged in */}
            {data ? (
                <div className="overflow-hidden bg-white dark:bg-gray-800 w-[35px] h-[35px]">
                    {data.cover_image ? (
                        <Image
                            src={`http://localhost:4043/cover_image/${data.cover_image}`}
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
