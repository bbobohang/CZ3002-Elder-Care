import React, { useState, useRef } from 'react';
import './MedDelivery.css';
import Navbar from '../../Components/patient/Navbar';
import Footer from '../../Components/patient/Footer';
import axios from 'axios';

const MedType = [
	{
		name: 'Allegies',
	},
	{
		name: 'Asthma',
	},
	{
		name: 'Birth Control',
	},
	{
		name: 'Blood Pressure',
	},
	{
		name: 'Heart Disease',
	},
	{
		name: 'Cold & Flu',
	},
	{
		name: 'Diabetes',
	},
	{
		name: 'Fever',
	},
	{
		name: 'Headaches',
	},
	{
		name: 'Cholesterol',
	},
];

const DeliverTime = [
	{
		time: '09:00',
	},
	{
		time: '10:00',
	},
	{
		time: '11:00',
	},
	{
		time: '12:00',
	},
	{
		time: '13:00',
	},
	{
		time: '14:00',
	},
	{
		time: '15:00',
	},
	{
		time: '16:00',
	},
	{
		time: '17:00',
	},
	{
		time: '18:00',
	},
	{
		time: '19:00',
	},
	{
		time: '20:00',
	},
];
const MedDelivery = () => {
	const [typeState, setType] = useState('');
	const [timeState, setTime] = useState('');
	const [medSucess, setMedSucess] = useState(false);
	const quantityRef = useRef();

	//Submit button
	const handleClick = async () => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			time: timeState,
			medication_name: typeState,
			medication_quantity: quantityRef.current.value,
		};

		axios.post(`/api/med/create`, postData, axiosConfig).then((response) => {
			setMedSucess(true);
			console.log(response);
		});
	};
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

			<div className='medContainer'>
				<div className='medWrapper'>
					<div className={medSucess === true ? 'overlay' : 'overlay hidden'}>
						<button
							className='headerBtn'
							onClick={() => {
								setMedSucess(!medSucess);
							}}
						>
							openclose
						</button>
					</div>
					<div className={medSucess === true ? 'medPopup' : 'medPopup hidden'}>
						Medication has been booked!
					</div>
					<div className='medType'>
						<div className='Title'>
							<h2>Select A Medication Type</h2>
							<div className='medTypeContainer'>
								{MedType.map((item, index) => (
									<div
										className={
											'medTypeCard' + (typeState === `${item.name}` ? 'selectedType' : '')
										}
										key={index}
										id={item.name}
										onClick={(e) => {
											e.preventDefault();
											setType(e.target.id);
										}}
									>
										{item.name}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='medQuatity'>
						<div className='Title'>
							<h2>Enter A Quantity</h2>
							<form>
								<input
									ref={quantityRef}
									className='quantityInput'
									placeholder='Eg: 3 Bottles'
								/>
							</form>
						</div>
					</div>
					<div className='medTime'>
						<div className='Title'>
							<h2>Select A Delivery Time</h2>
							<div className='timeWrapper'>
								{DeliverTime.map((item, index) => (
									<div
										className={
											'timeCard' + (timeState === `${item.time}` ? 'selectedTime' : '')
										}
										key={index}
										id={item.time}
										onClick={(e) => {
											e.preventDefault();

											setTime(e.target.id);
											console.log(e.target.id);
										}}
									>
										{item.time}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='submitContainer'>
						<button className='headerBtn' onClick={handleClick}>
							Book Now
						</button>
					</div>
					<div>Selected med: {typeState}</div>
					<div>Selected Time: {timeState}</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MedDelivery;
