import React, { useRef, useState, useEffect } from 'react';

const PatientRecord = () => {
	const [record, setRecord] = useState({});
	const [current, setCurrent] = useState({});
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
				});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		async function fetchData() {
			fetch('/api/record/current', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setCurrent(data);
					console.log(data);
				});
		}
		fetchData();
	}, [record]);
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

			<button onClick={handleClick}>Sumbit</button>
			{record.acknowledged === true ? <div>Updated</div> : <div>failed</div>}
			<div>
				<h1>Current records</h1>
				<div>Age: {current.age}</div>
				<div>BP: {current.blood_pressure}</div>
				<div>HR: {current.heart_rate}</div>
			</div>
		</>
	);
};

export default PatientRecord;
