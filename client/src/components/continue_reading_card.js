import Image from "next/image";
import React from "react";

const Continue_reading_card = ({
    title,
    image,
    alt,
    type,
    genre,
    rank,
    totalChapter,
}) => {
    return (
        <div className="w-32 h-44 overflow-hidden">
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt={title}
                />
            </div>
        </div>
    );
};

export default Continue_reading_card;
