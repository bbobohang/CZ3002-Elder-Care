import React from 'react';
import './Navbar.css';
import Logo from '../asset/eldercare.jpg';

const Navbar = () => {
	return (
        <div className='row'>
			<div className='navWrapper'>
				<div className='navLogo'>
					<img className='logo' src={Logo} alt='Logo' />
				</div>
			</div>
        </div>
	);
};

export default Navbar;
