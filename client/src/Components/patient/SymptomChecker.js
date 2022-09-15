import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SymptomChecker = () => {
	//Getting medicAPI
	const handleClick = async () => {
		axios.get().then((response) => {
			console.log(response);
		});
	};
	return (
		<>
			<button onClick={handleClick}>Get request</button>
		</>
	);
};

export default SymptomChecker;
