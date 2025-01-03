import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import { useEffect } from "react";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ViewCreditMemo() {
	const [creditmemo, SetCreditmemo] = useState([]);
	const [filteredcreditmemo, setFilteredcreditmemo] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		fetchCreditmemo();
	}, []);

	const fetchCreditmemo = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/sales-creditmemo`;
			if (searchQuery) {
				url = `${BACKEND_URL}//api/sales-creditmemo/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				console.log(response.data);
				SetCreditmemo(response.data);
				setFilteredcreditmemo(response.data);
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
			const filtered = creditmemo.filter((creditmemo) => creditmemo.customer_name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredcreditmemo(filtered);
			setCurrentPage(1);
		} else {
			setFilteredcreditmemo(creditmemo);
		}
	};

	// Pagination logic
	const totalPages = Math.ceil(filteredcreditmemo.length / itemsPerPage);
	const currentCreditmemo = filteredcreditmemo.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">View Credit Memo</h3>
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
											<th>Credit Memo No</th>
											<th>Invoice Date</th>
											<th>Customer Name</th>
											<th>Net Amount</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{/* {creditmemo.map((creditmemo) => ( */}
										{currentCreditmemo.length > 0 ? (
											currentCreditmemo.map((creditmemo) => (
												<tr key={creditmemo.id}>
													<td>{creditmemo.creditmemo_no}</td>
													<td>{creditmemo.posting_date}</td>
													<td>{creditmemo.customer_name}</td>
													<td>{creditmemo.total_invoice_amount}</td>
													<td>
														<Link
															to={`/creditmemo-items/${creditmemo.creditmemo_id}`}
															className="btn btn-success ml-auto"
														>
															View
														</Link>
													</td>
												</tr>
												// ))}
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

			<BSlidnav />
		</>
	);
}

export default ViewCreditMemo;
