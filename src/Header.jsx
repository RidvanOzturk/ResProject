import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <Link to="/login" className="">Login</Link>
        &nbsp;
        <Link to="/result" className="">Result</Link>
    </header>
  )
}

export default Header;