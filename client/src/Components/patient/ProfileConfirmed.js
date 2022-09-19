import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './MedConfirmed.css';

const ProfileConfirmed = () => {
	const navigate = useNavigate();
	return (
		<>
			<Navbar />

			<div className='confirmedContainer'>
				<div className='confirmedWrapper'>
					<div className='confirmedBanner'>
						<div className='leftConfirmed'>
							<BsFillCheckCircleFill color={'green'} size={100} />
						</div>
						<div className='rightConfirmed'>
							<h2>Profile Updated</h2>
							<p>We have updated your profile!</p>
						</div>
					</div>
					<div className='backHomeContainer'>
						<button className='headerBtn' onClick={() => navigate('/phome')}>
							BACK TO HOME
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default ProfileConfirmed;
