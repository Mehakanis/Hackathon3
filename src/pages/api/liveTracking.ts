import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; // Install axios in your project
// Run this Command (npm install axios)

const SHIPPO_API_KEY = process.env.SHIPPO_API_KEY; // Use the API key securely from .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { trackingNumber, carrier } = req.body;

    // Validate request body
    if (!trackingNumber || !carrier) {
      return res.status(400).json({ message: "Missing trackingNumber or carrier in request body." });
    }

    try {
      // Fetch Live Tracking Details using trackingNumber and carrier
      const trackingDetails = await axios.get(
        `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`,
        {
          headers: {
            "Authorization": `ShippoToken ${SHIPPO_API_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Combine all details in response
      const combinedData = {
        trackingDetails: trackingDetails.data,
      };

      // Send back all details
      res.status(200).json(combinedData);
    } catch (error: unknown) {
      // Handle the error safely
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error fetching tracking data:", error.response.data || error.message);
        res.status(500).json({ message: "Failed to fetch tracking data", error: error.response?.data });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Unexpected error occurred", error: (error as Error).message });
      }
    }
  } else {
    // Handle invalid methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
