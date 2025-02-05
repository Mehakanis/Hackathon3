export type Product = {
    weight: { value: number; unit: string; };
    _id: string; // Document ID
    name: string; // Product name
    category: string; // Referenced category title
    slug: {
      current: string; // Slug value
    };
    imageUrl: string; // Image URL
    price: number; // Product price
    quantity: number; // Available quantity
    tags: string[]; // Array of tags
    description: string; // Product description
    features: string[]; // Array of features
    dimensions: {
      length: number;
      unit: string;
      height: string; // Height of the product
      width: string; // Width of the product
      depth: string; // Depth of the product
    };
  };
  
  // Define types for the API response
export type Address = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: "yes" | "no";
};

export type Unit = "ounce" | "gram" | "kilogram" | "pound";
export type DimensionUnit = "inch" | "centimeter";

export type Package = {
  weight: {
    value: number;
    unit: Unit;
  };
  dimensions: {
    height: number; // Changed to number for dimensions
    width: number;  // Changed to number for dimensions
    length: number; // Changed to number for dimensions
    unit: DimensionUnit;
  };
};

export type Rate = {
  rateId: string;
  rateType: string;
  carrierId: string;
  shippingAmount: {
    currency: string;
    amount: number;
  };
  serviceType: string;
  serviceCode: string;
  trackable: boolean;
  carrierFriendlyName: string;
  validationStatus: string;
  warningMessages?: string[];
};

export interface TrackingObjType {
  trackingNumber: string;
  labelId: string;
  carrierCode: string;
}

export interface TrackingData {
  trackingNumber?: string;
  statusDescription?: string;
  carrierStatusDescription?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
}
