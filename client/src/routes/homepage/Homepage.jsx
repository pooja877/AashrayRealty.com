//  import BackToTop from "../../components/BacktoTop/BackToTop";
import ContactUs from "../../components/ContactUs/ContactUs";
import FeaturedDeveloper from "../../components/FeaturedDeveloper/FeaturedDeveloper";
import Footercompo from "../../components/Footer/Footercompo";
import Herosection from "../../components/Herosection/Herosection";
import News from "../../components/Newssection/News";
import PropertyList from "../../components/PropertyList/PropertyList";
import PropertySearch from "../../components/PropertySearch/PropertySearch";
import Testimonials from "../../components/testimonialsData/Testimonials";

import './Homepage.scss'

export default function Homepage() {
  return (
    <div className='mainhomeeepage'>
      <Herosection/>
      <PropertySearch/>
      <PropertyList/>
      <FeaturedDeveloper/>
      <Testimonials/>
      <News/>
      <ContactUs/>
      <Footercompo/>
      
    </div>
  )
}
