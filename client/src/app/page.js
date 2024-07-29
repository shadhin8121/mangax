import Continue_reading from "@/components/continue_reading";
import DownNavbar from "@/components/downNavbar";
import ImageSlider from "@/components/ImageSlider";
import Tab_and_PC_slider from "@/components/Tab_and_PC_slider";
import Navbar from "@/components/upNavbar";

export default function Home() {
    return (
        <div className="dark:bg-slate-900 ">
            <Navbar />
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[3fr_1fr]">
                {/* other component goes here */}
                <div className="col-span-1 lg:col-start-2 lg:col-end-3 md:col-start-2 md:col-end-3">
                    <div className="md:hidden lg:hidden">
                        {/* slider for mobile device only */}
                        <ImageSlider />
                    </div>
                    {/* slider for tab and computer */}
                    <div className="hidden md:block lg:block">
                        <h1 className="mt-3">Daily Rank</h1>
                        <Tab_and_PC_slider />
                    </div>
                </div>
                <div className="md:row-start-1 md:row-end-2 mt-3">
                    <h1 className="text-2xl">Continue Reading</h1>
                    <div>
                        {/* here goes other things */}
                        <Continue_reading />
                    </div>
                </div>
            </div>

            <DownNavbar />
        </div>
    );
}
