/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Slider from "react-slick"
import Container from "./Container"
import ProductCard from "./ProductCard";
import { products } from "@/type";
import NextBtn from "./NextBtn";
import PreviousBtn from "./PreviousBtn";

const NewArrival = ({products}: products) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextBtn />,
        prevArrow: <PreviousBtn />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                }
            },
            {
                breakpoint: 769,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                }
            },
        ]
    };
    return (
        <Container className="lg:-mt-48 -mt-[100px] z-[20] relative">
            <Slider {...settings}>
                {products?.map((item)=>(
                    <div key={item._id} className="px-2">
                        <ProductCard product={item} />
                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default NewArrival