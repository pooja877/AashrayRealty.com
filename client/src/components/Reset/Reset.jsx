import './Reset.scss';
// import { useDispatch,useSelector } from 'react-redux';
// import {  useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import { updateUserStart ,updateUserSuccess,updateUserFailure} from '../../redux/user/userSlice.js';
export default function Reset() {

  // const {currentUser, loading}=useSelector((state)=>state.user);
  //   const [formData, setFormData] = useState({});
  //   const dispatch=useDispatch();
  //   const navigate=useNavigate();
   
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, 
  //       [e.target.id]: e.target.value });
  //   };

  // const handleSubmit=async (e)=>{
  //   e.preventDefault();
  //   try{
  //     dispatch(updateUserStart());
  //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(updateUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(updateUserSuccess(data));
  //     navigate('/signin');
  //   }
  //   catch(error)
  //   {
  //     dispatch(updateUserFailure(error.message));
      
  //   }
  // } onSubmit={handleSubmit}  onChange={handleChange}
  return (
    <div className='reset'>
    <div className="container">
    <h2>Change Password</h2>
    <form action="" >
      <label htmlFor='new-password'>New Password </label>
      <input type="password" id="new-password" placeholder='Enter new Password' required />
      <label htmlFor='confirm-password'>Confirm Password </label>
      <input type="password" id="confirm-password"placeholder='Confirm new Password' required />
      {/* <button  disabled={loading}>
           {loading ? 'Loading...' : 'Reset Password'}
           </button> */}
           <button>Reset Password</button>
     </form>
    </div>
   </div>
  )
}
