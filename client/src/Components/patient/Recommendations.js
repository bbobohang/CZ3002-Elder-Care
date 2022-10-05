import React, {useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {useLocation, useNavigate} from 'react-router-dom';

import './Recommendations.css';

const Recommendations = () => {

	const location = useLocation();
	console.log(location.state.results);
	const results = location.state.results
	const navigate = useNavigate();
	const [showhide, setShowhide] = useState('3');
	var a1, a2, a3, n1, n2, n3 = '';
	console.log(Object.keys(results).length)
	var a1, a2, a3, n1, n2, n3 = '';
	if(Object.keys(results).length === 2){
		a1 = results[0].Accuracy;
		n1 = results[0].Name;
		a2 = results[1].Accuracy;
		n2 = results[1].Name;
		//setShowhide('2');
	}
	else if(Object.keys(results).length === 1){
		a1 = results[0].Accuracy;
		n1 = results[0].Name;
		//setShowhide('1');
	}
	else if(Object.keys(results).length === 0){
		//setShowhide('0');
	}
	else{
		a1 = results[0].Accuracy;
		n1 = results[0].Name;
		a2 = results[1].Accuracy;
		n2 = results[1].Name;
		a3 = results[2].Accuracy;
		n3 = results[2].Name;
	}

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
			<div className='recoWrapper'>
				<div className='recoContainer'>
					<h2>| Appropriate Doctors to Consult Based on your Symptoms</h2>
					{showhide !== '0' && 
					<div className='specialistDetails' >
						<div className='Accuracy' style={{backgroundColor: "#2DC071"}}>{Math.round(a1)}%</div>
						<div className='Name'>
							<h3>{n1}</h3> 
							You are highly recommended to consult with {n1}. Based on your symptoms, there is a {Math.round(a1)}% chance that {n1} can provide the advice you need. 
						</div>
					</div>
					}
					{showhide !== '1' &&
					<div className='specialistDetails' >
						<div className='Accuracy' style={{backgroundColor: "#F1D231"}}>{Math.round(a2)}%</div>
						<div className='Name'>
							<h3>{n2}</h3> 
							You are recommended to consult with {n2}. Based on your symptoms, there is a {Math.round(a2)}% chance that {n2} can provide the advice you need. 
						</div>
					</div>
					}
					{showhide !== '2' &&
					<div className='specialistDetails' >
						<div className='Accuracy' style={{backgroundColor: "#D32E2E"}}>{Math.round(a3)}%</div>
						<div className='Name'>
							<h3>{n3}</h3> 
							You are recommended to consult with {n3}. Based on your symptoms, there is a {Math.round(a3)}% chance that {n3} can provide the advice you need. 
						</div>
					</div>
					}
					{showhide === '0' &&
					<div className='specialistDetails'>No results</div>
					}
					<div className='back'>
						<button className='backButton' 
							onClick={() => {
								navigate('/symptoms-checker');
							}}>
							BACK
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Recommendations;
