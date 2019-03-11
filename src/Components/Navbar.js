import React from 'react';
import '../Styles/Navbar.css';
import { Link} from 'react-router-dom'; 

const Navbar = (props) => {
	return (
		<nav className='navbar'> 
			<Link className='page-title' to="/">typetest</Link>
			<Link className='heading' to="/profile">Profile</Link>
			<Link className='heading' to="/contact">Contact</Link>
			<Link className='heading' to="/about">About</Link>
		</nav>
	);
}

export default Navbar;
