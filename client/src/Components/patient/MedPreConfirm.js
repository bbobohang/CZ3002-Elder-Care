import React from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './MedPreConfirm.css';
import Footer from './Footer';

const MedPreConfirm = () => {
	const location = useLocation();
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
			<div className='preContainer'>
				<div className='preWrapper'>
					<div className='preTitle'>Booking confirmation</div>
					<div className='preFirstRow'>
						<div className='preLeft'>
							<p>Booking Type</p>
							<p>Booking For</p>
						</div>
						<div className='preRight'>
							<p>Medication Delivery</p>
							<p>Marco Polo</p>
						</div>
					</div>
					<div className='preFirstRow'>
						<div className='preLeft'>
							<p>Delivery Date</p>
							<p>Estimated Delivery Time Picked</p>
							<p>Delivery Address</p>
						</div>
						<div className='preRight'>
							<p>{location.state.orderDetails.medication_date}</p>
							<p>{location.state.orderDetails.time}</p>
							<p>1223 abc road, #01-01, S123456</p>
						</div>
					</div>
					<div className='preFirstRow'>
						<div className='preLeft'>
							<p>Order Details</p>

							<p>Order Quantity</p>
							<p>Total Price</p>
						</div>
						<div className='preRight'>
							<p>{location.state.orderDetails.medication_name}</p>
							<p>{location.state.orderDetails.medication_quantity}</p>
							<p>$20</p>
						</div>
					</div>

					<div className='submitContainer'>
						<button
							className='headerBtn'
							onClick={() => navigate('/pmed/med-booking-confirmed')}
						>
							CONFIRM ORDER
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MedPreConfirm;
