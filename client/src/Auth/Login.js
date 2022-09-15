//This is the login front and back end integration code
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Girl from '../asset/signin_girl.png'
import './Login.css?v=1';
const cookies = new Cookies();

const Login = () => {
	const refEmail = useRef('');
	const refPassword = useRef('');
	const navigate = useNavigate();
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

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
					if (response.status === 200) {
						cookies.set('access_token', response.data, { path: '/' });
					}
					if (response.data.role === 'patient') {
						navigate('/phome', { replace: true });
					} else {
						navigate('/dhome', { replace: true });
					}
				}, reason => {
					console.error(reason);
				  	setError('Invalid Username or Password!')});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			<div className='LoginWrapper'>
				<div className='LoginContainer'>
					<div className='LoginInfo'>
						<b>Sign in to</b>
						<span class="eldercare"><span>E</span><span>l</span><span>d</span><span>e</span><span>r</span><span>C</span><span>a</span><span>r</span><span>e</span></span>
						<c>
							<p>Don't have an account yet?</p>
							<d>Create an account</d>
							<a href="/register" className="register"> here!</a>
						</c>	
					</div>
					<div className='girl'>
						<img className='girl' src={Girl} alt='girl'></img>
					</div>
					<div className='Login'>
						<h1>Sign in</h1>
						<input className ='email' ref={refEmail} type='text' name='email' placeholder='Enter Email'/>
						<div className='passContainer'>
							<input className='password' ref={refPassword} type={passwordShown ? "text" : "password"} name='password' placeholder='Password'/>
							<button className='showPass' onClick={togglePassword}>
								<i class="gg-eye"></i>
							</button>
						</div>
						<a href="forget_password_url" className='forgetPass'>Forgot your password?</a>
						<button className='loginButton' onClick={handleClick}>Log in</button>
						{error?<div>{error}</div>:null}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
