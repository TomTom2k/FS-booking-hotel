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
