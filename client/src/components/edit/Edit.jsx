import './Edit.scss'
import { useDispatch,useSelector } from 'react-redux';
import {  useState } from 'react';
import { updateUserStart ,updateUserSuccess,updateUserFailure} from '../../redux/user/userSlice.js';

export default function Edit() {

    const {currentUser, loading}=useSelector((state)=>state.user);
    const [formData, setFormData] = useState({});
    const dispatch=useDispatch();
   
    const handleChange = (e) => {
      setFormData({ ...formData, 
        [e.target.id]: e.target.value });
    };


    const handleSubmit=async (e)=>{
      e.preventDefault();
      try{
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
      }
      catch(error)
      {
        dispatch(updateUserFailure(error.message));
        
      }
    }
  return (
    <div className='main-container'>
        <div className="container">
        <img src={currentUser.avatar} action=""/>
         <form onSubmit={handleSubmit}>
           Username: <input type="text" placeholder={currentUser.username} id="username"onChange={handleChange}/>
           Email: <input type="email" placeholder={currentUser.email} id='email' onChange={handleChange}/> 
           <button  disabled={loading}>
           {loading ? 'Loading...' : 'Save Changes'}
           </button>
         </form> 
        </div>
     </div>
  )
}
