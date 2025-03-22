import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./News.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const newsPerPage = 3; // Show 3 news at a time
    const navigate=useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("/api/news/all");
                if (!response.ok) throw new Error("Failed to fetch news");
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    // Get the sliding news window
    const displayedNews = news.slice(startIndex, startIndex + newsPerPage);

    // Handle Next Slide
    const handleNext = () => {
        if (startIndex + newsPerPage < news.length) {
            setStartIndex(startIndex + 1);
        }
    };

    // Handle Previous Slide
    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <section className="news-section">
              {/* Sliding Navigation Controls */}
              <div className="news-nav">
                    <button 
                        className="nav-btn" 
                        onClick={handlePrevious} 
                        disabled={startIndex === 0}
                    >
                        <i className="fas fa-chevron-left"></i> Previous
                    </button>

                    <button 
                        className="nav-btn" 
                        onClick={handleNext} 
                        disabled={startIndex + newsPerPage >= news.length}
                    >
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            <div className="container">
                <h2 className="section-title">Latest News</h2>

                <div className="news-grid">
                    {displayedNews.map((item) => (
                        <div key={item._id} className="news-card">
                            <h3 className="news-title">{item.title}</h3>
                            <p className="news-text">{item.description}</p>
                            {item.image && <img src={item.image} alt="News" className="news-image" />}
                            {/* <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <button className="read-more">Read more</button>
                            </a> */}
                             <div onClick={()=>{navigate(`/newsDetail/${item._id}`)}} className="allnews-readmore" >
                                Read More
                            </div>
                        </div>
                    ))}
                </div>

              
            </div>
        </section>
    );
};

export default News;
