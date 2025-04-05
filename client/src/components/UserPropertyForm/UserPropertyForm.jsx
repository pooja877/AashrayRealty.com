// import { useNavigate } from 'react-router-dom';
 import '../PropertyFunc/Add/Add.css';
import {  useEffect, useRef, useState } from 'react';
import Locationform from '../Locationform/Locationform';

export default function UserPropertyForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRef=useRef();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const token = localStorage.getItem("token");

  
  const sendOTP = async () => {
    try {
      const response = await fetch("/api/user/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
  
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setOtpSent(true);
        setError("");
      } else {
        setError("Failed to send OTP.");
      }
    } catch (err) {
      setError("Error sending OTP.",err);
    }
  };
  
  const verifyOTP = async () => {
    try {
      const response = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
  
      const data = await response.json();
      if (data.success) {
        setOtpVerified(true);
        setError("");
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (err) {
      setError("Error verifying OTP.",err);
    }
  };
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    bhk: "",
    price: "",
    city: "",
    area: "",
    address:"",
    pincode: "",
    images: [],
    amenities: "",
    propertyType: "",
    transactionType:"",
    floor:"",
    mobile:""
});

const [user, setUser] = useState(null);

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
  
  useEffect(() => {
    const fetchMobile = async () => {
      try {
        const res = await fetch("/api/user/getMobile", {
          headers: {
            Authorization: `Bearer ${token}`, // if auth required
          },
          body: JSON.stringify({
            mobile: formData.mobile,
          }),
        });
        const data = await res.json();
  
        if (res.ok) {
          setOtpVerified(data.isVerified); // ✅ set true if verified
          setOtp(""); // clear OTP input
          setOtpSent(false); // hide OTP input
          setError(""); // clear errors
        } else {
          setError(data.error || "OTP verification failed.");
        }
      } catch (err) {
        console.error("Error fetching mobile:", err);
      }
    };
  
    fetchMobile();
  }, []);
  

useEffect(() => {
  const fetchUser = async () => {
      try {
          const res = await fetch("/api/user/me", {
              method: "GET",
              credentials: "include",
          });
          const data = await res.json();
          if (res.ok) {
              setUser(data);
          }
      } catch (error) {
          console.error("Not logged in", error);
      }
  };
  fetchUser();
}, []);
 
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === 'city' && { area: '' }) // Reset area when city changes
  }));
};


const handleImageUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dobtvcxnc",
            uploadPreset: "aashrayRealty",
            sources: ["local", "url", "camera", "image_search"],
            multiple: true,
            cropping: true,
            folder: "userProperty-image",
            formats: ["png", "jpg", "jpeg","avif"]
        },
        (error, result) => {
            if (!error && result.event === "success") {
              setFormData(prev => ({ ...prev, images: [...prev.images, result.info.secure_url] }));
            }
        }
    );
    widget.open();
};

 

 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   
    if (formData.images.length < 1 || formData.images.length > 4)
      return setError("You must upload at least 1 and at most 4 images");

    setLoading(true);
    setError(false);
    const updatedFormData = { ...formData, userId: user.id };
    const res = await fetch("/api/userproperties/addPro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });

    const data = await res.json();
    setLoading(false);

    // ✅ Check if response is NOT OK
    if (!res.ok) {
      return setError(data.message || "Something went wrong!");
    }

    alert("Property added successfully!!");
    setFormData({
      userId: "",
      title: "",
      bhk: "",
      price: "",
      city: "",
      area: "",
      pincode: "",
      address: "",
      images: [],
      desc: "",
      amenities: "",
      transactionType: "",
      propertyType: "",
    }); // ✅ Reset form correctly
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};



  
  

