'use client'; // Add this directive for client-side interactivity

import { Search, ShoppingCartIcon, CircleUser, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header1() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const router = useRouter(); // Router for navigation

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to search results page
    }
  };

  return (
    <section>
      <div>
        {/* Header Top Section */}
        <div className="flex flex-wrap justify-between items-center mt-6 border-b-2 pb-5 px-4 md:px-10 lg:px-20">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="block md:hidden text-center text-gray-600 stroke-[1.5px] cursor-pointer" />
            </SheetTrigger>

            <SheetContent side="left" className="p-4">
              <SheetHeader>
                <h2 className="text-lg font-semibold text-[#22202E]">Menu</h2>
              </SheetHeader>
              <div className="flex flex-col gap-6 pt-6 text-[#726E8D] text-[14px] sm:text-[16px]">
                {/* Navigation Links */}
                <Link href="/">
                  <h2 className="hover:text-[#22202E] cursor-pointer">Home</h2>
                </Link>
                <Link href="/products">
                  <h2 className="hover:text-[#22202E] cursor-pointer">All Products</h2>
                </Link>
                <Link href="/about">
                  <h2 className="hover:text-[#22202E] cursor-pointer">About Us</h2>
                </Link>
                <Link href="/chairs">
                  <h2 className="hover:text-[#22202E] cursor-pointer"></h2>Chairs
                </Link>
                <h2 className="hover:text-[#22202E] cursor-pointer">Crockery</h2>
                <h2 className="hover:text-[#22202E] cursor-pointer">Tableware</h2>
                <h2 className="hover:text-[#22202E] cursor-pointer">Cutlery</h2>

                {/* Icons */}
                <div className="flex gap-4 mt-6">
                  <Search className="stroke-[1.5px] text-gray-600" />
                  <Link href="/cart">
                    <ShoppingCartIcon className="stroke-[1.5px] text-gray-600" />
                  </Link>
                  <CircleUser className="stroke-[1.5px] text-gray-600" />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22202E]"
            />
            <button type="submit" className="p-2 bg-[#22202E] text-white rounded-lg hover:bg-[#1e1a3d] transition">
              <Search className="stroke-[1.5px]" />
            </button>
          </form>

          {/* Logo */}
          <h1 className="text-[#22202E] text-[18px] font-semibold">Avion</h1>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4">
            <div>
              <Link href="/cart">
                <ShoppingCartIcon className="stroke-[1.5px] text-gray-600" />
              </Link>
            </div>
            <div>
              <CircleUser className="stroke-[1.5px] text-gray-600" />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 pt-6 text-[#726E8D] text-[14px] sm:text-[16px] px-4 md:px-10 lg:px-20">
          <Link href="/">
            <h2 className="hover:text-[#22202E] cursor-pointer">Home</h2>
          </Link>
          <Link href="/products">
            <h2 className="hover:text-[#22202E] cursor-pointer">All Products</h2>
          </Link>
          <Link href="/about">
            <h2 className="hover:text-[#22202E] cursor-pointer">About Us</h2>
          </Link>
          <Link href="/chairs">
            <h2 className="hover:text-[#22202E] cursor-pointer">Chairs</h2>
          </Link>
          <Link href="/crockory">
            <h2 className="hover:text-[#22202E] cursor-pointer">Crockery</h2>
          </Link>
          <Link href="/tableware">
            <h2 className="hover:text-[#22202E] cursor-pointer">Tableware</h2>
          </Link>
          <Link href="/cutlery">
            <h2 className="hover:text-[#22202E] cursor-pointer">Cutlery</h2>
          </Link>
        </div>
      </div>
    </section>
  );
}