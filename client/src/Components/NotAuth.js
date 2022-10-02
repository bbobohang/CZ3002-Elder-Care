import React from 'react';
import './NotAuth.css';

const NotAuth = () => {
	return (
		<>
			<div className='notAuthContainer'>
				<div className='notAuthWrapper'>
					<div className='leftNotAuth'>
						<p>401</p>
					</div>
					<div className='rightNotAuth'>Not Authorized!</div>
				</div>
			</div>
		</>
	);
};

export default NotAuth;
