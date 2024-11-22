import Image from "next/image";
import Link from "next/link";
import { GiCheckMark } from "react-icons/gi";

interface FollowingCardProps {
    image: string;
    title: string;
    chapter: number;
    // following?: string;
}

const FollowingCard: React.FC<FollowingCardProps> = ({
    image,
    title,
    chapter,
    // following, // Changed from 'following' to '_following'
}) => {
    return (
        <div className="w-28 md:w-32 lg:w-36 p-2 box-border">
            <div className="w-full h-32 md:h-36 lg:h-48 overflow-hidden">
                <Image
                    src={image}
                    width={500}
                    height={500}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="mt-1 pb-1">
                <span className="text-sm block w-full overflow-hidden whitespace-nowrap text-ellipsis capitalize">
                    {title}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-[60%] bg-blue-500 text-center text-gray-900 rounded-sm">
                    <Link href="" className="block w-full h-full">
                        {chapter}
                    </Link>
                </div>
                <div className="w-[35%] bg-green-500 rounded-sm text-center text-gray-900 flex justify-center items-center">
                    <span className="block py-1">
                        <GiCheckMark />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FollowingCard;
