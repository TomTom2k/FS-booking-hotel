// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Container } from 'react-bootstrap';

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center p-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Welcome to{' '}
						<span className="hotel-color">Booking Hotel</span>
					</h1>
					<h3>We offer the best services for all your needs</h3>
				</div>
			</Container>
		</div>
	);
};

export default Parallax;
