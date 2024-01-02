import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8080',
});

export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append('photo', photo);
	formData.append('roomType', roomType);
	formData.append('roomPrice', roomPrice);

	const res = await api.post('/rooms/add/new-room', formData);
	if (res.status === 201) {
		return true;
	} else {
		return false;
	}
}

export async function getRoomTypes() {
	try {
		const res = await api.get('/rooms/room-types');
		return res.data;
	} catch (error) {
		throw new Error('Error fetching room types: ', error);
	}
}

export async function getAllRooms() {
	try {
		const res = await api.get('/rooms/all-rooms');
		return res.data;
	} catch (error) {
		throw new Error('Error fetching rooms');
	}
}

export async function deleteRoom(roomId) {
	try {
		const res = await api.delete(`/rooms/delete/room/${roomId}`);
		return res.data;
	} catch (error) {
		throw new Error('Error deleting room: ', error);
	}
}

export async function updateRoom(roomId, roomData) {
	try {
		const formData = new FormData();
		formData.append('roomType', roomData.roomType);
		formData.append('roomPrice', roomData.roomPrice);
		formData.append('photo', roomData.photo);
		const res = await api.put(`/rooms/update/${roomId}`, formData);
		return res.data;
	} catch (error) {
		throw new Error('Error updating room: ', error);
	}
}

export async function getRoomById(roomId) {
	try {
		const res = await api.get(`/rooms/room/${roomId}`);
		return res.data;
	} catch (error) {
		console.error('Error fetching detail room: ', error);
	}
}

export async function bookRoom(roomId, booking) {
	try {
		const res = await api.post(`/bookings/room/${roomId}/booking`, booking);
		return res.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Error booking room : ${error.message}`);
		}
	}
}

export async function getAllBookings() {
	try {
		const res = await api.get('/bookings/all-bookings');
		return res.data;
	} catch (error) {
		throw new Error(`Error fetching bookings :  ${error.message}`);
	}
}

export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const res = await api.get(`/bookings/confirmation/${confirmationCode}`);
		return res.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Error find booking : ${error.message}`);
		}
	}
}

export async function cancelBooking(bookingId) {
	try {
		const res = await api.delete(`/bookings/booking/${bookingId}/delete`);
		return res.data;
	} catch (error) {
		throw new Error(`Error cancelling booking : ${error.message}`);
	}
}
