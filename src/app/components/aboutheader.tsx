import Link from "next/link";

export default function AboutHeader() {
    return (
        <section className="flex flex-wrap items-center justify-center gap-8 px-4 md:justify-between md:gap-0 md:px-16 py-8 md:py-16">
            {/* Header Text */}
            <div className="text-center md:text-left">
                <h1 className="text-[#2A254B] text-xl md:text-2xl lg:text-3xl">
                    A brand built on the love of craftmanship, <br />
                    quality and outstanding customer service
                </h1>
            </div>

            {/* Button */}
           <Link href="/products"> <button className="bg-[#F9F9F9] px-4 py-2 text-[#2A254B] text-sm md:text-[13px]">
                View our products
            </button></Link>
        </section>
    );
}
