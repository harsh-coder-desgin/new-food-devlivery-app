"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const restaurantsSignin = () => {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter()

  const Submitform = async (e) => {
    e.preventDefault();
    if (!name || !contact || !address || !city || !email || !password) {
      setError(true);
    }
    else {
      setError(false);

      let response = await fetch("api/restaurant", {
        method: "POST",
        body: JSON.stringify({ name, contact, address, city, email, password })
      })
      response = await response.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push('/restaurants/dashboard')
      }
    }

  };
  const validateEmail = () => {
  if (!email || !email.endsWith('@gmail.com')) {
    setError(true);
  } else {
    setError(false);
  }
};
const validateContact = () => {
  if (!contact || contact.length < 10 || !/^\d{10,}$/.test(contact)) {
    setError(true);
  } else {
    setError(false);
  }
};
const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    setError(true);
  } else {
    setError(false);
  }
};
  return (
    <>
    <div className="min-h-screen flex flex-col justify-center  px-4 py-12 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-xl">
    <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
      Create Account
    </h2>
  </div>

  <form
    className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl bg-white p-8 rounded-lg shadow-md"
    onSubmit={Submitform}
    noValidate
  >
    <div className="space-y-8 border-b border-gray-200 pb-8">
      {/* Restaurant Name */}
      <div>
        <label htmlFor="restaurant-name" className="block text-sm font-medium text-gray-700">
          Enter Restaurant Name
        </label>
        <input
          id="restaurant-name"
          name="restaurant-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
          aria-invalid={error && !name ? 'true' : 'false'}
          aria-describedby="name-error"
          placeholder="My Restaurant"
          required
        />
        {error && !name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            Please fill out this field
          </p>
        )}
      </div>

      {/* Contact */}
     <div>
  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
    Contact
  </label>
  <input
    id="contact"
    name="contact"
    type="text"
    value={contact}
    onChange={(e) => setContact(e.target.value)}
    onBlur={validateContact}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby="contact-error"
    placeholder="1234567890"
    required
  />
  {error && (
    <p id="contact-error" className="mt-1 text-sm text-red-600">
      {contact === ''
        ? 'Please fill out this field'
        : contact.length < 10 || !/^\d{10,}$/.test(contact)
        ? 'Please enter a valid contact number (min 10 digits)'
        : ''}
    </p>
  )}
</div>


      {/* Address & City */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
        <div className="flex-1">
          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            id="street-address"
            name="street-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
            aria-invalid={error && !address ? 'true' : 'false'}
            aria-describedby="address-error"
            placeholder="123 Main St"
            required
          />
          {error && !address && (
            <p id="address-error" className="mt-1 text-sm text-red-600">
              Please fill out this field
            </p>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
            aria-invalid={error && !city ? 'true' : 'false'}
            aria-describedby="city-error"
            placeholder="Surat"
            required
          />
          {error && !city && (
            <p id="city-error" className="mt-1 text-sm text-red-600">
              Please fill out this field
            </p>
          )}
        </div>
      </div>

      {/* Email */}
     <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    id="email"
    name="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby="email-error"
    placeholder="you@gmail.com"
    required
  />
  {error && (
    <p id="email-error" className="mt-1 text-sm text-red-600">
      {email === ''
        ? 'Please fill out this field'
        : !email.endsWith('@gmail.com')
        ? 'Please enter a valid Gmail address'
        : ''}
    </p>
  )}
</div>


      {/* Passwords */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
      <div className="flex-1">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    id="password"
    name="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onBlur={validatePassword}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby="password-error"
    placeholder="••••••••"
    required
  />
  {error && (
    <p id="password-error" className="mt-1 text-sm text-red-600">
      {password === ''
        ? 'Please fill out this field'
        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
        ? 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
        : ''}
    </p>
  )}
</div>

        <div className="flex-1">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
            aria-invalid={error && !password ? 'true' : 'false'}
            aria-describedby="confirm-password-error"
            placeholder="••••••••"
            required
          />
        {error && (
    <p id="password-error" className="mt-1 text-sm text-red-600">
      {password === ''
        ? 'Please fill out this field'
        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
        ? 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
        : ''}
    </p>
  )}
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <div className="mt-8">
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition"
      >
        Create Account
      </button>
    </div>
  </form>
</div>

    </>
  );
};

export default restaurantsSignin;
