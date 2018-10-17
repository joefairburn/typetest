import React from 'react';
import '../Styles/Navbar.css';

const Navbar = (props) => {
	return (
		<div className='navbar'> 
			<a className='page-title' href='#home'>typetest</a>
			<a className='heading' href="#news">News</a>
			<a className='heading' href="#contact">Contact</a>
			<a className='heading' href="#about">About</a>
		</div>
	);
}

export default Navbar;
