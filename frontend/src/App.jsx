import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';

function App() {
	return (
		<>
			<main>
				<Router>
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
					</Routes>
				</Router>
			</main>
		</>
	);
}

export default App;
