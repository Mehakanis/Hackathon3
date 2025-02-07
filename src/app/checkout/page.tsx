"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import { motion } from "framer-motion"; // For smooth animation

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="self-start flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v4h6a1 1 0 110 2h-6v4a1 1 0 01-2 0V10H3a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* Checkout Card */}
      <div className="mt-10 w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Complete Your Payment</h1>
        <p className="text-gray-500 text-center mt-1">Secure and easy payment process</p>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>
    </main>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter(); // Use router here
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Success state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });

    if (error) {
      setErrorMessage(error.message || "An error occurred, please try again.");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      setPaymentSuccess(true);
      setTimeout(() => {
        router.push('/shippo'); // Redirect to the Home page after successful payment
      }, 2000);
    }
  };

  return (
    <>
      {paymentSuccess ? (
        // Success Animation
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center p-6"
        >
          <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L9 14.414l-3.707-3.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-green-600">Payment Successful!</h2>
          <p className="text-gray-500 text-center">Thank you for your purchase.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <PaymentElement className="p-4 border border-gray-300 rounded-lg" />
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
          {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        </form>
      )}
    </>
  );
}
