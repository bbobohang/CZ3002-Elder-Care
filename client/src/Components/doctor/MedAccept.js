import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
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
	const [sortby, setSortby] = useState();
	const inputRef = useRef();

	useEffect(() => {
		const fetchData = async () => {
			axios.get(`/api/med/all`).then((response) => {
				setMedOrder(response.data);
				console.log(response.data);
			});
			axios.get(`/api/auth/check`).then((response) => {
				setUsername(response.data);
				console.log(response.data);
			});
		};
		fetchData();
	}, [update]);

	const handleAccept = (e) => {
		e.preventDefault();

		axios.post(`/api/med/accept/${e.currentTarget.id}`).then((response) => {
			console.log(response);
			setUpdate(!update);
			alert('Medication Accepted!');
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
				setPopup(!popup);
				alert('Medication Rejected!');
			});
	};

	const sortStatus = (a, b) => {
		if (sortby === 'status') {
			if (a.acceptance < b.acceptance) {
				return -1;
			}
			if (a.acceptance > b.acceptance) {
				return 1;
			}
			return 0;
		} else if (sortby === 'medName') {
			if (a.medication_name < b.medication_name) {
				return -1;
			}
			if (a.medication_name > b.medication_name) {
				return 1;
			}
			return 0;
		} else {
			if (a.patient_name < b.patient_name) {
				return -1;
			}
			if (a.patient_name > b.patient_name) {
				return 1;
			}
			return 0;
		}
	};
	return (
		<>
			<Navbar role={'doctor'} />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Welcome Back
							<br />
							Dr {username.name}
						</h1>
						<p>
							{username.type}
							<br /> {username.email}
						</p>
						<button className='headerBtn'>ACCEPT MEDICINE</button>
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

					<div className='cardItemWrapper'>
						<div className={popup === true ? 'popup' : 'popup hidden'}>
							<div className='formWrapper'>
								<form>
									<div className='cancelTitle'>
										Please enter the reason for rejection
									</div>
									<input className='reasonbar' ref={inputRef} type='text' />
								</form>
								<button className='headerBtn' onClick={handleReject}>
									Submit
								</button>
							</div>
							<div
								className='cancelIcon'
								onClick={() => {
									setPopup(!popup);
								}}
							>
								<ImCancelCircle size={20} />
							</div>
						</div>
						<div className='cardFilter'>
							<div class='navigation'>
								<FaFilter size={25} />
								<div class='navigation-content'>
									<a onClick={() => setSortby('status')}>Status</a>
									<a onClick={() => setSortby('medName')}>Medication Name</a>
									<a onClick={() => setSortby('patientName')}>Patient Name</a>
								</div>
							</div>
						</div>
						<div className='card'>
							<div className='cardItem'>Patient Name</div>
							<div className='cardItem'>Medication Name</div>
							<div className='cardItem'>Medication Quantity</div>
							<div className='cardItem'>Status</div>
							<div className='cardItem'>Accept</div>
						</div>
						{medOrder.sort(sortStatus).map((item, index) => (
							<div className='card' key={index}>
								<div className='cardItem'>{item.patient_name}</div>
								<div className='cardItem'>{item.medication_name}</div>
								<div className='cardItem'>{item.medication_quantity}</div>
								<div className='cardItem'>{item.acceptance}</div>
								<div className='cardItem'>
									<button id={item._id} className='acceptBtn' onClick={handleAccept}>
										Accept
									</button>
									<button id={item._id} className='rejectBtn' onClick={openPopup}>
										Reject
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
