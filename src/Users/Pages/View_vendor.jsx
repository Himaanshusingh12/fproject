import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";

function View_vendor() {
	const [vendors, setVendors] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredVendors, setFilteredVendors] = useState([]);
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [formValue, setFormValue] = useState({
		vendor_name: "",
		operating_as: "",
		address: "",
		address_send: "",
		currency: "",
		email_statement: "",
		email_payment: "",
		gst_no: "",
		credit_terms: "",
	});
	useEffect(() => {
		fetchVendors();
	}, []);

	const fetchVendors = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/vendors`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/vendors/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);

			if (response.status === 200) {
				setVendors(response.data);
				setFilteredVendors(response.data); // Store fetched customers for client-side filtering
			} else {
				toast.error(`Failed to fetch vendors: ${response.statusText}`);
			}
		} catch (error) {
			if (error.response) {
				toast.error(`Failed to fetch vendors 2: ${error.response.data.message || error.response.statusText}`);
			} else if (error.request) {
				toast.error("Failed to fetch vendors 3: No response received");
			} else {
				toast.error(`Failed to fetch vendors 4: ${error.message}`);
			}
		}
	};

	// Handle form change for the modal
	const handleFormChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	// Open the modal and set the selected customer for editing
	const handleEdit = (vendor) => {
		setSelectedVendor(vendor);
		setFormValue(vendor); // Populate the form with the selected vendors's data
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show(); // Show the Bootstrap modal
	};

	// Save the updated customer
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/vendors/${selectedVendor.id}`, formValue);
			if (response.status === 200) {
				toast.success("Vendor updated successfully");
				fetchVendors(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error updating vendor", error);
			console.log("Response:", error.response); // Add this line
			toast.error("Failed to update vendor");
		}
	};

	// Delete customer
	const handleDelete = async (vendorId) => {
		try {
			const response = await axios.delete(`${BACKEND_URL}/api/vendors/${vendorId}`); //here
			if (response.status === 200) {
				toast.success("Vendor deleted successfully");
				fetchVendors(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error deleting vendor", error);
			toast.error("Failed to delete vendor");
		}
	};
	// Block/Unblock customer
	const handleBlockUnblock = async (vendor) => {
		try {
			const updatedStatus = vendor.is_blocked ? 0 : 1;
			const response = await axios.patch(`${BACKEND_URL}/api/vendors/${vendor.id}/block`, { is_blocked: updatedStatus });
			if (response.status === 200) {
				toast.success(`Vendor ${updatedStatus ? "blocked" : "unblocked"} successfully`);
				fetchVendors(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error updating block status", error);
			toast.error("Failed to update block status");
		}
	};
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			fetchVendors(searchQuery);
		} else {
			setFilteredVendors(vendors);
		}
	};
	useEffect(() => {
		if (searchQuery) {
			setFilteredVendors(
				vendors.filter(
					(vendor) =>
						vendor.vendor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						vendor.operating_as.toLowerCase().includes(searchQuery.toLowerCase()) ||
						vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
						vendor.email_statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
						vendor.email_payment.toLowerCase().includes(searchQuery.toLowerCase()) ||
						vendor.gst_no.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);
		} else {
			setFilteredVendors(vendors);
		}
	}, [searchQuery, vendors]);
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h2>Vendor Management</h2>
							<div className="d-flex align-items-center">
								<span className="me-2">Search:</span>
								<input
									type="text"
									value={searchQuery}
									onChange={handleSearch}
									placeholder="Search vendors"
									className="form-control"
									style={{ width: "250px" }}
								/>
							</div>
						</div>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Vendor Name</th>
										<th>Operating As</th>
										<th>Address</th>
										<th>Address send</th>
										<th>Currency</th>
										<th>Email (Statement)</th>
										<th>Email (Payment)</th>
										<th>GST No</th>
										<th>Credit Terms</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {customers.map((customer) => ( */}
									{filteredVendors.map((vendor) => (
										<tr key={vendor.id}>
											<td>{vendor.id}</td>
											<td>{vendor.vendor_name}</td>
											<td>{vendor.operating_as}</td>
											<td>{vendor.address}</td>
											<td>{vendor.address_send}</td>
											<td>{vendor.currency}</td>
											<td>{vendor.email_statement}</td>
											<td>{vendor.email_payment}</td>
											<td>{vendor.gst_no}</td>
											<td>{vendor.credit_terms}</td>
											<td>
												<button className="btn btn-primary me-2" onClick={() => handleEdit(vendor)}>
													{/* Edit */}
													<i className="fas fa-edit" title="Edit"></i>
												</button>
												<button className="btn btn-danger me-2" onClick={() => handleDelete(vendor.id)}>
													{/* Delete */}
													<i className="fas fa-trash" title="Delete"></i>
												</button>
												{/* <button className={`btn ${customer.is_blocked ? "btn-warning" : "btn-secondary"}`} onClick={() => handleBlockUnblock(customer)}>
													{customer.is_blocked ? "Unblock" : "Block"}
												</button> */}
												<button
													className={`btn ${vendor.is_blocked ? "btn-warning" : "btn-secondary"}`}
													onClick={() => handleBlockUnblock(vendor)}
												>
													<i
														className={`fas ${vendor.is_blocked ? "fa-check-circle" : "fa-ban"}`}
														title={vendor.is_blocked ? "Unblock" : "Block"}
													></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Edit Customer Modal */}
						<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="editModalLabel">
											Edit Customer
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form onSubmit={handleSave}>
											<div className="form-group">
												<label htmlFor="customer_name">Customer Name</label>
												<input
													type="text"
													className="form-control"
													id="customer_name"
													name="customer_name"
													value={formValue.vendor_name}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="operating_as">Operating As</label>
												<input
													type="text"
													className="form-control"
													id="operating_as"
													name="operating_as"
													value={formValue.operating_as}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="address">Address</label>
												<input
													type="text"
													className="form-control"
													id="address"
													name="address"
													value={formValue.address}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="address">Address(Send)</label>
												<input
													type="text"
													className="form-control"
													id="address_send"
													name="address_send"
													value={formValue.address_send}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="currency">Currency</label>
												<input
													type="text"
													className="form-control"
													id="currency"
													name="currency"
													value={formValue.currency}
													onChange={handleFormChange}
													required
												/>
											</div>
											{/* <td>{vendor.vendor_name}</td>
											<td>{vendor.operating_as}</td>
											<td>{vendor.address}</td>
											<td>{vendor.address_send}</td>
                                            <td>{vendor.currency}</td>
											<td>{vendor.email_statement}</td>
											<td>{vendor.email_payment}</td>
											<td>{vendor.gst_no}</td>
											<td>{vendor.credit_terms}</td> */}
											<div className="form-group">
												<label htmlFor="email_sales">Email (Statement)</label>
												<input
													type="email"
													className="form-control"
													id="email_statement"
													name="email_statement"
													value={formValue.email_statement}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="email_statement">Email (Payment)</label>
												<input
													type="email"
													className="form-control"
													id="email_payment"
													name="email_payment"
													value={formValue.email_payment}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="gst_no">GST No</label>
												<input
													type="text"
													className="form-control"
													id="gst_no"
													name="gst_no"
													value={formValue.gst_no}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="credit_terms">Credit Terms</label>
												<input
													type="text"
													className="form-control"
													id="credit_terms"
													name="credit_terms"
													value={formValue.credit_terms}
													onChange={handleFormChange}
													required
												/>
											</div>
											<button type="submit" className="btn btn-primary">
												Save changes
											</button>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default View_vendor;
