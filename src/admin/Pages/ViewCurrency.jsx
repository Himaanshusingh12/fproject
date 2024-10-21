import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";

function ViewCurrency() {
	const [currency, setCurrency] = useState([]);
	const [filteredCurrencies, setFilteredCurrencies] = useState([]);
	const [selectCurrency, setSelectCurrency] = useState(null);
	const [formValue, setFormValue] = useState({ name: "" });
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [currencyPerPage] = useState(6);

	useEffect(() => {
		fetchCurrency();
	}, []);

	const fetchCurrency = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/currency`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/currency/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				console.log(response.data);
				setCurrency(response.data);
				setFilteredCurrencies(response.data);
			} else {
				toast.error(`Failed to fetch currencies: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch currencies: ${error.response?.data?.message || error.message}`);
		}
	};

	// const handleSearch = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setSearchQuery(searchQuery);
	// 	setCurrentPage(1); // Reset pagination

	// 	if (searchQuery) {
	// 		fetchCurrency(searchQuery);
	// 	} else {
	// 		setFilteredCurrencies(currency);
	// 	}
	// };

	//new handlesearch
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = currency.filter((currency) => currency.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredCurrencies(filtered);
			setCurrentPage(1);
		} else {
			setFilteredCurrencies(currency);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			setFilteredCurrencies(
				currency.filter((currencyItem) => {
					const nameMatch = currencyItem.name && currencyItem.name.toLowerCase().includes(searchQuery.toLowerCase());
					const codeMatch = currencyItem.code && currencyItem.code.toLowerCase().includes(searchQuery.toLowerCase());
					return nameMatch || codeMatch;
				})
			);
		} else {
			setFilteredCurrencies(currency);
		}
	}, [searchQuery, currency]);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/currency/${id}`);
			toast.success("currency deleted successfully");
			fetchCurrency();
		} catch (error) {
			console.error("Error deleting currency", error);
			toast.error("Error deleting currency");
		}
	};
	//Open the modal and set the selected currency for editing
	const handleEdit = (currency_manage) => {
		setSelectCurrency(currency_manage);
		setFormValue({ name: currency_manage.name });
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/currency/${selectCurrency.currency_id}`, formValue);
			console.log("Response:", response);
			if (response.status === 200) {
				toast.success("Currency updated successfully");
				fetchCurrency();
				const modalElement = document.getElementById("editModal");
				const modal = new window.bootstrap.Modal(modalElement);
				modal.hide();
			}
		} catch (error) {
			console.error("Error updating currency", error);
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to update currency");
			}
		}
	};
	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "active" ? "inactive" : "active";
			console.log(`Toggling status for Currency ID: ${id}, Current Status: ${currentStatus}, Updated Status: ${updatedStatus}`);
			await axios.put(`${BACKEND_URL}/api/currency/${id}/status`);
			toast.success(`Currency status updated to ${updatedStatus} successfully`);
			fetchCurrency(); // Refresh the list
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination Logic
	const indexOfLastUser = currentPage * currencyPerPage;
	const indexOfFirstUser = indexOfLastUser - currencyPerPage;
	const currentCurrency = filteredCurrencies.slice(indexOfFirstUser, indexOfLastUser);

	const totalPages = Math.ceil(filteredCurrencies.length / currencyPerPage);

	const handlePageChange = (currencyNumber) => {
		setCurrentPage(currencyNumber);
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
								<h3 className="mb-4">Manage Currency</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Currency"
										className="form-control"
										style={{ width: "250px" }}
									/>
								</div>
							</div>
							<table className="table table-bordered">
								<thead>
									<tr>
										{/* <th>ID</th> */}
										<th>Name</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {currency.length > 0 ? ( */}
									{/* currency.map((currency_manage) => ( */}
									{currentCurrency.length > 0 ? (
										currentCurrency.map((currency_manage) => (
											<tr key={currency_manage.currency_id}>
												{/* <td>{currency_manage.currency_id}</td> */}
												<td>{currency_manage.name}</td>
												<td>{currency_manage.status || "Active"}</td>
												<td>
													<button
														className={`btn ${currency_manage.status === "active" ? "btn-success me-2" : "btn-secondary"}`}
														onClick={() => handleToggle(currency_manage.currency_id, currency_manage.status)}
													>
														<i
															className={`fas ${currency_manage.status === "active" ? "fa-check-circle" : "fa-times-circle"}`}
															title={currency_manage.status === "active" ? "Deactivate" : "Activate"}
														></i>
													</button>

													<button className="btn btn-warning ms-1" onClick={() => handleEdit(currency_manage)}>
														<i className="fas fa-edit" title="Edit"></i>
													</button>
													<button className="btn btn-danger ms-2" onClick={() => handleDelete(currency_manage.currency_id)}>
														<i className="fas fa-trash" title="Delete"></i>
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No Currency Found
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

							{/* edit modal */}
							<div
								className="modal fade"
								id="editModal"
								tabIndex="-1"
								role="dialog"
								aria-labelledby="editModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="editModalLabel">
												Edit Currency
											</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<form onSubmit={handleSave}>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="currency">Currency Name</label>
													<input
														type="text"
														id="currency"
														className="form-control"
														value={formValue.name}
														onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
														required
													/>
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-secondary" data-dismiss="modal">
													Close
												</button>
												<button type="submit" className="btn btn-primary">
													Save changes
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<Afooter />
		</>
	);
}

export default ViewCurrency;
