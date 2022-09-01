import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './Components/Home';
import PatientRecord from './Components/PatientRecord';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='home' element={<PrivateRoute component={Home} />} />
				<Route path='record' element={<PrivateRoute component={PatientRecord} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
