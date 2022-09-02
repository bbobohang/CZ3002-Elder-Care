import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';
import PrivateRoute from './Routes/PrivateRoute';
import PatientHome from './Components/patient/PatientHome';
import PatientRecord from './Components/PatientRecord';

import './App.css';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='phome' element={<PrivateRoute component={PatientHome} />} />
				<Route
					path='precord'
					element={<PrivateRoute component={PatientRecord} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
