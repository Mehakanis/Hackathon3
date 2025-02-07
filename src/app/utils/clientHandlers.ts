"use client"; // ✅ This ensures the file runs on the client

import Swal from "sweetalert2";
import { addToCart } from "../actions/actions"; // Make sure this is a client function
import { Product } from "../types/product";
import { MouseEvent } from "react";

export const handleAddToCart = (e: MouseEvent, product: Product) => {
  e.preventDefault();

  Swal.fire({
    position: "top-right",
    icon: "success",
    title: `${product.name} added to cart`,
    showConfirmButton: false,
    timer: 1000,
  });

  addToCart(product); // ✅ Add the product to the cart
};
