/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
	return (
		<Col key={room.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrink-0 mb-3 mb-md-0">
						<Card.Img
							variant="top"
							src={`data:image/png;base64, ${room.photo}`}
							alt="Room photo"
							style={{
								width: '100%',
								maxWidth: '200px',
								height: 'auto',
							}}
						/>
					</div>
					<div className="flex-grow-1 me-3 px-5">
						<Card.Title className="hotel-color text-start">
							{room.roomType}
						</Card.Title>
						<Card.Title className="room-price  text-start accordion">
							{room.roomPrice} $
						</Card.Title>
						<Card.Text className="text-start">
							Some room information goes here for the guest to
							read through
						</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link
							to={`/bookings/${room.id}`}
							className="btn btn-hotel btn-sm"
						>
							View / Book Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default RoomCard;
