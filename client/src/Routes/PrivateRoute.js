import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
	const [isAuthenticated, setAuthenticated] = useState({});
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	useEffect(() => {
		fetch('/api/auth/check', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setAuthenticated(data);

				console.log(data);
			});
	}, []);
	if (isAuthenticated.errors) return <Navigate to='/login' />;

	return <Component />;
};

export default PrivateRoute;
