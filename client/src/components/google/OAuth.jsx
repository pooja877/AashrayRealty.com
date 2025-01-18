import { app } from '../../firebase';
import './OAuth.scss'
import {useDispatch} from 'react-redux';
import {signInSuccess} from "../../redux/user/userSlice";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try{
                const provider=new GoogleAuthProvider();
                const auth=getAuth(app);

                const result=await signInWithPopup(auth,provider);
                const res=await fetch('/api/auth/google',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})

                });
                const data=await res.json();
                dispatch(signInSuccess(data));
                navigate('/');
        }
        catch(error)
        {
            console.log('could  not connect with google',error);
        }
    }
  return (     
        <button className="google_btn" onClick={handleGoogleClick}>
            <img src="google_logo.jpg" alt="Gooogle_logo" />
          <p>  Continue with Google</p>
        </button>
  );
}
