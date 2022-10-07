import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

import '../Helper Components/Modal.css';
import './Appointment.css';

const localizer = momentLocalizer(moment);

const Appointments = () => {
	//const [tempAppointment, setTempAppointment] = useState([]);
	// const [myEvents, setMyEvents] = useState([{ hello: 1 }]);
	// const changeFormat = (eventList) => {
	//   return eventList.map((event) => {
	//     if (event["year"] == null) {
	//       event["start"] = new Date(0, 0, 0, 0, 0);
	//       event["end"] = new Date(0, 0, 0, 0, 0);
	//     } else {
	//       event["start"] = new Date(
	//         event["year"],
	//         event["month"] - 1,
	//         event["day"],
	//         event["hour"],
	//         event["min"]
	//       );
	//       console.log(event["start"]);
	//       event["end"] = new Date(
	//         event["year"],
	//         event["month"] - 1,
	//         event["day"],
	//         event["end_hour"],
	//         event["min"]
	//       );
	//     }
	//   });
	// };

	// useEffect(() => {
	//   changeFormat(tempMyEvents);
	//   setMyEvents([{ hello: 2 }]);
	//   console.log(myEvents);
	//   //setMyEvents(["tempMyEvents"]);
	// }, []);
	const tempMyEvents = [
		{
			title: 'TeleDoctor Appointment',
			year: 2022,
			month: 9,
			day: 14,
			hour: 11,
			end_hour: 12,
			min: 0,
			allDay: false,
			// start: Date(2022, 8, 14, 11, 0),
			// end: Date(2022, 8, 14, 12, 0),
		},
	];

	const myEvents = [
		{
			title: 'Homeconsult',
			desc: 'Testing longer description',
			type: 'HomeConsult',
			start: new Date('2022', '8', '24', '8', '0'),
			end: new Date('2022', 8, 24, 15, 0),
		},
		{
			title: 'MedDelivery',
			type: 'MedicineDelivery',
			start: new Date(2022, 8, 24, 9, 0),
			end: new Date(2022, 8, 24, 15, 0),
		},
		{
			title: 'test',
			type: 'TeleDoctor',
			start: new Date(2022, 8, 25, 10, 0),
			end: new Date(2022, 8, 25, 15, 0),
		},
	];
	useEffect(() => {
		const fetchData = async () => {
			axios.get(`/api/appt/all`).then((response) => {
				var eventArray = [];
				const fetchedEvents = response.data;
				fetchedEvents.forEach((item, index) => {
					const object = {
						title: item.title,
						start: new Date(item.year, item.month, item.day, item.hour, item.min),
						end: new Date(item.year, item.month, item.day, item.end_hour, item.min),
					};
					eventArray.push(object);
				});
				setEvent(eventArray);
			});
		};
		fetchData();
		console.log(myNewEvents);
	}, []);
	const [modalState, setModalState] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(undefined);
	const [myNewEvents, setEvent] = useState(null);

	const handleSelectedEvent = (event) => {
		setSelectedEvent(event);
		setModalState(!modalState);
		console.log(myNewEvents);
	};

	const onClose = () => {
		console.log('entered');
		setModalState(false);
	};

	const Modal = () => {
		return (
			<div className={`modal-${modalState == true ? 'show' : 'hide'}`}>
				<div className='overlay'></div>
				<div className='modal-content'>
					<h2>{selectedEvent.title}</h2>
					<p>{selectedEvent.desc}</p>
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
			{selectedEvent && <Modal />}
			<div className='AppointmentCalendar'>
				{myNewEvents && (
					<Calendar
						selectable
						localizer={localizer}
						events={myNewEvents}
						startAccessor='start'
						endAccessor='end'
						style={{ height: 500 }}
						eventPropGetter={(myEvents) => {
							var backgroundColor = 'blue';
							if (myEvents.title == 'Medication Delivery') {
								backgroundColor = '#388E3C';
							} else if (myEvents.type == 'Home Doctor Appointment') {
								backgroundColor = '#9575CD';
							} else if (myEvents.type == 'TeleDoctor Appointment') {
								backgroundColor = '#0288D1';
							}
							return { style: { backgroundColor } };
						}}
						onSelectEvent={(e) => handleSelectedEvent(e)}
					></Calendar>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Appointments;
