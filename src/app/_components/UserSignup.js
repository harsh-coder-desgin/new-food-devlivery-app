import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react'; // Optional: Use heroicons, fontawesome, etc.


const UserSignup = (props) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [moblie, setMoblie] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !moblie || !address || !city || !email || !password) {
      setError(true);
    }
    else {
      setError(false);
    let response = await fetch("api/user", {
      method: "post",
      body: JSON.stringify({ name, email, password, city, address, moblie })
    });

    response = await response.json();

    if (response) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props?.redirect?.order) {
        router.push('/order')
      } else {
        router.push('/')
      }
    }

  }
}
  return (
    <>
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Password and Confirm Password (side by side) */}
         <div className="mb-4 flex space-x-4">
  {/* Password Field */}
  <div className="w-1/2 relative">
    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
      Password
    </label>
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
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
        {password === ''
          ? 'Please fill out this field'
          : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
          ? 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
          : ''}
      </p>
    )}
  </div>

  {/* Confirm Password Field */}
  <div className="w-1/2 relative">
    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
      Confirm Password
    </label>
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      id="confirmPassword"
      name="confirmPassword"
      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
      placeholder="Confirm your password"
      value={confirmpassword}
      onChange={(e) => setConfirmpassword(e.target.value)}
      required
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
        {confirmpassword === ''
          ? 'Please fill out this field'
          : password !== confirmpassword
          ? 'Passwords do not match'
          : ''}
      </p>
    )}
  </div>
</div>      



          {/* City and Address (side by side) */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
               {error && !city && (
            <p id="city-error" className="mt-1 text-sm text-red-600">
              Please fill out this field
            </p>
          )}
            </div>
            <div className="w-1/2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              {error && !address && (
            <p id="address-error" className="mt-1 text-sm text-red-600">
              Please fill out this field
            </p>
          )}      </div>
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your mobile number"
              value={moblie}
              onChange={(e) => setMoblie(e.target.value)}
              required
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

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              onClick={handlesubmit}
              className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default UserSignup;