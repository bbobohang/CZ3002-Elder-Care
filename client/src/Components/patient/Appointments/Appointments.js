import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

import '../Helper Components/Modal.css';
import './Appointment.css';
import '../PatientHome.css';

const localizer = momentLocalizer(moment);

const Appointments = () => {
	const navigate = useNavigate();
	const [eventType, setEventType] = useState('');
	const [myEvents, setMyEvents] = useState([]);
	const [modalState, setModalState] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(undefined);
	const [selectedEventDesc, setSelectedEventDesc] = useState(null);
	const [confirmChange, setConfirmChange] = useState(false);
	const [editingAppt, setEditingAppt] = useState({});
	const [wordChange, setWordChange] = useState('closing');
	const [effectDependency, setEffectDependency] = useState(true);
	const [onConfirm, setOnConfirm] = useState('null');
	useEffect(() => {
		axios.get(`/api/appt/all`).then((response) => {
			const tempAppointment = response.data;
			const newArray = tempAppointment.map((event) => {
				if (event['year'] == null) {
					event['start'] = null;
					event['end'] = null;
				} else {
					event['start'] = new Date(
						event['year'],
						event['month'],
						event['day'],
						event['hour'],
						event['min']
					);
					console.log(event['start']);
					event['end'] = new Date(
						event['year'],
						event['month'],
						event['day'],
						event['end_hour'],
						event['min']
					);
				}
				return event;
			});
			setMyEvents(newArray);
			console.log(newArray);
		});
	}, [effectDependency]);

	const handleSelectedEvent = (event) => {
		setSelectedEvent(event);
		setSelectedEventDesc(event.desc);
		setEventType(event.title);
		setModalState(!modalState);
		setEditingAppt(event);
		console.log(event);
	};

	const onChangeAppointment = () => {
		setWordChange('editing');
		setOnConfirm('editing');
		if (confirmChange == false) {
			setSelectedEventDesc(
				'Changing your appointment would delete your current one. Proceed?'
			);
			setConfirmChange(true);
		} else {
			onConfirmedChangeAppointment();
		}
	};

	const onConfirmedChangeAppointment = () => {
		if (eventType == 'TeleDoctor Appointment') {
			//navigate({ pathname: "/teleDoctor", search: createSearchParams(title: )});
			//delete api
			navigate('/teleDoctor/edit', { state: { editingAppt } });
		} else if (eventType == 'Home Doctor Appointment') {
			alert('Endpoint not done!');
			resetDefault();
		} else if (eventType == 'Medication Delivery') {
			alert('Endpoint not done!');
			resetDefault();
		}
	};

	const onDeleteAppointment = () => {
		setWordChange('deleting');
		setOnConfirm('deleting');
		console.log(editingAppt);
	};

	const onDeleteConfirmed = () => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			appt_id: editingAppt.appt_id,
		};

		if (editingAppt.title === 'TeleDoctor Appointment') {
			axios.post(`/api/teledoc/delete`, postData, axiosConfig).then((response) => {
				alert('Delete Successful!');
				resetDefault();
			});
		} else if (editingAppt.title == 'Home Doctor Appointment') {
			alert('Endpoint not done!');
			resetDefault();
		} else if (editingAppt.title == 'Medication Delivery') {
			alert('Endpoint not done!');
			resetDefault();
		}
		setEffectDependency(!effectDependency);
	};

	const resetDefault = () => {
		setConfirmChange(false);
		setModalState(false);
		setOnConfirm('null');
		if (wordChange !== 'closing') setWordChange('closing');
	};
	const onClose = () => {
		setConfirmChange(false);
		setModalState(false);
		setOnConfirm('null');
		if (wordChange !== 'closing') setWordChange('closing');
	};

	const Modal = () => {
		return (
			<div className={`modal-${modalState == true ? 'show' : 'hide'}`}>
				<div className='overlay'></div>
				<div className='modal-content'>
					<div className='words-container'>
						<h2>{selectedEvent.title}</h2>
						<div className='changing-word'>
							{wordChange === 'closing' ? (
								<div className='changing-word-div'>
									<p>{`Timing: ${selectedEvent.hour}:${selectedEvent.min}${selectedEvent.min}`}</p>
									{selectedEvent.desc && <p>{`Description: ${selectedEvent.desc}`}</p>}
								</div>
							) : wordChange === 'editing' ? (
								<div>
									Changing your appointment would delete your current one. Proceed?
								</div>
							) : (
								<div>Proceed with deletion?</div>
							)}
						</div>
					</div>
					{onConfirm === 'null' ? (
						<>
							{' '}
							<div className='button-container-delete'>
								<button className='grayBtn' onClick={onDeleteAppointment}>
									Delete Appointment
								</button>
							</div>
							<div className='button-container-edit'>
								<button className='headerBtn' onClick={onChangeAppointment}>
									Change Appointment
								</button>
							</div>
						</>
					) : onConfirm === 'editing' ? (
						<div>
							<div className='button-container-edit'>
								<button className='headerBtn' onClick={onConfirmedChangeAppointment}>
									Confirm
								</button>
							</div>
						</div>
					) : (
						<div className='button-container-edit'>
							<button className='headerBtn' onClick={onDeleteConfirmed}>
								Confirm
							</button>
						</div>
					)}

					<button className='close-modal' onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		);
	};

	return (
		<>
			<Navbar />

			<div className='AppointmentCalendar'>
				{selectedEvent && <Modal />}
				<Calendar
					selectable
					localizer={localizer}
					events={myEvents}
					startAccessor='start'
					endAccessor='end'
					style={{ height: 500 }}
					eventPropGetter={(myEvents) => {
						var backgroundColor = 'blue';
						if (myEvents.title == 'Medication Delivery') {
							backgroundColor = '#388E3C';
						} else if (myEvents.title == 'Home Doctor Appointment') {
							backgroundColor = '#9575CD';
						} else if (myEvents.title == 'TeleDoctor Appointment') {
							backgroundColor = '#0288D1';
						}
						return { style: { backgroundColor } };
					}}
					onSelectEvent={(e) => handleSelectedEvent(e)}
				></Calendar>
			</div>
			<Footer />
		</>
	);
};

export default Appointments;
