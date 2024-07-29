import Image from "next/image";
import React from "react";

const Card_for_Tab_and_PC_slider = ({
    title,
    image,
    alt,
    type,
    genre,
    rank,
    totalCahpter,
}) => {
    return (
        <div className="flex flex-row gap-2">
            <div className="relative  w-14 h-16">
                <Image src={image} alt={alt} layout="fill" objectFit="cover" />
            </div>
            <div>
                <h1 className="capitalize w-56 overflow-hidden whitespace-nowrap text-ellipsis ">
                    {title}
                </h1>
                <div className="flex items-center justify-start gap-3  text-xs">
                    <p className="capitalize text-sm bg-blue-500 text-gray-200 rounded-sm px-1">
                        Rank {rank}
                    </p>
                    <span className="">-</span>
                    <p className="capitalize text-sm">{type}</p>
                </div>
            </div>
        </div>
    );
};

export default Card_for_Tab_and_PC_slider;
