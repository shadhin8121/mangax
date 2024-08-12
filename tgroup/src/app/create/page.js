import React from "react";

const Page = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-8">
                <form className="space-y-6">
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
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

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
                            id="title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="altTitle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Alternative Title
                        </label>
                        <input
                            type="text"
                            name="altTitle"
                            id="altTitle"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

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
                            id="description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

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
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="artist"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Artist
                        </label>
                        <input
                            type="text"
                            name="artist"
                            id="artist"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="author"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Genres
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                            {[
                                "Action",
                                "Comedy",
                                "Adventure",
                                "Drama",
                                "Fantasy",
                                "Slice of Life",
                                "Sci-Fi",
                                "Romance",
                                "Horror",
                                "Sports",
                                "Mystery",
                                "Thriller",
                                "Supernatural",
                                "Mecha",
                                "Psychological",
                                "Historical",
                                "Music",
                                "Ecchi",
                                "Harem",
                                "Shoujo",
                                "Shounen",
                                "Josei",
                                "Seinen",
                                "Yaoi",
                                "Yuri",
                                "magic",
                                "monster",
                                "isekai",
                                "reincarnation",
                                "martial arts",
                            ].map((genre) => (
                                <label
                                    key={genre}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        name="genres"
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

                    <div>
                        <label
                            htmlFor="publisher"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Publisher
                        </label>
                        <input
                            type="text"
                            name="publisher"
                            id="publisher"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
