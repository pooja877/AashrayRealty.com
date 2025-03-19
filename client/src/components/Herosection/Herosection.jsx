import { useState } from "react";
import "./HeroSection.css";

const Herosection = () => {
    const [activeTab, setActiveTab] = useState("buy");
    const [cityDropdown, setCityDropdown] = useState(false);
    
    return (
        <section className="hero-section">
            <div className="city-silhouette"></div>
            <div className="hcontainer">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Trusted place to find a home</h1>
                        <p className="hero-subtitle">Seamless, secure, and stress-free property hunting.</p>
                        
                        <div className="searchherobox">
                            <div className="searchtabs">
                                <button className={`searchtab ${activeTab === "buy" ? "active" : ""}`} onClick={() => setActiveTab("buy")}>BUY</button>
                                <button className={`searchtab ${activeTab === "rent" ? "active" : ""}`} onClick={() => setActiveTab("rent")}>RENT</button>
                                <button className={`searchtab ${activeTab === "commercial" ? "active" : ""}`} onClick={() => setActiveTab("commercial")}>COMMERCIAL</button>
                            </div>
                            <div className="searchinput">
                                <div className="input-wrapper" onClick={() => setCityDropdown(!cityDropdown)}>
                                    <input type="text" placeholder="Select City" readOnly className="city-input" />
                                    <i className="fas fa-chevron-down input-icon"></i>
                                </div>
                                {cityDropdown && (
                                    <div className="city-dropdown">
                                        <input type="text" placeholder="Search city..." className="city-search" />
                                        <div className="city-list">
                                            {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"].map(city => (
                                                <a key={city} href="#" className="city-item">{city}</a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="searchherobutton">Search</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/heroimage.avif" alt="Modern House" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Herosection;
