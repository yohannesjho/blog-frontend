import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
 
    return (
        <div className='flex flex-col min-h-screen  md:px-6 md:py-8'>
            <Header />
            <main className='flex-grow px-4 md:px-14 py-24'>

            {children}

            </main>
            <Footer />
        </div>
    )
}

export default Layout