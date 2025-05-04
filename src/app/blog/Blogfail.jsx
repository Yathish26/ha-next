import Svg from "../parts/svg/svgvault"

export default function Blogfail() {
    return (
        <div className="flex my-60 h-fit w-full flex-col items-center justify-center">
            <Svg icon="b45" />
            <div className="flex gap-1 text-[40px] text-[#452a5c]">
                <p className="font-bold">404</p>
                <p className="font-semibold">Error</p>
            </div>
            <div className="flex flex-col text-center text-[#452a5c]">
                <p>Seems like a Technical Issue</p>
                <p>Couldn't fetch Blogs</p>
            </div>
        </div>
    )
}