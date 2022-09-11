import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Girl from '../asset/signin_girl.png'
import './Register.css';

const cookies = new Cookies();
const Register = () => {
	const [register, setRegister] = useState({});
	const [error, setError] = useState({});
	const refInput = useRef();
	const navigate = useNavigate();
	const [showhide, setShowhide]=useState('');
  
   const handleshowhide=(event)=>{
     const getuser = event.target.value;    
     setShowhide(getuser);

   }

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
					type: refInput.current[4].value,
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
					if (response.status === 200) {
						cookies.set('access_token', response.data, { path: '/' });
					}
					if (response.data.role === 'Patient') {
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
			<Navbar />
			<div className='RegWrapper'>
				<div className='RegContainer'>
					<div className='RegInfo'>
						<b>Sign up for</b>
						<span class="eldercare"><span>E</span><span>l</span><span>d</span><span>e</span><span>r</span><span>C</span><span>a</span><span>r</span><span>e</span></span>
						<c>
							<p>With just a few simple steps.</p>
							<d>Have an account? Sign in</d>
							<a href="/login" className="register"> here!</a>
						</c>	
					</div>
					<div className='girl'>
						<img className='girl' src={Girl} alt='girl'></img>
					</div>
					<div className='Register'>
						<h1>Sign Up</h1>
						<form ref={refInput}>
							<input className='form' type='text' name='Email' placeholder='Enter Email'/>
							<input className='form' type='text' name='Name' placeholder='Full Name'/>
							<input className='form' type='password' name='Password' placeholder='Password'/>
							<select className='form-role' onChange={(e)=>(handleshowhide(e))}>
             					<option value="">--Select User Type--</option>
             					<option value="doctor">Doctor</option>
								<option value="patient">Patient</option>
          					</select>  
							{showhide==='doctor' && (<input className="form" type='text' name='docType' placeholder='Doctor Type'></input>)}       
						</form>

						<button className='RegisterButton' onClick={handleClick}>Register</button>
						{register.email && <div>{register.name} has been registered! </div>}
						{register.errors && <div>{register.errors.msg} </div>}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Register;
