import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bheader() {
	const navigate = useNavigate();

	// Delete session
	const handleLogout = () => {
		localStorage.removeItem("userid");
		localStorage.removeItem("uname");
		toast.success("Logout Success");
		navigate("/");
	};

	return (
		<>
			<nav className="main-header navbar navbar-expand navbar-dark navbar-light">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" data-widget="pushmenu" href="#" role="button">
							<i className="fas fa-bars" />
						</a>
					</li>
					{/* <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">
              Home
            </a>
          </li> */}
					{/* <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li> */}
				</ul>
				<ul className="navbar-nav ml-auto">
					{/* <li className="nav-item">
						<a className="nav-link" data-widget="navbar-search" href="#" role="button">
							<i className="fas fa-search" />
						</a>
						<div className="navbar-search-block">
							<form className="form-inline">
								<div className="input-group input-group-sm">
									<input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
									<div className="input-group-append">
										<button className="btn btn-navbar" type="submit">
											<i className="fas fa-search" />
										</button>
										<button className="btn btn-navbar" type="button" data-widget="navbar-search">
											<i className="fas fa-times" />
										</button>
									</div>
								</div>
							</form>
						</div>
					</li> */}

					<li className="nav-item dropdown">
						<a className="nav-link" data-toggle="dropdown" href="#">
							<i className="fas fa-user-circle" />
						</a>
						<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
							<NavLink to="/profile" className="dropdown-item">
								<i className="fas fa-user mr-2" /> Profile
							</NavLink>
							<NavLink to="/change_password" className="dropdown-item">
								<i className="fas fa-key mr-2" /> Change Password
							</NavLink>
							<div className="dropdown-divider" />

							<NavLink to="/" onClick={handleLogout} className="dropdown-item">
								<i className="fas fa-sign-out-alt mr-2" /> Logout
							</NavLink>

							<NavLink to="/create-company" className="dropdown-item">
								<i className="fas fa-building mr-2" /> Create Company
							</NavLink>
							{/* <a to="/login" className="dropdown-item">
                <i className="fas fa-sign-in-alt mr-2" /> Login
              </a> */}
						</div>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-widget="fullscreen" href="#" role="button">
							<i className="fas fa-expand-arrows-alt" />
						</a>
					</li>
					{/* <li className="nav-item">
						<a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
							<i className="fas fa-th-large" />
						</a>
					</li> */}
				</ul>
			</nav>
		</>
	);
}

export default Bheader;
