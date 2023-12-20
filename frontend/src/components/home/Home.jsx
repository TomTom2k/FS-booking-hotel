// eslint-disable-next-line no-unused-vars
import React from 'react';
import HeaderMain from '../layout/HeaderMain';
import HotelService from '../common/HotelService';
import Parallax from '../common/Parallax';
import RoomCarousel from '../common/RoomCarousel';

const Home = () => {
	return (
		<div>
			<HeaderMain />
			<section className="container">
				<RoomCarousel />
				<Parallax />
				<RoomCarousel />
				<HotelService />
				<Parallax />
				<RoomCarousel />
			</section>
		</div>
	);
};

export default Home;
