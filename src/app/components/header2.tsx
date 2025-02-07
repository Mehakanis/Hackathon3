// "use client"
// import { CircleUser, Search, ShoppingCartIcon, Menu } from "lucide-react";
// import Link from "next/link";
// import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
// import { useState } from "react";

// export default function Header2() {
//   const [cartCount, setCartCount] = useState(3); // Replace with actual cart state

//   return (
//     <section>
//       <div className="flex flex-wrap justify-between items-center py-6 px-4 sm:px-10 lg:px-20">
//         {/* Logo */}
//         <h1 className="text-[#22202E] text-2xl font-bold">Avion</h1>

//         {/* Navigation Links */}
//         <div className="hidden md:flex flex-wrap gap-6 text-[#726E8D] text-[14px] sm:text-[16px]">
//           <Link href="/">Home</Link>
//           <Link href="/products">All Products</Link>
//           <Link href="/about">About Us</Link>
//           <Link href="/chairs">Chairs</Link>
//           <Link href="/crockery">Crockery</Link>
//           <Link href="/tableware">Tableware</Link>
//           <Link href="/cutlery">Cutlery</Link>
//         </div>

//         {/* Icons */}
//         <div className="hidden md:flex items-center gap-4 relative">
//           <Search className="stroke-[1.5px] text-gray-600" />
//           <Link href="/cart" className="relative">
//             <ShoppingCartIcon className="stroke-[1.5px] text-gray-600" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//           <CircleUser className="stroke-[1.5px] text-gray-600" />
//         </div>

//         {/* Mobile Menu */}
//         <Sheet>
//           <SheetTrigger asChild>
//             <Menu className="block md:hidden text-gray-600 stroke-[1.5px] cursor-pointer" />
//           </SheetTrigger>
//           <SheetContent side="left" className="p-4">
//             <SheetHeader>
//               <h2 className="text-lg font-semibold text-[#22202E]">Menu</h2>
//             </SheetHeader>
//             <div className="flex flex-col gap-4 mt-4 text-[#726E8D] text-[14px]">
//               <Link href="/">Home</Link>
//               <Link href="/products">All Products</Link>
//               <Link href="/about">About Us</Link>
//               <Link href="/chairs">Chairs</Link>
//               <Link href="/crockory">Crockery</Link>
//               <Link href="/tableware">Tableware</Link>
//               <Link href="/cutlery">Cutlery</Link>
//               <div className="flex gap-4 mt-6">
//                 <Search className="stroke-[1.5px] text-gray-600" />
//                 <Link href="/cart" className="relative">
//                   <ShoppingCartIcon className="stroke-[1.5px] text-gray-600" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//                 <CircleUser className="stroke-[1.5px] text-gray-600" />
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </section>
//   );
// }
