import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
    const navigate = useNavigate();
    const { token, handleLogout } = useAuth();

const logout = () => {
    handleLogout()
    toast.success("You Logged out successfully!")
    navigate('/signin')
}
    return (
        <div>
            <header>
                <div className='flex justify-between items-center bg-gray-500 text-white px-2 py-6 text-xs sm:text-sm md:text-lg'>
                    <Link to="/">
                        <h2>Johnova blog</h2>
                    </Link>

                    <nav className='space-x-6 hidden md:block'>

                        <Link to="/">Home</Link>
                        <Link to="/all">All Blogs</Link>
                        <Link to="about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>

                    {token ? (
                        <div className='space-x-6 hidden md:block'>
                            <Link to="/dashboard">Dashboard</Link>
                            <button type='button' onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div className='space-x-6 hidden md:block'>
                            <Link to="/signin">SignIn</Link>
                            <Link to="/signup">SignUp</Link>
                        </div>
                    )}

                    <Menu className='md:hidden' />

                </div>
            </header>
        </div>
    )
}
 
 
export default Header