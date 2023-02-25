import { getAuth, updateProfile } from 'firebase/auth';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {

  const auth = getAuth()
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const {name, email} = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onsubmit() {
    try {
      if(auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // Update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        });
        toast.success('Profile details updated');
      }
      
    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
          <h1 className='text-3ml text-center mt-6 font-bold'>My Profile</h1>
          <div className='w-full md:w-[50%] mt-6 px-3'>
            <form>
            <label>Full Name:</label>
              <input type='text' id='name' value={name} disabled={!changeDetail} onChange={onChange}
                className={`mb-6 w-full rounded-3xl px-4 py-2 text-xl text-gray-700 bg-white ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
              <label>Email:</label>
              <input type='email' id='email' value={email} disabled 
                className='mb-6 w-full rounded-3xl px-4 py-2 text-xl text-gray-700 bg-white'/>

                <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
                  <p className='flex items-center'>Do you want to change your name?
                    <span onClick={() => {
                      changeDetail && onsubmit();
                      setChangeDetail((prevState) => !prevState)
                    }} 
                    className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                    {changeDetail ? "Apply change" : "Edit"}</span>
                  </p>
                  <p onClick={onLogout} className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 cursor-pointer'>Log out</p>
                 
                </div>
            </form>
          </div>
      </section>
    </>
  )
}
