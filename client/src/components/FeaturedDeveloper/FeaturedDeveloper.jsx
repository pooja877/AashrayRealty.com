import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "./FeaturedDeveloper.css";

const FeaturedDeveloper = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
     const navigate=useNavigate();
    
       
      

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/news/all"); // Update your API URL
                const data = await response.json();

                // Filter only new-projects
                const filteredProjects = data.filter((item) => item.category === "New-projects");
                // console.log(filteredProjects);

                setProjects(filteredProjects);
               
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);
    

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    if (projects.length === 0) {
        return <p>Loading...</p>; // Handle no data case
    }

    const currentProject = projects[currentIndex];
    const firstLetter = currentProject.title ? currentProject.title.charAt(0).toUpperCase() : "N";

    return (
        <section className="featured-developer">
            <h1 style={{padding:"1rem",paddingLeft:"3rem"}}>Upcoming New-Project</h1>
             {/* Navigation Buttons */}
             <div className="news-nav">
                    <button onClick={handlePrev} disabled={projects.length <= 1}  className="nav-btn" > <i className="fas fa-chevron-left"></i>Previous</button>
                    <button onClick={handleNext} disabled={projects.length <= 1}  className="nav-btn" >Next  <i className="fas fa-chevron-right"></i></button>
                </div>
            <div className="developer-card">
                <div className="developer-content">
                    {/* Developer Info */}
                    <div className="developer-info">
                        <div className="developer-box">
                            <div className="developer-header">
                           
                                <div className="developer-details">
                                <div className="developer-logo">
                                {firstLetter}
                                 </div>
                                    <h3 className="developer-name">{currentProject.title}</h3>
                                   
                                        <div className="cat">Category: {currentProject.category}</div>
                                        <span className="review-count">Date  {currentProject.date}</span>
                                        <p>{currentProject.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Property Image */}
                    <div className="developer-image">
                        <img 
                            src={currentProject.image ||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" } 
                            alt="Featured Property" 
                            className="property-img"
                        />
                        <div className="image-overlay">
                            <div className="image-text">
                                <h3 className="propertytitle">{currentProject.title}</h3>
                                <p className="property-description">{currentProject.description}</p>
                                <div className="button-group">
                                    <button onClick={()=>{navigate(`/newsDetail/${currentProject._id}`)}} className="view-details-btn" >View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        </section>
    );
};

export default FeaturedDeveloper;
