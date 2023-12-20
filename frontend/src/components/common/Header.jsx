/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Header = ({ title }) => {
	return (
		<header className="header">
			<div className="overlay"></div>
			<div className="container">
				<h1 className="header-title">{title}</h1>
			</div>
		</header>
	);
};

export default Header;
