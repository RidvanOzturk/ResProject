import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    
    /*<footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
      © 2023 Copyright:
      <a
        className="text-neutral-800 dark:text-neutral-400"
        href="https://tailwind-elements.com/"
      >TW Elements</a>
    </div>*/
    <footer>
        <Link to="/login" className="">Login</Link>
         &nbsp;
        <Link to="/result" className="">Result</Link>
    </footer>
  )
}

export default Footer;