"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useAtom } from "jotai";
import { check_login_status, global_profile_data } from "@/globalStore/jotai";
import { FaRegFaceFlushed } from "react-icons/fa6";

const UpNavbarProfile: React.FC = () => {
    const [is_login] = useAtom(check_login_status);
    const [data] = useAtom(global_profile_data);

    return (
        <div>
            {is_login ? (
                <div className="rounded-full overflow-hidden bg-white dark:bg-gray-800">
                    {data?.cover_image ? (
                        <Image
                            src={data?.cover_image}
                            width={45}
                            height={45}
                            alt="Profile Picture"
                            className="rounded-full"
                        />
                    ) : (
                        <FaRegFaceFlushed size={35} />
                    )}
                </div>
            ) : (
                <div className="rounded-ful -mt-5">
                    <span className="text-sm sm:text-base ml-2 dark:text-gray-200">
                        <CgProfile size={30} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default UpNavbarProfile;
