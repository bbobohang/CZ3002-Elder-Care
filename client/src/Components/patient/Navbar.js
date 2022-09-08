import React, { useState } from 'react';
import './Navbar.css';
import Logo from '../../asset/eldercare.jpg';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
	let [isOverButton, setIsOverButton] = useState(false);
	let [isOpen, setIsOpen] = useState('false');

	return (
		<div className='row'>
			<nav className='nav'>
				<div className='navWrapper'>
					<div className='navLogo'>
						<img src={Logo} alt='Logo' />
					</div>
					<ul className='navList'>
						<li className='navItem'>
							<a className='listItem' href='/phome'>
								Home
							</a>
						</li>
						<li className='navItem'>
							<a className='listItem' href='#skills'>
								Book A Service
							</a>
						</li>
						<li className='navItem'>
							<a className='listItem' href='#projects'>
								Appointments
							</a>
						</li>
						<li className='navItem'>
							<a className='listItem' href='#experiences'>
								Wallet
							</a>
						</li>
						<li className='navItem'>
							<a className='listItem' href='/pmed/status'>
								Med Orders
							</a>
						</li>
						<li className='navItem'>
							<a className='listItem listIcon hoverMe'>
								<CgProfile size={25} />
							</a>
							<div className='hoverMenu'>
								<p>My Profile</p>
								<p>Log Out</p>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
