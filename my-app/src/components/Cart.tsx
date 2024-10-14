"use client"
import { useSelector } from "react-redux";
import Container from "./Container"
import { StateProps } from "@/type";
import CartItem from "./CartItem";

const Cart = () => {

    const productsData = useSelector((state: StateProps) => state.cartProducts.productData);

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
                    </div>
                : 
                    <div className="h-screen">
                        <p>No product available</p>
                    </div>
            }
        </Container>
    )
}

export default Cart