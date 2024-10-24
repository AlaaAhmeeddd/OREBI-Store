"use client";
import Container from "@/components/Container";
import { resetQuantity } from "@/redux/orebiSlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from 'next/navigation';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Session ID:", session_id);

    if (!session_id) {
      redirect("/");
    } else {
      dispatch(resetQuantity());
    }
  }, [dispatch, session_id]);
  
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">
          Your Payment Accepted by orebionlineshopping.com
        </h2>
        <p>Now you can view your orders or continue Shopping with us</p>
        <div className="flex items-center">
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
