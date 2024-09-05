"use client";
import notify_success, { notify_error } from "@/utility/notify";
import React, { useState } from "react";

const Page = () => {
    const [altTitles, setAltTitles] = useState([""]);
    const [artists, setArtists] = useState([""]);
    const [authors, setAuthors] = useState([""]);
    const [publishers, setPublishers] = useState([""]);

    //base url
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const handleAddField = (setState, state) => {
        setState([...state, ""]);
    };

    const handleChange = (e, index, setState, state) => {
        const newValues = [...state];
        newValues[index] = e.target.value;
        setState(newValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Get all selected genres, themes, and formats
        const selectedGenres = formData.getAll("genres[]");
        const selectedThemes = formData.getAll("theme[]");
        const selectedFormats = formData.getAll("format[]");

        // Validation to ensure at least one is selected in each
        if (selectedGenres.length === 0) {
            notify_error("Please select at least one genre");
            return;
        }
        if (selectedThemes.length === 0) {
            notify_error("Please select at least one theme");
            return;
        }
        if (selectedFormats.length === 0) {
            notify_error("Please select at least one format");
            return;
        }

        try {
            const response = await fetch(`${base_url}/create_new_manga`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (!response.ok) {
                notify_error("Failed to submit the form");
                throw new Error("Failed to submit form");
            }

            notify_success("Data Submitted Successfully");
        } catch (error) {
            notify_error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-8">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    {/* Cover Image */}
                    <div>
                        <label
                            htmlFor="cover"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Cover Image
                        </label>
                        <input
                            type="file"
                            name="cover"
                            id="cover"
                            required
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            id="title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Alternative Titles */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alternative Titles
                        </label>
                        {altTitles.map((altTitle, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 mt-1"
                            >
                                <input
                                    type="text"
                                    name="altTitle[]"
                                    value={altTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            index,
                                            setAltTitles,
                                            altTitles
                                        )
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleAddField(setAltTitles, altTitles)
                                    }
                                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* rating */}
                    <div>
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="10"
                            step="0.1"
                            required
                            id="rating"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* release */}
                    <div>
                        <label
                            htmlFor="releaseDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Release Date
                        </label>
                        <input
                            type="date"
                            name="releaseDate"
                            required
                            id="releaseDate"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            required
                            id="description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            name="type"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="manga">Manga</option>
                            <option value="manhwa">Manhwa</option>
                            <option value="manhua">Manhua</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            name="status"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="hiatus">Hiatus</option>
                            <option value="dropped">Dropped</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Artists */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Artists
                        </label>
                        {artists.map((artist, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 mt-1"
                            >
                                <input
                                    type="text"
                                    name="artist[]"
                                    required
                                    value={artist}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            index,
                                            setArtists,
                                            artists
                                        )
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleAddField(setArtists, artists)
                                    }
                                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Authors */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Authors
                        </label>
                        {authors.map((author, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 mt-1"
                            >
                                <input
                                    type="text"
                                    name="author[]"
                                    required
                                    value={author}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            index,
                                            setAuthors,
                                            authors
                                        )
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleAddField(setAuthors, authors)
                                    }
                                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Genres */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Genres
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                            {[
                                "Action",
                                "adult",
                                "adventure",
                                "comedy",
                                "crime",
                                "drama",
                                "ecchi",
                                "fantasy",
                                "gender bender",
                                "gore",
                                "historical",
                                "horror",
                                "isekai",
                                "magical girls",
                                "mature",
                                "mecha",
                                "medical",
                                "mystery",
                                "philosophical",
                                "psychological",
                                "romance",
                                "Sci-Fi",
                                "sexual violence",
                                "shojo Ai",
                                "shounen Ai",
                                "slice of life",
                                "smut",
                                "sports",
                                "superhero",
                                "thriller",
                                "tragedy",
                                "wuxia",
                                "yaoi",
                                "yuri",
                            ].map((genre) => (
                                <label
                                    key={genre}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        name="genres[]"
                                        value={genre}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 capitalize">
                                        {genre}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* theme */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Theme
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                            {[
                                "aliens",
                                "animals",
                                "cooking",
                                "crossdressing",
                                "delinquents",
                                "demons",
                                "genderswap",
                                "ghosts",
                                "gayru",
                                "harem",
                                "incest",
                                "loli",
                                "mafia",
                                "magic",
                                "martial arts",
                                "military",
                                "monster girls",
                                "monsters",
                                "music",
                                "ninja",
                                "office workers",
                                "police",
                                "post apocalyptic",
                                "reincarnation",
                                "reverse harem",
                                "samurai",
                                "school life",
                                "shota",
                                "supernatural",
                                "survival",
                                "time travel",
                                "traditional games",
                                "vampires",
                                "video games",
                                "villainess",
                                "virtual reality",
                                "zombies",
                            ].map((theme) => (
                                <label
                                    key={theme}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        name="theme[]"
                                        value={theme}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 capitalize">
                                        {theme}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* format */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Format
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                            {[
                                "4-koma",
                                "adaptation",
                                "anthology",
                                "award wining",
                                "doujinshi",
                                "fan colored",
                                "full color",
                                "long strip",
                                "official colored",
                                "oneshot",
                                "user created",
                                "web comic",
                            ].map((format) => (
                                <label
                                    key={format}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        name="format[]"
                                        value={format}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 capitalize">
                                        {format}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Publishers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Publishers
                        </label>
                        {publishers.map((publisher, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 mt-1"
                            >
                                <input
                                    type="text"
                                    name="publisher[]"
                                    required
                                    value={publisher}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            index,
                                            setPublishers,
                                            publishers
                                        )
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleAddField(
                                            setPublishers,
                                            publishers
                                        )
                                    }
                                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
