// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
	return (
		<div className="container mt-5">
			<h2>Welcome to Admin Panel</h2>
			<hr />
			<Link to={'/add-room'}>Manage Rooms</Link>
		</div>
	);
};

export default Admin;
