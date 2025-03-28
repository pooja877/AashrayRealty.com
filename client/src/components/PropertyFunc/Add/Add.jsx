// import { useNavigate } from 'react-router-dom';
import './Add.css';
import {  useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Locationform from '../../Locationform/Locationform';
import { FaCloudUploadAlt } from 'react-icons/fa';
import AdminNavbar from '../../admin/adminNavbar/AdminNavbar';

export default function Add() {
  const fileRef = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRef=useRef();

  const [step, setStep] = useState(1);
  const navigate=useNavigate();
  const areaOptions = {
    Ahmedabad: [
      "Satellite", "Bopal", "Narol", "Navrangpura", "Maninagar",
      "Vastrapur", "Thaltej", "Naranpura", "Gota", "Prahlad Nagar",
      "Ashram Road", "Chandkheda", "Iscon", "Shahibaug", "Memnagar",
      "Jodhpur", "Ranip", "Ellis Bridge", "Paldi", "SG Highway"
    ],
    Gandhinagar: [
      "Sector 1", "Sector 7", "Sector 11", "Sector 21",
      "Sector 27", "Infocity", "Adalaj", "Kudasan",
      "Sargasan", "Pethapur"
    ]
  };
  
  const [formData, setFormData ] = useState({
    images:[],
    video:'',
    propertyName: '',
    propertyType: '',
    transactionType: '',
    bhk:'',
    floor:'',
    areaSqft:'',
    furnished:'',
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

 

const handleVideoUpload = () => {
  window.cloudinary.openUploadWidget(
      {
          cloudName: "dobtvcxnc",
          uploadPreset: "aashrayRealty",
          resourceType: "video",
          multiple: false,
          sources: ["local"],
          maxFileSize: 50000000,
          allowedFormats: ["mp4", "mov", "avi"]
      },
      (error, result) => {
          if (!error && result.event === "success") {
              const videoData = {
                  url: result.info.secure_url,
                  publicId: result.info.public_id
              };

              setFormData((prev) => ({ ...prev, video: videoData }));
              console.log("Uploaded Video:", videoData);
          } else if (error) {
              alert("Video upload failed. Please try again.");
              console.error(error);
          }
      }
  );
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
        navigate('/admin/properties');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  

  const next = () => {  setStep((prev) => Math.min(prev + 1, 5));}
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
        <p className='infoadddara'>Location</p>
      </div>
      <div className={`line ${step >= 2 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 2 ? "active" : ""}`}>
        <div className="step-circle">2</div>
        <p className='infoadddara'>Images</p>
      </div>
      <div className={`line ${step >= 3 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 3 ? "active" : ""}`}>
        <div className="step-circle">3</div>
        <p className='infoadddara'>Details</p>
      </div>
      <div className={`line ${step >= 4 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 4 ? "active" : ""}`}>
        <div className="step-circle">4</div>
        <p className='infoadddara'>Facilities</p>
      </div>
      <div className={`line ${step >= 5 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 5 ? "active" : ""}`}>
        <div className="step-circle">5</div>
        <p className='infoadddara'>Video</p>
      </div>
      </div>

              {/*------------------------------- step1---------------------- */}
      {step === 1 && (
        
        <div className="form-step">
          <div className="addaddressside">
          <div className="leftaddside">
          {/* <input  type="text" id='city'   value={formData.city} onChange={handleChange} placeholder='Enter name of city' name="city"required /> */}
          
          {/* <select onChange={handleChange} name='city' value={formData.city}  required>
           <option value="">Select City</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Gandhinagar">Gandhinagar</option>
      </select> */}
           <select name='city' value={formData.city} onChange={handleChange} required>
                <option value="">Select City</option>
                {Object.keys(areaOptions).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select name='area' value={formData.area} onChange={handleChange} required>
                <option value="">Select Area</option>
                {areaOptions[formData.city]?.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
        
          {/* <input  type="text" id='area'   value={formData.area} onChange={handleChange} placeholder='Enter name of area ' name="area"required /> */}
          <input type="text" id='address'value={formData.address} onChange={handleChange} placeholder="Enter property address (houseno,buildingname,streetname)"name="address" required />

          </div>
          <div className="rightaddside">
          <Locationform  area={formData.area} city={formData.city}/>
          </div>
          </div>

          <button onClick={next} className='btnadd'>Next</button>
        </div>
      )}

         {/* ----------------------------step2------------------------ */}
      {step === 2 && (
        <div className="form-step">
           <input type="file" ref={fileRef} accept="image/*" multiple hidden onChange={handleImageUpload} />
         <div onClick={() => fileRef.current.click()} className="imageproadd" >
          
          {formData.images.length > 0 ?(
                <img
                  className="imgforaddphoto"
                  src={formData.images[0].url}
                  alt="listing image"
                />
         ):(<FaCloudUploadAlt className='iconupload'/>)}

         </div>
        <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
          <button onClick={next} className='btnadd' disabled={!formData.images}>Next</button>
        </div>
        </div>
      )}
      {/* ------------------step3---------------- */}

      {step === 3 && (
        <div className="form-step">
          <div className="detailcompo">
               
                <div className="namepro">
                <label>Property Name <span>*</span> </label>
                <input type="text" id='propertyName' value={formData.propertyName} placeholder='Enter Property name'onChange={handleChange} name='propertyName' required />
                </div>
                
                
                <div className="divinfo">
                <div className="seladdop">
                <label>Property Type <span>*</span> </label>
                <select onChange={handleChange} name='propertyType' value={formData.propertyType}  required>
                    <option value="">Select...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Apartment/Flat">Apartment/Flat</option>
                </select>
               
                </div>
               
                {/*  type */}
                <div className="seladdop">
                <label>Transaction Type <span>*</span> </label>
                <select ref={selectRef} onChange={handleChange} value={formData.transactionType} id='transactionType'name='transactionType' required>
                    <option value="">Select...</option>
                    <option  value="Rent">Rent</option>
                    <option  value="Buy">Buy</option>
                </select>
                
                </div>

                {/* BHK */}
                
                </div>
               
               <div className="namepro">
               <label>Area(Sq.ft) <span>*</span> </label>
               <input id='areaSqft' onChange={handleChange} type="text" placeholder='Enter Area(Sq.ft)' name="areaSqft" value={formData.areaSqft}required />
               </div>
              
               <div className="namepro">
               <label>Floor<span>*</span> </label>
               <input id='floor' onChange={handleChange} type="text" placeholder='Enter Total no of floor / Enter Floor' name="floor" value={formData.floor}required />
               </div>
               
              
               {/* description */}
               
                <div className="namepro">
                <label>Description <span>*</span> </label>
                <textarea id='desc' onChange={handleChange} value={formData.desc} placeholder='Enter details of the property' name="desc"required />
                </div>
                
                </div>
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
          <button onClick={next} className='btnadd' >Next</button>
        </div>
        </div>
      )}



      {/* -------------------------step4------------------ */}

      {step === 4 && (
        <div className="form-step">
          <div className="facilityinfo">
            <div className="addfacinfo">
            {/* bhk */}
          <div className="seladdforfac">
                <label>BHK <span>*</span> </label>
                <select onChange={handleChange} name='bhk' ref={selectRef}  id='bhk' value={formData.bhk}  required>
                    <option value="">Select...</option>
                    <option value="1 BHk">1BHK</option>
                    <option value="2 BHk">2BHK</option>
                    <option value="3 BHk">3BHK</option>
                    <option value="4 BHk">4BHK</option>
                    <option value="5 BHk">5BHK</option>
                    <option value="6 BHk">6BHK</option>
                </select>
                
                </div>
                {/* furnished */}
        <div className="seladdforfac">

        <label>Furnished <span>*</span> </label>
                <select ref={selectRef} onChange={handleChange} value={formData.furnished} id='furnished'name='furnished' required>
                    <option value="">Select...</option>
                    <option  value="Yes">Yes</option>
                    <option  value="No">No</option>
                </select>
        </div>
        </div>
          
                <div className="bedbathaddinfo">
                   {/* bedrooms */}
                 <div className="bedbathadd">
                 <label>Bedrooms <span>*</span> </label>
                 <input min='1'id='bedrooms' onChange={handleChange} type="number" placeholder='Enter number of bedrooms' name="bedrooms" required />
                 </div>
               {/* bathrooms */}
               <div className="bedbathadd">
                <label>Bathrooms <span>*</span> </label>
                <input min='1' id='bathrooms' onChange={handleChange} type="number" placeholder='Enter number of bathrooms' name="bathrooms" required />
                </div>
                </div>
                
                
                
                {/* Amenities */}
                <div className="amenitiesadd">
                <label>Amenities <span>*</span> </label>
                <input id='amenities' onChange={handleChange} type="text" placeholder='Enter Amenities' value={formData.amenities} name="amenities"required />
              
                </div>
                {/* price */}
               <div className="priceadddata">
              <div className="priceadd">
              <label>Price <span>*</span> </label>
                <input min='1' id='price' onChange={handleChange}  type="number" placeholder='Enter Property Price' name="price"required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
              </div>
              <div className="priceadd">
              <label>Discounted Price</label>
                <input min='1' id='discountPrice 'onChange={handleChange} type="number" placeholder='Enter discounted price' name="discountPrice" required />
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
              </div>
                
               </div>
                  
          </div>
          
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
                  <button onClick={next} className='btnadd' >Next</button>
                  {/* <button disabled={loading} className='btnaddproperty' onClick={handleSubmit}>{loading ? 'loading...' : 'Add Property'}</button> */}
        </div>
        {error && <p className='adderror'>{error}</p>}
         
        </div>
      )}
      {step === 5 && (
         <div className='form-step'>
          <p>Video size must be less than 50Mb</p>
         <button onClick={handleVideoUpload} className='upload-video-btn'>Upload Video</button>
         
         {formData.video && (
           <video width="200" controls >
             <source src={formData.video} type="video/mp4" />
           </video>
         )}
         

          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
                  <button disabled={loading} className='btnaddproperty' onClick={handleSubmit}>{loading ? 'loading...' : 'Add Property'}</button>
        </div>
          </div>
     )}

      
    </div></div>
    </>
  );
}

