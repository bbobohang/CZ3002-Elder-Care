import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Register from './Auth/Register';
import Login from './Auth/Login';
//TeleDoctor
import TeleDoctor from './Components/patient/TeleDoctor';
import TeleDoctorPreConfirm from './Components/patient/TeleDoctorPreConfirm';
import TeleDoctorConfirmed from './Components/patient/TeleDoctorConfirmed';
//HomeDoctor
import HomeDoctor from './Components/patient/HomeDoctor';
import HomeDoctorPreConfirm from './Components/patient/HomeDoctorPreConfirm';
import HomeDoctorConfirmed from './Components/patient/HomeDoctorConfirmed';
//PrivateRoute
import PrivateRoute from './Routes/PrivateRoute';
//PatientHome
import PatientHome from './Components/patient/PatientHome';
//Profile
import Profile from './Components/patient/Profile';
//Patient Record
//import PatientRecord from './Components/PatientRecord';
//MedDelivery and confirmation
import MedDelivery from './Components/patient/MedDelivery';
import './App.css';
import MedPreConfirm from './Components/patient/MedPreConfirm';
import MedConfirmed from './Components/patient/MedConfirmed';
import MedAccept from './Components/doctor/MedAccept';
import MedStatus from './Components/patient/MedStatus';
import DoctorHome from './Components/doctor/DoctorHome';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='phome' element={<PrivateRoute component={PatientHome} />} />
				<Route
					path='/teleDoctor'
					element={<PrivateRoute component={TeleDoctor} />}
				/>
				<Route
					path='teleDoctor/preconfirm'
					element={<PrivateRoute component={TeleDoctorPreConfirm} />}
				/>
				<Route
					path='teleDoctor/teleConsultation-booking-confirmed'
					element={<PrivateRoute component={TeleDoctorConfirmed} />}
				/>
				<Route
					path='/homeDoctor'
					element={<PrivateRoute component={HomeDoctor} />}
				/>
				<Route
					path='homeDoctor/preconfirm'
					element={<PrivateRoute component={HomeDoctorPreConfirm} />}
				/>
				<Route
					path='homeDoctor/homeConsultation-booking-confirmed'
					element={<PrivateRoute component={HomeDoctorConfirmed} />}
				/>
				
				<Route path='pmed' element={<PrivateRoute component={MedDelivery} />} />
				<Route
					path='pmed/preconfirm'
					element={<PrivateRoute component={MedPreConfirm} />}
				/>
				<Route
					path='pmed/med-booking-confirmed'
					element={<PrivateRoute component={MedConfirmed} />}
				/>
				<Route
					path='dmed/accept'
					element={<PrivateRoute component={MedAccept} />}
				/>
				<Route
					path='pmed/status'
					element={<PrivateRoute component={MedStatus} />}
				/>
				<Route
					path='profile'
					element={<PrivateRoute component={Profile} />}
				/>
				<Route path='dhome' element={<PrivateRoute component={DoctorHome} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
