import "./layout.scss"
import Navbar from "./components/navbar/Navbar"
import AboutUs from "./routes/aboutus/Aboutus"
import Homepage from "./routes/homepage/Homepage"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./routes/Signup/Signup";
import Signin from "./routes/Signin/Signin";
import Profile from "./routes/profile/Profile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Edit from "./components/edit/Edit";
import Setting from "./components/setting/Setting";
import Reset from "./components/Reset/Reset";
import AdminLogin from "./routes/admin/login/Login";
import AdminDashboard from "./routes/admin/dashboard/Dashboard";
import { Privateadmin } from "./components/privateAdmin/Privateadmin";
//  import Otp from "./components/OTP/Otp";


function App() {
  return ( 
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/About" element={<AboutUs/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<Signin/>}/>
      {/* profile page and it open when user is login */}
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/setting" element={<Setting/>}/>
      </Route>
      
      <Route path="/resetPassword" element={<Reset/>}/>
      {/* <Route path="/Otp" element={<Otp/>}/> */}

      <Route element={<Privateadmin/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
    </BrowserRouter>
  )

 }
export default App
