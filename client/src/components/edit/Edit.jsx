import './Edit.scss'
import { useDispatch,useSelector } from 'react-redux';
import {  useState } from 'react';
import { updateUserStart ,updateUserSuccess,updateUserFailure} from '../../redux/user/userSlice.js';

export default function Edit() {
  // const fileRef = useRef(null);
  // const [ setFile] = useState(undefined);
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
    <div className='mainContainer'>
        <div className="container">
        
         <form onSubmit={handleSubmit}>
         {/* <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={ currentUser.avatar}
          alt='profile'
          
        /> */}
         <img src={currentUser.avatar} action=""/>
           Username: <input type="text" placeholder={currentUser.username} id="username"onChange={handleChange}/>
           Email: <input type="email" placeholder={currentUser.email} id='email' onChange={handleChange}/>  
           {/* Password: <input type="Password" placeholder={currentUser.password} id='password' onChange={handleChange}/>   */}
           <button  disabled={loading}>
           {loading ? 'Loading...' : 'Save Changes'}
           </button>
         </form> 
        </div>
     </div>
  )
}
