import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-2xl font-bold">Hello, it's Megamind</h1>
                <p className="text-gray-400">
                    Creator of this website. Please do not share this website
                    with anyone. If you do, I might ban you permanently. It's
                    only available for admins, and only I have the right to
                    share it. No scrapers allowed. Don't even think about it!
                </p>
                <Link href="/home">
                    <p className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 inline-block">
                        Go back to home page
                    </p>
                </Link>
            </div>
        </div>
    );
}
