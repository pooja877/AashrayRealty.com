import './Reset.scss';
export default function Reset() {
  return (
    <div className='reset'>
    <div className="container">
    <h2>Change Password</h2>
    <form action="" >
      <label htmlFor='new-password'>New Password </label>
      <input type="password" id="new-password" placeholder='Enter new Password'
                required />
      <label htmlFor='confirm-password'>Confirm Password </label>
      <input type="password" id="confirm-password"placeholder='Confirm new Password' required />
      {/* <button  disabled={loading}>
           {loading ? 'Loading...' : 'Reset Password'}
           </button> */}
           <button >Reset Password</button>
     </form>
    </div>
   </div>
  )
}
