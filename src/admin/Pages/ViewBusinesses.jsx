import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";

function ViewBusinesses() {
	const [businesses, setBusinesses] = useState([]);
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [formValue, setFormValue] = useState({ name: "" });

	useEffect(() => {
		fetchBusinesses();
	}, []);

	// Fetch business types from the backend
	const fetchBusinesses = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/businesses`);
			setBusinesses(response.data);
		} catch (error) {
			console.error("Error fetching businesses", error);
			toast.error("Error fetching businesses");
		}
	};

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
		setFormValue({ name: business.name }); // Populate the form with the selected business's data
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show(); // Show the Bootstrap modal
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

	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<h3 className="mb-4">Business Types</h3>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Date</th>
										<th>Business Type Name</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{businesses.length > 0 ? (
										businesses.map((business) => (
											<tr key={business.id}>
												<td>{business.id}</td>
												<td>{business.date}</td>
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
													<button className="btn btn-warning" onClick={() => handleEdit(business)}>
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
