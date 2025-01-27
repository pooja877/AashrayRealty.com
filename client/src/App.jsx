import "./layout.scss"
import Navbar from "./components/navbar/Navbar"
import AboutUs from "./routes/aboutus/Aboutus"
import Homepage from "./routes/homepage/Homepage"
import { BrowserRouter,Routes,Route, useLocation } from "react-router-dom";
import SignUp from "./routes/Signup/Signup";
import Signin from "./routes/Signin/Signin";
import Profile from "./routes/profile/Profile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Edit from "./components/edit/Edit";
import Setting from "./components/setting/Setting";
import AdminLogin from "./components/admin/login/Login";
import { Privateadmin } from "./components/privateAdmin/Privateadmin";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/Reset/Reset";
import AdminDashboard from "./components/admin/dashboard/Dashboard";
import AdminNavbar from "./components/admin/adminNavbar/AdminNavbar";
import Property from "./components/admin/Property/Property";

function App() {
  return ( 
    <>
    <BrowserRouter>
    <ConditionalNavbar/>
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
      <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      {/* for open admin panel admin can login and open it */}
      <Route element={<Privateadmin/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      </Route>
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/navbar" element={<AdminNavbar/>} />
        <Route path="admin/property" element={<Property/>}/>
    </Routes>
    </BrowserRouter> 
    </>
  )
 };

 const ConditionalNavbar=()=>{
  const location=useLocation();
  const hideNavbarRoutes=["/admin/login","/admin/dashboard","/admin/property"];
  return !hideNavbarRoutes.includes(location.pathname)?<Navbar/>:null;
 }
export default App
