import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Register from './Auth/Register';
import Login from './Auth/Login';
import TeleDoctor from './Components/patient/TeleDoctor';
import HomeDoctor from './Components/patient/HomeDoctor';
import PrivateRoute from './Routes/PrivateRoute';
import PatientHome from './Components/patient/PatientHome';
import PatientRecord from './Components/PatientRecord';
import MedDelivery from './Components/patient/MedDelivery';
import './App.css';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='phome' element={<PrivateRoute component={PatientHome} />} />
				<Route path='/teleDoctor' element={<TeleDoctor />} />
				<Route path='/homeDoctor' element={<HomeDoctor />} />
				<Route
					path='precord'
					element={<PrivateRoute component={PatientRecord} />}
				/>
				<Route path='pmed' element={<PrivateRoute component={MedDelivery} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
