// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFuntions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {
	const { roomId } = useParams();
	const [room, setRoom] = useState({
		photo: null,
		roomType: '',
		roomPrice: '',
	});

	const [imagePreview, setImagePreview] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId);
				setRoom(roomData);
				setImagePreview(roomData.photo);
			} catch (error) {
				console.error(error);
			}
		};
		fetchRoom();
	}, [roomId]);

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setRoom({ ...room, photo: selectedImage });
		setImagePreview(URL.createObjectURL(selectedImage));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRoom({ ...room, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await updateRoom(roomId, room);
			if (res.status === 200) {
				setSuccessMessage('Room updated successfully!');
				const updatedRoomData = await getRoomById(roomId);
				setRoom(updatedRoomData);
				setImagePreview(updatedRoomData.photo);
				setErrorMessage('');
			} else {
				setErrorMessage('Error updating room');
			}
		} catch (error) {
			setErrorMessage(error.message);
			console.error(error);
		}
	};
	return (
		<div className="container my-5">
			<h3 className="text-center my-5">Edit room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success fade show">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-error fade show">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label">
								Room type
							</label>
							<input
								type="text"
								className="form-control"
								id="roomType"
								name="roomType"
								value={room.roomType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label">
								Room price
							</label>
							<input
								type="number"
								name="roomPrice"
								className="form-control"
								id="roomPrice"
								value={room.roomPrice}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="photo"
								className="form-lable hotel-color"
							>
								Photo
							</label>
							<input
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{
										maxWidth: '400px',
										maxHeight: '400px',
									}}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link
								to={'/existing-rooms'}
								className="btn btn-outline-info ml5"
							>
								Back
							</Link>
							<button className="btn btn-outline-warning">
								Edit room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditRoom;
