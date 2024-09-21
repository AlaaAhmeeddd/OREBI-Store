import logo from "@/assets/logoLight.png"
import Image from "next/image"
import Link from "next/link"
import { IoReturnDownBack } from "react-icons/io5"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StudioHeader = (props: any) => {
    return (
        <div>
            <div className="p-5 text-gray-100 flex justify-between items-center bg-black">
                <Link href="/" className="flex items-center gap-3 font-semibold hover:text-blue-600 duration-200">
                    <IoReturnDownBack className="text-2xl" /> Go to Website 
                </Link>
                <Image src={logo} alt="Logo" className="w-24" />
                <p className="text-sm">Admin Studio for OREBI Online Shopping</p>
            </div>
            {props.renderDefault(props)}
        </div>
    )
}

export default StudioHeader