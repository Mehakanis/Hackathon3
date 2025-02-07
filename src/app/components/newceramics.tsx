"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { newceramics } from "@/sanity/lib/queries";
import Link from "next/link";
import { Product } from "../types/product";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type Data = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: { current: string };
};

export default function NewCeramics() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanityFetch({ query: newceramics });
      console.log("Fetched data:", result); // Debugging line
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <section className="pt-[100px]">
      <div className="text-[22px] pl-[16px] text-[#2A254B] text-center md:text-left">
        New ceramics
      </div>
      <div className="flex flex-wrap justify-around mt-10 text-[#2A254B]">
        {data.map((product) => (
          <div key={product._id} className="w-[280px]">
            <Link href={`/product/${product.slug.current}`}>
              <div className="aspect-[2/2.5] relative overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={urlFor(product.imageUrl).url()}
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
        <Link href="/products">
          <Button className="bg-[#F9F9F9] text-[#2A254B] text-[12px] hover:bg-lightgrey">
            View collection
          </Button>
        </Link>
      </div>
    </section>
  );
}
