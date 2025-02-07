import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function HeroBlock(){
    return(
        <section className="flex flex-wrap justify-center">
            <div className="bg-[#2A254B] text-white px-10 py-10 w-[600px]">
                <h2 className="text-[25px]">The furniture brand for the <br />future, with timeless designs</h2>
               <Link href="/products"> <Button className="mt-6 text-[10px] border-[#4E4D93] bg-slate-600">View collection</Button></Link>
                <p className="pt-24 text-[12px]">A new era in eco friendly furniture with Avelon, the French luxury retail brand <br />
with nice fonts, tasteful colors and a beautiful way to display things digitally <br />
using modern web technologies.</p>
            </div>
            <div className="hidden md:block">
                <Image src="/hero.png" alt="hero image" width={350} height={500} />
            </div>

        </section>
    )
}