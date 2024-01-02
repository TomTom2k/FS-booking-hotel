import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import RoomList from './components/room/RoomList';
import Admin from './components/admin/Admin';
import Checkout from './components/room/Checkout';
import BookingSuccess from './components/booking/BookingSuccess';
import Bookings from './components/booking/Bookings';
import FindBooking from './components/booking/FindBooking';

function App() {
	return (
		<>
			<main>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/edit-room/:roomId"
							element={<EditRoom />}
						/>
						<Route
							path="/existing-rooms"
							element={<ExistingRooms />}
						/>
						<Route path="/add-room" element={<AddRoom />} />
						<Route
							path="/book-room/:roomId"
							element={<Checkout />}
						/>
						<Route
							path="/browser-all-rooms"
							element={<RoomList />}
						/>
						<Route
							path="/booking-success"
							element={<BookingSuccess />}
						/>
						<Route path="/admin" element={<Admin />} />
						<Route
							path="/existing-bookings"
							element={<Bookings />}
						/>
						<Route path="/find-booking" element={<FindBooking />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</>
	);
}

export default App;
