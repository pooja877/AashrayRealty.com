import '../PropertyFunc/Update/Update.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";

export default function UserUpdatePropertyForm() {
    const { id: propertyId } = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const selectRef = useRef();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        bhk: "",
        price: "",
        city: "",
        area: "",
        address: "",
        pincode: "",
        images: [],
        amenities: "",
        propertyType: "",
        transactionType: "",
        mobile: ""
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`/api/userproperties/update/${propertyId}`);
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

    const handleImageUpload = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dobtvcxnc",
                uploadPreset: "aashrayRealty",
                sources: ["local", "url", "camera", "image_search"],
                multiple: true,
                cropping: true,
                folder: "userProperty-image",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setFormData(prev => ({ ...prev, images: [...prev.images, result.info.secure_url] }));
                }
            }
        );
        widget.open();
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
            if (formData.images.length < 1 || formData.images.length > 4)
                return setError('You must upload at least 1 and at most 4 images');

            setLoading(true);
            setError(false);
            const res = await fetch(`/api/user-properties/updateProperty/${propertyId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Property updated successfully!", data.message);
                navigate("/admin/properties"); // Redirect back to property list
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
                <div className="leftUpdate">
                    <h2>Update Property</h2>
                    <form onSubmit={handleSubmit}>
                        <h3>Property Information</h3>
                        <label>Property Title <span>*</span></label>
                        <input type="text" id='title' placeholder={formData.title} onChange={handleChange} name='title' value={formData.title} required />
                        <label>Property Type <span>*</span></label>
                        <select onChange={handleChange} name='propertyType' value={formData.propertyType} required>
                            <option value="">Select...</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Apartment/Flat">Apartment/Flat</option>
                        </select>

                        <label>Transaction Type <span>*</span></label>
                        <select ref={selectRef} value={formData.transactionType} onChange={handleChange} id='transactionType' name='transactionType' required>
                            <option value="">Select...</option>
                            <option value="Rent">Rent</option>
                            <option value="Buy">Buy</option>
                        </select>

                        <label>BHK <span>*</span></label>
                        <select onChange={handleChange} name='bhk' ref={selectRef} id='bhk' value={formData.bhk} required>
                            <option value="">Select...</option>
                            <option value="1 BHk">1BHK</option>
                            <option value="2 BHk">2BHK</option>
                            <option value="3 BHk">3BHK</option>
                            <option value="4 BHk">4BHK</option>
                        </select>

                        <label>Description <span>*</span></label>
                        <textarea id='desc' onChange={handleChange} placeholder={formData.desc} value={formData.desc} name="desc" required />

                        <label>Amenities</label>
                        <input id='amenities' onChange={handleChange} type="text" placeholder={formData.amenities} value={formData.amenities} name="amenities" required />

                        <label>Price <span>*</span></label>
                        <input min='1' id='price' onChange={handleChange} type="number" placeholder={formData.price} value={formData.price} name="price" required />
                        {formData.transactionType === 'Rent' && (
                            <span>(₹ / month)</span>
                        )}

                        <button type="button" className="btnSubmit" onClick={handleImageUpload}>Upload Images</button>

                        <h3>Property Location</h3>
                        <label>Address <span>*</span></label>
                        <input type="text" id='address' onChange={handleChange} name="address" placeholder={formData.address} value={formData.address} required />
                        <label>Area <span>*</span></label>
                        <input type="text" id='area' onChange={handleChange} placeholder={formData.area} name="area" value={formData.area} required />
                        <label>City <span>*</span></label>
                        <input type="text" id='city' onChange={handleChange} placeholder={formData.city} name="city" value={formData.city} required />
                        <label>Pincode <span>*</span></label>
                        <input type="text" id='pincode' value={formData.pincode} onChange={handleChange} placeholder='Enter 6 digit valid Pincode' name="pincode" required />

                        <button disabled={loading} className='btnSubmit'> {loading ? 'Updating...' : 'Update Property'}</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>

                <div className="rightUpdate">
                    <h2>Quick Preview</h2>
                    <div className="upcontain">
                        <div className="info-contain">
                            <h3>{formData.title}</h3>
                            <div className="loc">
                                <img className='locicon' src="/location_20.png" alt="" />
                                <p>{formData.address} {formData.area} {formData.city}</p>
                            </div>
                            <div className="price">
                                <p><FaRupeeSign /> {formData.price}</p>
                            </div>

                            <div className="bed">
                                <p>{formData.bhk}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
  {Array.isArray(formData.images) && formData.images.length > 0 &&
    formData.images.map((img, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width:"40%",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}
      >
        <img
          src={img}
          alt="listing image"
          style={{
            width: "140px",
            height: "9rem",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
        <button
          onClick={() => handleDeleteImage(index)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
          }}
          onMouseOver={(e) => (e.target.style.background = "darkred")}
          onMouseOut={(e) => (e.target.style.background = "red")}
        >
          Delete
        </button>
      </div>
    ))}
</div>

                </div>
            </div>
        </>
    )
}
