import { useNavigate } from 'react-router-dom';
import './Add.css';
import { useRef, useState } from 'react';
export default function Add() {
  const fileRef=useRef(null);
  const selectRef=useRef();
  const [files,setfiles]=useState([]);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
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
  const navigate=useNavigate();
  const [imageUploadError, setImageUploadError] = useState(false);
   const [uploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  console.log(files);

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (!file) {
  //       reject(new Error("No file provided"));
  //       return;
  //     }
  
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  
  //     reader.onload = () => resolve(reader.result); // Convert to Base64
  //     reader.onerror = (error) => reject(new Error("Error converting file: " + error.message));
  //   });
  // };
  

  // const handleImageUpload = async () => {
  //   if (files.length === 0) {
  //     setImageUploadError('Please select images to upload');
  //     return;
  //   }
    
  //   setUploading(true);
  //   setImageUploadError(false);
  
  //   try {
  //     const imageBase64Array = await Promise.all(
  //       Array.from(files).map((file) => convertToBase64(file))
  //     );
  
  //     setFormData((prev) => ({
  //       ...prev,
  //       imageUrls: [...prev.imageUrls, ...imageBase64Array], // Store images as Base64
  //     }));
  
  //     setUploading(false);
  //   } catch (error) {
  //     setImageUploadError('Image processing failed',error);
  //     setUploading(false);
  //   }
  // };
  const handleImageUpload = () => {
    if (files.length === 0) {
      setImageUploadError('Please select images to upload');
      return;
    }
  
    setImageUploadError(false);
    
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...Array.from(files)], // Store files directly
    }));
  };
  

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.price < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const formDataToSend = new FormData();
      formData.imageUrls.forEach((file) => {
        formDataToSend.append(`images`, file);
      });
      const res = await fetch('/api/property/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <>
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
                <input id='bedrooms' onChange={handleChange} type="number" placeholder='Enter number of bedrooms' name="bedrooms"required />
               {/* bathrooms */}
                <label>Bathrooms <span>*</span> </label>
                <input id='bathrooms' onChange={handleChange} type="number" placeholder='Enter number of bathrooms' name="bathrooms"required />
                {/* Amenities */}
                <label>Amenities </label>
                <input id='amenities' onChange={handleChange} type="text" placeholder='Enter Amenities' name="amenities"required />
                {/* price */}
                <label>Price <span>*</span> </label>
                <input id='price' onChange={handleChange}  type="number" placeholder='Enter Property Price' name="price"required />
                {formData.transactionType === 'Rent' && (
                    <span>(Rs / month)</span>
                  )}
                <label>Discounted Price <span>*</span> </label>
                <input id='discountPrice 'onChange={handleChange} type="number" placeholder='Enter discounted price' name="discountPrice"required />
                {formData.transactionType === 'Rent' && (
                    <span>(Rs / month)</span>
                  )}
                {/* image */}
                <label >Property Images <span>*</span></label>
                <input  onChange={(e)=>setfiles(e.target.files)} type="file" name='imageUrls' ref={fileRef} hidden accept='image/*' multiple required />
                <div className="image" onClick={()=>fileRef.current.click()}>
                  + Upload an image
                </div>
                <button type='button'  disabled={uploading} onClick={handleImageUpload} className='btnUpload'>  {uploading ? 'Uploading...' : 'Upload'}</button>
                <p>
                {imageUploadError }
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
          <button   disabled={loading}className='btnSubmit'> {loading ? 'Adding...' : 'Add Property'}</button>
            </form>
            {error && <p>{error}</p>}

        </div>

        <div className="right">
          <h2>Quick Preview</h2>
          <div className="contain">
          <div className="image">
            <img src="" alt="" />
            </div>
            <h4>The White House</h4>
            <div className="loc">
              <img src="" alt="" />
              <p>content</p>
            </div>
            <div className="price">
              <p>$100</p>
            </div>
            <div className="bed">
              <img src="" alt="" />
              <p>2 <span>Bedrooms</span></p>
            </div>
            <div className="bath">
              <img src="" alt="" />
              <p>2 <span>Bathrooms</span></p>
            </div>
          </div>
          </div>
    </div>
    </>
  )
}
