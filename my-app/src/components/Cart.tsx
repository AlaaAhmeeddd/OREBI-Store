"use client"
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container"
import { StateProps } from "@/type";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { resetQuantity } from "@/redux/orebiSlice";
import toast, { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

const Cart = () => {

    const productsData = useSelector((state: StateProps) => state.cartProducts.productData);
    const dispatch = useDispatch()

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
                    </div>
                : 
                    <div className="h-screen">
                        <p>No product available</p>
                    </div>
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