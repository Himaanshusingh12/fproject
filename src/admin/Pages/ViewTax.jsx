import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";

function ViewTax() {
	const [tax, setTax] = useState([]);
	const [filteredTaxes, setFilteredTaxes] = useState([]);
	// const [selectTax, setSelectTax] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	//pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [taxPerPage] = useState(6);

	useEffect(() => {
		fetchTax();
	}, []);

	const fetchTax = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/tax`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/tax/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				// console.log(response.data);
				setTax(response.data);
				setFilteredTaxes(response.data);
			} else {
				toast.error(`Failed to fetch Taxes: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch Taxes: ${error.response?.data?.message || error.message}`);
		}
	};

	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = tax.filter((tax) => tax.description.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredTaxes(filtered);
			setCurrentPage(1);
		} else {
			setFilteredTaxes(tax);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			setFilteredTaxes(
				tax.filter((taxItem) => {
					const descriptionMatch = taxItem.description && taxItem.description.toLowerCase().includes(searchQuery.toLowerCase());
					return descriptionMatch;
				})
			);
		} else {
			setFilteredTaxes(tax);
		}
	}, [searchQuery, tax]);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/tax/${id}`);
			toast.success("Tax deleted successfully");
			fetchTax();
		} catch (error) {
			console.error("Error deleting tax", error);
			toast.error("Error deleting currency");
		}
	};

	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "active" ? "inactive" : "active";
			console.log(`Toggling status for Tax ID: ${id}, Current Status: ${currentStatus}, Updated Status: ${updatedStatus}`);
			await axios.put(`${BACKEND_URL}/api/tax/${id}/status`);
			toast.success(`Tax status updated to ${updatedStatus} successfully`);
			fetchTax(); // Refresh the list
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination Logic
	const indexOfLastUser = currentPage * taxPerPage;
	const indexOfFirstUser = indexOfLastUser - taxPerPage;
	const currentTax = filteredTaxes.slice(indexOfFirstUser, indexOfLastUser);

	const totalPages = Math.ceil(filteredTaxes.length / taxPerPage);

	const handlePageChange = (taxNumber) => {
		setCurrentPage(taxNumber);
	};
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">Province</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Province"
										className="form-control"
										style={{ width: "250px" }}
									/>
								</div>
							</div>
							<table className="table table-bordered">
								<thead>
									<tr>
										{/* <th>ID</th> */}
										<th>Description</th>
										<th>GST</th>
										<th>PST</th>
										<th>QST</th>
										<th>HST</th>
										<th>Total</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {currency.length > 0 ? ( */}
									{/* currency.map((currency_manage) => ( */}
									{currentTax.length > 0 ? (
										currentTax.map((tax_manage) => (
											<tr key={tax_manage.tax_id}>
												{/* <td>{currency_manage.currency_id}</td> */}
												<td>{tax_manage.description}</td>
												<td>{tax_manage.gst}</td>
												<td>{tax_manage.pst}</td>
												<td>{tax_manage.qst}</td>
												<td>{tax_manage.hst}</td>
												<td>{tax_manage.total}</td>
												{/* <td>{tax_manage.status || "Active"}</td> */}
												<td>{tax_manage.status || "active"}</td>

												<td>
													<button
														className={`btn ${tax_manage.status === "active" ? "btn-success me-2" : "btn-secondary"}`}
														onClick={() => handleToggle(tax_manage.tax_id, tax_manage.status)}
													>
														<i
															className={`fas ${tax_manage.status === "active" ? "fa-check-circle" : "fa-times-circle"}`}
															title={tax_manage.status === "active" ? "Deactivate" : "Activate"}
														></i>
													</button>

													{/* <button className="btn btn-warning ms-1" onClick={() => handleEdit(tax_manage)}>
														<i className="fas fa-edit" title="Edit"></i>
													</button> */}
													<button className="btn btn-danger ms-2" onClick={() => handleDelete(tax_manage.tax_id)}>
														<i className="fas fa-trash" title="Delete"></i>
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No Tax Found
											</td>
										</tr>
									)}
								</tbody>
							</table>

							{/* Pagination Controls */}
							<nav>
								<ul className="pagination justify-content-end">
									<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
										<button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
											Previous
										</button>
									</li>
									{Array.from({ length: totalPages }, (_, index) => (
										<li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
											<button className="page-link" onClick={() => handlePageChange(index + 1)}>
												{index + 1}
											</button>
										</li>
									))}
									<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
										<button
											className="page-link"
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											Next
										</button>
									</li>
								</ul>
							</nav>
						</div>
					</section>
				</div>
			</div>
			<Afooter />
		</>
	);
}

export default ViewTax;
