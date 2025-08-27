import React from 'react'
import Sidebar from '../Components/Header_Sidebar/Sidebar'
import Header from '../Components/Header_Sidebar/Header'

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <Header />
            </header>

            <main className='dashboard_main_content'>
                {children}
            </main>

            <section>
                <Sidebar />
            </section>
        </>
    )
}

export default Layout