const next = () => {
  if (step === 1) {
    const { city, area, pincode, address } = formData;
    if (!city || !area || !pincode || !address) {
      setError('Please fill all fields.');
      return;
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Pincode must be a 6-digit number.');
      return;
    }
    setError('');
  }
  if (step === 2) {
    const { images } = formData;

    if (!images || images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setError('');
  }
  if (step === 3) {
    const { propertyType, price,transactionType,floor,desc,title,bhk,amenities} = formData;

    if (!propertyType || !price ||!transactionType||!floor||!desc||!title||!bhk||!amenities) {
      setError('Please fill all fields');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Price must be a valid number');
      return;
    }

    setError('');
  }


  // Increase step
  setStep(step + 1);
};

  // const next = () => {  setStep((prev) => Math.min(prev + 1, 5));}
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));
  
  return (
    <>
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
        <p className='infoadddara'>User Info  </p>
      </div>
      </div>

              {/*------------------------------- step1---------------------- */}
      {step === 1 && (
        
        <div className="form-step">
          <div className="addaddressside">
          <div className="leftaddside">
         
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
              
        
          <input  type="text" id='pincode'   value={formData.pincode} onChange={handleChange} placeholder='Enter 6 digit valid Pincode ' name="pincode"required />
          <input type="text" id='address'value={formData.address} onChange={handleChange} placeholder="Enter property address (houseno,buildingname,streetname)"name="address" required />

          </div>
          <div className="rightaddside">
          <Locationform  area={formData.area} city={formData.city}/>
          </div>
          </div>

          <button onClick={next} className='btnadd'>Next</button>
          {error && <p className="adderror">{error}</p>}
        </div>
      )}

         {/* ----------------------------step2------------------------ */}
         {step === 2 && (
             <>
           <button 
  type="button" 
  
  onClick={handleImageUpload} 
  style={{
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  Upload Images
</button>

{formData.images[0] && (
  <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: "10px",
      marginBottom: "1rem",
    }}
  >
    <img 
      src={formData.images[0]} 
      alt="Property" 
      style={{
        width: "500px",
        height: "300px",
        objectFit: "fill",
        borderRadius: "5px",
      }}
    />
  </div>
)}

       
                <div className="prevnextbtn">
                                  <button onClick={prev} className='btnadd'>Back</button>
                          <button onClick={next} className='btnadd' >Next</button>
                        </div>
          {error && <p className="adderror">{error}</p>}
                
              </>
                        )}
      {/* ------------------step3---------------- */}

      {step === 3 && (
        <div className="form-step">
          <div className="detailcompo">
               
                <div className="namepro">
                <label>Title <span>*</span> </label>
                <input type="text" id='title' value={formData.title} placeholder='Enter Property Title'onChange={handleChange} name='title' required />
                <label>Floor <span>*</span> </label>
                <input type="text" id='floor' value={formData.floor} placeholder='Enter Property floor'onChange={handleChange} name='floor' required />
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
                </div>
                  {/* bhk */}
          <div className="divinfo">
          <div className="seladdop">
                <label>BHK <span>*</span> </label>
                <select onChange={handleChange} name='bhk' ref={selectRef}  id='bhk' value={formData.bhk}  required>
                    <option value="">Select...</option>
                    <option value="1 BHk">1BHK</option>
                    <option value="2 BHk">2BHK</option>
                    <option value="3 BHk">3BHK</option>
                    <option value="4 BHk">4BHK</option>
                </select>
                </div>
               
                <div className="seladdop">
              <label>Price <span>*</span> </label>
                <input min='1' id='price' onChange={handleChange}  type="number" placeholder='Enter Property Price' name="price"required style={{width:"90%"}}/>
                {formData.transactionType === 'Rent' && (
                    <span>(₹ / month)</span>
                  )}
              </div>
              </div>
                
               
                <div className="amenitiesadd">
                <label>Amenities <span>*</span> </label>
                <input id='amenities' onChange={handleChange} type="text" placeholder='Enter Amenities' value={formData.amenities} name="amenities"required />
              
                </div>

               
                <div className="namepro">
                <label>Description <span>*</span> </label>
                <textarea id='desc' onChange={handleChange} value={formData.desc} placeholder='Enter details of the property' name="desc"required />
                </div>
                
                </div>
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
          <button onClick={next} className='btnadd' >Next</button>
        </div> 
        {error && <p className="adderror">{error}</p>}

        </div>
      )}

      {/* {step === 4 && (
         <div className='form-step'>
        <label>Mobile Number<span>*</span></label>
<input 
    type="tel" 
    className="innew" 
    id='mobile' 
    name="mobile"  
    pattern="[0-9]{10}" 
    value={formData.mobile || ""}  
    onChange={handleChange}  // ✅ Improved logic: readOnly only if mobile is fetched
    placeholder="Enter mobile number"
/>

         
{error && <p className='adderror'>{error}</p>}
          <div className="prevnextbtn">
                  <button onClick={prev} className='btnadd'>Back</button>
                  <button disabled={loading} className='btnaddproperty' onClick={handleSubmit}>{loading ? 'loading...' : 'Add Property'}</button>
        </div>
          </div>
     )} */}
   {step === 4 && (
  <div className="form-step">
    <label>
      Mobile Number<span>*</span>
    </label>
    <input
      type="tel"
      className="innew"
      id="mobile"
      name="mobile"
      pattern="[0-9]{10}"
      value={formData.mobile || ""}
      onChange={handleChange}
      placeholder="Enter mobile number"
      disabled={otpSent || otpVerified} // Disable if OTP is sent or already verified
    />
    {!otpVerified && (
      <button className="send-otp-btn" onClick={sendOTP} disabled={otpSent}>
        {otpSent ? "OTP Sent" : "Send OTP"}
      </button>
    )}

    {otpSent && !otpVerified && (
      <>
        <label>
          Enter OTP<span>*</span>
        </label>
        <input
          type="text"
          className="innew"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button className="verify-otp-btn" onClick={verifyOTP}>
          Verify OTP
        </button>
      </>
    )}

    {otpVerified && <p className="otp-verified-message">✅ Mobile number is verified</p>}

    {error && <p className="adderror">{error}</p>}

    <div className="prevnextbtn">
      <button onClick={prev} className="btnadd">
        Back
      </button>
      <button disabled={loading || !otpVerified} className="btnaddproperty" onClick={handleSubmit}>
        {loading ? "Loading..." : "Add Property"}
      </button>
    </div>
  </div>
)}

      
    </div></div>
    </>
  );
}

