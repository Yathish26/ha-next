import { breeSerif } from "@/lib/font"
import Svg from "./svg/svgvault"
import Link from "next/link"

export default function LoginHeader() {
    return (
        <div className="flex justify-center bg-gray-900 items-center px-6 py-4">
            <Link href="/" >
                <div className="flex items-center gap-4 cursor-pointer">
                    <Svg icon="hirearrivebird" />
                    <div className={`font-bree ${breeSerif.className} text-white text-4xl`}>Hire Arrive</div>
                </div>
            </Link>
        </div>
    )
}
