import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../Components/patient/Navbar';
import Footer from '../../Components/patient/Footer';

import './SymptomChecker.css';

const SymptomChecker = () => {
	//Getting medicAPI
	const handleClick = async () => {
		// axios.get().then((response) => {
		// 	console.log(response);
		// });
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			symptoms: String(symptoms).replace(/\s+/g, ''),
			gender: String(gender),
			year: String(birthRef.current.value),
		};

		axios
			.post(`/api/symptoms/predict`, postData, axiosConfig)
			.then((response) => {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
		// console.log(String(symptoms));
		// console.log(String(gender));
		// console.log(String(birthRef.current.value));
	};

	const refInput = useRef();
	const birthRef = useRef();
	const [symptoms, setSymptoms] = useState([]);
	const [gender, setGender] = useState('male');
	const [age, setAge] = useState('1987');
	const onOptionChangeHandler = (event) => {
		var option = event.target.options;
		var values = [];
		if (event.target.id === 'gender') {
			for (var i = 0, l = option.length; i < l; i++) {
				if (option[i].selected) {
					values.push(option[i].value);
				}
			}
			setGender(values);
		} else {
			for (var i = 0, l = option.length; i < l; i++) {
				if (option[i].selected) {
					values.push(parseInt(option[i].value));
				}
			}
			setSymptoms(values);
		}

		console.log(values);
	};
	return (
		<>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Symptom Checker for
							<br />
							all Patients
						</h1>
						<p>
							Share a few details about your symptoms and Eldercare will
							<br /> recommend you the appropriate type of doctor to consult.
						</p>
						<button className='headerBtn'>CHECK SYMPTOMS</button>
					</div>
					<div className='headerRight headerMed'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer innerMed'>
								<h1>Enter Symptoms</h1>
								<p>Choose all related symptoms</p>
							</div>
							<div className='innerContainer innerContainerBorder innerMed'>
								<h1>Get Recommendation</h1>
								<p>View appropriate doctors to consult</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='symptomWrapper'>
				<div className='symptomContainer'>
					<form ref={refInput}>
						<h2>| Select your most commonly experienced symptom(s)</h2>
						<select
							className='formDropdown'
							name='symptoms'
							id='symptoms'
							multiple
							onChange={onOptionChangeHandler}
						>
							<option value='10'>Abdominal pain</option>

							<option value=' 238'>Anxiety</option>

							<option value=' 104'>Back pain</option>

							<option value=' 75'>Burning eyes</option>

							<option value=' 46'>Burning in the throat</option>

							<option value=' 170'>Cheek swelling</option>

							<option value=' 17'>Chest pain</option>

							<option value=' 31'>Chest tightness</option>

							<option value=' 175'>Chills</option>

							<option value=' 139'>Cold sweats</option>

							<option value=' 15'>Cough</option>

							<option value=' 207'>Dizziness</option>

							<option value=' 244'>Drooping eyelid</option>

							<option value=' 273'>Dry eyes</option>

							<option value=' 87'>Earache</option>

							<option value=' 92'>Early satiety</option>

							<option value=' 287'>Eye pain</option>

							<option value=' 33'>Eye redness</option>

							<option value=' 153'>Fast, deepened breathing</option>

							<option value=' 76'>Feeling of foreign body in the eye</option>

							<option value=' 11'>Fever</option>

							<option value=' 57'>Going black before the eyes</option>

							<option value=' 9'>Headache</option>

							<option value=' 45'>Heartburn</option>

							<option value=' 122'>Hiccups</option>

							<option value=' 149'>Hot flushes</option>

							<option value=' 40'>Increased thirst</option>

							<option value=' 73'>Itching eyes</option>

							<option value=' 96'>Itching in the nose</option>

							<option value=' 35'>Lip swelling</option>

							<option value=' 235'>Memory gap</option>

							<option value=' 112'>Menstruation disorder</option>

							<option value=' 123'>Missed period</option>

							<option value=' 44'>Nausea</option>

							<option value=' 136'>Neck pain</option>

							<option value=' 114'>Nervousness</option>

							<option value=' 133'>Night cough</option>

							<option value=' 12'>Pain in the limbs</option>

							<option value=' 203'>Pain on swallowing</option>

							<option value=' 37'>Palpitations</option>

							<option value=' 140'>Paralysis</option>

							<option value=' 54'>Reduced appetite</option>

							<option value=' 14'>Runny nose</option>

							<option value=' 29'>Shortness of breath</option>

							<option value=' 124'>Skin rash</option>

							<option value=' 52'>Sleeplessness</option>

							<option value=' 95'>Sneezing</option>

							<option value=' 13'>Sore throat</option>

							<option value=' 64'>Sputum</option>

							<option value=' 179'>Stomach burning</option>

							<option value=' 28'>Stuffy nose</option>

							<option value=' 138'>Sweating</option>

							<option value=' 248'>Swollen glands in the armpits</option>

							<option value=' 169'>Swollen glands on the neck</option>

							<option value=' 211'>Tears</option>

							<option value=' 16'>Tiredness</option>

							<option value=' 115'>Tremor at rest</option>

							<option value=' 144'>Unconsciousness, short</option>

							<option value=' 101'>Vomiting</option>

							<option value=' 181'>Vomiting blood</option>

							<option value=' 56'>weakness</option>

							<option value=' 23'>Weight gain</option>

							<option value=' 30'>Wheezing</option>
						</select>
						<h2>| Select your gender</h2>
						<select
							className='formDropdown'
							name='title'
							id='gender'
							onChange={onOptionChangeHandler}
						>
							<option>Gender</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</select>
						<h2>| Birth Year</h2>
						<input
							className='form'
							type='text'
							name='birthYear'
							placeholder='e.g. 1982'
							ref={birthRef}
						/>
					</form>
					<div className='next'>
						<button className='nextButton' onClick={handleClick}>
							NEXT
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SymptomChecker;
