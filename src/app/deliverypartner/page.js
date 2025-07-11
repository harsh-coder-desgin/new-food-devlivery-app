"use client"

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react'; // Optional: Use heroicons, fontawesome, etc.


const Page = () => {

  const router = useRouter();

  const [loginmoblie, setloginmoblie] = useState('');
  const [loginpassword, setloginpassword] = useState('');
  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [moblie, setmobile] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'))
    if (delivery) {
      router.push('/deliverydashboard')
    }
  })

  const handlesignup = async (e) => {
    e.preventDefault();
    if (!name || !password || !city || !address || !moblie) {
      setError(true);
    } else {
      setError(false)

    let response = await fetch("api/deliverypartners/signup", {
      method: "post",
      body: JSON.stringify({ name, password, city, address, moblie })
    });

    response = await response.json();

    if (response) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push('/deliverydashboard')
    }
  }
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    if (!loginmoblie || !loginpassword) {
      setError(true);
    } else {
      setError(false)

    let response = await fetch("api/deliverypartners/login", {
      method: "post",
      body: JSON.stringify({ moblie: loginmoblie, password: loginpassword })
    })

    response = await response.json();

    if (response.success) {
      const { result } = response
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push('/deliverydashboard')
    } else {
      alert(response.message)
    }
  }
  }
  return (
    <>
      <DeliveryHeader />
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-6 mb-4 text-gray-800">Delivery Partner</h1>

<div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 gap-8 py-6">
  {/* Login Box */}
  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

    <form className="space-y-4" onSubmit={handlelogin}>
      <div>
        <label className="block text-gray-700 mb-1">Mobile</label>
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={loginmoblie}
          onChange={(e) => setloginmoblie(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         {error && !loginmoblie && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              Please enter your number.
            </p>
          )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={loginpassword}
          onChange={(e) => setloginpassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         {error && !loginpassword && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              Please enter your password.
            </p>
          )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Login
      </button>
    </form>
  </div>

  {/* Signup Box */}
  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

    <form className="space-y-4" onSubmit={handlesignup}>
      <div>
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
          {error && (
  <p id="name-error" className="mt-1 text-sm text-red-600">
    {name === ''
      ? 'Please fill out this field'
      : !/^[a-zA-Z\s]+$/.test(name)
      ? 'Name cannot contain numbers or special characters'
      : ''}
  </p>
)}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Mobile</label>
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={moblie}
          onChange={(e) => setmobile(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
          {error && (
    <p id="contact-error" className="mt-1 text-sm text-red-600">
      {moblie === ''
        ? 'Please fill out this field'
        : moblie.length < 10 || !/^\d{10,}$/.test(moblie)
        ? 'Please enter a valid contact number (min 10 digits)'
        : ''}
    </p>
  )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
         {error && !address && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
Please fill out this field            </p>
          )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
         {error && !city && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
Please fill out this field            </p>
          )}
      </div>

       <div className="relative mb-4">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-9 right-3 text-gray-500 focus:outline-none"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        {error && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {password === ""
              ? "Please fill out this field"
              : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
              ? "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
              : ""}
          </p>
        )}
      </div>

      <div className="relative mb-4">
        <label className="block text-gray-700 mb-1">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute top-9 right-3 text-gray-500 focus:outline-none"
        >
          {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        {error && (
          <p id="confirm-password-error" className="mt-1 text-sm text-red-600">
            {confirmpassword === ""
              ? "Please fill out this field"
              : password !== confirmpassword
              ? "Passwords do not match"
              : ""}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>

    </>

  );
};

export default Page;
