import React, { useState, useRef } from 'react';

const Register = () => {
	const [register, setRegister] = useState({});
	const [error, setError] = useState({});
	const refInput = useRef();
	const handleClick = async () => {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: refInput.current[0].value,
					name: refInput.current[1].value,
					password: refInput.current[2].value,
				}),
			};

			fetch('http://localhost:5000/api/auth/register', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setRegister(data);
					console.log(data);
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
			</form>

			<button onClick={handleClick}>Log in</button>
			{register.email && <div>{register.name} has been registered! </div>}
			{register.errors && <div>{register.errors.msg} </div>}
		</>
	);
};

export default Register;
