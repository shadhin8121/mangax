"use client";
import Link from "next/link";
import React, { useState } from "react";

const Chapters = ({ params }) => {
    // Initialize state with data array
    const [data, setData] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
        75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
        93, 94, 95, 96, 97, 98, 99, 100,
    ]);

    // Reverse the array
    const reversedData = [...data].reverse(); // Create a new array to avoid mutating the original

    // Find the length of the largest data value
    const maxLength = Math.max(
        ...reversedData.map(String).map((val) => val.length)
    );

    // Calculate the width based on the maximum length
    const boxWidth = `${maxLength * 2}rem`; // Adjust multiplier as needed

    // Add new item to the data array
    const handleAdd = () => {
        setData((prevData) => [...prevData, prevData.length + 1]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-3 mb-10">
            <h1 className="text-xl font-bold mb-4">Chapters</h1>
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
            >
                Add a new chapter
            </button>
            <div className="flex flex-wrap gap-2 mb-4">
                {reversedData.map((value) => (
                    <Link
                        href={`/comic/${params.comicId}/${value}`}
                        key={value}
                    >
                        <div
                            className="bg-gray-200 p-2 rounded border border-gray-300 hover:bg-gray-300"
                            style={{ width: boxWidth }}
                        >
                            <span className="block text-center">{value}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Chapters;
