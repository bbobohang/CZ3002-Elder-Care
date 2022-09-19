import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { BsThreeDots, BsFillCheckCircleFill } from 'react-icons/bs';
import { ImCross, ImTelegram } from 'react-icons/im';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './MedStatus.css';

const MedStatus = () => {
	const [med, setMed] = useState([]);
	const navigate = useNavigate();
	const [accepted, setAccepted] = useState('3');
	const [pending, setPending] = useState('3');
	const [additionalInfo, setAdditionalInfo] = useState({});

	useEffect(() => {
		axios.get(`/api/med/current`).then((response) => {
			setMed(response.data);
			console.log(response.data);
		});
		axios.get(`/api/med/count/accepted`).then((response) => {
			setAccepted(response.data);
			console.log(response.data);
		});
		axios.get(`/api/med/count/pending`).then((response) => {
			setPending(response.data);
			console.log(response.data);
		});
		axios.get(`/api/record/current`).then((response) => {
			setAdditionalInfo(response.data);
			console.log(response.data);
		});
	}, []);
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
						<button
							className='headerBtn'
							onClick={() => {
								navigate('/pmed');
							}}
						>
							ORDER MEDICINE
						</button>
					</div>
					<div className='headerRight headerMed'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer innerMed'>
								<h1>Pending</h1>
								<p>{pending} delivery</p>
							</div>
							<div className='innerContainer innerContainerBorder innerMed'>
								<h1>Accepted</h1>
								<p>{accepted} delivery</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='statusContainer'>
				<div className='statusWrapper'>
					<div className='statusTitle'>Booking confirmation</div>
					{med.map((item, index) => (
						<div className='statusItem'>
							{item.acceptance === 'pending' ? (
								<>
									<div className='statusBanner'>
										<div className='leftBanner'>
											<BsThreeDots color={'gray'} size={80} />
										</div>
										<div className='rightBanner'>
											<h2>Delivery pending approval</h2>
											<p>Processing payment</p>
										</div>
									</div>
								</>
							) : item.acceptance === 'rejected' ? (
								<>
									<div className='statusBanner'>
										<div className='leftBanner'>
											<ImCross color={'red'} size={80} />
										</div>
										<div className='rightBanner'>
											<h2>Order rejected</h2>
											<p>Reason: {item.rejectedMessage}</p>
										</div>
									</div>
								</>
							) : (
								<>
									<div className='statusBanner'>
										<div className='leftBanner'>
											<BsFillCheckCircleFill color={'green'} size={80} />
										</div>
										<div className='rightBanner'>
											<h2>Order approved</h2>
											<p>Delivery in progress</p>
										</div>
									</div>
								</>
							)}

							<div className='statusFirstRow'>
								<div className='statusLeft'>
									<p>Booking Type</p>
									<p>Booking For</p>
								</div>
								<div className='statusRight'>
									<p>Medication Delivery</p>
									<p>{item.patient_name}</p>
								</div>
							</div>
							<div className='statusFirstRow'>
								<div className='statusLeft'>
									<p>Delivery Date</p>
									<p>Estimated Delivery Time Picked</p>
									<p>Delivery Address</p>
								</div>
								<div className='statusRight'>
									<p>{item.date}</p>
									<p>{item.time}</p>
									<p>{`${additionalInfo.address} ${additionalInfo.block_no}`}</p>
								</div>
							</div>
							<div className='statusFirstRow'>
								<div className='statusLeft'>
									<p>Order Details</p>

									<p>Order Quantity</p>
									<p>Total Price</p>
								</div>
								<div className='statusRight'>
									<p>{item.medication_name}</p>
									<p>{item.medication_quantity}</p>
									<p>{`$${item.price}`}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MedStatus;
