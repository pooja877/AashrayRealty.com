//  import BackToTop from "../../components/BacktoTop/BackToTop";
import ContactUs from "../../components/ContactUs/ContactUs";
import FeaturedDeveloper from "../../components/FeaturedDeveloper/FeaturedDeveloper";
import Footercompo from "../../components/Footer/Footercompo";
import Herosection from "../../components/Herosection/Herosection";
import News from "../../components/Newssection/News";
import PropertyList from "../../components/PropertyList/PropertyList";
import PropertyTypes from "../../components/PropertyTypes/PropertyTypes";
import SliderTab from "../../components/SliderTab/SliderTab";

import Testimonials from "../../components/testimonialsData/Testimonials";
import TopRated from "../../components/topratedbyarea/TopRated";

import './Homepage.scss'

export default function Homepage() {
  return (
    <div className='mainhomeeepage'>
      <Herosection/>
      <PropertyTypes/>
      <PropertyList/>
      <TopRated/>
      <FeaturedDeveloper/>
      <Testimonials/>
      <News/>
      <ContactUs/>
      <Footercompo/>
      <SliderTab/>
      
    </div>
  )
}
