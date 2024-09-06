import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function BSlidnav() {
	return (
		<>
			<div class="wrapper">
				{/* Main Sidebar Container */}
				<aside className="main-sidebar sidebar-dark-primary elevation-4">
					{/* Brand Logo */}
					<a href="#" className="brand-link">
						<img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
						<span className="brand-text font-weight-light" style={{ textDecoration: "none" }}>
							Codein Web
						</span>
					</a>
					{/* Sidebar */}
					<div className="sidebar">
						{/* Sidebar user panel (optional) */}
						{/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Alexander Pierce
                </a>
              </div>
            </div> */}
						{/* SidebarSearch Form */}
						{/* <div className="form-inline">
							<div className="input-group" data-widget="sidebar-search">
								<input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
								<div className="input-group-append">
									<button className="btn btn-sidebar">
										<i className="fas fa-search fa-fw" />
									</button>
								</div>
							</div>
						</div> */}
						{/* Sidebar Menu */}
						<nav className="mt-2">
							<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
								<li className="nav-item">
									<NavLink to="/user" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Dashboard</p>
									</NavLink>
								</li>
								<li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle"
										href="#"
										id="basic-master-dropdown"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										<i className="nav-icon fas fa-book" />
										<p>
											Basic Master
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="/chart-account" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Chart of Account</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/profit-loss" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Profit and Loss Format</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/balance-sheet" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Balance Sheet Format</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/customer-master" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Customer Master</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/vendor-master" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Vendor Master</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/customer-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Customer Statement Format</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/vendor-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Vendor Statement Formant</p>
											</NavLink>
										</li>
									</ul>
								</li>

								<li className="nav-item">
									<NavLink to="/sales-module" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Sales Module</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/purchase-module" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Purchase Module</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/bank-payment" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Bank Payment</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/bank-receipt" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Bank Receipt</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/bank-reconciliation" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Bank Reconcilation</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/journal" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Journal</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/reports" className="nav-link">
										<i className="nav-icon far fa-image" />
										<p>Reports</p>
									</NavLink>
								</li>
							</ul>
						</nav>
						{/* /.sidebar-menu */}
					</div>
					{/* /.sidebar */}
				</aside>
			</div>
		</>
	);
}

export default BSlidnav;
