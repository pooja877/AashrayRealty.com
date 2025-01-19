import "./layout.scss"
import Navbar from "./components/navbar/Navbar"
import AboutUs from "./routes/aboutus/Aboutus"
import Homepage from "./routes/homepage/Homepage"
import { BrowserRouter, Routes,Route } from "react-router-dom";
import SignUp from "./routes/Signup/Signup";
import Signin from "./routes/Signin/Signin";
import Profile from "./routes/profile/Profile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Edit from "./components/edit/Edit";
import Setting from "./components/setting/Setting";

function App() {
  return ( 
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/About" element={<AboutUs/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/setting" element={<Setting/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )

 }
export default App
