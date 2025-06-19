import React from "react";
import CartInfo from "./components/cart.info";
import CartList from "./components/cart.list";

export default function Cart() {
  return (
    <>
      <CartList />
      <CartInfo />
    </>
  );
}
