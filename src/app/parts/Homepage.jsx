import Carousel from "./Homeparts/Carousel";
import HomeSearch from "./Homeparts/Homesearch";
import services from "@/Data/categories";
import Link from "next/link";
import { leagueSpartan } from "@/lib/font";
import Subcatslider from "./Homeparts/Subcatslider";
import subslider from "@/Data/subslider";

export default function Homepage() {
    return (
        <>
            <HomeSearch />
            <div className='flex mo:px-2 mo:justify-start justify-center items-center gap-7 mo:py-2 my-8 mo:gap-2 mo:overflow-y-auto mo:scrollbar-hide mo:flex-nowrap'>
                <Carousel title="CLEANERS" description="NEAR YOU" image="https://i.ibb.co/ksJzhRRK/image.png" bgcolor="#00BF63" link="/cleaning" />
                <Carousel title="REGISTER YOUR" description="BUSINESS" image="https://static.vecteezy.com/system/resources/thumbnails/044/245/414/small_2x/confident-young-businessman-writing-on-a-clipboard-png.png" bgcolor="#FF3131" link='/free-listing' />
                <Carousel title="YOGA INSTRUCTORS" description="NEAR YOU" image="https://iili.io/2GmuFxS.png" bgcolor="orange" link='/yoga-meditation' />
                <Carousel title="CONTRACTORS" description="NEAR YOU" image="https://iili.io/2Gmu2b2.png" bgcolor="#004AAD" link='/contractors' />
            </div>

            <h1 className='text-2xl text-center font-spartan font-semibold m-4 mb-8'>Top Categories</h1>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
                {Object.keys(services).map((service, index) => (
                    services[service].display !== "none" && (
                        <Link href={services[service].location} key={index}>
                            <div className="p-4 flex flex-col justify-center items-center bg-gray-50 mo:bg-transparent rounded-lg shadow-md mo:shadow-none hover:bg-gray-100 cursor-pointer transition duration-200">
                                <img
                                    src={services[service].icon}
                                    alt={service}
                                    className="w-16 h-16 mx-auto mb-2"
                                    draggable="false"
                                />
                                <h3 className={`text-lg ${leagueSpartan.className} text-purple-700 text-center hidden md:block`}>
                                    {service}
                                </h3>
                                {/* Mobile view */}
                                <h3 className="text-sm font-semibold text-purple-700 text-center md:hidden">
                                    {service}
                                </h3>
                            </div>
                        </Link>
                    )
                ))}
            </div>

            <Subcatslider head={"Popular Services"} title={Object.keys(subslider.MoreCategory)} />
        </>
    );
}