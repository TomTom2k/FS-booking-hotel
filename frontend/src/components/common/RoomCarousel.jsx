// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getAllRooms } from '../utils/ApiFuntions';
import { Link } from 'react-router-dom';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

const RoomCarousel = () => {
	const [rooms, setRooms] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getAllRooms()
			.then((data) => {
				setRooms(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setErrorMessage(error);
				setIsLoading(false);
			});
	}, []);
	if (isLoading) {
		return <div className="mt-5">Loading rooms ... </div>;
	}
	if (errorMessage) {
		return <div className="my-5 text-danger">Error: {errorMessage}</div>;
	}
	return (
		<section className="bg-light my-5 shadow">
			<Link to={'/browser-all-rooms'} className="hotel-color text-center">
				Browser all rooms
			</Link>
			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{rooms
									.slice(index * 4, index * 4 + 4)
									.map((room) => (
										<Col
											key={room.id}
											className="mb-4"
											xs={12}
											md={6}
											lg={3}
										>
											<Card>
												<Link
													to={`/book-room/${room.id}`}
												>
													<Card.Img
														variant="top"
														src={`data:image/png;base64, ${room.photo}`}
														alt="Room photo"
														className="w-100"
														style={{
															height: '200px',
														}}
													/>
												</Link>
												<Card.Body>
													<Card.Title className="hotel-color">
														{room.roomType}
													</Card.Title>
													<Card.Title className="room-price">
														${room.roomPrice}/night
													</Card.Title>
													<div className="flex-shrink-0">
														<Link
															className="btn btn-sm btn-hotel"
															to={`/book-room/${room.id}`}
														>
															Book Now
														</Link>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	);
};

export default RoomCarousel;
