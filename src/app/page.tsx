import Header1 from "./components/header1"
import HeroBlock from "./components/heroblock"
import Features from "./components/features"
import NewCeramics from "./components/newceramics"
import PopularProducts from "./components/popularproducts"
import Email from "./components/email"
import Features2 from "./components/features2"
import Footer from "./components/footer"
export default function Home(){
  return(
    <main className="max-w-screen-2xl min-h-screen mx-auto">
<div className="mx-6 bg-[#FFFFFF]">
<Header1/>
</div>
<div className="my-14">
<HeroBlock />

</div>
<div className="mx-14">
<Features/>
<NewCeramics/>
<PopularProducts/>

</div>
<div className="bg-[#F9F9F9]"><Email/></div>
<Features2/>
<Footer/>
    </main>
  )
}