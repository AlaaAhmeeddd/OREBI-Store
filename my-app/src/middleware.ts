export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/cart", "/success"],
};


// Optionally, you can add custom logic for handling requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function middleware(req: any) {
    const token = await getToken({ req });
    if (!token) {
        // If not logged in, redirect to the login page
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
}