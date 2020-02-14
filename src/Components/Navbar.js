import React from 'react';
import {Link} from 'react-router-dom'; 

const Navbar = (props) => {
	return (
		<nav className='navbar'> 
			<Link className='page-title' to="/">typetest</Link>
			<Link className='heading' to="/profile">Profile</Link>
		</nav>
	);
}

export default Navbar;
