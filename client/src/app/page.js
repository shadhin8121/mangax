import DownNavbar from "@/components/downNavbar";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/upNavbar";

export default function Home() {
    return (
        <div className="dark:bg-slate-900">
            <Navbar />
            <div className="min-h-screen">
                {/*other component goes here*/}
                <div className="md:hidden lg:hidden">
                    {/* slider for mobile device only */}
                    <ImageSlider />
                </div>
                {/* slider for tab and computer */}
            </div>
            <DownNavbar />
        </div>
    );
}
