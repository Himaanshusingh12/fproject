import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function ViewCountry() {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [filteredcountries, setFilteredCountries] = useState([]);
	const [formValue, setFormValue] = useState({ name: "", country_code: "" });
	const [searchQuery, setSearchQuery] = useState("");
	// pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		fetchCountry();
	}, []);

	const fetchCountry = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/country`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/country/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				console.log(response.data);
				setCountries(response.data);
				setFilteredCountries(response.data);
			} else {
				toast.error(`Failed to fetch Country: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch currencies: ${error.response?.data?.message || error.message}`);
		}
	};

	// const handleSearch = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setSearchQuery(searchQuery);

	// 	if (searchQuery) {
	// 		fetchCountry(searchQuery);
	// 	} else {
	// 		setFilteredCountries(countries);
	// 	}
	// };

	//new handlesearch
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = countries.filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredCountries(filtered);
			setCurrentPage(1);
		} else {
			setFilteredCountries(countries);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			setFilteredCountries(
				countries.filter((countryItem) => {
					const nameMatch = countryItem.name && countryItem.name.toLowerCase().includes(searchQuery.toLowerCase());
					const codeMatch = countryItem.code && countryItem.code.toLowerCase().includes(searchQuery.toLowerCase());
					return nameMatch || codeMatch;
				})
			);
		} else {
			setFilteredCountries(countries);
		}
	}, [searchQuery, countries]);

	// Handle deletion of Country
	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/country/${id}`);
			toast.success("Country deleted successfully");
			fetchCountry();
		} catch (error) {
			console.error("Error deleting country", error);
			toast.error("Error deleting country");
		}
	};

	// Open the modal and set the selected Country for editing
	const handleEdit = (country) => {
		setSelectedCountry(country);
		setFormValue({ name: country.name, country_code: country.country_code });
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/country/${selectedCountry.id}`, formValue);
			console.log("Response:", response);
			if (response.status === 200) {
				toast.success("Country updated successfully");
				fetchCountry();
				const modalElement = document.getElementById("editModal");
				const modal = new window.bootstrap.Modal(modalElement);
				modal.hide();
			}
		} catch (error) {
			console.error("Error updating Country", error);
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to update Country");
			}
		}
	};

	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
			await axios.put(`${BACKEND_URL}/api/country/${id}/status`);
			toast.success(`Country status updated to ${updatedStatus} successfully`);
			fetchCountry(); // Refresh the list
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination logic
	const totalPages = Math.ceil(filteredcountries.length / itemsPerPage);
	const currentCountries = filteredcountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">Manage Country</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Country"
										className="form-control"
										style={{ width: "250px" }}
									/>
								</div>
							</div>
							<table className="table table-bordered">
								<thead>
									<tr>
										{/* <th>ID</th> */}
										{/* <th>Date</th> */}
										<th>Country Name</th>
										<th>Country Code</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {countries.length > 0 ? ( */}
									{/* countries.map((country) => ( */}
									{currentCountries.length > 0 ? (
										currentCountries.map((country) => (
											<tr key={country.id}>
												{/* <td>{country.id}</td> */}
												{/* <td>{country.date}</td> */}
												<td>{country.name}</td>
												<td>{country.country_code}</td>
												<td>{country.status || "Active"}</td>
												<td>
													<button
														className={`btn ${country.status === "Active" ? "btn-success me-2" : "btn-secondary"}`}
														onClick={() => handleToggle(country.id, country.status)}
													>
														<i
															className={`fas ${country.status === "Active" ? "fa-check-circle" : "fa-times-circle"}`}
															title={country.status === "Active" ? "Deactivate" : "Activate"}
														></i>
													</button>
													<button className="btn btn-warning ms-2" onClick={() => handleEdit(country)}>
														<i className="fas fa-edit" title="Edit"></i>
													</button>
													<button className="btn btn-danger ms-2" onClick={() => handleDelete(country.id)}>
														<i className="fas fa-trash" title="Delete"></i>
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No Country found
											</td>
										</tr>
									)}
								</tbody>
							</table>

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
												Edit Country
											</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<form onSubmit={handleSave}>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="CompanyName">Country Name</label>
													<input
														type="text"
														id="CompanyName"
														className="form-control"
														value={formValue.name}
														onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
														required
													/>
												</div>
												<div className="form-group mt-2">
													<label htmlFor="CountryCode">Country Code</label>
													<input
														type="text"
														id="CountryCode"
														className="form-control"
														value={formValue.country_code}
														onChange={(e) => setFormValue({ ...formValue, country_code: e.target.value })}
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

export default ViewCountry;
