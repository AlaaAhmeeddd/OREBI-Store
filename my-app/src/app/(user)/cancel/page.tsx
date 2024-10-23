import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'

const CancelPage = () => {
    return (
        <Container className="flex items-center justify-center py-20">
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
                <h2 className="text-4xl font-bold">
                    Oops you cancelled your payment process
                </h2>
                <div className="flex items-center">
                    <Link href={"/cart"}>
                        <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
                            Back to your cart
                        </button>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default CancelPage