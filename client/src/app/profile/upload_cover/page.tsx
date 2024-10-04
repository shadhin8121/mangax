"use client";
import { notify_error } from "@/utility/host_toast";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Page: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // For preview

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            // Preview the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            notify_error("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("cover_image", selectedImage); // Append the File object

        try {
            const response = await fetch(
                "http://localhost:4043/upload_profile",
                {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image.");
            }

            const result = await response.json();
            console.log("Image uploaded successfully:", result);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 px-4">
            <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]">
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <>
                        <FaUserCircle className="text-gray-400 w-full h-full" />
                        <p className="absolute inset-0 flex items-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-semibold opacity-50 pointer-events-none shadow-sm">
                            Click Here
                        </p>
                    </>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    name="cover_image"
                />
            </div>
            <button
                className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleSubmit}
            >
                Update Profile Picture
            </button>
        </div>
    );
};

export default Page;
