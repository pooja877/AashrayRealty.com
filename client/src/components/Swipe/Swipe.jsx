import './Swipe.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Swipe() {
    const { id: propertyId } = useParams();
    const [formData, setFormData] = useState({
         images:[],
         propertyName: '',
         propertyType: '',
         transactionType: '',
         areaSqft:0,
         desc:'',
         amenities:'',
         bedrooms: 0,
         bathrooms:0,
         price: 0,
         discountPrice:0,
         houseno:"",
         buildingName:'',
         streetName:'',
         area:'',
         city:'',
       })
     useEffect(() => {
                const fetchProperty = async () => {
                  try {
                    const res = await fetch(`/api/property/${propertyId}`);
                    const data = await res.json();
                    if (res.ok) {
                      setFormData(data);
                    } else {
                      console.error("Property not found");
                    }
                  } catch (error) {
                    console.error("Error fetching property:", error);
                  }
                };
                fetchProperty();
            }, [propertyId]);

  return (
    <div className="swiper-container">
  <Swiper
    key={formData.images.length}
    modules={[Navigation]}
    navigation
    loop={formData.images.length > 1}
    className="property-swiper"
  >
    {formData.images.map((item, index) => (
      <SwiperSlide key={index} className="slide-container">
        <div className="image-wrapper">
          <img
            src={item.url || item}
            alt={`Property ${index + 1}`}
            className="property-slide"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  )
}
