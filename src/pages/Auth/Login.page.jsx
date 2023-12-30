import React, { useState } from 'react'
import img from "../../assets/login.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
const Login = () => {
   const [formData, setFormData] = useState({
     email: "",
     password: "",
   });

   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };

   const handleTogglePassword = () => {
     setShowPassword(!showPassword);
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     // Add your login logic here
     console.log("Form submitted:", formData);
   };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-5 lg:flex-row justify-around items-center">
        <div>
          <img src={img} className="h-[500px]" alt="" />
        </div>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 12s3 9 8 9 8-9 8-9-3-9-8-9-8 9-8 9z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 12s3 9 8 9 8-9 8-9-3-9-8-9-8 9-8 9z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login