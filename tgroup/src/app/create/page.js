// "use client";
// import notify_success from "@/utility/notify";
// import React, { useState } from "react";

// const Page = () => {
//     const [altTitles, setAltTitles] = useState([""]);
//     const [artists, setArtists] = useState([""]);
//     const [authors, setAuthors] = useState([""]);
//     const [publishers, setPublishers] = useState([""]);

//     const handleAddField = (setState, state) => {
//         setState([...state, ""]);
//     };

//     const handleChange = (e, index, setState, state) => {
//         const newValues = [...state];
//         newValues[index] = e.target.value;
//         setState(newValues);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);

//         try {
//             const response = await fetch(
//                 "http://localhost:4043/create_new_manga",
//                 {
//                     method: "POST",
//                     body: formData,
//                     credentials: "include",
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to submit form");
//             }
//             notify_success("Data Submitted Successfully");
//             console.log("Form submitted successfully");
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-8">
//                 <form
//                     className="space-y-6"
//                     onSubmit={handleSubmit}
//                     enctype="multipart/form-data"
//                 >
//                     {/* Cover Image */}
//                     <div>
//                         <label
//                             htmlFor="cover"
//                             className="block text-sm font-medium text-gray-700"
//                         >
//                             Cover Image
//                         </label>
//                         <input
//                             type="file"
//                             name="cover"
//                             id="cover"
//                             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         />
//                     </div>

//                     {/* Title */}
//                     <div>
//                         <label
//                             htmlFor="title"
//                             className="block text-sm font-medium text-gray-700"
//                         >
//                             Title
//                         </label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         />
//                     </div>

//                     {/* Alternative Titles */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Alternative Titles
//                         </label>
//                         {altTitles.map((altTitle, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center space-x-2 mt-1"
//                             >
//                                 <input
//                                     type="text"
//                                     name={`altTitle-${index}`}
//                                     value={altTitle}
//                                     onChange={(e) =>
//                                         handleChange(
//                                             e,
//                                             index,
//                                             setAltTitles,
//                                             altTitles
//                                         )
//                                     }
//                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         handleAddField(setAltTitles, altTitles)
//                                     }
//                                     className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label
//                             htmlFor="description"
//                             className="block text-sm font-medium text-gray-700"
//                         >
//                             Description
//                         </label>
//                         <input
//                             type="text"
//                             name="description"
//                             id="description"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         />
//                     </div>

//                     {/* Type */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Type
//                         </label>
//                         <select
//                             name="type"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         >
//                             <option value="manga">Manga</option>
//                             <option value="manhwa">Manhwa</option>
//                             <option value="manhua">Manhua</option>
//                         </select>
//                     </div>

//                     {/* Status */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Status
//                         </label>
//                         <select
//                             name="status"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         >
//                             <option value="ongoing">Ongoing</option>
//                             <option value="hiatus">Hiatus</option>
//                             <option value="dropped">Dropped</option>
//                             <option value="dropped">Completed</option>
//                         </select>
//                     </div>

//                     {/* Artists */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Artists
//                         </label>
//                         {artists.map((artist, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center space-x-2 mt-1"
//                             >
//                                 <input
//                                     type="text"
//                                     name={`artist-${index}`}
//                                     value={artist}
//                                     onChange={(e) =>
//                                         handleChange(
//                                             e,
//                                             index,
//                                             setArtists,
//                                             artists
//                                         )
//                                     }
//                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         handleAddField(setArtists, artists)
//                                     }
//                                     className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Authors */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Authors
//                         </label>
//                         {authors.map((author, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center space-x-2 mt-1"
//                             >
//                                 <input
//                                     type="text"
//                                     name={`author-${index}`}
//                                     value={author}
//                                     onChange={(e) =>
//                                         handleChange(
//                                             e,
//                                             index,
//                                             setAuthors,
//                                             authors
//                                         )
//                                     }
//                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         handleAddField(setAuthors, authors)
//                                     }
//                                     className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Genres */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Genres
//                         </label>
//                         <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
//                             {[
//                                 "Action",
//                                 "Comedy",
//                                 "Adventure",
//                                 "Drama",
//                                 "Fantasy",
//                                 "Slice of Life",
//                                 "Sci-Fi",
//                                 "Romance",
//                                 "Horror",
//                                 "Sports",
//                                 "Mystery",
//                                 "Thriller",
//                                 "Supernatural",
//                                 "Mecha",
//                                 "Psychological",
//                                 "Historical",
//                                 "Music",
//                                 "Ecchi",
//                                 "Harem",
//                                 "Shoujo",
//                                 "Shounen",
//                                 "Josei",
//                                 "Seinen",
//                                 "Yaoi",
//                                 "Yuri",
//                                 "Magic",
//                                 "Monster",
//                                 "Isekai",
//                                 "Reincarnation",
//                                 "Martial Arts",
//                             ].map((genre) => (
//                                 <label
//                                     key={genre}
//                                     className="flex items-center"
//                                 >
//                                     <input
//                                         type="checkbox"
//                                         name="genres"
//                                         value={genre}
//                                         className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                     />
//                                     <span className="ml-2 text-sm text-gray-700 capitalize">
//                                         {genre}
//                                     </span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Publishers */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Publishers
//                         </label>
//                         {publishers.map((publisher, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center space-x-2 mt-1"
//                             >
//                                 <input
//                                     type="text"
//                                     name={`publisher-${index}`}
//                                     value={publisher}
//                                     onChange={(e) =>
//                                         handleChange(
//                                             e,
//                                             index,
//                                             setPublishers,
//                                             publishers
//                                         )
//                                     }
//                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         handleAddField(
//                                             setPublishers,
//                                             publishers
//                                         )
//                                     }
//                                     className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     <button
//                         type="submit"
//                         className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Page;

"use client";
import notify_success from "@/utility/notify";
import React, { useState } from "react";

const Page = () => {
    const [altTitles, setAltTitles] = useState([""]);
    const [artists, setArtists] = useState([""]);
    const [authors, setAuthors] = useState([""]);
    const [publishers, setPublishers] = useState([""]);

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

        try {
            const response = await fetch(
                "http://localhost:4043/create_new_manga",
                {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            notify_success("Data Submitted Successfully");
            console.log("Form submitted successfully");
        } catch (error) {
            console.error(error);
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
                                "Magic",
                                "Monster",
                                "Isekai",
                                "Reincarnation",
                                "Martial Arts",
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
