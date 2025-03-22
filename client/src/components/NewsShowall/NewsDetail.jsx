import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./NewsDetail.css"; // Import CSS

const NewsDetail = () => {
  const { id:newsId } = useParams(); // Get the ID from URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`/api/news/${newsId}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [newsId]);

  if (loading) return <p className="newsdetail-loading">Loading news...</p>;
  if (!news) return <p className="newsdetail-error">News not found.</p>;

  return (
    <div className="alldetailnews">
    <div className="newsdetail-container">
      {/* Title */}
      <h2 className="newsdetail-title">{news.title}</h2>

      {/* News Image */}
      <img src={news.image} alt={news.title} className="newsdetail-image" />

      {/* Category & Time */}
      <p className="newsdetail-meta">
         <span className="newsdetail-category">Category:  {news.category}</span> 
         <span className="newsdetail-time">{news.date}</span>
      </p>

      {/* Description */}
      <p className="newsdetail-description">{news.description}</p>

      {/* Full Content */}
      <p className="newsdetail-content">{news.content}</p>

      {/* Read More Link */}
      <a href={news.link} className="newsdetail-readmore" target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>

      {/* Back Button */}
      <Link to="/news" className="newsdetail-back">← Back to News</Link>
    </div>
    </div>
  );
};

export default NewsDetail;
