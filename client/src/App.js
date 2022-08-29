import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
