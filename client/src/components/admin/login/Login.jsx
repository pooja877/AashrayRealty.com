import './Login.scss'
import  { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin () {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
         e.preventDefault();
        try {
            const response = await fetch('/api/admin/adminLogin', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            if (response.ok) {
             localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong',err);
        }
    };

    return (
        <div className='logIn'>
            <h1>Admin Login</h1>
            <form action=" "onSubmit={handleLogin}>
            <input type="email" ref={emailRef} placeholder="Email" />
            <input type="password" ref={passwordRef} placeholder="Password" />
            <button>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminLogin;

