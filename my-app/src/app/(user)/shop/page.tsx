"use client"
import Container from "@/components/Container"
import ListProduct from "@/components/ListProduct"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { AllProducts } from "@/lib/sanityClient"
import { ProductProps } from "@/type"
import { useEffect, useState } from "react"
import { BsGridFill } from "react-icons/bs"
import { ImList } from "react-icons/im"
import useMediaQuery from '@mui/material/useMediaQuery';

const ShopPage = () => {

    const [showGrid, setShowGrid] = useState(true)
    const [showList, setShowList] = useState(false)
    const [productData, setProductData] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8)
    const productsNum = productData.length
    const smallScreen = useMediaQuery('(min-width:500px)')

    const handleSeeMore = ()=>{
        setVisibleProducts(visibleProducts + 8)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await AllProducts();
            setProductData(data);
            } catch (error) {
            console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <Container>
            <div className="flex items-center justify-between pb-10">
                <h2 className="text-2xl text-primeColor font-bold">All Products</h2>
                {smallScreen &&
                    <div className="flex items-center gap-4">
                        <span
                            onClick={() => {
                                setShowGrid(true);
                                setShowList(false);
                                setVisibleProducts(8)
                            }}
                            className={`${
                                showGrid
                                    ? "bg-primeColor text-white"
                                    : "border-[1px] border-gray-300 text-[#737373]"
                                } w-8 h-8 text-lg flex items-center justify-center cursor-pointer`
                            }
                        >
                            <BsGridFill />
                        </span>
                        <span
                            onClick={() => {
                                setShowGrid(false);
                                setShowList(true);
                                setVisibleProducts(8)
                            }}
                            className={`${
                                showList
                                    ? "bg-primeColor text-white"
                                    : "border-[1px] border-gray-300 text-[#737373]"
                                } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`
                            }
                        >
                            <ImList />
                        </span>
                    </div>
                }
            </div>
            {showList && smallScreen ? (
                <div className="w-full grid grid-cols-1 gap-5">
                    {productData?.slice(0, visibleProducts).map((item: ProductProps) => (
                        <ListProduct key={item?._id} product={item} />
                    ))}
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {productData?.slice(0, visibleProducts).map((item: ProductProps) => (
                        <ProductCard key={item?._id} product={item} />
                    ))}
                </div>
            )}
            {visibleProducts < productsNum &&
                <div className="flex justify-center my-8">
                    <Button 
                        className="md:text-xl text-lg py-2 px-4 md:px-7 font-semibold bg-gray-200 
                        hover:bg-gray-300 duration-200 transition rounded-full text-primeColor"
                        onClick={handleSeeMore}
                    >
                        See More
                    </Button>
                </div>
            }
        </Container>
    )
}

export default ShopPage