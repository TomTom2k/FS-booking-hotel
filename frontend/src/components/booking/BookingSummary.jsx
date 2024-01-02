/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const navigate = useNavigate();
	const checkInDate = moment(booking.checkInDate);
	const checkOutDate = moment(booking.checkOutDate);
	const numOfDays = checkOutDate.diff(checkInDate, 'days');
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate('/booking-success');
		}
	}, [isBookingConfirmed, navigate]);

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true);
		setTimeout(() => {
			setIsProcessingPayment(false);
			setIsBookingConfirmed(true);
			onConfirm();
		}, 3000);
	};

	return (
		<div className="card card-body mt-5">
			<h4>Reservation Summary</h4>
			<p>
				FullName : <strong>{booking.guestFullName}</strong>
			</p>
			<p>
				Email : <strong>{booking.guestEmail}</strong>
			</p>
			<p>
				Check-In date :{' '}
				<strong>
					{moment(booking.checkInDate).format('MMM Do YYYY')}
				</strong>
			</p>
			<p>
				Check-Out date :{' '}
				<strong>
					{moment(booking.checkOutDate).format('MMM Do YYYY')}
				</strong>
			</p>
			<p>
				Number of Days : <strong>{numOfDays}</strong>
			</p>
			<div>
				<h5>Number of Guest</h5>
				<strong>
					Adult{booking.numOfAdults > 1 ? 's' : ''} :{' '}
					{booking.numOfAdults}
				</strong>
				<strong>children : {booking.numOfChildren}</strong>
			</div>
			{payment > 0 ? (
				<>
					<p>
						Total payment : <strong>{payment}</strong>
					</p>
					{isFormValid && !isBookingConfirmed ? (
						<Button
							variant="success"
							onClick={handleConfirmBooking}
						>
							{isProcessingPayment ? (
								<p>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Booking Confirmed & redirecting to payment
								</p>
							) : (
								'Confirm Booking and proceed to payment'
							)}
						</Button>
					) : (
						isBookingConfirmed && (
							<div className="d-flex justify-content-center align-items-center">
								<div
									className="spinner-border text-primary"
									role="status"
								>
									<span>Loading</span>
								</div>
							</div>
						)
					)}
				</>
			) : (
				<p className="text-danger">
					Check-out date must be after check-in date
				</p>
			)}
		</div>
	);
};

export default BookingSummary;
