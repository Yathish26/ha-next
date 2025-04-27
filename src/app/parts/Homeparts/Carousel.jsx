import Link from "next/link";
import { Bebas_Neue, Anton } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin-ext"] });
const anton = Anton({ weight: "400", subsets: ["latin-ext"] });

export default function Carousel({ title, description, image, bgcolor, link }) {
    return (
        <>
            <Link href={link}>
                <div style={{ backgroundColor: bgcolor }} className='w-52 h-64 rounded-3xl flex-shrink-0 cursor-pointer relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out'>
                    <div className="p-3 pt-10">
                        <h1 className={`text-white ${anton.className} drop-shadow-lg font-[300] text-4xl`}>{title}</h1>
                        <h1 className={`text-white ${bebas.className} drop-shadow-lg mt-4 font-[300] text-2xl`}>{description}</h1>
                    </div>
                    <div className="absolute bottom-0 right-5">
                        <img
                            draggable="false"
                            className="w-40 h-auto transition-transform duration-300 ease-in-out hover:scale-110 object-cover"
                            src={image}
                            alt="Image"
                        />
                    </div>
                </div>
            </Link>
        </>
    );
}
