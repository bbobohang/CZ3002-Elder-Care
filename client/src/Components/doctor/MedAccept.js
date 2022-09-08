import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TiTick, TiCancel } from 'react-icons/ti';
import { ImCancelCircle } from 'react-icons/im';
import './MedAccept.css';
import Navbar from '../patient/Navbar';
import Footer from '../patient/Footer';

const MedAccept = () => {
	const [medOrder, setMedOrder] = useState([]);
	const [update, setUpdate] = useState(true);
	const [popup, setPopup] = useState(false);
	const [chosenMed, setChosenMed] = useState('');
	const [username, setUsername] = useState('');
	const inputRef = useRef();

	useEffect(() => {
		const fetchData = () => {
			const data = axios.get(`/api/med/all`).then((response) => {
				setMedOrder(response.data);
			});
			const name = axios.get(`/api/auth/check`).then((response) => {
				setUsername(response.data);
			});
		};
		fetchData();
	}, [update]);

	const handleAccept = (e) => {
		e.preventDefault();

		axios.post(`/api/med/accept/${e.currentTarget.id}`).then((response) => {
			console.log(response);
			setUpdate(!update);
		});
	};
	const openPopup = (e) => {
		setPopup(!popup);
		setChosenMed(e.currentTarget.id);
	};

	const handleReject = () => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			rejectedMessage: inputRef.current.value,
		};

		axios
			.post(`/api/med/reject/${chosenMed}`, postData, axiosConfig)
			.then((response) => {
				console.log(response);
				setUpdate(!update);
			});
	};
	return (
		<>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Welcome Back
							<br />
							{username.name}
						</h1>
						<p>
							{username.role}
							<br /> {username.email}
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
			<div className='cardContainer'>
				<div className='cardWrapper'>
					<div className='Title'>
						<h2>View All Pending Medicine Requests</h2>
					</div>
					<div className={popup === true ? 'popup' : 'popup hidden'}>
						<form>
							<div className='cancelTitle'>Reason for Rejection</div>
							<input ref={inputRef} />
						</form>
						<button onClick={handleReject}>Ok</button>
						<div
							className='cancelIcon'
							onClick={() => {
								setPopup(!popup);
							}}
						>
							<ImCancelCircle size={20} />
						</div>
					</div>
					<div className='cardItemWrapper'>
						<div className='card'>
							<div className='cardItem'>Patient Name</div>
							<div className='cardItem'>Medication Name</div>
							<div className='cardItem'>Medication Quantity</div>
							<div className='cardItem'>Status</div>
							<div className='cardItem'>Accept</div>
						</div>
						{medOrder.map((item, index) => (
							<div className='card' key={index}>
								<div className='cardItem'>{item.patient_name}</div>
								<div className='cardItem'>{item.medication_name}</div>
								<div className='cardItem'>{item.medication_quantity}</div>
								<div className='cardItem'>{item.acceptance}</div>
								<div className='cardItem'>
									<button id={item._id} onClick={handleAccept}>
										<TiTick size={30} />
									</button>
									<button id={item._id} onClick={openPopup}>
										<TiCancel size={30} />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MedAccept;
