import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function ViewProvince() {
	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState(null);
	const [formValue, setFormValue] = useState({ name: "", country_name: "" });

	useEffect(() => {
		fetchProvinces();
	}, []);

	// Fetch Provinces from the backend
	const fetchProvinces = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/province`);
			setProvinces(response.data);
		} catch (error) {
			console.error("Error fetching provinces", error);
			toast.error("Error fetching provinces");
		}
	};

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
				country_id: formValue.country_id, // Use country_id from formValue
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
			fetchProvinces(); // Refresh the list
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
							<h3 className="mb-4">Provinces</h3>
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
									{provinces.length > 0 ? (
										provinces.map((province) => (
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
