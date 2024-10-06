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
import useMediaQuery from "@mui/material/useMediaQuery"

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const pathName = usePathname()
    const isSmallScreen = useMediaQuery('(max-width: 400px)');

    return (
        <header className="w-full h-20 bg-white border-b border-b-gray-400 sticky top-0 z-[1000]">
            <nav className="h-full flex items-center gap-3 mx-auto md:px-12 px-6 justify-between max-w-screen-xl">
                <Link href="/" className="min-w-20 max-w-56">
                    <Image src={logo} alt="logo" className="w-full" />
                </Link>
                <div className={`relative md:ml-4 items-center inline-flex lg:w-[600px] text-base text-primeColor`}>
                    <Input 
                        className={`flex-1 h-full outline-none ${isSmallScreen ? "w-[150px]" : "w-auto"}`}
                        placeholder="Search.."
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
                            className={`underline-offset-4 decoration-[1px] lg:px-8 px-3 h-6 font-medium hover:font-semibold duration-150
                            ${pathName == link.href ? "underline text-primeColor": "text-lightText hover:underline "}`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className="md:hidden inline-block">
                    <MobileNavlinks />
                </div>
            </nav>
        </header>
    )
}

export default Navbar