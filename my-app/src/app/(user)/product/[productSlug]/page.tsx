import Container from "@/components/Container"
import OnSale from "@/components/OnSale"
import ProudctInfo from "@/components/ProductInfo"
import { client, urlFor } from "@/lib/sanityClient"
import { groq } from "next-sanity"
import Image from "next/image"

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
                <div className="h-full xl:col-span-2">
                    <Image
                        src={urlFor(product?.image).url()}
                        alt="product image"
                        className="w-full h-full object-contain"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
                    <ProudctInfo product={product} />
                </div>
            </div>
        </Container>
    )
}

export default page
