import { Rule } from 'sanity'; 

const product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Keep the title relative to product",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "category",
            title: "Category",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "rowprice",
            title: "Row Price",
            type: "number",
        },
        {
            name: "ratings",
            title: "Ratings",
            type: "number",
            description: "Ratings must be equal or below 5",
        },
        {
            name: "isnew",
            title: "New Arrival",
            type: "boolean",
        },
        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },
        {
            name: "position",
            title: "Position",
            type: "string",
        },
        {
            name: "brand",
            title: "Brand",
            type: "string",
        },
        {
            name: "quantity",
            title: "Quantity",
            type: "number",
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
            position: "position",
        },
    },
};

export default product;
