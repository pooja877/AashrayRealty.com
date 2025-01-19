import './Edit.scss'
import { useSelector } from 'react-redux';
export default function Edit() {
    const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='main-container'>
        
        <div className="container">
        <img src={currentUser.avatar}/>
         <form>
           Username: <input type="text" placeholder={currentUser.username} id="username"/>
           Email: <input type="email" placeholder={currentUser.email} id='email' /> 
         </form>
        
         <button className='btnChanges'>Save Changes</button>
       
        </div>
     </div>
  )
}
