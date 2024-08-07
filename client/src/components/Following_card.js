import Image from "next/image";
import Link from "next/link";
import React from "react";

const Following_card = ({ image, title, chapter, following }) => {
    return (
        <div className="w-28 md:w-32 lg:w-36 p-2  box-border">
            <div className="w-full h-32 md:h-36 lg:h-48 overflow-hidden">
                <Image
                    src={image}
                    width={500}
                    height={500}
                    alt={title}
                    className="object-cover aspect-[2/3]"
                />
            </div>
            <div className="mt-1 pb-1">
                <span className="text-sm block w-full overflow-hidden whitespace-nowrap text-ellipsis capitalize">
                    {title}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-[60%] bg-blue-500 text-center text-gray-900 rounded-sm">
                    <Link href={""} className="block w-full h-full">
                        {chapter}
                    </Link>
                </div>
                <div className="w-[35%] bg-green-500 rounded-sm text-center text-gray-900">
                    <span className="block w-full">{following}</span>
                </div>
            </div>
        </div>
    );
};

export default Following_card;
