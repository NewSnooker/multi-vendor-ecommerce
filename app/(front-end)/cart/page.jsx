"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";

import React from "react";
import { useSelector } from "react-redux";

export const dynamic = "force-dynamic";

export default function Page() {
  const cartItems = useSelector((store) => store.cart) || [];

  const subTotal = cartItems.reduce((total, currentItem) => {
    return total + (currentItem.salePrice || 0) * (currentItem.qty || 0);
  }, 0)
  return (
    <div className="px-6">
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-x-10">
          <CartItems cartItems={cartItems} />
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}