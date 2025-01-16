import "./layout.scss"
import Navbar from "./components/navbar/Navbar"
import AboutUs from "./routes/aboutus/Aboutus"
import Homepage from "./routes/homepage/Homepage"
import { BrowserRouter, Routes,Route } from "react-router-dom";
import SignUp from "./routes/Signup/Signup";
import Signin from "./routes/Signin/Signin";

function App() {
  return ( 
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/About" element={<AboutUs/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
  )

 }
export default App
