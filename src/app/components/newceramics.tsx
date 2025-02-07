"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { newceramics } from "@/sanity/lib/queries";
import Link from "next/link";

export type Data = {
  _id: string;
  name: string;
  imageUrl: string; // Use the correct field name
  price: number;
  slug: { current: string }; // Slug object with current value
};

export default function NewCeramics() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Data[] = await sanityFetch({ query: newceramics });
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err); // ✅ Logs error in console
        setError("Failed to fetch data"); // ✅ Sets error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>; // ✅ Loading state
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // ✅ Error handling
  }

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
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
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
