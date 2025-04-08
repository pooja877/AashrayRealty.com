import { useNavigate } from 'react-router-dom';
import './NewsAll.css'
import  { useState, useEffect } from "react";
import Footercompo from "../../components/Footer/Footercompo";

const NewsAll = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
 const navigate=useNavigate();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news/all");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
   <div className="allnewscontainer">
     <div className="allnews-container">
      <h2 className="allnews-title">Latest Real Estate News</h2>

      {loading ? (
        <p className="allnews-loading">Loading news...</p>
      ) : (
        <div className="allnews-list">
          {newsData.map((news) => (
            <div key={news._id} className="allnews-card">
              <div className="imagenewscontain">
                <img src={news.image} alt="news"  className='imageallnews'/>
                
              </div>
              
            <div className="containnewsdata">
                
            <h3 className="allnews-news-title">{news.title}</h3>
              <p className="allnews-category"><strong>Category:</strong> {news.category}</p>
              <p className="allnews-description">{news.description}</p>
              <div onClick={()=>{navigate(`/newsDetail/${news._id}`)}} className="allnews-readmore" >
                Read More
              </div>
            </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
    <Footercompo/>
   </div>
  );
};

export default NewsAll;

