import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <Link to="/login" className="">Login</Link>
         &nbsp;
        <Link to="/result" className="">Result</Link>
    </footer>
  )
}

export default Footer;