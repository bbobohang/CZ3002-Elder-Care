import React, { useRef, useState } from 'react';

const PatientRecord = () => {
	const [record, setRecord] = useState({});
	const refInput = useRef();
	const handleClick = async () => {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					age: refInput.current[0].value,
					heart_rate: refInput.current[1].value,
					blood_pressure: refInput.current[2].value,
				}),
			};

			fetch('/api/record/update', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setRecord(data);
					console.log(data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h1>PatientRecord</h1>

			<form ref={refInput}>
				<h3>Age</h3>
				<input type='text' name='age' />
				<h3>Blood Pressure</h3>
				<input type='text' name='bp' />
				<h3>Heart Rate</h3>
				<input type='text' name='hr' />
			</form>
			<div></div>

			<button onClick={handleClick}>Sumbit</button>
			{record.acknowledged == true ? <div>Updated</div> : <div>failed</div>}
		</>
	);
};

export default PatientRecord;
