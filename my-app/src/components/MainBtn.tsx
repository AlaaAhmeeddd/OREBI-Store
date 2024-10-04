import { MdAccountCircle } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import Link from "next/link";

const MainBtn = () => {
    return (
        <div className="fixed right-3 top-[50%] -translate-y-[50%] flex flex-col gap-3 z-[1000]">
            <Link href="/profile">
                <div className="bg-white overflow-x-hidden shadow-textShadow group rounded-md flex flex-col gap-1  py-3 px-2 text-[#33475b]">
                    <div className="flex items-center justify-center">
                        <MdAccountCircle className="text-2xl group-hover:translate-x-3 -translate-x-12 transition-transform duration-200" />
                        <MdAccountCircle className="text-2xl group-hover:translate-x-12 -translate-x-3 transition-transform duration-200" />
                    </div>
                    <p className="text-sm text-center">Profile</p>
                </div>
            </Link>
            <Link href="/cart">
                <div className="relative bg-white overflow-x-hidden shadow-textShadow group rounded-md flex flex-col gap-1  py-3 px-2 text-[#33475b]">
                    <div className="flex items-center justify-center">
                        <HiShoppingCart className="text-2xl group-hover:translate-x-3 -translate-x-12 transition-transform duration-200" />
                        <HiShoppingCart className="text-2xl group-hover:translate-x-12 -translate-x-3 transition-transform duration-200" />
                    </div>
                    <p className="text-sm text-center">Buy Now</p>
                    <p className="rounded-full bg-primeColor text-white text-xs absolute top-1 right-3 w-4 h-4 flex items-center justify-center">3</p>
                </div>
            </Link>
        </div>
    )
}

export default MainBtn