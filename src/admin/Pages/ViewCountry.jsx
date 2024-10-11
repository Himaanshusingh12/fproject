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
	const [formValue, setFormValue] = useState({ name: "" });

	useEffect(() => {
		fetchCountry();
	}, []);

	// Fetch Country from the backend
	const fetchCountry = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/country`);
			setCountries(response.data);
		} catch (error) {
			console.error("Error fetching Country", error);
			toast.error("Error fetching Country");
		}
	};

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
		setFormValue({ name: country.name }); // Populate the form with the selected data
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show(); // Show the Bootstrap modal
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
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<h3 className="mb-4">Country</h3>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Date</th>
										<th>Country Name</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{countries.length > 0 ? (
										countries.map((country) => (
											<tr key={country.id}>
												<td>{country.id}</td>
												<td>{country.date}</td>
												<td>{country.name}</td>
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
													<button className="btn btn-warning" onClick={() => handleEdit(country)}>
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
