// import { useNavigate } from 'react-router-dom';
import './Add.css';
import AdminNavbar from '../../admin/adminNavbar/AdminNavbar';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add() {
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
    houseno:0,
    buildingName:'',
    streetName:'',
    area:'',
    city:'',
  });
  
  
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  
};

  const handleImageUpload =async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const form = new FormData();
    for (let file of files) {
      form.append("images", file);
    }

    try{

    const response = await fetch("/api/property/upload", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
  
    if (response.ok) {
     // setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...data.urls] }));
       // Store both URL & public_id
      
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...data.images],
      }));
      
    } else {
      console.error("Upload failed:", data.error);
    }
  }
    catch (error) {
      console.error("Error uploading images:", error);
    }
  };


 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError('You must upload at least one image');
      if (+formData.price < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      
     
      const res = await fetch('/api/property/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      setLoading(false);
     
      if (data.success === false) {
        setError(data.message);
      }
      else{
        alert('Property added successfully!!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handledeleteImage=async (publicId)=>{
    try {
      const res = await fetch('/api/property/delete', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {publicId} ),
      });
  
      const result = await res.json();
      
      if (res.ok) {
        // Remove the deleted image from state
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.publicId !== publicId),
        }));
      } else {
        console.error("Failed to delete image:", result.error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  
  return (
    <>
    <AdminNavbar/>
    <div className="maincontainer">
        <div className="left">
            <h2>Add Property</h2>
            <form action="" onSubmit={handleSubmit}>
                <h3>Property Information</h3>
                <label>Property Name <span>*</span> </label>
                <input type="text" id='name' placeholder='Enter Property name'onChange={handleChange} name='propertyName' required />
                <label>Property Type <span>*</span> </label>
                <select onChange={handleChange} name='propertyType'  required>
                    <option value="">Select...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Apartment">Apartment/Flat</option>
                </select>
                {/*  type */}
                <label>Transaction Type <span>*</span> </label>
                <select ref={selectRef} onChange={handleChange} id='transactionType'name='transactionType' required>
                    <option value="">Select...</option>
                    <option  value="Rent">Rent</option>
                    <option  value="Sale">Sale</option>
                </select>
                {/* area sqft */}
                <label>Area(Sq.ft) <span>*</span> </label>
                <input id='areaSqft' onChange={handleChange} type="text" placeholder='Enter Area(Sq.ft)' name="areaSqft"required />
               {/* description */}
                <label>Description <span>*</span> </label>
                <textarea id='desc' onChange={handleChange} placeholder='Enter details of the property' name="desc"required />
                {/* bedrooms */}
                <label>Bedrooms <span>*</span> </label>
                <input min='1'id='bedrooms' onChange={handleChange} type="text" placeholder='Enter number of bedrooms' name="bedrooms"required />
               {/* bathrooms */}
                <label>Bathrooms <span>*</span> </label>
                <input min='1' id='bathrooms' onChange={handleChange} type="text" placeholder='Enter number of bathrooms' name="bathrooms"required />
                {/* Amenities */}
                <label>Amenities </label>
                <input id='amenities' onChange={handleChange} type="text" placeholder='Enter Amenities' name="amenities"required />
                {/* price */}
                <label>Price <span>*</span> </label>
                <input min='1' id='price' onChange={handleChange}  type="number" placeholder='Enter Property Price' name="price"required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
                <label>Discounted Price <span>*</span> </label>
                <input min='1' id='discountPrice 'onChange={handleChange} type="number" placeholder='Enter discounted price' name="discountPrice"required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
                {/* image */}
                <label className='image'>Property Images <span>*</span></label>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
               
                
        
                <p>
                {/* {imageUploadError } */}
                </p>
                {/* location */}
                <h3>Property Location</h3>
                <label>Flat/House No. <span>*</span></label>
          <input type="text" id='houseno' onChange={handleChange} placeholder="Enter property flat no./house no."name="houseno" required />

          <label>Building Name <span>*</span></label>
          <input type="text" id='buildingName  ' onChange={handleChange} placeholder="Enter property building name" name="buildingName" required />

          <label>Street Address <span>*</span></label>
          <input type="text" id='streetName' onChange={handleChange} name="streetName"placeholder="Enter property street address" required />
          <label>Area <span>*</span></label>
          <input  type="text" id='area' onChange={handleChange} placeholder='Enter name of area ' name="area"required />
          <label>City <span>*</span></label>
          <input  type="text" id='city' onChange={handleChange} placeholder='Enter name of city' name="city"required />
          <button   disabled={loading} className='btnSubmit'> {loading ? 'Adding...' : 'Add Property'}</button>
          {error && <p>{error}</p>}
            </form>
           

        </div>

        <div className="right">
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
                <button onClick={()=>handledeleteImage(img.publicId)}>Delete</button>
               
              </div>
            ))}
         </div>
            
          </div>
          </div>
    </div>
    </>
  )
}
