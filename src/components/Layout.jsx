import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
 
    return (
        <div className='flex flex-col min-h-screen px-6 py-8'>
            <Header />
            <main className='flex-grow'>

            {children}

            </main>
            <Footer />
        </div>
    )
}

export default Layout