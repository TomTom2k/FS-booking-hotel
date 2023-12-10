import './App.css';
import ExistingRooms from './components/common/ExistingRooms';
import AddRoom from './components/room/AddRoom';

function App() {
	return (
		<>
			<AddRoom />
			<ExistingRooms />
		</>
	);
}

export default App;
