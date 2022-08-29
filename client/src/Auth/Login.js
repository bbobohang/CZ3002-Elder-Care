//This is the login front and back end integration code
import { useState, useRef } from 'react';

const Login = () => {
	const [login, setLogin] = useState({});
	const refEmail = useRef('');
	const refPassword = useRef('');

	const handleClick = async () => {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: refEmail.current.value,
					password: refPassword.current.value,
				}),
			};
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
			<h1>Login Page</h1>
			<h3>email</h3>
			<input ref={refEmail} type='text' name='email' />
			<h3>Password</h3>
			<input ref={refPassword} type='text' name='password' />
			<button onClick={handleClick}>Log in</button>
			{login.email && <div>{login.email} has been logged in!</div>}
		</div>
	);
};

export default Login;
