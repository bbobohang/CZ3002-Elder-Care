import React from 'react';
import './Footer.css';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineYoutube } from 'react-icons/ai';
const Footer = () => {
	return (
		<>
			<div className='footerContainer'>
				<div className='footerWrapper'>
					<div className='footerLeft'>
						<span>
							<h3 className='firstTag'>Elder</h3>
							<h3>Care</h3>
						</span>
						<h5>
							ElderCare engages with various healthcar partners to bring you
							<br />
							the best possible healthcare for kids of all ages and adults of all
							conditions.{' '}
						</h5>
						<p>©2022 - ElderCare.</p>
					</div>
					<div className='footerRight'>
						<div className='iconWrapper'>
							<AiOutlineInstagram size={25} color={'white'} />
							<FiFacebook size={25} color={'white'} />
							<AiOutlineYoutube size={25} color={'white'} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
