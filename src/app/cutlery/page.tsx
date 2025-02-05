import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { cutlery, } from "@/sanity/lib/queries";
import Link from "next/link";
import Header1 from "../components/header1";
import Footer from "../components/footer";

export type Data = {
  _id: string;
  name: string;
  imageUrl: string; // Use the correct field name
  price: number;
  slug: { current: string }; // Slug object with current value

};

export default async function NewCeramics() {
  const data: Data[] = await sanityFetch({ query: cutlery });

  return (
    <main className="max-w-screen-2xl min-h-screen mx-auto">
<Header1/>
    <section className="pb-28 pt-2 px-20">

      <div className="flex flex-wrap justify-left gap-20 mt-10 text-[#2A254B]">

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
                <button className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </div>
            </div>
            <h4 className="pt-2 text-xl">{product.name}</h4>

            <p className=" text-[16px]">£{product.price}</p>

            </Link>
          </div>
        ))}
      </div>
      
    </section>
    <Footer/>
    </main>
  );
}