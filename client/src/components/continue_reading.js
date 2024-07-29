import React from "react";
import Continue_reading_card from "./continue_reading_card";

const Continue_reading = () => {
    const data = [
        {
            title: "The Begining after the end",
            image: "/testing/1.jpg",
            alt: "The begining after the end",
            type: "manhwa",
            genre: "action, magic",
            rank: 1,
            totalChapter: 253,
        },
        {
            title: "jujutsu kaisen",
            image: "/testing/2.jpg",
            alt: "jujutsu kaisen",
            type: "manga",
            genre: "action, horror ,demons",
            rank: 2,
            totalChapter: 233,
        },
        {
            title: "mount hua sect",
            image: "/testing/3.jpg",
            alt: "mount hua sect",
            type: "manhwa",
            genre: "action, martial arts, fantasy",
            rank: 3,
            totalChapter: 353,
        },
        {
            title: "The Greatest Estate Developer",
            image: "/testing/4.jpg",
            alt: "The Greatest Estate Developer",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 4,
            totalChapter: 153,
        },
        {
            title: "the archmage's resturant",
            image: "/testing/5.jpg",
            alt: "the archmage's resturant",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 5,
            totalChapter: 3344,
        },
        {
            title: "The Martial God Who Regressed Back to Level 2",
            image: "/testing/6.jpg",
            alt: "The Martial God Who Regressed Back to Level 2",
            type: "manhwa",
            genre: "action, martial arts, magic",
            rank: 6,
            totalChapter: 353,
        },
        {
            title: "Ending maker",
            image: "/testing/7.jpg",
            alt: "Ending maker",
            type: "manhwa",
            genre: "action, martial arts, magic, fantasy",
            rank: 7,
            totalChapter: 3533,
        },
        {
            title: "The Begining after the end",
            image: "/testing/1.jpg",
            alt: "The begining after the end",
            type: "manhwa",
            genre: "action, magic",
            rank: 1,
            totalChapter: 253,
        },
        {
            title: "jujutsu kaisen",
            image: "/testing/2.jpg",
            alt: "jujutsu kaisen",
            type: "manga",
            genre: "action, horror ,demons",
            rank: 2,
            totalChapter: 233,
        },
        {
            title: "mount hua sect",
            image: "/testing/3.jpg",
            alt: "mount hua sect",
            type: "manhwa",
            genre: "action, martial arts, fantasy",
            rank: 3,
            totalChapter: 353,
        },
        {
            title: "The Greatest Estate Developer",
            image: "/testing/4.jpg",
            alt: "The Greatest Estate Developer",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 4,
            totalChapter: 153,
        },
        {
            title: "the archmage's resturant",
            image: "/testing/5.jpg",
            alt: "the archmage's resturant",
            type: "manhwa",
            genre: "action, magic, fantasy",
            rank: 5,
            totalChapter: 3344,
        },
    ];

    return (
        <div className="flex gap-3 max-w-[1000px] mx-auto">
            {data.map((item, index) => (
                <Continue_reading_card
                    key={index}
                    title={item.title}
                    image={item.image}
                    alt={item.alt}
                    type={item.type}
                    genre={item.genre}
                    rank={item.rank}
                    totalChapter={item.totalChapter}
                />
            ))}
        </div>
    );
};

export default Continue_reading;
