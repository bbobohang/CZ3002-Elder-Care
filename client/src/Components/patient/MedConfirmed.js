import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './MedConfirmed.css';

const MedConfirmed = () => {
	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Medicine Delivery <br />
							to your Doorstep
						</h1>
						<p>
							Order medications online and have them delivered straight to your
							doorstep.
							<br /> Same-day delivery, island wide.
						</p>
						<button className='headerBtn'>ORDER MEDICINE</button>
					</div>
					<div className='headerRight headerMed'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer innerMed'>
								<h1>Medication</h1>
								<p>Verified Specialists</p>
							</div>
							<div className='innerContainer innerContainerBorder innerMed'>
								<h1>Affordable</h1>
								<p>$20 / delivery</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='confirmedContainer'>
				<div className='confirmedWrapper'>
					<div className='confirmedBanner'>
						<div className='leftConfirmed'>
							<BsFillCheckCircleFill color={'green'} size={100} />
						</div>
						<div className='rightConfirmed'>
							<h2>Booking Confirmed</h2>
							<p>
								We have booked your delivery for the selected date. Please make sure
								someone is present during the allocated delivery time to receive your
								medicine order.{' '}
							</p>
						</div>
					</div>
					<div className='backHomeContainer'>
						<button className='headerBtn' onClick={() => navigate('/pmed')}>
							BACK TO HOME
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default MedConfirmed;
