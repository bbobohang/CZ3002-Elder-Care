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
					{results.map((item) => (
						<div className='list'>
							{item.Accuracy > 70 ? (
								<div className='specialistDetails' >
									<div className='Accuracy' style={{backgroundColor: "#2DC071"}}>{Math.round(item.Accuracy)}%</div>
									<div className='Name'>
										<h3>{item.Name}</h3> 
										You are highly recommended to consult with {item.Name}. Based on your symptoms, there is a {Math.round(item.Accuracy)}% chance that {item.Name} can provide the advice you need. 
									</div>
								</div>
							) : item.Accuracy > 40 ? (
								<div className='specialistDetails' >
									<div className='Accuracy' style={{backgroundColor: "#F1D231"}}>{Math.round(item.Accuracy)}%</div>
									<div className='Name'>
										<h3>{item.Name}</h3> 
										You are recommended to consult with {item.Name}. Based on your symptoms, there is a {Math.round(item.Accuracy)}% chance that {item.Name} can provide the advice you need. 
									</div>
								</div>
							) : (
								<div className='specialistDetails' >
									<div className='Accuracy' style={{backgroundColor: "#D32E2E"}}>{Math.round(item.Accuracy)}%</div>
									<div className='Name'>
										<h3>{item.Name}</h3> 
										You are recommended to consult with {item.Name}. Based on your symptoms, there is a {Math.round(item.Accuracy)}% chance that {item.Name} can provide the advice you need. 
									</div>
								</div>
							)}	
						</div>		
					))}
					
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
