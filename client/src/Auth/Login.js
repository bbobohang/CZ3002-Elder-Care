//This is the login front and back end integration code
import { useState } from 'react';

const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email: 'admin1@gmail.com', password: '123456' }),
};

const Login = () => {
	const [login, setLogin] = useState({});
	const getLogin = async () => {
		try {
			fetch('http://localhost:5000/api/auth/login', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setLogin(data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='Login'>
			<button onClick={getLogin}>Log in</button>
			<div>{login.email}</div>
		</div>
	);
};

export default Login;
