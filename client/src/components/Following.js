import React from "react";
import Following_card from "./Following_card";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Following = () => {
    const images = [
        {
            imagePath: "/test/1.jpg",
            title: "the beginning after the end",
            chapter: 12,
            following: "yes",
        },
        {
            imagePath: "/test/2.jpg",
            title: "jujutsu kaisen",
            chapter: 45,
            following: "no",
        },
        {
            imagePath: "/test/3.jpg",
            title: "Return of the Blossoming Blade",
            chapter: 78,
            following: "yes",
        },
        {
            imagePath: "/test/4.jpg",
            title: "the greatest estate developer",
            chapter: 23,
            following: "no",
        },
        {
            imagePath: "/test/5.jpg",
            title: "the archmage's resturant",
            chapter: 56,
            following: "yes",
        },
        {
            imagePath: "/test/6.jpg",
            title: "The Martial God Who Regressed Back to Level 2",
            chapter: 89,
            following: "no",
        },
        {
            imagePath: "/test/7.jpg",
            title: "ending maker",
            chapter: 34,
            following: "yes",
        },
    ];

    return (
        <div className="relative">
            <div className=" hidden lg:block fixed hover:bg-[#43ca43] transition top-[20%] left-0 bg-[#569956c8] p-3 rounded-sm text-gray-700">
                <span>
                    <FaArrowLeft />
                </span>
            </div>
            <div className="flex">
                {images.map((values, index) => (
                    <Following_card
                        image={values.imagePath}
                        chapter={values.chapter}
                        following={values.following}
                        title={values.title}
                        key={index}
                    />
                ))}
            </div>
            <div className="hidden lg:block fixed hover:bg-[#43ca43] transition top-[20%] right-0 bg-[#569956c8] p-3 rounded-sm text-gray-700">
                <span>
                    <FaArrowRight />
                </span>
            </div>
        </div>
    );
};

export default Following;
