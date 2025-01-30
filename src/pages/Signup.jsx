import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState(false)
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!formData.userName.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(formData.email)) newErrors.email = 'Invalid email address.';
        if (!formData.password) newErrors.password = 'Password is required.';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true); // Start loading
            try {
                const response = await fetch("https://blog-app-backend-s93x.onrender.com/api/users/signup", {
                    method: "POST", // Method name should be a string
                    headers: {
                        "Content-Type": "application/json" // Specify that you're sending JSON data
                    },
                    body: JSON.stringify(formData) // Use `JSON.stringify` to convert the object to JSON format
                });
                const data = await response.json()
                if (!response.ok) {
                    toast.error(data.message); // Show error toast

                }
                else {
                    toast.success("Signed in successfully!"); // Show success toast
                    navigate('/signin'); // Redirect to signin page
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setLoading(false); // Stop loading
            }

        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="userName" className="block text-sm font-medium mb-1">userName</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                </div>

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
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/signin')}
                    >
                        Sign in here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Signup;
