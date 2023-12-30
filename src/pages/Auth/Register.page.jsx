import React, { useEffect, useState } from 'react'
import img from "../../assets/register.jpg"
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { Spin, message } from 'antd';
import { useAddUserMutation } from '../../redux/APIs/authApi';
const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUser, {isLoading, error, isError, isSuccess}]=useAddUserMutation()
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your signup logic here
    console.log('Form submitted:', formData);
    await createUser(formData)
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (isSuccess && !error && !isLoading) {
      message.success("Registration successful");
      setIsSubmitting(false);
      // setIsModalOpen(false);
    } else if (isError && !isSuccess && !isLoading) {
      message.error(error?.data?.message);
      setIsSubmitting(false);
    }
  }, [isLoading, isError, isSuccess, error]);

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
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="Email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                name="Password"
                value={formData.Password}
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
              className={`${
                isSubmitting
                  ? "transition-all duration-200"
                  : "bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200"
              }`}
            >
              {isSubmitting ? <Spin /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register