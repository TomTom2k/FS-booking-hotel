// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
	cancelBooking,
	getBookingByConfirmationCode,
} from '../utils/ApiFuntions';

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [bookingInfo, setBookingInfo] = useState({
		id: '',
		room: {
			id: '',
		},
		bookingConfirmationCode: '',
		roomNumber: '',
		checkInDate: '',
		checkOutDate: '',
		guestFullName: '',
		guestEmail: '',
		numOfAdults: '',
		numOfChildren: '',
		totalNumOfGuest: '',
	});
	const [isDeleted, setIsDeleted] = useState(false);

	const clearBookingInfo = {
		id: '',
		room: {
			id: '',
		},
		bookingConfirmationCode: '',
		roomNumber: '',
		checkInDate: '',
		checkOutDate: '',
		guestFullName: '',
		guestEmail: '',
		numOfAdults: '',
		numOfChildren: '',
		totalNumOfGuest: '',
	};

	const handleInputChange = (e) => {
		setConfirmationCode(e.target.value);
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const data = await getBookingByConfirmationCode(confirmationCode);
			setBookingInfo(data);
		} catch (error) {
			setBookingInfo(clearBookingInfo);
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message);
			} else {
				setError(error.message);
			}
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};
	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingId);
			setIsDeleted(true);
			setBookingInfo(clearBookingInfo);
			setConfirmationCode('');
			setError('');
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2>Find My Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button className="btn btn-hotel input-group-text">
							Find Booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<p>Finding booking</p>
				) : error ? (
					<p className="text-danger">{error}</p>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="col-md-6 my-5">
						<h3>Booking Information</h3>
						<p>
							Booking Confirmation Code :{' '}
							{bookingInfo.bookingConfirmationCode}
						</p>
						<p>Booking ID : {bookingInfo.id}</p>
						<p>Room Number : {bookingInfo.room.id}</p>
						<p>Check-In Date : {bookingInfo.checkInDate}</p>
						<p>Check-In Date : {bookingInfo.checkOutDate}</p>
						<p>Ful Name : {bookingInfo.guestFullName}</p>
						<p>Email Address : {bookingInfo.guestEmail}</p>
						<p>Adults : {bookingInfo.numOfAdults}</p>
						<p>Children : {bookingInfo.numOfChildren}</p>
						<p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

						{!isDeleted && (
							<button
								className="btn btn-danger"
								onClick={() =>
									handleBookingCancellation(bookingInfo.id)
								}
							>
								Cancel Booking
							</button>
						)}
					</div>
				) : (
					<p>Finding booking</p>
				)}

				{isDeleted && (
					<div className="alert alert-success mt-3" role="alert">
						Booking has been cancelled successfully!
					</div>
				)}
			</div>
		</>
	);
};

export default FindBooking;
