import Header1 from "../components/header1"
import ProductHeroSection from "../components/productherosection"
import AllProducts from "../components/allproducts"
import Footer from "../components/footer"

export default function ProductPage(){
    return(
        <main className="max-w-screen-2xl min-h-screen mx-auto">
            <div className="mx-4">
<Header1/>
</div>
<ProductHeroSection/>
<AllProducts/>
<div className="mt-20">
<Footer/>
</div>
        </main>
    )
}