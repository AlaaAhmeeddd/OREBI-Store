import { Button } from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { HiMenuAlt2 } from 'react-icons/hi'
import logo from "@/assets/logoBlack.png"

const MobileNavlinks = () => {
    return (
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
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavlinks