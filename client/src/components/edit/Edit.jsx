import './Edit.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice.js';

export default function Edit() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("avatar", file);
  
    try {
      const res = await fetch(`/api/user/profileupload/${currentUser._id}`, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
  
      setPreview(data.avatar); // Use actual uploaded image URL
      setFormData({ ...formData, avatar: data.avatar });
      dispatch(updateUserSuccess({ ...currentUser, avatar: data.avatar }));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const updateRes = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, avatar: preview }), // Update avatar preview
      });

      const updateData = await updateRes.json();
      if (!updateRes.ok) throw new Error(updateData.message || "Profile update failed");

      dispatch(updateUserSuccess(updateData));
      alert("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      alert(error.message);
    }
  };

  return (
    <div className='mainContainer'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleFileUpload}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img onClick={() => fileRef.current.click()} src={preview||currentUser.avatar} alt='profile' />
          <label>Username:</label>
          <input type="text" placeholder={currentUser.username} id="username" onChange={handleChange} />
          <label>Email:</label>
          <input type="email" placeholder={currentUser.email} id='email' onChange={handleChange} />
          <button disabled={loading}>{loading ? 'Loading...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}


