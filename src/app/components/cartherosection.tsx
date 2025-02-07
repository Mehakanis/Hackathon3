"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getCartItems, removeFromCart, } from "../actions/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CartHeroSection() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  // ✅ UseEffect for Safe LocalStorage Access
  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = getCartItems() || [];
      console.log("Initial cart items:", items); // Debugging
      setCartItems(items);
    }
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        const updatedItems = getCartItems() || [];
        console.log("Updated cart items after removal:", updatedItems); // Debugging
        setCartItems(updatedItems);
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleIncrement = (id: string) => {
    console.log("Incrementing item:", id);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    console.log("Decrementing item:", id);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Save cart data in localStorage before navigation
        localStorage.setItem("cart", JSON.stringify(cartItems));
        router.push("/checkoutsection");

        Swal.fire("Success", "Your order has been successfully processed", "success");
      }
    });
  };

  return (
    <section className="bg-[#F9F9F9] px-6 md:px-16 lg:px-32 pt-12 pb-20 mt-6">
      {/* Cart Title */}
      <h1 className="text-[#2A254B] text-xl md:text-3xl font-semibold">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-6">Your cart is empty</p>
      ) : (
        <>
          {/* Headers */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] gap-10 pt-10 border-b-2 pb-4 text-[#2A254B] font-medium">
            <h6>Product</h6>
            <h6 className="text-center">Quantity</h6>
            <h6 className="text-left">Total</h6>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-6 items-center py-6 border-b">
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full">
                <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-md" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold">{item.name}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                  <p className="text-sm font-medium">£{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 justify-center">
                <button onClick={() => handleDecrement(item._id)} className="px-2 py-1 bg-gray-200 rounded">
                  -
                </button>
                <p className="w-8 text-center">{item.quantity}</p>
                <button onClick={() => handleIncrement(item._id)} className="px-2 py-1 bg-gray-200 rounded">
                  +
                </button>
              </div>

              {/* Total & Remove Button */}
              <div className="flex justify-between md:justify-start w-full gap-20">
                <p className="text-sm font-medium">£{item.price * item.quantity}</p>
                <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:underline ml-4">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal & Checkout */}
          <div className="flex flex-col md:items-end mt-8">
            <div className="flex gap-4 text-lg font-semibold">
              <h4 className="text-[#4E4D93]">Subtotal:</h4>
              <h3>£{calculatedTotal()}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-2">Taxes and shipping are calculated at checkout.</p>
            <button onClick={handleProceed} className="bg-[#2A254B] px-8 py-3 text-white text-sm mt-6 rounded hover:bg-[#1e1a3d] transition">
              Go to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
