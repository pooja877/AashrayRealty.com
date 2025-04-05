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
import  Privateadmin  from "./components/privateAdmin/Privateadmin";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/Reset/Reset";
import AdminDashboard from "./components/admin/dashboard/Dashboard";
// import AdminNavbar from "./components/admin/adminNavbar/AdminNavbar";
// import Project from "./components/admin/Projects/Project";
import Add from "./components/PropertyFunc/Add/Add";
import Update from "./components/PropertyFunc/Update/Update";
import Properties from "./routes/Properties/Properties";
import Single_property from "./components/Individual_Property/Single_property";
import TableProperty from "./components/propertytable/TableProperty";
import TableUser from "./components/admin/Users/TableUser";
import Contact from "./components/ContactUs/Contact";
import Faq from "./components/FAQ/Faq";
import NewsTable from "./components/admin/NewsTable/NewsTable";
import UserPropertyTable from "./components/admin/NewsTable/UserPropertyTable";

import AdminNews from "./components/admin/adminNews/AdminNews";
import Updatenews from "./components/admin/UpdateNews/Updatenews";
import EmiCalculator from "./components/EMICalculator/EmiCalculator";
import NewsAll from "./components/NewsShowall/NewsAll";
import NewsDetail from "./components/NewsShowall/NewsDetail";
import Swipe from "./components/SwipeImage/Swipe";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import LikedProperties from "./components/LikedProperties/LikedProperties";
import Notificationadmin from "./components/admin/Notificationadmin/Notificationadmin";
import Terms from "./components/Terms/Terms";
import Booking from "./components/admin/Bookings/Booking";
import Renting from "./components/admin/Bookings/Renting";
import BookedProperties from "./components/LikedProperties/Bookedproperties";
import RentedProperties from "./components/LikedProperties/RentedProperties";
import UnPaidUser from "./components/admin/UnPaiduser/UnPaidUser";
import UserNotification from "./components/UserNotification/UserNotification";
import UserPropertyForm from "./components/UserPropertyForm/UserPropertyForm";
import UserUpdatePropertyForm from "./components/UserPropertyForm/UserUpdatePropertyForm";
import UserApproveProperties from "./components/UserApproveProeprties/UserApproveProeprties";
import SingleuserProeprty from "./components/Singleuserproperty/SingleuserProeprty";
import UserListing from "./components/UserListing/UserListing";




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
      <Route path="/contactus" element={<Contact/>}/>
      <Route path="/FAQ" element={<Faq/>}/>
      <Route path="/userproperties" element={<UserApproveProperties/>}/>
      <Route path="/userproperties/:id" element={<SingleuserProeprty/>}/>
      


      {/* <Route path="/verifyemail" element={<Verifyemail/>}/> */}
      {/* profile page and it open when user is login */}
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/uploadProperty" element={<UserPropertyForm/>}/>
      <Route path="/updateProperty/:id" element={ <UserUpdatePropertyForm/>}/>
      
     
      </Route>
      <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/properties" element={<Properties/>}/>
      <Route path="/CalculateEmi" element={<EmiCalculator/>}/>
      <Route path="/Properties/:id" element={<Single_property/>}/>
      <Route path="/proeprties/swipe/:id" element={<Swipe/>}/>
      
      <Route path="/news" element={<NewsAll/>}/>
      <Route path="/bookedProperties" element={<BookedProperties/>}/>
      <Route path="/rentedProperties" element={<RentedProperties/>}/>
      <Route path="/mylisting" element={<UserListing/>}/>


      <Route path="/Terms" element={<Terms/>}/>
      
      <Route path="/likedProperties" element={<LikedProperties/>}/>
      <Route path="/Feedback" element={<FeedbackForm/>}/>
      <Route path="/Notification/:id" element={<UserNotification/>}/>
      <Route path="/Review/:id" element={<ReviewForm/>}/>

      <Route path="/newsDetail/:id" element={<NewsDetail/>}/>
      {/* for open admin panel admin can login and open it */}
      <Route element={<Privateadmin/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            {/* <Route path="/admin/navbar" element={<AdminNavbar/>} /> */}
            {/* <Route path="/admin/properties" element={<Project/>}/> */}
            <Route path="/admin/addProperty" element={<Add/>} />
            <Route path="/admin/properties" element={<TableProperty/>}/>
            <Route path="/admin/property/updateProperty/:id" element={<Update/>} />
            <Route path="/admin/users" element={<TableUser/>} />
            <Route path="/admin/news" element={<NewsTable/>} />
            <Route path="/admin/addNews" element={<AdminNews/>} />
            <Route path="/admin/messages" element={<Notificationadmin/>} />
            <Route path="/admin/bookings" element={<Booking/>} />
            <Route path="/admin/allrentedProperties" element={<Renting/>} />
            <Route path="/admin/unPaidUser" element={<UnPaidUser/>} />
            <Route path="/admin/userProperties" element={<UserPropertyTable/>}/>

            
            
            <Route path="/admin/news/updatenews/:id" element={<Updatenews/>} />
      </Route>
        <Route path="/admin" element={<AdminLogin/>} />
    </Routes>
    </BrowserRouter> 
    </>
  )
 };

 const ConditionalNavbar=()=>{
  const location=useLocation();
  const hideNavbarRoutes=["/admin","/admin/dashboard","/admin/projects","/admin/messages","/admin/addProperty","/admin/projects/updateProperty","/admin/users","/admin/news","/admin/addNews","/admin/news/updatenews/:id","/admin/bookings","/admin/contact","/admin/allrentedProperties","/admin/unPaidUser"];
  // return !hideNavbarRoutes.includes(location.pathname)?<Navbar/>:null;
  const shouldHideNavbar=hideNavbarRoutes.some(route=>location.pathname.startsWith(route));
  return shouldHideNavbar?null:<Navbar/>;
 }
export default App
