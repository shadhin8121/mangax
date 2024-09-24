"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const UpNavbarProfile: React.FC = () => {
    const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState<
        string | null
    >(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setTokenFromLocalStorage(token);
    }, []);

    return (
        <div>
            {tokenFromLocalStorage ? (
                <Image
                    src="/images/lol.jpg"
                    width={45}
                    height={45}
                    alt="Profile Picture"
                />
            ) : (
                <span className="text-sm sm:text-base ml-2 dark:text-gray-200">
                    Login
                </span>
            )}
        </div>
    );
};

export default UpNavbarProfile;
