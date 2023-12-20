// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
			<div className=" container-fluid">
				<Link to={'/'}>
					<span className="hotel-color">Booking Hotel</span>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/browser-all-rooms"
							>
								Browse all rooms
							</NavLink>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								aria-current="page"
								to="/admin"
							>
								Manage Rooms
							</Link>
						</li>
					</ul>
					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/find-booking">
								Find My Booking
							</NavLink>
						</li>
						<li className="nav-item dropdown">
							<NavDropdown
								id="nav-dropdown-dark-example"
								title="Actions"
								menuVariant="light"
							>
								<NavDropdown.Item to="/login" as={Link}>
									Login
								</NavDropdown.Item>
								<NavDropdown.Item to="/profile" as={Link}>
									Profile
								</NavDropdown.Item>
								<NavDropdown.Item to="/logout" as={Link}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
