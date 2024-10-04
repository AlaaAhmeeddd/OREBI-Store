"use client"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logoBlack.png"
import { Input } from "./ui/input"
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import MobileNavlinks from "./MobileNavlinks"

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const pathName = usePathname()
    return (
        <header className="w-full h-20 bg-white border-b border-b-gray-400 sticky top-0 z-50">
            <nav className="h-full flex items-center gap-3 mx-auto xl:px-0 px-4 justify-between max-w-screen-xl">
                <Link href="/" className="min-w-20 max-w-56">
                    <Image src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="relative ml-4 hidden lg:inline-flex items-center w-full lg:w-[600px] text-base text-primeColor">
                    <Input 
                        className="flex-1 h-full outline-none"
                        placeholder="Search your products here.."
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <span className="absolute right-5 text-[19px] hover:cursor-pointer w-5 h-5">
                        {searchQuery ? 
                            <IoClose onClick={()=>setSearchQuery("")} className="hover:text-red-500 duration-200" /> 
                            : <IoSearchSharp />}
                    </span>
                </div>
                <div className="md:inline-flex hidden items-center divide-x-2 divide-gray-300">
                    {navLinks.map((link, index)=>(
                        <Link key={index} 
                            href={link.href} 
                            className={`underline-offset-4 decoration-[1px] px-8 h-6 font-medium hover:font-semibold duration-150
                            ${pathName == link.href ? "underline text-primeColor": "text-lightText hover:underline "}`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <MobileNavlinks />
            </nav>
        </header>
    )
}

export default Navbar