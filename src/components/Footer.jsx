import React from 'react'
import { IoLogoGithub } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="footer bg-gray-800 p-2 text-center text-xl font-bold flex justify-center items-center">      
      <a href="https://github.com/Dudam-Neeraj-Dattu"><IoLogoGithub className="h-10 w-10 invert"/></a>
    </div>
  )
}

export default Footer
