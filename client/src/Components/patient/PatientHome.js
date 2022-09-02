import React from 'react';
import Navbar from './Navbar';
import './PatientHome.css';
import TeleLogo from '../../asset/tele_consult.png';
import HomeDocLogo from '../../asset/home_doctor.png';
import MedDelivery from '../../asset/med_delivery.png';
import HomeCare from '../../asset/home_care.png';
const PatientHome = () => {
	return (
		<>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							Medical Care Now <br /> Simplified for Everyone
						</h1>
						<p>
							ElderCare engages with various healthcar partners to bring you <br />
							the best possible healthcare for kids of all ages and adults of all
							conditions.
						</p>
						<button className='headerBtn'>View Your Appointments</button>
					</div>
					<div className='headerRight'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer'>
								<h2>900+</h2>
								<p>Verified Specialists</p>
							</div>
							<div className='innerContainer innerContainerBorder'>
								<h2>2000+</h2>
								<p>Patients Recovered</p>
							</div>
							<div className='innerContainer innerContainerBorder'>
								<h2>99.7%</h2>
								<p>Positive Feedback</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bookContainer'>
				<div className='bookContent'>
					<div className='bookHeader'>
						<h2>Book a Service</h2>
						<p>
							We provide to you the best choiches for you. Adjust it to your health
							needs and make sure you undergo treatment with our highly qualified
							doctors. <br />
							Consult with us which type of service is suitable for your health
						</p>
					</div>
					<div className='bookTilesContainer'>
						<div className='bookTiles'>
							<div className='bookTilesLogo'>
								<img src={TeleLogo} alt='Tele Logo' />
							</div>
							<div className='bookTilesTitle'>Tele-Consult A Doctor</div>
							<div className='bookTilesSubtitle'>
								Choose your doctor from thousands of specialist, general, and trusted
								hospitals
							</div>
						</div>
						<div className='bookTiles'>
							<div className='bookTilesLogo'>
								<img src={HomeDocLogo} alt='Tele Logo' />
							</div>
							<div className='bookTilesTitle'>Home Doctor</div>
							<div className='bookTilesSubtitle'>
								Consult our trusted doctors in the comfort fo your home and get the best
								recomendations
							</div>
						</div>
						<div className='bookTiles'>
							<div className='bookTilesLogo'>
								<img src={MedDelivery} alt='Tele Logo' />
							</div>
							<div className='bookTilesTitle'>Medicine Delivery</div>
							<div className='bookTilesSubtitle'>
								Buy your medicines with our mobile application with a simple delivery
								system
							</div>
						</div>
						<div className='bookTiles'>
							<div className='bookTilesLogo'>
								<img src={HomeCare} alt='Tele Logo' />
							</div>
							<div className='bookTilesTitle'>Home Care and Nursing</div>
							<div className='bookTilesSubtitle'>
								You can get urgent care for yourself or your children and your family
							</div>
						</div>
					</div>
					<div className='buttonWrapper'>
						<button className='headerBtn'>Learn More</button>
					</div>
				</div>
			</div>
			<div className='planContainer'>
				<div className='planWrapper'>
					<div className='planLeft'>
						<h2>Plan for all your medical expenses</h2>
						<p>
							ElderCare provides a detailed breakdown of the potential care provided
							and its respective costs. An estimated pricing cost will be provided, so
							that you can plan ahead for all your medical expenses.
						</p>
						<button className='headerBtn'>GO TO WALLET</button>
					</div>
					<div className='planRight'></div>
				</div>
			</div>
		</>
	);
};

export default PatientHome;
