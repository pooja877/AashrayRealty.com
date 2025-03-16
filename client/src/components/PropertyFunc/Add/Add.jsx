// import { useNavigate } from 'react-router-dom';
import './Add.css';
import AdminNavbar from '../../admin/adminNavbar/AdminNavbar';
import {  useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Locationform from '../../Locationform/Locationform';

export default function Add() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRef=useRef();
  const [step, setStep] = useState(1);
  const navigate=useNavigate();
  const [formData, setFormData ] = useState({
    images:[],
    propertyName: '',
    propertyType: '',
    transactionType: '',
    bhk:'',
    floor:'',
    areaSqft:0,
    desc:'',
    amenities:'',
    bedrooms: 0,
    bathrooms:0,
    price: 0,
    discountPrice:0,
    address:'',
    area:'',
    city:'',
  });
  
 
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  
};

  // const handleImageUpload =async (e) => {
  //   const files = e.target.files;
  //   if (!files.length) return;

  //   const form = new FormData();
  //   for (let file of files) {
  //     form.append("images", file);
  //   }

  //   try{

  //   const response = await fetch("/api/property/upload", {
  //     method: "POST",
  //     body: form,
  //   });

  //   const data = await response.json();
  //   if (response.ok) {
  //    // setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...data.urls] }));
  //      // Store both URL & public_id
      
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...data.images],
  //     }));
      
  //   } else {
  //     console.error("Upload failed:", data.error);
  //   }
  // }
  //   catch (error) {
  //     console.error("Error uploading images:", error);
  //   }
  // };


 const handleImageUpload = async (e) => {
  const files = e.target.files;
  if (!files.length) return;

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
        images: [...prev.images, ...data.images], // Maintain images
      }));
    } else {
      console.error("Upload failed:", data.error);
    }
  } catch (error) {
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
      
      console.log(formData);
      const data = await res.json();
      
      setLoading(false);
     
      if (data.success === false) {
        setError(data.message);
      }
      else{
        alert('Property added successfully!!');
        navigate('/admin/properties');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  // const handledeleteImage=async (publicId)=>{
  //   try {
  //     const res = await fetch('/api/property/delete', {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify( {publicId} ),
  //     });
  
  //     const result = await res.json();
      
  //     if (res.ok) {
  //       // Remove the deleted image from state
  //       setFormData((prev) => ({
  //         ...prev,
  //         images: prev.images.filter((img) => img.publicId !== publicId),
  //       }));
  //     } else {
  //       console.error("Failed to delete image:", result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //   }
  // }
  
  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));
  
  return (
    <>
   <AdminNavbar/>
   <div className="mainaddcom">
    <div className="addcon">
      <h2>Add Property</h2>
       {/* Stepper UI */}
    <div className="stepper">
      <div className={`step-item ${step >= 1 ? "active" : ""}`}>
        <div className="step-circle">1</div>
        <p>Location</p>
      </div>
      <div className={`line ${step >= 2 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 2 ? "active" : ""}`}>
        <div className="step-circle">2</div>
        <p>Images</p>
      </div>
      <div className={`line ${step >= 3 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 3 ? "active" : ""}`}>
        <div className="step-circle">3</div>
        <p>Details</p>
      </div>
      <div className={`line ${step >= 4 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 4 ? "active" : ""}`}>
        <div className="step-circle">4</div>
        <p>Facilities</p>
      </div>
      </div>

      {step === 1 && (
        
        <div className="form-step">
           
          {/* <label>Flat/House No. <span>*</span></label> */}
          <div className="addaddressside">
          <div className="leftaddside">
            {/* <label>City <span>*</span></label> */}
          <input  type="text" id='city'   value={formData.city} onChange={handleChange} placeholder='Enter name of city' name="city"required />
            {/* <label>Area <span>*</span></label> */}
          <input  type="text" id='area'   value={formData.area} onChange={handleChange} placeholder='Enter name of area ' name="area"required />
          <input type="text" id='address'value={formData.address} onChange={handleChange} placeholder="Enter property address (houseno,buildingname,streetname)"name="address" required />
        
          </div>
          <div className="rightaddside">
          <Locationform  area={formData.area} city={formData.city}/>
          </div>
          
          </div>
          <button onClick={next} className='btnadd'>Next</button>
         
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
         
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
          <button onClick={next} className='btnadd' disabled={!formData.images}>Next</button>
        </div>

        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <div className="detailcompo">
               
                <label>Property Name <span>*</span> </label>
                <input type="text" id='name' value={formData.propertyName} placeholder='Enter Property name'onChange={handleChange} name='propertyName' required />
                
                <div className="divinfo">
                <label>Property Type <span>*</span> </label>
                <select onChange={handleChange} name='propertyType' value={formData.propertyType}  required>
                    <option value="">Select...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Apartment">Apartment/Flat</option>
                </select>
                {/*  type */}
                <label>Transaction Type <span>*</span> </label>
                <select ref={selectRef} onChange={handleChange} value={formData.transactionType} id='transactionType'name='transactionType' required>
                    <option value="">Select...</option>
                    <option  value="Rent">Rent</option>
                    <option  value="Sale">Sale</option>
                </select>
                </div>

                <div className="divinfo">
                <label>BHK <span>*</span> </label>
                <select onChange={handleChange} name='bhk' ref={selectRef}  id='bhk' value={formData.bhk}  required>
                    <option value="">Select...</option>
                    <option value="1 BHk">1BHK</option>
                    <option value="2 BHk">2BHK</option>
                    <option value="3 BHk">3BHK</option>
                </select>
                 {/* area sqft */}
                
                <label>Area(Sq.ft) <span>*</span> </label>
                <input id='areaSqft' onChange={handleChange} type="text" placeholder='Enter Area(Sq.ft)' name="areaSqft" value={formData.areaSqft}required />
                </div>
               
                <label>Floor<span>*</span> </label>
                <input id='floor' onChange={handleChange} type="text" placeholder='Enter floor' name="floor" value={formData.floor}required />
              
               {/* description */}
               
                <label>Description <span>*</span> </label>
                <textarea id='desc' onChange={handleChange} value={formData.desc} placeholder='Enter details of the property' name="desc"required />
                
                </div>
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
          <button onClick={next} className='btnadd' >Next</button>
        </div>
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          <div className="facilityinfo">
                 {/* bedrooms */}
                 <label>Bedrooms <span>*</span> </label>
                <input min='1'id='bedrooms' onChange={handleChange} type="number" placeholder='Enter number of bedrooms' name="bedrooms" value={formData.bedrooms}required />
               {/* bathrooms */}
                <label>Bathrooms <span>*</span> </label>
                <input min='1' id='bathrooms' onChange={handleChange} type="number" placeholder='Enter number of bathrooms' name="bathrooms" value={formData.bathrooms}required />
                {/* Amenities */}
                

                <label>Amenities </label>
                <input id='amenities' onChange={handleChange} type="text" placeholder='Enter Amenities' value={formData.amenities} name="amenities"required />
                {/* price */}
                <label>Price <span>*</span> </label>
                <input min='1' id='price' onChange={handleChange}  type="number" placeholder='Enter Property Price' value={formData.price} name="price"required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
                <label>Discounted Price <span>*</span> </label>
                <input min='1' id='discountPrice 'onChange={handleChange} type="number" placeholder='Enter discounted price' name="discountPrice" value={formData.discountPrice}required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
                  
          </div>
          
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
                  <button disabled={loading} className='btnaddproperty' onClick={handleSubmit}>{loading ? 'loading...' : 'Add Property'}</button>
        </div>
        {error && <p>{error}</p>}
         
        </div>
      )}
    </div></div>
    </>
  );
}

