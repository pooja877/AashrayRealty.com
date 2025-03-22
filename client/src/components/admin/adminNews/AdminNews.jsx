
import { useState } from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import "./AdminNews.css";
import { useNavigate } from "react-router-dom";

const AdminNews = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        image: "",
        link:""
    });
    const navigate=useNavigate();

    const [error,setError]=useState();
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dobtvcxnc",
                uploadPreset: "aashrayRealty",
                sources: ["local", "url", "camera", "image_search"],
                multiple: false,
                cropping: true,
                folder: "news-images",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setFormData({ ...formData, image: result.info.secure_url });
                }
            }
        );
        widget.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.image.length < 1)
            return setError('You must upload one image');
        try {
            const response = await fetch("/api/news/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to add news");

            alert("News added successfully!");
            navigate("/admin/news");
            setStep(1);
        } catch (error) {
            console.error("Error:", error);
            setError("All fill are required",error.message);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="newsmaincontain">
                <div className="add-news-container">
                    <h2 className="headnew">Add News</h2>
       {/* Stepper UI */}
    <div className="stepper">
      <div className={`step-item ${step >= 1 ? "active" : ""}`}>
        <div className="step-circle">1</div>
        <p className='infoadddara'>details</p>
      </div>
      <div className={`line ${step >= 2 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 2 ? "active" : ""}`}>
        <div className="step-circle">2</div>
        <p className='infoadddara'>Image</p>
      </div>
      <div className={`line ${step >= 3 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 3 ? "active" : ""}`}>
        <div className="step-circle">3</div>
        <p className='infoadddara'>Content</p>
      </div>
      </div>

                    <form onSubmit={handleSubmit} className="newform">
                        {step === 1 && (
                            <>
                                <label className="newlabel">Title</label>
                                <input type="text" className="innew"  name="title" value={formData.title} onChange={handleChange} required />

                                <label className="newlabel">Description</label>
                                <textarea name="description" value={formData.description} className='newsdesc' onChange={handleChange} required />

                                {/* <label className="newlabel">Category</label>
                                <input type="text" className="innew" name="category" value={formData.category} onChange={handleChange} required /> */}
                                 <label className="newlabel">Category</label>
                                        <select className="innew" name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="">Select Category</option>
                                        <option value="New-projects">New & Upcoming Projects</option>
                                        <option value="Market-trends">Market Trends & Analysis</option>
                                        <option value="Construction">Construction & Infrastructure</option>
                                        <option value="Commercial">Commercial Real Estate</option>
                                        <option value="Residential">Residential Real Estate</option> 
                                        <option value="Government">Government Policies & Legal Updates</option>
                                        <option value="Finance">Home Loans & Finance</option>
                                        <option value="Smartliving">Smart Cities & Sustainable Living</option>
                                        <option value="Guides">Real Estate Guides & Tips</option>
                                        <option value="Scams">Scams & Fraud Alerts</option>
                                        </select>

                                <label className="newlabel">Link</label>
                                <input type="text" className="innew" name="link" value={formData.link} onChange={handleChange} />
                                <button type="button" onClick={() => setStep(2)} className="next-btn">Next</button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <button type="button" className="upload-btn" onClick={handleImageUpload}>
                                    Upload Image
                                </button>
                                {formData.image && <img src={formData.image} alt="News" className="preview-image" />}
                                <button type="button" onClick={() => setStep(1)} className="back-btn">Back</button>
                                <button type="button" onClick={() => setStep(3)} className="next-btn">Next</button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <label className="newlabel">Content</label>
                                <textarea name="content" value={formData.content} onChange={handleChange} className="contentnews" required />

                                <button type="button" onClick={() => setStep(2)} className="back-btn">Back</button>
                                <button type="submit" className="submit-btn">Submit</button>
                            </>
                        )}
                    </form>
                    {error && <p className='adderror'>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default AdminNews;
