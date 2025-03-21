import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const Herosection = () => {
    const [activeTab, setActiveTab] = useState("Buy");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const navigate = useNavigate();

  
    const handleSearch = () => {
        let query = `?transactionType=${activeTab}`;
        if (selectedCity) query += `&city=${selectedCity.trim()}`;
        if (selectedArea) query += `&area=${selectedArea.trim()}`;
        navigate(`/properties${query}`); // Navigate with filters
    };

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
                                <button className={`searchtab ${activeTab === "Buy" ? "active" : ""}`} onClick={() => setActiveTab("Buy")}>BUY</button>
                                <button className={`searchtab ${activeTab === "Rent" ? "active" : ""}`} onClick={() => setActiveTab("Rent")}>RENT</button>
                                
                            </div>
                            {/* <div className="searchinput">
                                <div className="input-wrapper">
                                    <>                             
                                           <input 
                                        type="text" 
                                        placeholder="Enter City" 
                                        className="city-input" 
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                    />
                                    
                                    </>

                                </div>
                            </div> */}
                

            <div className="searchinput">
    <div className="input-wrapper">
        {/* City Selection */}
        <select 
            className="city-select"
            value={selectedCity}
            onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedArea(""); // Reset area when city changes
            }}
        >
            <option value="">Select City</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Gandhinagar">Gandhinagar</option>
        </select>

        {/* Area Selection */}
        <select 
            className="area-select"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            disabled={!selectedCity} // Disable until city is selected
        >
            <option value="">Select Area</option>
            {selectedCity === "Ahmedabad" && (
                <><option value="Satellite">Satellite</option>
                <option value="Bopal">Bopal</option>
                <option value="Narol">Narol</option>
                <option value="Navrangpura">Navrangpura</option>
                <option value="Maninagar">Maninagar</option>
                <option value="Vastrapur">Vastrapur</option>
                <option value="Thaltej">Thaltej</option>
                <option value="Naranpura">Naranpura</option>
                <option value="Gota">Gota</option>
                <option value="Prahlad Nagar">Prahlad Nagar</option>
                <option value="Ashram Road">Ashram Road</option>
                <option value="Chandkheda">Chandkheda</option>
                <option value="Iscon">Iscon</option>
                <option value="Shahibaug">Shahibaug</option>
                <option value="Memnagar">Memnagar</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Ranip">Ranip</option>
                <option value="Ellis Bridge">Ellis Bridge</option>
                <option value="Paldi">Paldi</option>
                <option value="SG Highway">SG Highway</option>
                </>
            )}
            {selectedCity === "Gandhinagar" && (
                <>
                    <option value="Sector 1">Sector 1</option>
                    <option value="Sector 7">Sector 7</option>
                    <option value="Sector 11">Sector 11</option>
                    <option value="Sector 21">Sector 21</option>
                    <option value="Sector 27">Sector 27</option>
                    <option value="Infocity">Infocity</option>
                    <option value="Adalaj">Adalaj</option>
                    <option value="Kudasan">Kudasan</option>
                    <option value="Sargasan">Sargasan</option>
                    <option value="Pethapur">Pethapur</option>
                </>
            )}
        </select>

        {/* Read-Only Input */}
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
                        <img src="/heroimage.avif" alt="Modern House" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Herosection;

