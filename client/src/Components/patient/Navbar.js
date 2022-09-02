import React from 'react';
import './Navbar.css';
import Logo from '../../asset/eldercare.jpg';
import { CgProfile } from 'react-icons/cg';
const Navbar = () => {
	return (
		<div className='row'>
			<nav className='nav'>
				<div className='navWrapper'>
					<div className='navLogo'>
						<img src={Logo} alt='Logo' />
					</div>
					<ul className='navList'>
						<li className='navItem'>
							<a className='listItem' href='/record'>
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
							<a className='listItem listIcon' href='#experiences'>
								<CgProfile size={25} />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
