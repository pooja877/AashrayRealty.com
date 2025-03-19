import "./Testimonials.css";

const testimonialsData = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        review: "Housing.com made my home search incredibly easy. The verified listings and detailed information helped me make an informed decision. Highly recommended!",
        stars: 5,
    },
    {
        id: 2,
        name: "Rahul Kapoor",
        location: "Bangalore",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
        review: "The Housing Premium service saved me so much time and money. Zero brokerage and direct contact with owners made the entire process smooth and hassle-free.",
        stars: 5,
    },
    {
        id: 3,
        name: "Ananya Patel",
        location: "Hyderabad",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        review: "As a first-time homebuyer, I was nervous about the process. Housing.com's home loan service connected me with the best rates and guided me through every step.",
        stars: 4.5,
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials">
            <div className="container">
                <div className="text-center">
                    <h2 className="title">What our customers say</h2>
                    <p className="subtitle">Thousands of satisfied customers have found their dream homes with Aashray Realty.</p>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map(({ id, name, location, image, review, stars }) => (
                        <div key={id} className="testimonial-card">
                            <div className="stars">
                                {Array.from({ length: Math.floor(stars) }, (_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                                {stars % 1 !== 0 && <span>⭐½</span>}
                            </div>
                            <p className="review">`${review}`</p>
                            <div className="customer-info">
                                <img src={image} alt={name} className="customer-img" />
                                <div>
                                    <h4 className="customer-name">{name}</h4>
                                    <p className="customer-location">{location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
