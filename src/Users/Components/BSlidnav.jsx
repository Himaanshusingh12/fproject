import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function BSlidnav() {
	const [username, setUsername] = useState("Guest");

	useEffect(() => {
		const uname = localStorage.getItem("uname");
		if (uname) {
			const nameParts = uname.split(" ");
			const firstName = nameParts.length > 0 ? nameParts[0] : uname;
			setUsername(firstName);
		}
	}, []);
	return (
		<>
			<div class="wrapper">
				{/* Main Sidebar Container */}
				<aside className="main-sidebar sidebar-dark-primary elevation-4">
					{/* Brand Logo */}
					<a href="#Home" className="brand-link" style={{ display: "flex", textDecoration: "none" }}>
						{/* <img
							src="dist/img/AdminLTELogo.png"
							alt="AdminLTE Logo"
							className="brand-image img-circle elevation-3"
							style={{ opacity: "0.8" }}
						/> */}
						<span className="brand-text font-weight-light" style={{ marginLeft: "10px" }}>
							{username}
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
										<i className="nav-icon fas fa-tachometer-alt" />
										<p>Dashboard</p>
									</NavLink>
								</li>
								{/* <li className="nav-item" key="basic-master">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#basic-master"
										role="button"
										aria-expanded="false"
										aria-controls="basic-master"
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
								</li> */}

								<li className="nav-item" key="sales-module">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#sales-module"
										role="button"
										aria-expanded="false"
										aria-controls="sales-module"
									>
										<i className="nav-icon fas fa-shopping-cart" />
										<p>
											Sales Module
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="/sales-invoice" className="nav-link">
												<i className="far fa-file-invoice nav-icon" />
												<p>Sales Invoice</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/credit-memo" className="nav-link">
												<i className="fas fa-receipt nav-icon" />
												<p>Sales Credit Memo</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/customer-master" className="nav-link">
												<i className="fas fa-users nav-icon" />
												<p>Customer Master</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/account-report" className="nav-link">
												<i className="fas fa-file-alt nav-icon" />
												<p>Aged Account Receivable report</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/customer-ledger" className="nav-link">
												<i className="fas fa-book nav-icon" />
												<p>Customer Ledger</p>
											</NavLink>
										</li>
										{/* <li className="nav-item">
											<NavLink to="/customer-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Customer Statement Format</p>
											</NavLink>
										</li> */}
										{/* <li className="nav-item">
											<NavLink to="/vendor-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Vendor Statement Formant</p>
											</NavLink>
										</li> */}
									</ul>
								</li>
								<li className="nav-item" key="purchase-module">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#purchase-module"
										role="button"
										aria-expanded="false"
										aria-controls="purchase-module"
									>
										<i className="nav-icon fas fa-shopping-bag" />
										<p>
											Purchase Module
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="/purchase-invoice" className="nav-link">
												<i className="fas fa-file-invoice-dollar nav-icon" />
												<p>Purchase Invoice</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/debit-memo" className="nav-link">
												<i className="fas fa-file-invoice nav-icon" />
												<p>Debit Memo</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/vendor-master" className="nav-link">
												<i className="fas fa-user-tie nav-icon" />
												<p>Vendor Master</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/accountpayble-report" className="nav-link">
												<i className="fas fa-file-alt nav-icon" />
												<p>Aged Account Payable report</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/vendor-ledger" className="nav-link">
												<i className="far fa-book nav-icon" />
												<p>Vendor Ledger</p>
											</NavLink>
										</li>
										{/* <li className="nav-item">
											<NavLink to="/customer-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Customer Statement Format</p>
											</NavLink>
										</li> */}
										{/* <li className="nav-item">
											<NavLink to="/vendor-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Vendor Statement Formant</p>
											</NavLink>
										</li> */}
									</ul>
								</li>

								<li className="nav-item" key="bank-module">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#bank-module"
										role="button"
										aria-expanded="false"
										aria-controls="bank-module"
									>
										<i className="nav-icon fas fa-university" />
										<p>
											Bank Module
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="/bank-payment" className="nav-link">
												<i className="fas fa-money-check-alt nav-icon" />
												<p>Bank Payment</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/bank-receipt" className="nav-link">
												<i className="fas fa-receipt nav-icon" />
												<p>Bank Reciept</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/contra-entries" className="nav-link">
												<i className="nav-icon fas fa-exchange-alt" />
												<p>Contra Entries</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="nav-icon fas fa-receipt" />
												<p>Transaction Summary</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/bank-reconciliation" className="nav-link">
												<i className="fas fa-balance-scale nav-icon" />
												<p>Bank Reconcilation</p>
											</NavLink>
										</li>
										{/* <li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Bank Reconcilation</p>
											</NavLink>
										</li> */}
										{/* <li className="nav-item">
											<NavLink to="/vendor-statement" className="nav-link">
												<i className="far fa-circle nav-icon" />
												<p>Vendor Statement Formant</p>
											</NavLink>
										</li> */}
									</ul>
								</li>

								<li className="nav-item" key="basic-master">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#basic-master"
										role="button"
										aria-expanded="false"
										aria-controls="basic-master"
									>
										<i className="nav-icon fas fa-chart-pie" />
										<p>
											Reports
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="fas fa-file-invoice nav-icon" />
												<p>Aged Account Payable</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="fas fa-file-invoice-dollar nav-icon" />
												<p>Aged Account Receivable</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="fas fa-balance-scale nav-icon" />
												<p>Trial Balance</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/profit-loss" className="nav-link">
												<i className="fas fa-chart-line nav-icon" />
												<p>Profit and Loss</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/balance-sheet" className="nav-link">
												<i className="fas fa-file-invoice-dollar nav-icon" />
												<p>Balance Sheet</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="fas fa-book-open nav-icon" />
												<p>General Ledger</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="" className="nav-link">
												<i className="fas fa-university nav-icon" />
												<p>Bank Reconcilation</p>
											</NavLink>
										</li>
									</ul>
								</li>
								<li className="nav-item">
									<NavLink to="/journal" className="nav-link">
										<i className="nav-icon fas fa-book" />
										<p>Journal Entry</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/chart-account" className="nav-link">
										<i className="nav-icon fas fa-list-alt" />
										<p>Chart of Account</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="#" className="nav-link">
										<i className="nav-icon fas fa-file-invoice-dollar" />
										<p>Taxation</p>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="#" className="nav-link">
										<i className="nav-icon fas fa-money-check-alt" />
										<p>Payroll</p>
									</NavLink>
								</li>
								<li className="nav-item" key="basic-master">
									<a
										className="nav-link"
										data-toggle="collapse"
										href="#basic-master"
										role="button"
										aria-expanded="false"
										aria-controls="basic-master"
									>
										<i className="nav-icon fas fa-table" />
										<p>
											Basic Table
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<NavLink to="/paymentterm-table" className="nav-link">
												<i className="fas fa-file-invoice nav-icon" />
												<p>Payment Term Table</p>
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/tax-table" className="nav-link">
												<i className="fas fa-file-invoice-dollar nav-icon" />
												<p>Tax Table</p>
											</NavLink>
										</li>
									</ul>
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
