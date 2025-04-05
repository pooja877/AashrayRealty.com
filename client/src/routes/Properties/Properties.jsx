
import Map from '../../components/map/Map';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import './Properties.css';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [likedProperties, setLikedProperties] = useState(new Set());
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user/me', { method: 'GET', credentials: 'include' });
                const data = await res.json();
                if (res.ok) setUser(data);
            } catch (error) {
                console.error('Not logged in', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`/api/property/all${location.search}`);
                if (!response.ok) throw new Error('Failed to fetch properties');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setProperties([]);
            }
        };
        fetchProperties();
    }, [location.search]);

    useEffect(() => {
        if (user) {
            const fetchLikedProperties = async () => {
                try {
                    const res = await fetch('/api/likes/liked', { credentials: 'include' });
                    const data = await res.json();
    
                     // Debugging Output
    
                    if (Array.isArray(data)) {
                        setLikedProperties(new Set(data.map(like => like.propertyId?._id)));
                    } else {
                        console.error("Unexpected response format:", data);
                    }
                } catch (error) {
                    console.error("Error fetching liked properties:", error);
                }
            };
            fetchLikedProperties();
        }
    }, [user]);
    

    const toggleLike = async (propertyId) => {
        if (!user) {
            alert('Please login to like properties.');
            return;
        }
        try {
            if (likedProperties.has(propertyId)) {
                await fetch('/api/likes/unlike', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ propertyId ,propertyType:"Property"})
                });
                setLikedProperties(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(propertyId);
                    return newSet;
                });
            } else {
                await fetch('/api/likes/like', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ propertyId,propertyType:"Property" })
                });
                setLikedProperties(prev => new Set(prev).add(propertyId));
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };
    const handleSearch = () => {
        setSearchQuery(search);
    };


    
    const filteredProperties = properties.filter(property =>
        property.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.transactionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Number(searchQuery) ? property.price === Number(searchQuery) || property.discountPrice === Number(searchQuery) : false)
    );

    return (
        <div className="main-user-contain">
           <div className="searchhhbox">
            <input
                type="text"
                placeholder="Search by Name, City, Type, Area, Price"
                value={search}
                onChange={(e) => setSearch(e.target.value)}      
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <div className={`datapro ${filteredProperties.length === 1 ? 'single-property' : ''}`}>
                
                {filteredProperties.length > 0 ? (
                    filteredProperties.map(property => (
                        <div className="contain" key={property._id}>
                            <div className="imageWrapper">
                                {property.images?.length > 0 && (
                                    <img
                                        className="imageConatiner"
                                        src={property.images[0].url}
                                        alt="Property"
                                        onClick={() => navigate(`/Properties/${property._id}`)}
                                    />
                                )}
                                <FaHeart
                                    className={`likeButton ${likedProperties.has(property._id) ? 'liked' : 'unliked'}`}
                                    onClick={() => toggleLike(property._id)}
                                />
                            </div>
                            <div className="info" onClick={() => navigate(`/Properties/${property._id}`)}>
                                <h3>{property.propertyName}</h3>
                                <div className="prodetails">
                                    <FaMapMarkerAlt />
                                    <p>{property.address} {property.area} {property.city}</p>
                                </div>
                                <p className='protype'>For {property.transactionType}</p>
                                <div className="price">
                                    <p className="ind-price">₹{property.discountPrice ? (
                                        <>
                                            <span className="strike">{property.price}</span>
                                            <span className="discountprice">{property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                        </>
                                    ) : (
                                        <span className="originalprice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                    )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
            <div className="mapall"><Map /></div>
        </div>
    );
}
