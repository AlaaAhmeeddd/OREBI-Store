import React from "react";
import Container from "./Container";
import Image from "next/image";
import productOfTheYear from "@/assets/productOfTheYear.webp";
import Link from "next/link";

const YearProduct = () => {
    return (
        <div className="w-full bg-[#f3f3f3]">
            <Container className="md:bg-transparent relative py-0 mb-10">
                <Image
                    src={productOfTheYear}
                    alt="product"
                    className="w-full h-full object-cover hidden md:inline-block"
                />
                <div className="w-full md:w-2/3 xl:w-1/2 h-auto absolute px-6 xl:px-0 top-1/2 -translate-y-[50%] right-0 hidden md:flex flex-col items-start lg:gap-6 gap-3 justify-center">
                    <h1 className="lg:text-3xl text-xl font-semibold text-primeColor">
                        Prouct of the year
                    </h1>
                    <p className="lg:text-base text-sm font-normal text-primeColor max-w-[600px] mr-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At,
                        veritatis. Alias quia aut accusantium doloremque ad, iure odio
                        inventore dolorem?
                    </p>
                    <Link
                        href={"/shop"}
                        className="bg-primeColor text-white lg:text-lg text-[base] lg:w-[185px] w-[100px] lg:h-[50px] h-[30px] hover:bg-black duration-300 font-bold flex items-center justify-center rounded-md"
                    >
                        Shop Now
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default YearProduct;
