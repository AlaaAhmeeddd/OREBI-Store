"use client"
import { urlFor } from "@/lib/sanityClient"
import { ProductProps } from "@/type"
import Link from "next/link"
import Image from "next/image";
import Price from "./Price";
import { useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/redux/orebiSlice";
import toast, { Toaster } from "react-hot-toast";
import { ImCross } from "react-icons/im";

interface Props{
    item: ProductProps
} 

const CartItem = ({item}: Props) => {
    const dispatch = useDispatch()

    const handleIncrease = ()=>{
        dispatch(increaseQuantity(item))
        toast("Product added successfully")
    }

    const handleDecrease = ()=>{
        dispatch(decreaseQuantity(item))
        toast("Product reduced successfully")
    }

    const handleDelete = ()=>{
        dispatch(deleteProduct(item))
        toast(`${item.title.substring(0, 20)}... deleted successfully`)
    }

    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
                <ImCross
                    className="text-primeColor hover:text-red-500 cursor-pointer duration-300"
                    onClick={()=>handleDelete()}
                />
                <Link href={`/product/${item?.slug?.current}`}>
                    <Image
                        src={urlFor(item?.image).url()}
                        alt="product image"
                        width={50}
                        height={50}
                        className="w-32 h-32 object-contain"
                    />
                </Link>
                <h1 className="font-semibold">{item?.title.substring(0, 20)}</h1>
            </div>
            <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 lg:px-0">
                <p className="flex w-1/3 items-center text-lg font-semibold">
                    <Price amount={item?.price} />
                </p>
                <div className="flex w-1/3 items-center gap-6 text-lg">
                    <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 
                        cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
                        onClick={()=>handleDecrease()}
                    >
                        -
                    </span>
                    <p>{item?.quantity}</p>
                    <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 
                        cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
                        onClick={()=>handleIncrease()}
                    >
                        +
                    </span>
                </div>
                <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                    <p>${item.quantity * item.price}</p>
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                style: {
                    background: "#000",
                    color: "#fff",
                },
                }}
            />
        </div>
    )
}

export default CartItem