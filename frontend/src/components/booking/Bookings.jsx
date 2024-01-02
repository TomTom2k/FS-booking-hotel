// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { cancelBooking, getAllBookings } from '../utils/ApiFuntions';
import Header from '../common/Header';
import BookingsTable from './BookingsTable';

const Bookings = () => {
	const [bookingInfo, setBookingInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setTimeout(() => {
			getAllBookings()
				.then((data) => {
					setBookingInfo(data);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(error.message);
					setIsLoading(false);
				});
		}, 1000);
	}, []);
	console.log(bookingInfo);
	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingId);
			const data = await getAllBookings();
			setBookingInfo(data);
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<section
			className="container"
			style={{ backgroundColor: 'whitesmoke' }}
		>
			<Header title={'Existing Bookings'} />
			{error && <div className="text-danger">{error}</div>}
			{isLoading ? (
				<div>Loading existing bookings</div>
			) : (
				<BookingsTable
					bookingInfo={bookingInfo}
					handleBookingCancellation={handleBookingCancellation}
				/>
			)}
		</section>
	);
};

export default Bookings;
