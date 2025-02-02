import './Add.css';
import { useRef } from 'react';
export default function Add() {
  const fileRef=useRef(null);
  return (
    <>
    <div className="maincontainer">
        <div className="left">
            <h2>Add Property</h2>
            <form action="">
                <h3>Property Information</h3>
                <label>Property Name <span>*</span> </label>
                <input type="text" placeholder='Enter Property name' name='propertyName' required />
                <label>Property Type <span>*</span> </label>
                <select name='propertyType' required>
                    <option value="">Select...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Apartment">Apartment/Flat</option>
                </select>
                {/* status */}
                <label>Status <span>*</span> </label>
                <select name='propertyStatus' required>
                    <option value="">Select...</option>
                    <option value="Availabel">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                </select>
                {/* transaction type */}
                <label>Transaction Type <span>*</span> </label>
                <select name='transactionType' required>
                    <option value="">Select...</option>
                    <option value="Rent">Rent</option>
                    <option value="Sale">Sale</option>
                </select>
                {/* area sqft */}
                <label>Area(Sq.ft) <span>*</span> </label>
                <input  type="text" placeholder='Enter Area(Sq.ft)' name="area"required />
               {/* description */}
                <label>Description <span>*</span> </label>
                <textarea placeholder='Enter details of the property' name="desc"required />
                {/* bedrooms */}
                <label>Bedrooms <span>*</span> </label>
                <input  type="number" placeholder='Enter number of bedrooms' name="bedrooms"required />
               {/* bathrooms */}
                <label>Bathrooms <span>*</span> </label>
                <input  type="number" placeholder='Enter number of bathrooms' name="bathrooms"required />
                {/* Amenities */}
                <label>Amenities </label>
                <input  type="text" placeholder='Enter Amenities' name="amenities"required />
                {/* price */}
                <label>Price <span>*</span> </label>
                <input  type="number" placeholder='Enter Property Price' name="price"required />
                <span>(Rs. /month)</span>
                <label>Discounted Price <span>*</span> </label>
                <input  type="number" placeholder='Enter discounted price' name="discountedPrice"required />
                <span>(Rs. /month)</span>
                {/* image */}
                <label >Property Images <span>*</span></label>
                <input  type="file" id='images' ref={fileRef} hidden accept='image/*' multiple required />
                <div className="image" onClick={()=>fileRef.current.click()}>
                  + Upload an image
                </div>
                <button className='btnUpload'>Upload</button>
                
                {/* location */}
                <h3>Property Location</h3>
                <label>Flat/House No. <span>*</span></label>
          <input type="text" placeholder="Enter property flat no./house no."name="flatNumber" required />

          <label>Building Name <span>*</span></label>
          <input type="text" placeholder="Enter property building name" name="buildingName" required />

          <label>Street Address <span>*</span></label>
          <input type="text" name="streetAddress"placeholder="Enter property street address" required />
          <label>Area <span>*</span></label>
          <input  type="text" placeholder='Enter name of area ' name="area"required />
          <label>City <span>*</span></label>
          <input  type="text" placeholder='Enter name of city' name="city"required />
          <button className='btnSubmit'>Add Property</button>
            </form>

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
