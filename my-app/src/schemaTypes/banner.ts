import { Rule } from 'sanity'; 

const banner = {
    type: "document",
    name: "banner",
    title: "Banner",
    fields: [
        {
            name: "title",
            title: "Title banner",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            description: "Banner Image",
            validation: (rule: Rule) => rule.required(),
            options: {
                hotspot: true
            },
            preview: {
                select: {
                    imageUrl: "asset.url",
                    title: "caption",
                }
            }
        }
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
        }
    }
};

export default banner;
