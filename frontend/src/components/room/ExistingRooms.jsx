/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { FaTrashAlt, FaEye, FaEdit } from 'react-icons/fa';

import { deleteRoom, getAllRooms } from '../utils/ApiFuntions';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [roomsPerPage, setRoomsPerPage] = useState(8);
	const [isLoading, setIsLoading] = useState(false);
	const [filteredRooms, setFilteredRooms] = useState([]);
	const [selectedRoomType, setSelectedRoomType] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetchRooms();
	}, []);

	useEffect(() => {
		if (selectedRoomType === '') {
			setFilteredRooms(rooms);
		} else {
			const filtered = rooms.filter(
				(room) => room.roomType === selectedRoomType
			);
			setFilteredRooms(filtered);
		}
		setCurrentPage(1);
	}, [rooms, selectedRoomType]);
	const fetchRooms = async () => {
		setIsLoading(true);
		try {
			const res = await getAllRooms();
			setRooms(res);
		} catch (error) {
			setErrorMessage(error);
			console.error('Error fetch rooms');
		}
		setIsLoading(false);
	};

	const calculatedTotalPages = (filteredRooms, roomsPerPage, rooms) => {
		const totalRooms =
			filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
		return Math.ceil(totalRooms / roomsPerPage);
	};

	const handleDelete = async (roomId) => {
		try {
			const res = await deleteRoom(roomId);
			if (res === '') {
				setSuccessMessage(`Room no ${roomId} was delete`);
				fetchRooms();
			} else {
				setErrorMessage(`Error deleting room : ${res.message}`);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
		setTimeout(() => {
			setSuccessMessage('');
			setErrorMessage('');
		}, 3000);
	};

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const indexOfLastRoom = currentPage * roomsPerPage;
	const indexOfFilstRoom = indexOfLastRoom - roomsPerPage;
	const currentRooms = filteredRooms.slice(indexOfFilstRoom, indexOfLastRoom);

	return (
		<>
			{isLoading ? (
				<p>Loading existing rooms</p>
			) : (
				<>
					<div name="" id="" className="my-5 container">
						<div className="f-flex justify-content-center mb-3 mt-5">
							<h2>Existing Rooms</h2>
						</div>
						<Col md={6} className="mb-3 mb-md-0">
							<RoomFilter
								data={rooms}
								setFilteredData={setFilteredRooms}
							/>
						</Col>
						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Room Type</th>
									<th>Room Price</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentRooms.map((room) => (
									<tr key={room.id} className="text-center">
										<td>{room.id}</td>
										<td>{room.roomType}</td>
										<td>{room.roomPrice}</td>
										<td className="g-2">
											<Link to={`/edit-room/${room.id}`}>
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm"
												onClick={() =>
													handleDelete(room.id)
												}
											>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<RoomPaginator
							currentPage={currentPage}
							totalPages={calculatedTotalPages(
								filteredRooms,
								roomsPerPage,
								rooms
							)}
							onPageChange={handlePaginationClick}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ExistingRooms;
