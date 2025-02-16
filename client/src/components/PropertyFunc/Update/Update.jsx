import './Update.css';
import AdminNavbar from '../../admin/adminNavbar/AdminNavbar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function Update() {
    const { id: propertyId } = useParams(); 
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const selectRef=useRef();
    const navigate=useNavigate();
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
    });
    
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
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    
  };
  
const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return; // No new files, do nothing
  
    const form = new FormData();
    for (let file of files) {
      form.append("images", file);
    }
  
    try {
      const response = await fetch("/api/property/upload", {
        method: "POST",
        body: form,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...data.images], // Add only new images
        }));
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  
  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
   
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    try {
        setLoading(true);
        setError(false);
      const res = await fetch(`/api/property/updateProperty/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) 
        {           
                    alert("Property updated successfully!",data.message);
                    navigate("/admin/projects"); // Redirect back to property list
                } else {
                    alert("Failed to update property.");
                }
     
      
     
    } catch (error) {
        setError(error.message);
        setLoading(false);
      console.error("Error updating property:", error);
    }
    };
 
  return (
    <>
    <div className="mainUpdatecontainer">
           <AdminNavbar/>
            <div className="leftUpdate">
                <h2>Update Property</h2>
                <form action="" onSubmit={handleSubmit}>
                    <h3>Property Information</h3>
                    <label>Property Name <span>*</span> </label>
                    <input type="text" id='name' placeholder={formData.propertyName} onChange={handleChange} name='propertyName' value={formData.propertyName} required />
                    <label>Property Type <span>*</span> </label>
                    <select onChange={handleChange} name='propertyType' value={formData.propertyType}  required>
                        <option value="">Select...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Apartment">Apartment/Flat</option>
                    </select>
                    {/*  type */}
                    <label>Transaction Type <span>*</span> </label>
                    <select ref={selectRef}  value={formData.transactionType}  onChange={handleChange} id='transactionType'name='transactionType' required>
                        <option value="">Select...</option>
                        <option  value="Rent">Rent</option>
                        <option  value="Sale">Sale</option>
                    </select>
                    {/* area sqft */}
                    <label>Area(Sq.ft) <span>*</span> </label>
                    <input id='areaSqft' onChange={handleChange} type="text" value={formData.areaSqft} placeholder={formData.areaSqft} name="areaSqft"required />
                   {/* description */}
                    <label>Description <span>*</span> </label>
                    <textarea id='desc' onChange={handleChange} placeholder={formData.desc} value={formData.desc} name="desc"required />
                    {/* bedrooms */}
                    <label>Bedrooms <span>*</span> </label>
                    <input min='1'id='bedrooms' onChange={handleChange} type="text" placeholder={formData.bedrooms} value={formData.bedrooms} name="bedrooms"required />
                   {/* bathrooms */}
                    <label>Bathrooms <span>*</span> </label>
                    <input min='1' id='bathrooms' onChange={handleChange} type="text" placeholder={formData.bathrooms} value={formData.bathrooms} name="bathrooms"required />
                    {/* Amenities */}
                    <label>Amenities </label>
                    <input id='amenities' onChange={handleChange} type="text" placeholder={formData.amenities} value={formData.amenities} name="amenities"required />
                    {/* price */}
                    <label>Price <span>*</span> </label>
                    <input min='1' id='price' onChange={handleChange}  type="number" placeholder={formData.price} value={formData.price} name="price"required />
                    {formData.transactionType === 'Rent' && (
                        <span>(₹ / month)</span>
                      )}
                    <label>Discounted Price <span>*</span> </label>
                    <input min='1' id='discountPrice 'onChange={handleChange} type="number" placeholder={formData.discountPrice} value={formData.discountPrice} name="discountPrice"required />
                    {formData.transactionType === 'Rent' && (
                        <span>(₹ / month)</span>
                      )}
                    {/* image */}
                    <label className='image'>Property Images <span>*</span></label>
                    <input type="file" accept="image/*"  multiple onChange={handleImageUpload} />
                   
                    {/* location */}
                    <h3>Property Location</h3>
                    <label>Flat/House No. <span>*</span></label>
              <input type="text" id='houseno' onChange={handleChange} placeholder={formData.houseno} value={formData.houseno} name="houseno" required />
    
              <label>Building Name <span>*</span></label>
              <input type="text" id='buildingName  ' onChange={handleChange} placeholder={formData.buildingName} value={formData.buildingName} name="buildingName" />
    
              <label>Street Address <span>*</span></label>
              <input type="text" id='streetName' onChange={handleChange} name="streetName"placeholder={formData.streetName} value={formData.streetName} required />
              <label>Area <span>*</span></label>
              <input  type="text" id='area' onChange={handleChange} placeholder={formData.area} name="area" value={formData.area}required />
              <label>City <span>*</span></label>
              <input  type="text" id='city' onChange={handleChange} placeholder={formData.city} name="city" value={formData.city}required />
              <button   disabled={loading} className='btnSubmit'> {loading ? 'Updating...' : 'Update Property'}</button>
              {error && <p>{error}</p>}
                </form>
               
    
            </div>
    
            <div className="rightUpdate">
              <h2>Quick Preview</h2>
              <div className="contain">
                <div className="info-contain">
                <h3>{formData.propertyName}</h3>
                <div className="loc">
                  <img className='locicon' src="/location_20.png" alt="" />
                  <p>{formData.houseno} {formData.buildingName} {formData.streetName} {formData.area} {formData.city}  </p>
                </div>
                <div className="price">
                  <p>₹ {formData.discountPrice}</p>
                </div>
                <div className="bedbath">
                <div className="bed">
                  <img className='bedicon' src="/bed_8.png" alt="" />
                  <p>{formData.bedrooms} <span>Bedrooms</span></p>
                </div>
                <div className="bath">
                  <img className='bathicon' src="/bathroom_2.png" alt="" />
                  <p>{formData.bathrooms} <span>Bathrooms</span></p>
                </div>
                </div>
                </div>
              
              
             <div className="imagecontain">
             {formData.images.length > 0 &&
                formData.images.map((img,index) => (
                  <div
                    key={index}
                    className="imageProperty"
                  >
                    <img
                      className='listimage'
                      src={img.url}
                      alt='listing image'
                    />
                    <button onClick={()=>handleDeleteImage(index)}>Delete</button>
                   
                  </div>
                ))}
             </div>
                
              </div>
              </div>
        </div>
        </>
  )
}
