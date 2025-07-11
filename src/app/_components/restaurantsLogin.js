"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const restaurantsLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const Submitlogin = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError(true);
    } else {
      setError(false)

      let response = await fetch("api/restaurant", {
        method: "POST",
        body: JSON.stringify({ email, password })
      })

      response = await response.json();

      if (response.success) {
        alert("Login successful")
        let { data } = response;
        delete data.password;
        localStorage.setItem("restaurantUser", JSON.stringify(data));
        router.push('/restaurants/dashboard')
      } else {
        alert(response.message)
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
      Log in to your account
    </h2>
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <form className="space-y-6" onSubmit={Submitlogin} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            aria-invalid={error && !email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {error && !email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              Please enter your email address.
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            aria-invalid={error && !password ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          {error && !password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              Please enter your password.
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
        >
          Log in
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default restaurantsLogin;
