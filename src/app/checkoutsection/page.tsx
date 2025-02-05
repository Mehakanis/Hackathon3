"use client";
import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getCartItems } from '../actions/actions';
import Link from 'next/link';
import Image from 'next/image';
import { CgChevronRight } from "react-icons/cg";
import Header1 from '../components/header1';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  //const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    //const appliedDiscount = localStorage.getItem("appliedDiscount");
    // if (appliedDiscount) {
    //   setDiscount(Number(appliedDiscount));
    // }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      city: !formValues.city,
    };

    setFormErrors(errors);

    return !Object.values(errors).includes(true);
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      localStorage.removeItem("appliedDiscount");
      console.log("Order placed successfully!");
      return true;  // Return true to indicate that validation passed
    } else {
      console.log("Form validation failed.");
      return false;
    }
  };
  

  return (
    <main>
      <div className='pb-2'>
        <Header1 />
      </div>

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-4 py-4">
            <Link href="/cart" className="text-lg text-[#2A254B] hover:underline">
              Cart
            </Link>
            <CgChevronRight />
            <span className="text-lg font-semibold text-[#2A254B]">Checkout</span>
          </nav>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 border-b py-4">
                  <div className="image">
                    <Image
                      src={item.imageUrl}
                      alt="product image"
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#2A254B]">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity ?? 1}</p>
                    <p className="text-sm font-medium text-[#2A254B]">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
            {/* Subtotal moved to bottom right */}
            <div className="flex justify-end mt-4">
              <div className="flex items-center space-x-4">
                <h4 className="text-lg font-semibold text-[#2A254B]">Subtotal:</h4>
                <p className="text-lg text-[#2A254B] font-medium">${subTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter Your First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">First Name is Required</p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter Your Last Name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">Last Name is Required</p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter Your Address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">Address is Required</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is Required</p>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter Your City"
                  value={formValues.city}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm mt-1">City is Required</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#2A254B] mb-2">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter Your Phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">Phone is Required</p>
                )}
              </div>
            </div>

            {/* Place Order Button */}
            
<div className="mt-6 flex justify-center">
  <button
    onClick={() => {
      if (handlePlaceOrder()) {
        // Redirect manually after validation
        window.location.href = '/checkout';  // Or use router.push('/checkout') if you're using Next.js router
      }
    }}
    className="bg-[#2A254B] px-8 py-3 text-white rounded-md hover:bg-[#1e1a3d] transition"
  >
    Place Order
  </button>
</div>

            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
