// import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";

// function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [trackingInfo, setTrackingInfo] = useState<any>(null); // State to store tracking info
//   const [isTrackingLoading, setIsTrackingLoading] = useState(false); // State to handle tracking info loading

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!stripe || !elements) return;
  
//     setIsProcessing(true);
//     setIsTrackingLoading(false); // Reset tracking loading state before fetching
  
//     // Confirm payment using Stripe
//     const { error } = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required",
//     });
  
//     if (error) {
//       setErrorMessage(error.message || "An unknown error occurred");
//       setIsProcessing(false);
//     } else {
//       setErrorMessage(null);
//       setPaymentSuccess(true);
//       setIsProcessing(false);
  
//       // Simulate fetching tracking info
//       setIsTrackingLoading(true); // Set tracking info loading state
//       try {
//         const trackingResponse = await fetch(
//           `/api/track?trackingNumber=123456789&carrierCode=ups` // Replace with real tracking number and carrier code
//         );
        
//         // Check if the response is OK
//         if (!trackingResponse.ok) {
//           const errorText = await trackingResponse.text(); // Get response as text if it's not JSON
//           throw new Error(`Error fetching tracking info: ${errorText}`);
//         }
  
//         // Parse response as JSON
//         const trackingData = await trackingResponse.json();
//         setTrackingInfo(trackingData); // Set the tracking info
//       } catch (err) {
//         console.error("Error fetching tracking data:", err);
//         setTrackingInfo(null); // In case of an error, no tracking info
//       } finally {
//         setIsTrackingLoading(false); // End tracking loading state
//       }
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement className="p-4 border rounded-lg" />
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition relative"
//       >
//         {isProcessing ? (
//           <div className="flex items-center justify-center">
//             {/* Loading Spinner */}
//             <svg
//               className="animate-spin h-5 w-5 mr-3 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             Processing...
//           </div>
//         ) : (
//           "Pay Now"
//         )}
//       </button>

//       {/* Error Message */}
//       {errorMessage && (
//         <div className="text-red-500 text-sm text-center mt-4">{errorMessage}</div>
//       )}

//       {/* Success Message */}
//       {paymentSuccess && (
//         <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
//           <p className="font-semibold">Payment Successful!</p>
//           <p>Thank you for your purchase.</p>

//           {/* Display Tracking Information or Loading State */}
//           {isTrackingLoading ? (
//             <div className="mt-4 text-blue-600">Loading tracking information...</div>
//           ) : (
//             trackingInfo && (
//               <div className="mt-4">
//                 <h2 className="text-lg font-semibold">Tracking Information</h2>
//                 <pre className="bg-gray-100 p-4 rounded-lg mt-2">
//                   {JSON.stringify(trackingInfo, null, 2)}
//                 </pre>
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </form>
//   );
// }

// export default PaymentForm;
