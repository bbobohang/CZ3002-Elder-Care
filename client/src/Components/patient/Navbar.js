import React, { useState } from 'react';
import Logo from '../../asset/eldercare.jpg';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	const logout = () => {
		axios.post(`/api/auth/logout`).then((response) => {
			console.log(response);
		});

		navigate('/login');
	};

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
							<a className='listItem'>
								<div class='navigation'>
									<CgProfile size={25} />
									<div class='navigation-content'>
										<a href='#'>Profile</a>
										<a href='#' onClick={logout}>
											Log Out
										</a>
									</div>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
