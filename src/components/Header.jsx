import { Menu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <header>
                <div className='flex justify-between items-center bg-gray-500 text-white px-2 py-6 text-xs sm:text-sm md:text-lg'>
                    <Link to="/">
                       <h2>Johnova blog</h2>
                    </Link>

                    <nav className='space-x-6 hidden md:block'>
                     
                       <Link to="/category">Category</Link>
                       <Link to="/article">Article</Link>
                       <Link to="about">About</Link>
                       <Link to="/contact">Contact</Link>
                    </nav>

                    <div className='space-x-6 hidden md:block'>
                       <button>SignIn</button>
                       <button>SignUp</button>
                    </div>

                    <Menu className='md:hidden' />

                </div>
            </header>
        </div>
    )
}

export default Header