import React from "react";
import Card_for_Tab_and_PC_slider from "./Card_for_Tab_and_PC_slider";

const Tab_and_PC_slider = () => {
    const data = [
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

    return (
        <div className="flex flex-col mt-5">
            <div className="flex flex-col gap-3">
                {data.map((item, index) => (
                    <Card_for_Tab_and_PC_slider
                        key={index}
                        title={item.title}
                        image={item.image}
                        alt={item.alt}
                        type={item.type}
                        genre={item.genre}
                        rank={item.rank}
                        totalCahpter={item.totalCahpter}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tab_and_PC_slider;
