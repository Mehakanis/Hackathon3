"use client"; // Mark this as a Client Component

import Image from "next/image";
import { Data } from "./newceramics";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/queries";
import Link from "next/link";
import { useState, useEffect } from "react"; // Import useEffect

export default function AllProducts() {
    const [data, setData] = useState<Data[]>([]); // State to store fetched data
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [itemsPerPage] = useState(8); // Number of items per page

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const result: Data[] = await sanityFetch({ query: allproducts });
            setData(result); // Update state with fetched data
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <section className="pt-[40px] mx-16">
            <div className="flex flex-wrap justify-around mt-10 text-[#2A254B]">
                {currentItems.map((product) => (
                    <div key={product._id} className="w-[250px]">
                        <Link href={`/product/${product.slug.current}`}>
                            <div className="aspect-[2/2.5] relative group overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                {/* Overlay with Add to Cart */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <h4 className="pt-2 text-[14px]">{product.name}</h4>
                            <p className="pb-5 text-[14px]">${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
           
            {/* Pagination */}
            <div className="flex justify-center mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 text-sm font-semibold ${
                            currentPage === index + 1
                                ? "bg-[#2A254B] text-white"
                                : "bg-[#F9F9F9] text-[#2A254B] hover:bg-gray-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
}