import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; // Make sure you have axios installed (npm install axios)

export default async function shippoOrder(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { addressFrom, addressTo, parcels, orderId, totalAmount } = req.body;

    try {
        // Fetch the Shippo API key from the environment variable (securely)
        const shippoApiKey = process.env.SHIPPO_API_KEY;

        if (!shippoApiKey) {
            return res.status(500).json({ message: "Shippo API key is missing" });
        }

        const response = await axios.post(
            "https://api.goshippo.com/shipments/",
            {
                address_from: addressFrom,
                address_to: addressTo,
                parcels,
                async: false,
            },
            {
                headers: {
                    Authorization: `ShippoToken ${shippoApiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Debug full response
        console.log("Full Shipment Response:", response.data);

        // Extract tracking and shipment data
        const shipment = response.data;
        const trackingNumber = shipment.object_id;
        const eta = shipment.eta || "3-5 business days"; // Default ETA if not available

        res.status(200).json({
            orderId,
            totalAmount,
            trackingNumber,
            eta,
            status: "Shipment created successfully!",
        });
    } catch (error: unknown) {
        // Handle the error safely
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error creating shipment:", error.response.data || error.message);
            res.status(500).json({ message: "Failed to create shipment", error: error.response?.data });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({ message: "Unexpected error occurred", error: (error as Error).message });
        }
    }
}
