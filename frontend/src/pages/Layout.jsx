import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, showsidebar = false }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showsidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">  {/* fixed typo here */}
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
