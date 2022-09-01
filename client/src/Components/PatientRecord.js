import React from 'react';

const PatientRecord = () => {
	return (
		<>
			<h1>PatientRecord</h1>

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

			<button onClick={handleClick}>Sumbit</button>
		</>
	);
};

export default PatientRecord;
