import { useState } from "react";
// import LocationForm from "./LocationForm"; // Step 1
// import ImagesUpload from "./ImagesUpload"; // Step 2
// import BasicDetails from "./BasicDetails"; // Step 3
// import Facilities from "./Facilities"; // Step 4
import "./Styles.css";

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    images: [],
    price: "",
    area: "",
    bedrooms: "",
    facilities: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="form-container">
    {/* Stepper UI */}
    <div className="stepper">
      <div className={`step-item ${step >= 1 ? "active" : ""}`}>
        <div className="step-circle">1</div>
        <p>Location</p>
      </div>
      <div className={`line ${step >= 2 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 2 ? "active" : ""}`}>
        <div className="step-circle">2</div>
        <p>Images</p>
      </div>
      <div className={`line ${step >= 3 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 3 ? "active" : ""}`}>
        <div className="step-circle">3</div>
        <p>Basic Details</p>
      </div>
      <div className={`line ${step >= 4 ? "active" : ""}`}></div>
      <div className={`step-item ${step >= 4 ? "active" : ""}`}>
        <div className="step-circle">4</div>
        <p>Facilities</p>
      </div>
    </div>

      {step === 1 && <h2>location</h2>}
      {step === 2 && <h2>location</h2>}
      {step === 3 && <h2>location</h2>}
      {step === 4 }

      <div className="button-group">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 4 ? <button onClick={nextStep}>Next</button> : <button>Submit</button>}
      </div>
    </div>
  );
};

export default AddProperty;
