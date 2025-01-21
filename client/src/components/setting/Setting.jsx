import './Setting.scss';
import { useSelector,useDispatch } from 'react-redux';
import { deleteUserStart ,deleteUserSuccess,deleteUserFailure} from '../../redux/user/userSlice.js';
export default function Setting() {

  const {currentUser} = useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const handleDeleteUser=async ()=>{
    try{
     dispatch(deleteUserStart());
             const res = await fetch(`/api/user/delete/${currentUser._id}`, {
               method: 'DELETE',
             });
             console.log(res);
             const data = await res.json();
             console.log(data);
             if (data.success === false) {
               dispatch(deleteUserFailure(data.message));
               return;
             }
             dispatch(deleteUserSuccess(data));

    }catch(error){
        dispatch(deleteUserFailure(error.message));
    }
  }
  return (
       
    <div className='main-container'>
    <div className="container">
      <h2>Delete my account</h2>
       <p>Username:  {currentUser.username} </p>
       <p>Email:{currentUser.email} </p>
       <button onClick={handleDeleteUser} >
       Confirm
       </button>
    </div>
    {/* delete account details */}
    <div className="details">
      <h3>Note:</h3>
    <p className=''>Deleting your account is permanent. You will not be able to receive any future communication from AashrayRealty.com and will not be able to retrieve your information after deletion. The account will be deleted & you will be given a brief period to retrieve your details.</p>
    </div>
    </div>
   
    


  )
}
