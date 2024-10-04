import Banner from "@/components/Banner"
import BestSellers from "@/components/BestSellers";
import HomeBanner from "@/components/HomeBanner";
import NewArrival from "@/components/NewArrival";
import SpecialOffer from "@/components/SpecialOffer";
import YearProduct from "@/components/YearProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity"; 

export const dynamic = "force-dynamic";

const bannerQuery = groq`*[_type == "banner"]{
    image,
    _id,
} | order(_createdAt asc)`;

const newArrival = groq`*[_type == "product" && position == "New Arrivals"]{
    ...
} | order(_createdAt asc)`;

const bestSellers = groq`*[_type == "product" && position == "Bestseller"][0...4]{
    ...
} | order(_createdAt asc)`;

const specialOffers = groq`*[_type == "product" && position == "Special Offer"]{
    ...
} | order(_createdAt asc)`;

const HomePage = async() => {
    const banners = await client.fetch(bannerQuery)
    const newProducts = await client.fetch(newArrival)
    const bestSellersProducts = await client.fetch(bestSellers)
    const specialOffersProducts = await client.fetch(specialOffers)

    return (
        <main className="text-sm overflow-hidden min-h-screen">
            <Banner banners={banners} />
            <NewArrival products={newProducts} />
            <HomeBanner />
            <BestSellers products={bestSellersProducts} title="Our Bestsellers" />
            <YearProduct />
            <SpecialOffer products={specialOffersProducts} title="Special Offers"  />
        </main>
    )
}

export default HomePage