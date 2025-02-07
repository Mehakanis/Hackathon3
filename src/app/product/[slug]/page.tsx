import AddToCartButton from "@/app/components/addtocartbutton"; // ✅ Import the Client Component

import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import Image from "next/image"
import { Product } from "../../types/product"
import TopHeader from "@/app/components/topheader"
import Header1 from "@/app/components/header1"
import Listings from "@/app/components/listing2"
import Email from "@/app/components/email"
import Features from "@/app/components/features"
import Footer2 from "@/app/components/footer2"


interface ProductPageProps{
    params : Promise<{slug : string}>
}

async function getProduct(slug: string): Promise<Product> {
    return client.fetch(
        groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
  name,
  "category": category->title,
  slug {
    current
  },
  "imageUrl": image.asset->url,
  price,
  quantity,
  tags,
  description,
  features,
  dimensions {
    height,
    width,
    depth
  }
        }`,{slug}
    )
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    return (
        <main className="max-w-screen-2xl min-h-screen mx-auto">
            <TopHeader />
            <Header1 />

            <section className="flex flex-col lg:flex-row gap-10 lg:gap-28 px-4 lg:px-0 pt-6">
                {/* Image Section */}
                <div className="flex justify-center lg:justify-start">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={950}
                        height={300}
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Content Section */}
                <div className="pt-8 lg:pt-16 mr-20">
                    {/* Title and Price */}
                    <div>
                        <h1 className="text-xl lg:text-2xl">{product.name}</h1>
                        <p className="pt-2 text-base lg:text-lg">${product.price}</p>
                    </div>

                    {/* Description */}
                    <div className="pt-6 lg:pt-9">
                        <h4 className="text-sm lg:text-[14px]">Description</h4>
                        <p className="text-xs lg:text-[13.5px] pt-4 leading-relaxed">
                            {product.description}
                        </p>
                        <ul className="text-xs lg:text-[12.5px] list-disc pl-6 pt-4">
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Dimensions */}
                    <div className="pt-8">
                        <h4 className="text-sm lg:text-[14px]">Dimensions</h4>
                        <div className="flex flex-wrap gap-6 pt-4 text-xs lg:text-[12.5px]">
                            <div className="space-y-1">
                                <p>Height</p>
                                <p>{product.dimensions.height}</p>
                            </div>
                            <div className="space-y-1">
                                <p>Width</p>
                                <p>{product.dimensions.width}</p>
                            </div>
                            <div className="space-y-1">
                                <p>Depth</p>
                                <p>{product.dimensions.depth}</p>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="pt-9 flex justify-end">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </section>

            <div className="mx-14 pb-12">
                <Listings />
                <Features />
            </div>

            <div className="bg-[#F9F9F9] pb-7">
                <Email />
            </div>

            <Footer2 />
        </main>
    );
}
