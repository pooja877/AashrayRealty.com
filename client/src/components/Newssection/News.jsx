// import "./News.css";

// const News = () => {
//     return (
//         <section className="news-section">
//             <div className="container">
//                 <h2 className="section-title">Latest News</h2>
//                 <div className="news-nav">
//                     <button className="nav-btn" id="prevNewsBtn">
//                         <i className="fas fa-chevron-left"></i> Previous
//                     </button>
//                     <button className="nav-btn" id="nextNewsBtn">
//                         Next <i className="fas fa-chevron-right"></i>
//                     </button>
//                 </div>
//                 <div className="news-grid">
//                     {/* News Card 1 */}
//                     <div className="news-card">
//                         <h3 className="news-title">Real Estate Market Trends 2025</h3>
//                         <p className="news-text">
//                             Stay updated with the latest trends in the real estate market for 2025. Learn about the factors influencing property prices.
//                         </p>
//                         <img
//                             src="https://images.unsplash.com/photo-1581091870620-1c1c1c1c1c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8fHwxNjE3MjY0MjY0&ixlib=rb-1.2.1&q=80&w=400"
//                             alt="News"
//                             className="news-image"
//                         />
//                         <button className="read-more">Read more</button>
//                     </div>

//                     {/* News Card 2 */}
//                     <div className="news-card">
//                         <h3 className="news-title">Tips for First-Time Home Buyers</h3>
//                         <p className="news-text">
//                             Discover essential tips and tricks for first-time home buyers to make the process smoother and more efficient.
//                         </p>
//                         <img
//                             src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//                             alt="News"
//                             className="news-image"
//                         />
//                         <button className="read-more">Read more</button>
//                     </div>

//                     {/* News Card 3 */}
//                     <div className="news-card">
//                         <h3 className="news-title">Understanding Home Loans</h3>
//                         <p className="news-text">
//                             Get insights into the different types of home loans available and how to choose the best one for your needs.
//                         </p>
//                         <img
//                             src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//                             alt="News"
//                             className="news-image"
//                         />
//                         <button className="read-more">Read more</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default News;
import { useEffect, useState } from "react";
import "./News.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const newsPerPage = 3; // Show 3 news at a time

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
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <button className="read-more">Read more</button>
                            </a>
                        </div>
                    ))}
                </div>

              
            </div>
        </section>
    );
};

export default News;
