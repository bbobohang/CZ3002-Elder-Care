import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Register from './Auth/Register';
import Login from './Auth/Login';
//TeleDoctor
import TeleDoctor from './Components/patient/TeleDoctor';
import TeleDoctorEdit from './Components/patient/TeleDoctorEdit';
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
import NotAuth from './Components/NotAuth';

//Appointments
import Appointments from './Components/patient/Appointments/Appointments';

//MedDelivery and confirmation
import MedDelivery from './Components/patient/MedDelivery';
import './App.css';
import MedPreConfirm from './Components/patient/MedPreConfirm';
import MedConfirmed from './Components/patient/MedConfirmed';
import MedAccept from './Components/doctor/MedAccept';
import MedStatus from './Components/patient/MedStatus';
import DoctorHome from './Components/doctor/DoctorHome';
import SymptomChecker from './Components/patient/SymptomChecker';
import ProfileConfirmed from './Components/patient/ProfileConfirmed';
import Recommendations from './Components/patient/Recommendations';

//Record checker
import RecordChecker from './Auth/RecordChecker';

//Scroll to top
import ScrollToTop from './Components/utils/ScrollToTop';

function App() {
	return (
		<>
			<BrowserRouter>
				<ScrollToTop>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route
							path='/record-checker'
							element={<PrivateRoute component={RecordChecker} role={'patient'} />}
						/>
						<Route
							path='phome'
							element={<PrivateRoute component={PatientHome} role={'patient'} />}
						/>
						<Route
							path='/teleDoctor'
							element={<PrivateRoute component={TeleDoctor} role={'patient'} />}
						/>
						<Route
							path='/teleDoctor/edit'
							element={<PrivateRoute component={TeleDoctorEdit} role={'patient'} />}
						/>
						<Route
							path='teleDoctor/preconfirm'
							element={
								<PrivateRoute component={TeleDoctorPreConfirm} role={'patient'} />
							}
						/>
						<Route
							path='teleDoctor/teleConsultation-booking-confirmed'
							element={
								<PrivateRoute component={TeleDoctorConfirmed} role={'patient'} />
							}
						/>
						<Route
							path='/homeDoctor'
							element={<PrivateRoute component={HomeDoctor} role={'patient'} />}
						/>
						<Route
							path='homeDoctor/preconfirm'
							element={
								<PrivateRoute component={HomeDoctorPreConfirm} role={'patient'} />
							}
						/>
						<Route
							path='homeDoctor/homeConsultation-booking-confirmed'
							element={
								<PrivateRoute component={HomeDoctorConfirmed} role={'patient'} />
							}
						/>
						<Route path='401' element={<PrivateRoute component={NotAuth} />} />
						<Route
							path='pmed'
							element={<PrivateRoute component={MedDelivery} role={'patient'} />}
						/>
						<Route
							path='pmed/preconfirm'
							element={<PrivateRoute component={MedPreConfirm} role={'patient'} />}
						/>
						<Route
							path='pmed/med-booking-confirmed'
							element={<PrivateRoute component={MedConfirmed} role={'patient'} />}
						/>
						<Route
							path='dmed/accept'
							element={<PrivateRoute component={MedAccept} role={'doctor'} />}
						/>
						<Route
							path='pmed/status'
							element={<PrivateRoute component={MedStatus} role={'patient'} />}
						/>
						<Route
							path='patient/appointment'
							element={<PrivateRoute component={Appointments} role={'patient'} />}
						/>
						<Route
							path='profile'
							element={<PrivateRoute component={Profile} role={'patient'} />}
						/>
						<Route
							path='profile/confirmation'
							element={<PrivateRoute component={ProfileConfirmed} role={'patient'} />}
						/>
						<Route
							path='dhome'
							element={<PrivateRoute component={DoctorHome} role={'doctor'} />}
						/>
						<Route
							path='symptoms-checker'
							element={<PrivateRoute component={SymptomChecker} />}
						/>
						<Route
							path='recommendations'
							element={<PrivateRoute component={Recommendations} />}
						/>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</>
	);
}

export default App;
