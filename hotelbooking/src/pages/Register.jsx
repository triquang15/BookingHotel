import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { email, password, fullname} = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">
       Create Your Booking Account
      </h1>
      <h6 className="text-center mt-6">Already have an Booking Account? <b> <Link
                  to="/login"
                  className="text-sky-600 hover:text-sky-700 transition duration-200 ease-in-out ml-1"
                >
                  Sign In
                </Link></b></h6>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[60%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
          />
        </div>
        <div className="w-full md:w-[60%] lg:w-[40%] lg:ml-20">
          <form>

          <input
              className="w-full mb-6 rounded-3xl px-4 py-2 text-xl text-gray-700 bg-white"
              type="text"
              id="fullname"
              value={fullname}
              onChange={onChange}
              placeholder="Full name (*)"
            />
          
            <input
              className="w-full mb-6 rounded-3xl px-4 py-2 text-xl text-gray-700 bg-white"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address (*)"
            />
            <div className="relative">
            <input
              className="w-full rounded-3xl px-4 py-2 text-xl text-gray-700 bg-white"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password (*)"
            />
            {showPassword ? <AiFillEyeInvisible 
              className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/> : 
            <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />}
            </div>
            <br/>
           
            <button className="w-full bg-lime-700 text-white px-7 py-3
          text-sm font-medium uppercase rounded shadow-md hover: bg-lime-800
          transition duration-150 ease-in-out hover:shadow-lg active:bg-lime-900" type="submit">Create Account</button>

          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-red-300
          after:border-t after:flex-1 after:border-red-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth/>
          </form>
         
        </div>
      </div>
    </section>
  );
}
