"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { newceramics } from "@/sanity/lib/queries";
import Link from "next/link";
import { Product } from "../types/product";
import { handleAddToCart } from "../utils/handlers";

export type Data = {
  _id: string;
  name: string;
  imageUrl: string; // Use the correct field name
  price: number;
  slug: { current: string }; // Slug object with current value
};

export default function NewCeramics() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanityFetch({ query: newceramics });
      setData(result);
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="pt-[100px]">
      <div className="text-[22px] pl-[16px] text-[#2A254B] text-center md:text-left">
        New ceramics
      </div>
      <div className="flex flex-wrap justify-around mt-10 text-[#2A254B]">
        {data.map((product) => (
          <div key={product._id} className="w-[280px] ">
            <Link href={`/product/${product.slug.current}`}>
              <div className="aspect-[2/2.5] relative group overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl} // Use the imageUrl field
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                {/* Overlay with Add to Cart */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <h4 className="pt-4 text-[14px]">{product.name}</h4>
              <p className="pt-2 text-[14px]">£{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center pt-10">
        <Button className="bg-[#F9F9F9] text-[#2A254B] text-[12px] hover:bg-lightgrey">
          View collection
        </Button>
      </div>
    </section>
  );
}
