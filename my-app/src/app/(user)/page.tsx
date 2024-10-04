import Banner from "@/components/Banner"
import NewArrival from "@/components/NewArrival";
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

const HomePage = async() => {
    const banners = await client.fetch(bannerQuery)
    const newProducts = await client.fetch(newArrival)
    return (
        <main className="text-sm overflow-hidden min-h-screen">
            <Banner banners={banners} />
            <NewArrival arrivals={newProducts} />
        </main>
    )
}

export default HomePage