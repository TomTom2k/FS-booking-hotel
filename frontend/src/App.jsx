import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import RoomList from './components/room/RoomList';

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
							path="/browse-all-rooms"
							element={<RoomList />}
						/>
					</Routes>
				</Router>
				<Footer />
			</main>
		</>
	);
}

export default App;
