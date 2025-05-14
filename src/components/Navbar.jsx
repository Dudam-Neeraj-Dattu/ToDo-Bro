import React from 'react'

const Navbar = () => {
   return (
      <div className="flex justify-between items-center bg-gray-800 text-white p-4 text-xl font-bold px-10 max-sm:px-5">
         <div className="appName cursor-pointer">
            <h1>Todo Bro</h1>
         </div>
         <div className="extraHeadings flex gap-5 cursor-pointer">
            <h1>Home</h1>
            <h1>My Tasks</h1>
         </div>
      </div>
   )
}

export default Navbar
