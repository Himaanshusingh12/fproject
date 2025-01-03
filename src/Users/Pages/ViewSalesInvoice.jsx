import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewSalesInvoice() {
	const [salesInvoices, setSalesInvoices] = useState([]);
	const [filteredinvoices, setFilteredinvoices] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		fetchSalesInvoices();
	}, []);

	const fetchSalesInvoices = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/sales-invoice`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/salesinvoice/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				console.log(response.data);
				setSalesInvoices(response.data);
				setFilteredinvoices(response.data);
			} else {
				toast.error(`Failed to fetch Customer name : ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch Customer name:${error.response?.data?.message || error.message}`);
		}
	};

	// search handler
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = salesInvoices.filter((invoice) => invoice.customer_name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredinvoices(filtered);
			setCurrentPage(1);
		} else {
			setFilteredinvoices(salesInvoices);
		}
	};

	// Pagination logic
	const totalPages = Math.ceil(filteredinvoices.length / itemsPerPage);
	const currentInvoice = filteredinvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">View Sales Invoices</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Customer name"
										className="form-control"
										style={{ width: "250px" }}
									/>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr>
											<th>Invoice No</th>
											<th>Invoice Date</th>
											<th>Customer Name</th>
											<th>Net Amount</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{currentInvoice.length > 0 ? (
											currentInvoice.map((invoice) => (
												<tr key={invoice.id}>
													<td>{invoice.invoice_no}</td>
													<td>{invoice.posting_date}</td>
													<td>{invoice.customer_name}</td>
													<td>{invoice.total_invoice_amount}</td>
													<td>
														<Link to={`/salesinvoice-items/${invoice.invoice_id}`} className="btn btn-success ml-auto">
															View
														</Link>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan="5" className="text-center">
													No Customer Found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pagination controls */}
			<nav aria-label="Page navigation">
				<div className="d-flex justify-content-end">
					<ul className="pagination">
						<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
							<button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
								Previous
							</button>
						</li>
						{Array.from({ length: totalPages }, (_, index) => (
							<li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
								<button className="page-link" onClick={() => setCurrentPage(index + 1)}>
									{index + 1}
								</button>
							</li>
						))}
						<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
							<button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
								Next
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<Bfooter />
		</>
	);
}

export default ViewSalesInvoice;
