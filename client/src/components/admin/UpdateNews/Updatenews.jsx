import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import "./Updatenews.css"

const Updatenews = () => {
    const { id: newsId } = useParams(); 
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        image: "",
        date:"",
        link:""
    });
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`/api/news/${newsId}`);
                if (!response.ok) throw new Error("Failed to fetch news data");
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setError("Error fetching news data: " + error.message);
            }
        };
        fetchNews();
    }, [newsId]);

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
                    setFormData((prev) => ({ ...prev, image: result.info.secure_url }));
                }
            }
        );
        widget.open();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/news/update/${newsId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update news");
            alert("News updated successfully!");
            navigate("/admin/news");
        } catch (error) {
            setError("Error updating news: " + error.message);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="newsmaincontain">
                <div className="add-news-container">
                    <h2 className="headnew">Update News</h2>
                    
                    <div className="stepper">
                        <div className={`step-item ${step >= 1 ? "active" : ""}`}>
                            <div className="step-circle">1</div>
                            <p className='infoadddara'>Details</p>
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

                    <form onSubmit={handleUpdate} className="newform">
                        {step === 1 && (
                            <>
                                <label className="newlabel">Title</label>
                                <input type="text" className="innew" name="title" value={formData.title} onChange={handleChange} />

                                <label className="newlabel">Description</label>
                                <textarea name="description" className='newsdesc' value={formData.description} onChange={handleChange} />

                                <label className="newlabel">Category</label>
                                <input type="text" className="innew" name="category" value={formData.category} onChange={handleChange} />

                                {/* <label className="newlabel">Date</label>
                                <input type="text" className="innew" name="date" value={formData.date} onChange={handleChange} /> */}
                               <label className="newlabel">Category</label>
                                        <select className="innew" name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="">Select Category</option>
                                        <option value="new-projects">New & Upcoming Projects</option>
                                        <option value="market-trends">Market Trends & Analysis</option>
                                        <option value="construction">Construction & Infrastructure</option>
                                        <option value="commercial">Commercial Real Estate</option>
                                        <option value="residential">Residential Real Estate</option>
                                        <option value="government">Government Policies & Legal Updates</option>
                                        <option value="finance">Home Loans & Finance</option>
                                        <option value="smartliving">Smart Cities & Sustainable Living</option>
                                        <option value="guides">Real Estate Guides & Tips</option>
                                        <option value="scams">Scams & Fraud Alerts</option>
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
                                <textarea name="content" className="contentnews" value={formData.content} onChange={handleChange} />
                                <button type="button" onClick={() => setStep(2)} className="back-btn">Back</button>
                                <button type="submit" className="update-btn">Update</button>
                            </>
                        )}
                    </form>
                    {error && <p className='adderror'>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default Updatenews;
