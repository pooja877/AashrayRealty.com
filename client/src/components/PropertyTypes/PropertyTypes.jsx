import { useNavigate } from "react-router-dom";
import "./PropertyType.css"; // Import CSS fil

const propertyTypes = [
  {
    type: "Residential",
    image: "https://tse2.mm.bing.net/th?id=OIP.8p39Akxmqy5r8d2YfP6iUgHaEo&pid=Api&P=0&h=180", // Random house image
  },
  {
    type: "Commercial",
    image: "https://img.freepik.com/premium-photo/modern-corporate-architecture-can-be-seen-cityscape-office-buildings_410516-276.jpg", // Random building image
  },
  {
    type: "Apartment/Flat",
    image: "https://cdn.confident-group.com/wp-content/uploads/2023/02/20122747/slider_pioneer.jpg", // Random apartment image
  },
];

const PropertyTypes = () => {
  const navigate = useNavigate();

  const handleTypeClick = (type) => {
    navigate(`/properties?propertyType=${type}`); // Navigate to filtered properties page
  };

  return (
    <section className="propertytypesection">
      <div className="typecontainer">
        <h2 className="sectiontypetitle">Explore by Property Type</h2>
        <div className="propertytypegrid">
          {propertyTypes.map((property, index) => (
            <div key={index} className="propertytypecard" onClick={() => handleTypeClick(property.type)}>
              <div className="imagetypecontainer">
                <img src={property.image} alt={property.type} className="propertytypeimage" />
                <div className="overlay"></div>
              </div>
              <h3 className="propertytypetitle">{property.type}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
