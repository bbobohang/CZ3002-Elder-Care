//This is the login front and back end integration code
import { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();

const Login = () => {
	const refEmail = useRef('');
	const refPassword = useRef('');
	const navigate = useNavigate();
	const handleClick = async () => {
		try {
			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			let postData = {
				email: refEmail.current.value,
				password: refPassword.current.value,
			};

			axios
				.post(`/api/auth/login`, postData, axiosConfig, {
					withCredentials: true,
					crendentials: true,
				})
				.then((response) => {
					if (response.status == 200) {
						cookies.set('access_token', response.data, { path: '/' });
					}
					if (response.data.role === 'patient') {
						navigate('/phome', { replace: true });
					} else {
						navigate('/dhome', { replace: true });
					}
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
		</div>
	);
};

export default Login;
