"use client";
import React, { useState } from "react";

// Define Types
interface Parcel {
  length: string;
  width: string;
  height: string;
  distance_unit: string;
  weight: string;
  mass_unit: string;
}

interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShipmentDetails {
  orderId: string;
  totalAmount: number;
  eta: string;
  trackingNumber: string;
}

interface TrackingDetails {
  tracking_details: TrackingDetails | null;
  tracking_number: string;
  carrier: string;
  status: string;
  eta?: string;
  address_from: { city: string };
  address_to: { city: string };
  tracking_history?: TrackingHistory[];
}

interface TrackingHistory {
  status_date: string;
  location: { city: string };
  status: string;
}

const ShippoData = () => {
  const [cart, setCart] = useState([
    {
      id: "1",
      name: "Library Stool Chair",
      price: 99,
      size: "L",
      quantity: 1,
      image: "/02.jpg",
    },
    {
      id: "2",
      name: "Library Stool Chair",
      price: 99,
      size: "L",
      quantity: 1,
      image: "/02.jpg",
    },
  ]);

  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingDetails | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleCheckout = async () => {
    const addressFrom: Address = {
      name: "E-commerce Store",
      street1: "123 Store Lane",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "US",
    };

    const addressTo: Address = {
      name: "John Doe",
      street1: "456 User Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US",
    };

    const parcels: Parcel[] = cart.map(() => ({
      length: "10",
      width: "10",
      height: "10",
      distance_unit: "in",
      weight: "5",
      mass_unit: "lb",
    }));

    try {
      const response = await fetch("/api/shippoOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressFrom,
          addressTo,
          parcels,
          orderId: "ORDER12345",
          totalAmount: cart.reduce((total, item) => total + item.price, 0),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShipmentDetails({
          orderId: data.orderId,
          totalAmount: data.totalAmount,
          eta: data.eta,
          trackingNumber: data.trackingNumber,
        });
        setCheckoutStatus("Order placed successfully!");

        // Clear the cart after successful order submission
        setCart([]);
      } else {
        setCheckoutStatus("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setCheckoutStatus("An error occurred. Please try again.");
    }
  };

  const handleTrackShipment = async () => {
    if (!trackingNumber) {
      alert("Please enter a tracking number");
      return;
    }

    setIsTracking(true);
    try {
      const carrier = "shippo";
      const orderId = shipmentDetails?.orderId;
      const response = await fetch("/api/liveTracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber, carrier, orderId }),
      });

      const data = await response.json();
      if (response.ok && data?.trackingDetails) {
        setTrackingData(data);
      } else {
        setTrackingData(null);
      }
    } catch (error) {
      console.log("Error fetching tracking status:", error);
      setTrackingData(null);
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="max-w-[1321px] mx-auto px-4 py-8 flex flex-col justify-center items-center">
      {/* Checkout Button */}
      <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-600 mb-8 w-full sm:w-96">
        <h2 className="text-xl font-bold text-center mb-4">Confirm Your Order</h2>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white w-full p-3 rounded-md text-lg hover:bg-blue-600 transition"
        >
          Submit Order
        </button>
      </div>

      {/* Shipment Details */}
      {checkoutStatus && (
        <p className="text-blue-600 text-center text-2xl font-semibold">{checkoutStatus}</p>
      )}
      {shipmentDetails && (
        <div className="mt-6 bg-green-100 p-6 rounded-lg shadow-md w-full sm:w-96">
          <h3 className="text-xl font-bold mb-4">Shipment Details</h3>
          <p><strong>Order ID:</strong> {shipmentDetails.orderId}</p>
          <p><strong>Total Amount:</strong> ${shipmentDetails.totalAmount}</p>
          <p><strong>ETA:</strong> {shipmentDetails.eta}</p>
          <p><strong>Tracking Number:</strong> {shipmentDetails.trackingNumber || "Tracking information is not available yet."}</p>
        </div>
      )}

      {/* Tracking Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-600 w-full sm:w-96 mt-6">
        <h2 className="text-2xl font-bold mb-4">Track Your Shipment</h2>
        <p className="p-2 mb-4 text-gray-600">Enter your tracking number to check shipment status.</p>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTrackShipment}
            className="bg-blue-500 text-white p-3 rounded-md text-lg hover:bg-blue-600 transition"
          >
            Track
          </button>
        </div>

        {isTracking && <p className="text-gray-500">Loading...</p>}

        {/* Tracking Data */}
        {trackingData && trackingData.tracking_details && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Tracking Details</h3>
            <p><strong>Tracking Number:</strong> {trackingData.tracking_number}</p>
            <p><strong>Carrier:</strong> {trackingData.carrier}</p>
            <p><strong>Status:</strong> {trackingData.status}</p>
            <p><strong>ETA:</strong> {trackingData.eta || "N/A"}</p>
            <p><strong>Origin:</strong> {trackingData.address_from.city}</p>
            <p><strong>Destination:</strong> {trackingData.address_to.city}</p>
            <h3 className="text-lg font-bold mt-4">Tracking History</h3>
            {trackingData.tracking_history?.length ? (
              <ul className="list-disc ml-6">
                {trackingData.tracking_history.map((historyItem, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>Date:</strong> {new Date(historyItem.status_date).toLocaleString()}</p>
                    <p><strong>Location:</strong> {historyItem.location?.city}</p>
                    <p><strong>Status:</strong> {historyItem.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tracking history available.</p>
            )}
          </div>
        )}

        {/* No Data Message */}
        {!trackingData && !isTracking && (
          <p className="text-gray-500">Enter a tracking number to see shipment details.</p>
        )}
      </div>
    </div>
  );
};

export default ShippoData;
