"use client"; 
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { client, urlFor } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import { searchProps } from "@/type";
import Link from "next/link";
import Image from "next/image";

const queryProducts = groq`*[_type == "product" && title match $query + "*"]{
    _id,
    title,
    price,
    image,
    slug,
}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProducts(query: any) {
    const searchProducts = await client.fetch(queryProducts, { query });
    return searchProducts;
}

const SearchMenu = ({ query }: { query: string }) => {
    const [searchData, setSearchData] = useState<searchProps[]>([]);

    useEffect(() => {
        if (query) {
            getProducts(query).then((data) => {
                setSearchData(data);
            });
        }
    }, [query]);

    return (
        <div className={`${!query && "hidden"} absolute md:top-[110%] top-[90%] left-0 rounded-md bg-white border border-gray-200 shadow-md w-full`}>
            <Box sx={{ width: "100%" }}>
                {searchData.length === 0 ?
                    <List sx={{width: "100%"}}>
                        <ListItem disablePadding sx={{width: "100%", px: 2, py: 1}}>
                            <ListItemText primary="No Product" />
                        </ListItem>
                    </List> :
                    <List>
                        {searchData.map((item) => (
                            <Link href={`product/${item?.slug?.current}`} key={item._id}>
                                <ListItem disablePadding>
                                    <ListItemButton className="flex gap-2 items-center">
                                        <Image src={urlFor(item?.image).url()} alt="product image" width={50} height={50} />
                                        <ListItemText primary={item.title} className="font-semibold" />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                }
            </Box>
        </div>
    );
};

export default SearchMenu;
