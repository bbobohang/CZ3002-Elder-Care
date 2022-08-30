import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './Components/Home';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='home' element={<PrivateRoute component={Home} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
