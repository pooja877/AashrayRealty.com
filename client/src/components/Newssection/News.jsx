import "./News.css";

const News = () => {
    return (
        <section className="news-section">
            <div className="container">
                <h2 className="section-title">Latest News</h2>
                <div className="news-nav">
                    <button className="nav-btn" id="prevNewsBtn">
                        <i className="fas fa-chevron-left"></i> Previous
                    </button>
                    <button className="nav-btn" id="nextNewsBtn">
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="news-grid">
                    {/* News Card 1 */}
                    <div className="news-card">
                        <h3 className="news-title">Real Estate Market Trends 2025</h3>
                        <p className="news-text">
                            Stay updated with the latest trends in the real estate market for 2025. Learn about the factors influencing property prices.
                        </p>
                        <img
                            src="https://images.unsplash.com/photo-1581091870620-1c1c1c1c1c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8fHwxNjE3MjY0MjY0&ixlib=rb-1.2.1&q=80&w=400"
                            alt="News"
                            className="news-image"
                        />
                        <button className="read-more">Read more</button>
                    </div>

                    {/* News Card 2 */}
                    <div className="news-card">
                        <h3 className="news-title">Tips for First-Time Home Buyers</h3>
                        <p className="news-text">
                            Discover essential tips and tricks for first-time home buyers to make the process smoother and more efficient.
                        </p>
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="News"
                            className="news-image"
                        />
                        <button className="read-more">Read more</button>
                    </div>

                    {/* News Card 3 */}
                    <div className="news-card">
                        <h3 className="news-title">Understanding Home Loans</h3>
                        <p className="news-text">
                            Get insights into the different types of home loans available and how to choose the best one for your needs.
                        </p>
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="News"
                            className="news-image"
                        />
                        <button className="read-more">Read more</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;
