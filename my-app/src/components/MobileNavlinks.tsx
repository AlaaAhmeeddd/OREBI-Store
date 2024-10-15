import { Button } from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { HiMenuAlt2 } from 'react-icons/hi'
import logo from "@/assets/logoBlack.png"
import { signOut, useSession } from "next-auth/react"
import { FiLogOut } from "react-icons/fi";


const MobileNavlinks = () => {

    const {data: session} = useSession()
    return (
        <div className="relative">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost">            
                        <HiMenuAlt2 className="w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-white z-[20000]">
                    <SheetHeader>
                        <SheetTitle className="flex justify-center py-10">
                            <Image src={logo} alt="logo" width={100} height={100} />
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link, index)=>(
                            <Link key={index} href={link.href} className="hover:bg-gray-100 font-semibold text-xl px-2 py-3 rounded-md 
                            bg-white hover:px-5 duration-200 transition-all">
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    {session?.user && 
                        <button 
                            onClick={()=> signOut({ callbackUrl: "/" })}
                            className="flex gap-3 font-semibold justify-end text-xl items-center 
                            bg-gray-100 hover:bg-gray-200 duration-200 w-full px-5 py-7 absolute right-0 bottom-0"
                        >
                            <FiLogOut className="text-red-600" />
                            Logout
                        </button>
                    }
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNavlinks