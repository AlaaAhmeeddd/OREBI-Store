import Container from "@/components/Container"
import OnSale from "@/components/OnSale"
import { client } from "@/lib/sanityClient"
import { groq } from "next-sanity"

const page = async({params}: {params:{productSlug: string}}) => {

    const productDetails = groq`*[_type == "product" && slug.current == $productSlug][0]{ ... }`
    const product = await client.fetch(productDetails, { productSlug: params.productSlug })
    const onSale = groq`*[_type == "product" && position == "On Sale"]{...}`
    const onSaleProducts = await client.fetch(onSale)
    
    return (
        <Container className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 
                h-full -mt-5 xl:-mt-8 bg-gray-100 p-4">
                <div className="">
                    <OnSale products={onSaleProducts} />
                </div>
                <div></div>
                <div></div>
            </div>
        </Container>
    )
}

export default page
