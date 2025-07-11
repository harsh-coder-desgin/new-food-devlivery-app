"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = (props) => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
    } else {
      setError(false)
    

    let response = await fetch("api/user/login", {
      method: "post",
      body: JSON.stringify({ email, password })
    })

    response = await response.json();

    if (response.success) {
      const { data } = response
      delete data.password;
      localStorage.setItem("user", JSON.stringify(data));

      if (props?.redirect?.order) {
        router.push('/order')
      } else {
        router.push('/')
      }
    } else {
      alert(response.message)
    }

    }
  }

  return (
    <>
     <div className="flex justify-center mt-10 px-4">
  <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl mt-14">
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="email-description"
          />
            {error && !email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              Please enter your email address.
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           {error && !password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              Please enter your password.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            onClick={handlelogin}
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  );
};

export default UserLogin;
