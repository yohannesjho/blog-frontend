import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(formData.email)) newErrors.email = 'Invalid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST", // Method name should be a string
        headers: {
          "Content-Type": "application/json" // Specify that you're sending JSON data
        },
        body: JSON.stringify(formData) // Use `JSON.stringify` to convert the object to JSON format
      });



      if (!response.ok) {
        const data = await response.json()
        alert(data.message)
      }
      else {
        const data = await response.json()
        console.log(data)

        localStorage.setItem('token', data)
        alert("You signed in successfully!");
        navigate('/'); // Redirect to home page
      }

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signin;
