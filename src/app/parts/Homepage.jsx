import Carousel from "./Homeparts/Carousel";
import HomeSearch from "./Homeparts/Homesearch";

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
        </>
    );
}