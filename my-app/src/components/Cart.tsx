"use client"
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container"
import { StateProps } from "@/type";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { resetQuantity } from "@/redux/orebiSlice";
import toast, { Toaster } from "react-hot-toast";
import Price from "./Price";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import emptyCart from "@/assets/emptyCart.png";
import { loadStripe } from "@stripe/stripe-js"
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

const Cart = () => {

    const [totalPrice, setTotalPrice] = useState(0)
    const productsData = useSelector((state: StateProps) => state.cartProducts.productData);
    const dispatch = useDispatch()
    const {data: session} =  useSession()

    useEffect(()=>{
        function productsPrice(){
            let totalPrice = 0
            productsData.map((product)=>{
                totalPrice += product.price * product.quantity;
                return totalPrice
            })
            setTotalPrice(totalPrice)
        }
        productsPrice()
    }, [productsData])

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    const createCheckout = async ()=> {
        if(session?.user){
            const stripe = await stripePromise;
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: productsData,
                    email: session?.user?.email
                })
            })
            const data = await response.json()
            if(response.ok){
                stripe?.redirectToCheckout({sessionId: data.id})
            }
        } else {
            toast.error("Please Sign in to make checkout")
        }
    } 

    const handleReset = ()=>{
        const confirmed = window.confirm("Are tou sure you want to reset tour cart?")
        if(confirmed){
            dispatch(resetQuantity())
            toast.success("Cart resetted successfully")
        }
    }

    return (
        <Container>
            {
                productsData.length > 0 ? 
                    <div className="pb-20">
                        <div className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5
                            place-content-center px-6 text-lg font-semibold">
                            <h2 className="col-span-2">Products</h2>
                            <h2>Price</h2>
                            <h2>Quantity</h2>
                            <h2>Sub Total</h2>
                        </div>
                        <div>
                            {
                                productsData.map((item)=>(
                                    <div key={item?._id}>
                                        <CartItem item={item} />
                                    </div>
                                ))
                            }
                        </div>
                        <Button 
                            onClick={()=> handleReset()} 
                            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
                        >
                            Reset cart
                        </Button>
                        <div className="flex flex-col md:flex-row justify-between border p-4 items-center gap-2 md:gap-0">
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Coupon Number"
                                    className="w-44 lg:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                                />
                                <p className="text-lg font-semibold">Apply Coupon</p>
                            </div>
                            <p>Update Cart</p>
                        </div>
                        <div className="max-w-7xl gap-4 flex justify-end mt-4">
                            <div className="w-96 flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
                                <div>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                                        Subtotal{" "}
                                        <span>
                                            <Price amount={totalPrice} />
                                        </span>
                                    </p>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                                        Shipping Charge
                                        <span className="font-semibold tracking-wide font-titleFont">
                                            <Price amount={0} />
                                        </span>
                                    </p>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                                        Total
                                        <span className="font-bold tracking-wide text-lg font-titleFont">
                                            <Price amount={totalPrice} />
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={createCheckout}
                                        className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                : 
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col md:flex-row justify-center items-center gap-4 pb-40"
                    >
                        <div>
                            <Image
                                src={emptyCart}
                                alt="emptyCart"
                                className="w-80 rounded-lg p-4 mx-auto"
                            />
                        </div>
                        <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
                            <h1 className="text-xl font-bold uppercase text-center">
                                Your Cart feels lonely.
                            </h1>
                            <p className="text-sm text-center px-10 -mt-2">
                                Your Shopping cart lives to serve. Give it purpose - fill it with
                                books, electronics, videos, etc. and make it happy.
                            </p>
                            <Link
                                href={"/"}
                                className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                }
            <Toaster
                position="bottom-right"
                toastOptions={{
                style: {
                    background: "#000",
                    color: "#fff",
                },
                }}
            />
        </Container>
    )
}

export default Cart