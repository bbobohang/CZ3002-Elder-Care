import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();
const Register = () => {
	const [register, setRegister] = useState({});
	const [error, setError] = useState({});
	const refInput = useRef();
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: refInput.current[0].value,
					name: refInput.current[1].value,
					password: refInput.current[2].value,
					role: refInput.current[3].value,
				}),
			};

			fetch('http://localhost:5000/api/auth/register', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setRegister(data);
					console.log(data);
				});

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			let postData = {
				email: refInput.current[0].value,
				password: refInput.current[2].value,
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
			setError(error);
		}
	};
	return (
		<>
			<h1>Register Page</h1>

			<form ref={refInput}>
				<h3>Email</h3>
				<input type='text' name='Email' />
				<h3>Name</h3>
				<input type='text' name='Name' />
				<h3>Password</h3>
				<input type='password' name='Password' />
				<h3>Role</h3>
				<input type='text' name='Role' />
			</form>

			<button onClick={handleClick}>Register</button>
			{register.email && <div>{register.name} has been registered! </div>}
			{register.errors && <div>{register.errors.msg} </div>}
		</>
	);
};

export default Register;
