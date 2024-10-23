import { urlFor } from "@/lib/sanityClient";
import { ProductProps } from "@/type";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

export const POST = async (request: NextRequest) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    try {
        const reqBody = await request.json()
        const {items, email} = await reqBody;

        const updatedItems = await items.map((item: ProductProps) => ({
            quantity: item.quantity,
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [urlFor(item.image).url()],
                },
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: updatedItems,
            mode: "payment",
            success_url:
                `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
            metadata: {
                email,
            },
        });
        
        return NextResponse.json({
            message: "Connection is alive",
            success: true,
            id: session.id,
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error?.message}, {status: 500})
    }
    
}