"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ImageSlider = () => {
    let data = [
        {
            title: "The Begining after the end",
            image: "/testing/1.jpg",
            alt: "The begining after the end",
            type: "manhwa",
            genre: "action, magic",
            rank: 1,
            totalCahpter: 253,
        },
        {
            title: "jujutsu kaisen",
            image: "/testing/2.jpg",
            alt: "jujutsu kaisen",
            type: "manga",
            genre: "action, horror ,demons",
            rank: 2,
            totalCahpter: 233,
        },
        {
            title: "mount hua sect",
            image: "/testing/3.jpg",
            alt: "mount hua sect",
            type: "manhwa",
            genre: "action, martial arts, fantasy",
            rank: 3,
            totalCahpter: 353,
        },
        {
            title: "The Greatest Estate Developer",
            image: "/testing/4.jpg",
            alt: "The Greatest Estate Developer",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 4,
            totalCahpter: 153,
        },
        {
            title: "the archmage's resturant",
            image: "/testing/5.jpg",
            alt: "the archmage's resturant",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 5,
            totalCahpter: 3344,
        },
        {
            title: "The Martial God Who Regressed Back to Level 2",
            image: "/testing/6.jpg",
            alt: "The Martial God Who Regressed Back to Level 2",
            type: "manhwa",
            genre: "action, martial arts, magic",
            rank: 6,
            totalCahpter: 353,
        },
        {
            title: "Ending maker",
            image: "/testing/7.jpg",
            alt: "Ending maker",
            type: "manhwa",
            genre: "action, martial arts, magic, fantasy",
            rank: 7,
            totalCahpter: 3533,
        },
    ];
    const [getImage, setImage] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className="mt-3 overflow-hidden">
            <div className="container mx-auto flex items-center justify-center flex-col">
                <div className="w-full">
                    <div className=" ">
                        <div className=" w-full flex gap-5 items-center justify-between">
                            <div className="w-32 -ml-16 ">
                                <Image
                                    key={index - 3}
                                    src={
                                        getImage[
                                            index === 0
                                                ? getImage.length - 1
                                                : index - 3
                                        ].image
                                    }
                                    alt="previous"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="w-32 -ml-16 ">
                                <Image
                                    key={index - 2}
                                    src={
                                        getImage[
                                            index === 0
                                                ? getImage.length - 1
                                                : index - 2
                                        ].image
                                    }
                                    alt="previous"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="w-32 -ml-16 ">
                                <Image
                                    key={index - 1}
                                    src={
                                        getImage[
                                            index === 0
                                                ? getImage.length - 1
                                                : index - 1
                                        ].image
                                    }
                                    alt="previous"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="w-48 h-72 relative">
                                <Image
                                    key={index}
                                    src={getImage[index].image}
                                    alt="current"
                                    // width={500}
                                    // height={500}
                                    // style={{ objectFit: "cover" }}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-32 -mr-16">
                                <Image
                                    key={index + 1}
                                    src={
                                        getImage[
                                            index === getImage.length - 1
                                                ? 0
                                                : index + 1
                                        ].image
                                    }
                                    alt="next"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="w-32 -mr-16">
                                <Image
                                    key={index + 2}
                                    src={
                                        getImage[
                                            index === getImage.length - 1
                                                ? 0
                                                : index + 2
                                        ].image
                                    }
                                    alt="next"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="w-32 -mr-16">
                                <Image
                                    key={index + 3}
                                    src={
                                        getImage[
                                            index === getImage.length - 1
                                                ? 0
                                                : index + 3
                                        ].image
                                    }
                                    alt="next"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center ">
                    <div className="">
                        <div className="w-full mt-3 mb-0 flex items-center justify-center flex-col">
                            <h1 className="text-2xl capitalize">
                                {[0].map(() => {
                                    return getImage[index].title;
                                })}
                            </h1>
                        </div>
                        <div className="flex gap-5 items-center justify-center text-sm">
                            <div className="flex items-center justify-center">
                                <p className="pr-2 capitalize">
                                    {[0].map(() => {
                                        return getImage[index].type;
                                    })}
                                </p>
                                -
                            </div>

                            <div className="mt-1 mb-1">
                                <p>
                                    {[0].map(() => {
                                        return getImage[index].genre;
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-1 mb-2 text-sm">
                            <p>
                                Rank:{" "}
                                {[0].map(() => {
                                    return getImage[index].rank;
                                })}
                            </p>{" "}
                            <span className="mx-3">-</span>
                            <p>
                                Total Chap:{" "}
                                {[0].map(() => {
                                    return getImage[index].totalCahpter;
                                })}
                            </p>
                        </div>
                    </div>
                    <Link href="">
                        <button className="bg-blue-500 text-white px-7 py-4 rounded-md font-semibold">
                            Read now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
