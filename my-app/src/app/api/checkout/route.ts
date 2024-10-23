import { urlFor } from "@/lib/sanityClient";
import { ProductProps } from "@/type";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

export const POST = async (request: NextRequest) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    
    try {
        const reqBody = await request.json();
        const { items, email } = reqBody;

        // Prepare items for Stripe
        const updatedItems = items.map((item: ProductProps) => ({
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

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: updatedItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
            metadata: {
                email,
            },
        });
        
        return NextResponse.json({ id: session.id, success: true });

    } catch (error) {
        console.error("Checkout error:", error); // Log the error for debugging

        // Send a JSON response with error details
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
