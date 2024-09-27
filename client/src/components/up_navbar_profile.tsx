"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const UpNavbarProfile: React.FC = () => {
    const [is_login, set_login] = useState<string | null>(null);

    useEffect(() => {
        const login = localStorage.getItem("login");
        set_login(login);
    }, []);

    return (
        <div>
            {is_login ? (
                <div className="rounded-full overflow-hidden bg-white dark:bg-gray-800">
                    <Image
                        src="/images/lol.jpg"
                        width={45}
                        height={45}
                        alt="Profile Picture"
                        className="rounded-full"
                    />
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
