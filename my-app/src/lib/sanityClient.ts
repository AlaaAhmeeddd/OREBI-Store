import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source:any)=>{
    return builder.image(source)
}

export const productQuery = groq`*[_type == "product"]{
    ...
} | order(_createdAt desc)`

export const AllProducts = async()=>{
    const products = await client.fetch(productQuery)
    return products
}