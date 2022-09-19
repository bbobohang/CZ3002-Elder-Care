import React, { useState } from 'react';
import Logo from '../../asset/eldercare.jpg';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
	const navigate = useNavigate();
	const logout = () => {
		axios.post(`/api/auth/logout`).then((response) => {
			console.log(response);
		});

		navigate('/');
	};

	//Doctor Navbar
	if (role === 'doctor') {
		return (
			<div className='row'>
				<nav className='nav'>
					<div className='navWrapper'>
						<div className='navLogo'>
							<img src={Logo} alt='Logo' />
						</div>
						<ul className='navList'>
							<li className='navItem'>
								<a className='listItem' href='/dhome'>
									Dashboard
								</a>
							</li>

							<li className='navItem'>
								<a className='listItem' href='#projects'>
									Appointments
								</a>
							</li>
							<li className='navItem'>
								<a className='listItem' href='/dmed/accept'>
									Accept Meds
								</a>
							</li>

							<li className='navItem'>
								<a className='listItem'>
									<div class='navigation'>
										<CgProfile size={25} />
										<div class='navigation-content'>
											<a href='/profile'>Profile</a>
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
	} else {
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
								<a className='listItem' href='#projects'>
									Appointments
								</a>
							</li>
							<li className='navItem'>
								<a className='listItem' href='/pmed/status'>
									Med Orders
								</a>
							</li>
							<li className='navItem'>
								<a className='listItem' href='#experiences'>
									Wallet
								</a>
							</li>

							<li className='navItem'>
								<a className='listItem'>
									<div class='navigation'>
										<CgProfile size={25} />
										<div class='navigation-content'>
											<a href='/profile'>Profile</a>
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
	}
};

export default Navbar;
