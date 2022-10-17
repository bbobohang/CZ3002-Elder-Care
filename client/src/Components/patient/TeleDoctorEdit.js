import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/patient/Navbar';
import Footer from '../../Components/patient/Footer';
import CalendarComponent from './CalendarComponent';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import './MedDelivery.css';
import './PatientHome.css';
import './CalendarDiv.css';
import './TeleDoctor.css';

const DoctorType = [
	{
		name: 'GP',
	},
	{
		name: 'Digestive Specialist',
	},
	{
		name: 'Joint/Bone Specialist',
	},
	{
		name: 'Pediatrician',
	},
];

const ConsultTime = [
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

const TeleDoctorEdit = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const previousAppt = location.state.editingAppt;
	console.log(location.state);
	const [date, setDate] = useState(null);
	const [timeState, setTime] = useState('');
	const [doctorType, setDoctorType] = useState('GP');
	const [teleConsultSuccess, setTeleConsultSuccess] = useState(false);

	useEffect(() => {
		setTimeout(function() {
			console.log('Timeout for 5 secs');
		}, 5000);

		setDate(new Date(previousAppt.year, previousAppt.month, previousAppt.day));

		if (location.state.hour <= 9) {
			setTime('0' + previousAppt.hour.toString() + ':00');
		} else {
			setTime(previousAppt.hour.toString() + ':00');
		}
	}, []);

	const dataChangeHandler = (date) => {
		setDate(date);
		console.log(date);
	};

	//Submit button
	const handleClick = () => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			time: timeState,
			doctorType: doctorType,
			date: String(date).slice(0, 15),
			appt_id: previousAppt.appt_id,
		};

		axios.post(`/api/teledoc/edit`, postData, axiosConfig).then((response) => {
			setTeleConsultSuccess(true);
			console.log(response);
			console.log(postData.date);
		});

		navigate('/teleDoctor/preconfirm', {
			state: {
				teleConsultDetails: postData,
			},
		});
	};

	return (
		<div>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Tele-Consultation <br />
							Session with a Doctor
						</h1>
						<p>
							Skip the queue and get the advice you need from the comfort of your own
							home.
							<br /> Schedule an appointment at your convenience.
						</p>
						<button className='headerBtn'>Editing Appointment</button>
					</div>
					<div className='headerRight headerMed'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer innerMed'>
								<h1>Consult a GP</h1>
								<p>$20 / consult</p>
							</div>
							<div className='innerContainer innerContainerBorder innerMed'>
								<h1>Consult a Specialist</h1>
								<p>from $50 / consult</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='medContainer'>
				<div className='docWrapper'>
					<div className='medType'>
						<div className='Title'>
							<h2>Select A Doctor </h2>
							<div className='medTypeContainer'>
								{DoctorType.map((item, index) => (
									<div
										className={
											'docTypeCard' + (doctorType === `${item.name}` ? 'selectedType' : '')
										}
										key={index}
										id={item.name}
										onClick={(e) => {
											e.preventDefault();
											setDoctorType(e.target.id);
										}}
									>
										{item.name}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='Title'>
						<h2>Select An Appointment Date</h2>
						<CalendarComponent changeDate={dataChangeHandler} date={date} />
					</div>
					<div>
						<div className='Title'>
							<h2>Select An Appointment Time</h2>
							<div className='timeWrapper'>
								{ConsultTime.map((item, index) => (
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
							Save Changes
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default TeleDoctorEdit;
