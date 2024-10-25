import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function ViewProvince() {
	const [provinces, setProvinces] = useState([]);
	const [filteredProvinces, setFilteredProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState(null);
	const [formValue, setFormValue] = useState({ name: "", country_name: "" });
	const [searchQuery, setSearchQuery] = useState("");
	// pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		fetchProvinces();
	}, []);

	// Fetch Provinces from the backend
	// const fetchProvinces = async () => {
	// 	try {
	// 		const response = await axios.get(`${BACKEND_URL}/api/province`);
	// 		setProvinces(response.data);
	// 	} catch (error) {
	// 		console.error("Error fetching provinces", error);
	// 		toast.error("Error fetching provinces");
	// 	}
	// };
	const fetchProvinces = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/province`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/province/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				setProvinces(response.data);
				setFilteredProvinces(response.data);
			} else {
				toast.error(`Failed to fetch Province: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch Province: ${error.response?.data?.message || error.message}`);
		}
	};

	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			fetchProvinces(searchQuery);
			setCurrentPage(1);
		} else {
			setFilteredProvinces(provinces);
		}
	};

	//new handlesearch
	// const handleSearch = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setSearchQuery(searchQuery);

	// 	if (searchQuery) {
	// 		const filtered = provinces.filter((province) => province.name.toLowerCase().includes(searchQuery.toLowerCase()));
	// 		setFilteredProvinces(filtered);
	// 		setCurrentPage(1);
	// 	} else {
	// 		setFilteredProvinces(provinces);
	// 	}
	// };

	useEffect(() => {
		if (searchQuery) {
			setFilteredProvinces(
				provinces.filter((provinceItem) => {
					const nameMatch = provinceItem.name && provinceItem.name.toLowerCase().includes(searchQuery.toLowerCase());
					const codeMatch = provinceItem.code && provinceItem.code.toLowerCase().includes(searchQuery.toLowerCase());
					return nameMatch || codeMatch;
				})
			);
		} else {
			setFilteredProvinces(provinces);
		}
	}, [searchQuery, provinces]);

	// Handle deletion of Province
	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/province/${id}`);
			toast.success("Province deleted successfully");
			fetchProvinces();
		} catch (error) {
			console.error("Error deleting province", error);
			toast.error("Error deleting province");
		}
	};

	// Open the modal and set the selected Province for editing
	const handleEdit = (province) => {
		setSelectedProvince(province);
		setFormValue({ name: province.province_name, country_name: province.country_name, country_id: province.country_id });
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/province/${selectedProvince.id}`, {
				country_id: formValue.country_id,
				name: formValue.name,
			});
			if (response.status === 200) {
				toast.success("Province updated successfully");
				fetchProvinces();
				const modalElement = document.getElementById("editModal");
				const modal = new window.bootstrap.Modal(modalElement);
				modal.hide();
			}
		} catch (error) {
			console.error("Error updating province", error);
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to update province");
			}
		}
	};

	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
			await axios.put(`${BACKEND_URL}/api/province/${id}/status`, { status: updatedStatus });
			toast.success(`Province status updated to ${updatedStatus} successfully`);
			fetchProvinces();
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination logic
	const totalPages = Math.ceil(filteredProvinces.length / itemsPerPage);
	const currentProvinces = filteredProvinces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">Manage Province</h3>
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
										{/* <th>Date</th> */}
										<th>Country</th>
										<th>Province Name</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {provinces.length > 0 ? ( */}
									{/* provinces.map((province) => ( */}
									{currentProvinces.length > 0 ? (
										currentProvinces.map((province) => (
											<tr key={province.id}>
												{/* <td>{province.id}</td> */}
												{/* <td>{new Date(province.province_date).toLocaleDateString()}</td> Formatted date */}
												<td>{province.country_name}</td>
												<td>{province.province_name}</td>
												<td>{province.status || "Active"}</td>
												<td>
													<button
														className={`btn ${province.status === "Active" ? "btn-success me-2" : "btn-secondary"}`}
														onClick={() => handleToggle(province.id, province.status)}
													>
														<i
															className={`fas ${province.status === "Active" ? "fa-check-circle" : "fa-times-circle"}`}
															title={province.status === "Active" ? "Deactivate" : "Activate"}
														></i>
													</button>
													<button className="btn btn-warning ms-1" onClick={() => handleEdit(province)}>
														<i className="fas fa-edit" title="Edit"></i>
													</button>
													<button className="btn btn-danger ms-2" onClick={() => handleDelete(province.id)}>
														<i className="fas fa-trash" title="Delete"></i>
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No provinces found
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

							{/* Edit modal */}
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
												Edit Province
											</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<form onSubmit={handleSave}>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="provinceName">Province Name</label>
													<input
														type="text"
														id="provinceName"
														className="form-control"
														value={formValue.name}
														onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
														required
													/>
												</div>
												<div className="form-group">
													<label htmlFor="countryName">Country Name</label>
													<input
														type="text"
														id="countryName"
														className="form-control"
														value={formValue.country_name}
														onChange={(e) => setFormValue({ ...formValue, country_name: e.target.value })}
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

export default ViewProvince;
