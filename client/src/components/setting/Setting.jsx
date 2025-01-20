import './Setting.scss';
import { useSelector } from 'react-redux';
export default function Setting() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
       
    <div className='main-container'>
    <div className="container">
      <h2>Delete my account</h2>
       <p>Username:  {currentUser.username} </p>
       <p>Email:{currentUser.email} </p>
       <button  >
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
