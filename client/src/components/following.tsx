"use client";
import React from "react";
import Following_card from "./following_card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Following: React.FC = () => {
    const images = [
        {
            imagePath: "/test/1.jpg",
            title: "The Beginning After the End",
            chapter: 12,
            following: "yes",
        },
        {
            imagePath: "/test/2.jpg",
            title: "Jujutsu Kaisen",
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
            title: "The Greatest Estate Developer",
            chapter: 23,
            following: "no",
        },
        {
            imagePath: "/test/5.jpg",
            title: "The Archmage's Restaurant",
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
            title: "Ending Maker",
            chapter: 34,
            following: "yes",
        },
    ];

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    // React Slick settings
    const settings = {
        slidesToShow: 6,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        swipeToSlide: true,
        variableWidth: true,
    };

    return (
        <Slider {...settings}>
            {images.map((value, index) => {
                return (
                    <div key={index}>
                        <Following_card
                            image={value.imagePath}
                            title={value.title}
                            chapter={value.chapter}
                        />
                    </div>
                );
            })}
        </Slider>
    );
};

export default Following;
