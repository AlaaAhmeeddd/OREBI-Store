"use client";
import { ProductProps } from "@/type";
import Price from "./Price";
import { addToCard } from "@/redux/orebiSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const ProudctInfo = ({ product }: {product: ProductProps}) => {
    const dispatch = useDispatch()
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold">{product?.title}</h2>
                <div className="flex sm:flex-row flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <p className="text-lg font-normal text-gray-500 line-through">
                            <Price amount={product?.rowprice} />
                        </p>
                        <Price amount={product?.price} className="text-lg font-bold" />
                    </div>
                    <p className="text-sm">
                        you saved{" "}
                        <Price
                            className="bg-green-700 text-white px-2 rounded-md"
                            amount={product?.rowprice - product?.price}
                        />{" "}
                        from this item
                    </p>
                </div>
            <p className="text-sm tracking-wide text-gray-600">
                {product?.description}
            </p>
            <p className="text-sm text-gray-500">Be the first to leave a review.</p>
                <button onClick={(event)=> {
                            event.preventDefault(); 
                            dispatch(addToCard(product)); 
                            toast.success(`${product?.title.substring(0, 12)}... added to cart`)
                        }} 
                    className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg rounded-md"
                >
                    Add to Cart
                </button>
            <p className="font-normal text-sm">
                <span className="text-base font-medium">Categories:</span> Spring
                collection, Streetwear, Women Tags: featured SKU: N/A
            </p>
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
    );
};

export default ProudctInfo;
