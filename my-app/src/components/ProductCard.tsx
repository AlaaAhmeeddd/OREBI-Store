"use client"
import { urlFor } from "@/lib/sanityClient"
import { ProductProps } from "@/type"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { AiOutlineShopping } from "react-icons/ai"
import { BsArrowsFullscreen } from "react-icons/bs"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { useDispatch } from "react-redux"
import { addToCard } from "@/redux/orebiSlice"
import toast, { Toaster } from "react-hot-toast"

const ProductCard = ({product}: {product: ProductProps}) => {

    const dispatch = useDispatch()

    return (
        <div className="w-full relative group border-[1px] border-gray-300 hover:shadow-lg duration-200 
            shadow-gray-500 overflow-hidden rounded-md">
            <div className="w-full h-80 flex items-center justify-center bg-white overflow-hidden">
                <div className="relative">
                    <Link href="/">
                        <Image 
                            src={urlFor(product?.image).url()} 
                            alt="product" width={700} height={700} 
                            className="w-72 h-72 object-contain"
                        />
                    </Link>
                    <div className="absolute bottom-0 flex lg:flex-row flex-col items-center lg:gap-3 gap-1.5 lg:justify-center  
                        translate-y-[160%] group-hover:translate-y-0 transition-transform duration-300 w-full">  
                        <Link href={"/"} className="bg-gray-800 text-gray-200 rounded-full
                            hover:bg-gray-950 hover:text-white duration-200">
                            <Button 
                                className="flex items-center justify-center text-xs gap-1"
                                onClick={(event)=> {
                                    event.preventDefault(); 
                                    dispatch(addToCard(product)); 
                                    toast.success(`${product?.title.substring(0, 12)}... added to cart`)
                                }}
                            >
                                <span> <AiOutlineShopping /> </span>
                                Add to bag
                            </Button>
                        </Link>
                        <Link href={`product/${product?.slug?.current}`} className="bg-gray-800 text-gray-200 rounded-full
                            hover:bg-gray-950 hover:text-white duration-200">
                            <Button className="flex items-center justify-center gap-1 text-xs ">
                                <span> <BsArrowsFullscreen /> </span>
                                Quick view
                            </Button>
                        </Link>
                    </div>
                    {product?.isnew && (
                        <div className="absolute top-2 right-2 z-50">
                        <p className="bg-primeColor px-4 py-1 text-white flex justify-center items-center text-sm font-semibold hover:bg-black duration-300 cursor-pointer rounded-md">
                            New
                        </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="py-6 flex flex-col gap-1 px-4">
                <div className="flex items-center justify-between">
                <h2 className="text-lg text-primeColor font-bold">
                    {product?.title.substring(0, 15)}
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-[#767676] text-xs line-through">
                    ${product?.rowprice}
                    </p>
                    <p className="font-semibold">${product?.price}</p>
                </div>
                </div>
                <div className="flex items-center justify-between">
                <p className="text-[#767676] text-sm">
                    a product by{" "}
                    <span className="font-semibold text-primeColor">
                    {product?.brand}
                    </span>
                </p>
                <div className="flex items-center gap-1">
                    <MdOutlineStarPurple500 className="text-lg text-yellow-500" />
                    <span className="font-medium text-sm">{product?.ratings}</span>
                </div>
                </div>
            </div>
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff"
                    }
                }}
            />
        </div>
    )
}

export default ProductCard