import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";

function ViewBusinesses() {
	const [businesses, setBusinesses] = useState([]);
	const [filteredbusinesses, setFilteredBusinesses] = useState([]);
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [formValue, setFormValue] = useState({ name: "" });
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		fetchBusinesses();
	}, []);

	const fetchBusinesses = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/businesses`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/business-types/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				console.log(response.data);
				setBusinesses(response.data);
				setFilteredBusinesses(response.data);
			} else {
				toast.error(`Failed to fetch Businesses: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch Businesses: ${error.response?.data?.message || error.message}`);
		}
	};
	// const handleSearch = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setSearchQuery(searchQuery);

	// 	if (searchQuery) {
	// 		fetchBusinesses(searchQuery);
	// 	} else {
	// 		setFilteredBusinesses(businesses);
	// 	}
	// };

	//new handlesearch
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = businesses.filter((business) => business.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredBusinesses(filtered);
			setCurrentPage(1);
		} else {
			setFilteredBusinesses(businesses);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			setFilteredBusinesses(
				businesses.filter((businessItem) => {
					const nameMatch = businessItem.name && businessItem.name.toLowerCase().includes(searchQuery.toLowerCase());
					const codeMatch = businessItem.code && businessItem.code.toLowerCase().includes(searchQuery.toLowerCase());
					return nameMatch || codeMatch;
				})
			);
		} else {
			setFilteredBusinesses(businesses);
		}
	}, [searchQuery, businesses]);

	// Handle deletion of a business
	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/business-types/${id}`);
			toast.success("Business Type deleted successfully");
			fetchBusinesses();
		} catch (error) {
			console.error("Error deleting business", error);
			toast.error("Error deleting business");
		}
	};
	// Open the modal and set the selected business for editing
	const handleEdit = (business) => {
		setSelectedBusiness(business);
		setFormValue({ name: business.name });
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/business-types/${selectedBusiness.id}`, formValue);
			console.log("Response:", response);
			if (response.status === 200) {
				toast.success("Business Type updated successfully");
				fetchBusinesses();
				const modalElement = document.getElementById("editModal");
				const modal = new window.bootstrap.Modal(modalElement);
				modal.hide();
			}
		} catch (error) {
			console.error("Error updating business", error);
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to update Business Type");
			}
		}
	};

	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
			await axios.put(`${BACKEND_URL}/api/business-types/${id}/status`);
			toast.success(`Business Type status updated to ${updatedStatus} successfully`);
			fetchBusinesses(); // Refresh the list
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination logic
	const totalPages = Math.ceil(filteredbusinesses.length / itemsPerPage);
	const currentBusinesses = filteredbusinesses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">Manage Business Types</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Businesses"
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
										<th>Business Type Name</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {businesses.length > 0 ? ( */}
									{/* businesses.map((business) => ( */}
									{currentBusinesses.length > 0 ? (
										currentBusinesses.map((business) => (
											<tr key={business.id}>
												{/* <td>{business.id}</td> */}
												{/* <td>{business.date}</td> */}
												<td>{business.name}</td>
												<td>{business.status || "Active"}</td>
												<td>
													<button
														className={`btn ${business.status === "Active" ? "btn-success me-2" : "btn-secondary"}`}
														onClick={() => handleToggle(business.id, business.status)}
													>
														<i
															className={`fas ${business.status === "Active" ? "fa-check-circle" : "fa-times-circle"}`}
															title={business.status === "Active" ? "Deactivate" : "Activate"}
														></i>
													</button>
													<button className="btn btn-warning ms-1" onClick={() => handleEdit(business)}>
														<i className="fas fa-edit" title="Edit"></i>
													</button>
													<button className="btn btn-danger ms-2" onClick={() => handleDelete(business.id)}>
														<i className="fas fa-trash" title="Delete"></i>
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No businesses found
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
												Edit Business Type
											</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<form onSubmit={handleSave}>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="businessName">Business Type Name</label>
													<input
														type="text"
														id="businessName"
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

export default ViewBusinesses;
