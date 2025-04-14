// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./HeroSection.css";

// const Herosection = () => {
//     const [activeTab, setActiveTab] = useState("Buy");
//     const [selectedCity, setSelectedCity] = useState("");
//     const [selectedArea, setSelectedArea] = useState("");
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const images = ["/heroimage.avif", "/herro2.jpeg", "/herro3.jpg", "/herro4.jpg", "/herro6.webp"];
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImageIndex((prev) => (prev + 1) % images.length);
//         }, 4000); // ⏳ Image change every 5 seconds

//         return () => clearInterval(interval);
//     }, []);
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch("/api/user/me", {
//                     method: "GET",
//                     credentials: "include",
//                 });
//                 const data = await res.json();
//                 if (res.ok) {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.error("Not logged in", error);
//             }
//         };
//         fetchUser();
//     }, []);

//     const handlePostProperty = () => {
//         if (user) {
//             navigate(`/uploadProperty`);
//         } else {
//             navigate("/signin");
//         }
//     };
    

//     const handleSearch = () => {
//         let query = `?transactionType=${activeTab}`;
//         if (selectedCity) query += `&city=${selectedCity.trim()}`;
//         if (selectedArea) query += `&area=${selectedArea.trim()}`;
//         navigate(`/properties${query}`);
//     };

//     return (
//         <section className="hero-section">
//             {/* Post Property Button */}
//             <button className="post-property-btn" onClick={handlePostProperty}>
//                 + Post Property
//             </button>
//             <div className="city-silhouette"></div>
//             <div className="hcontainer">
//                 <div className="hero-content">
//                     <div className="hero-text">
//                         <h1 className="hero-title">Trusted place to find a home</h1>
//                         <p className="hero-subtitle">Seamless, secure, and stress-free property hunting.</p>
//                         <div className="searchherobox">
//                             <div className="searchtabs">
//                                 <button className={`searchtab ${activeTab === "Buy" ? "active" : ""}`} onClick={() => setActiveTab("Buy")}>BUY</button>
//                                 <button className={`searchtab ${activeTab === "Rent" ? "active" : ""}`} onClick={() => setActiveTab("Rent")}>RENT</button>
//                             </div>
//                             <div className="searchinput">
//                                 <div className="input-wrapper">
//                                     <select className="city-select" value={selectedCity} onChange={(e) => {
//                                         setSelectedCity(e.target.value);
//                                         setSelectedArea("");
//                                     }}>
//                                         <option value="">Select City</option>
//                                         <option value="Ahmedabad">Ahmedabad</option>
//                                         <option value="Gandhinagar">Gandhinagar</option>
//                                     </select>
//                                     <select className="area-select" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} disabled={!selectedCity}>
//                                         <option value="">Select Area</option>
//                                         {selectedCity === "Ahmedabad" && (
//                                             <>
//                                                 <option value="Satellite">Satellite</option>
//                                                 <option value="Bopal">Bopal</option>
//                                             </>
//                                         )}
//                                         {selectedCity === "Gandhinagar" && (
//                                             <>
//                                                 <option value="Sector 1">Sector 1</option>
//                                                 <option value="Sector 7">Sector 7</option>
//                                             </>
//                                         )}
//                                     </select>
//                                     <input type="text" className="read-only-input" value={`${selectedCity || ''}${selectedArea ? ', ' + selectedArea : ''}`} readOnly />
//                                 </div>
//                             </div>
//                             <button className="searchherobutton" onClick={handleSearch}>Search</button>
//                         </div>
//                     </div>
//                     {/* <div className="hero-image">
//                         <img src="/heroimage.avif" alt="Modern House" />
//                     </div> */}
//                     <div className="hero-image">
//                         <img
//                             src={images[currentImageIndex]}
//                             alt="Modern House"
//                             className="fade-in"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Herosection;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const Herosection = () => {
    const [activeTab, setActiveTab] = useState("Buy");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const images = ["/heroimage.avif", "/herro2.jpeg", "/herro3.jpg", "/herro4.jpg", "/herro6.webp"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
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

    const handlePostProperty = () => {
        if (user) {
            navigate(`/uploadProperty`);
        } else {
            navigate("/signin");
        }
    };

    const handleSearch = () => {
        let query = `?transactionType=${activeTab}`;
        if (selectedCity) query += `&city=${selectedCity.trim()}`;
        if (selectedArea) query += `&area=${selectedArea.trim()}`;
        navigate(`/properties${query}`);
    };

    return (
        <section className="hero-section">
            <button className="post-property-btn" onClick={handlePostProperty}>
                + Post Property
            </button>
            <div className="city-silhouette"></div>
            <div className="hcontainer">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Trusted place to find a home</h1>
                        <p className="hero-subtitle">Seamless, secure, and stress-free property hunting.</p>
                        <div className="searchherobox">
                            <div className="searchtabs">
                                <button
                                    className={`searchtab ${activeTab === "Buy" ? "active" : ""}`}
                                    onClick={() => setActiveTab("Buy")}>BUY</button>
                                <button
                                    className={`searchtab ${activeTab === "Rent" ? "active" : ""}`}
                                    onClick={() => setActiveTab("Rent")}>RENT</button>
                            </div>
                            <div className="searchinput">
                                <div className="input-wrapper">
                                    <select className="city-select" value={selectedCity} onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                        setSelectedArea("");
                                    }}>
                                        <option value="">Select City</option>
                                        <option value="Ahmedabad">Ahmedabad</option>
                                        <option value="Gandhinagar">Gandhinagar</option>
                                    </select>
                                    <select
                                        className="area-select"
                                        value={selectedArea}
                                        onChange={(e) => setSelectedArea(e.target.value)}
                                        disabled={!selectedCity}>
                                        <option value="">Select Area</option>
                                        {selectedCity && areaOptions[selectedCity]?.map((area, index) => (
                                            <option key={index} value={area}>{area}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        className="read-only-input"
                                        value={`${selectedCity || ''}${selectedArea ? ', ' + selectedArea : ''}`}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button className="searchherobutton" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img
                            src={images[currentImageIndex]}
                            alt="Modern House"
                            className="fade-in"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Herosection;
