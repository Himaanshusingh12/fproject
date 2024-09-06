import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";

function View_customer() {
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [formValue, setFormValue] = useState({
		customer_name: "",
		operating_as: "",
		address: "",
		currency: "",
		email_sales: "",
		email_statement: "",
		gst_no: "",
		credit_terms: "",
	});

	// Fetch customers from the backend
	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/customers`);
			setCustomers(response.data);
		} catch (error) {
			console.error("Error fetching customers", error);
		}
	};

	// Handle form change for the modal
	const handleFormChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	// Open the modal and set the selected customer for editing
	const handleEdit = (customer) => {
		setSelectedCustomer(customer);
		setFormValue(customer); // Populate the form with the selected customer's data
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show(); // Show the Bootstrap modal
	};

	// Save the updated customer
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/customers/${selectedCustomer.id}`, formValue);
			if (response.status === 200) {
				toast.success("Customer updated successfully");
				fetchCustomers(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error updating customer", error);
			toast.error("Failed to update customer");
		}
	};

	// Delete customer
	const handleDelete = async (customerId) => {
		try {
			const response = await axios.delete(`${BACKEND_URL}/api/customers/${customerId}`);
			if (response.status === 200) {
				toast.success("Customer deleted successfully");
				fetchCustomers(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error deleting customer", error);
			toast.error("Failed to delete customer");
		}
	};

	// Block/Unblock customer
	const handleBlockUnblock = async (customer) => {
		try {
			const updatedStatus = customer.is_blocked ? 0 : 1;
			const response = await axios.patch(`/api/customers/${customer.id}/block`, { is_blocked: updatedStatus });
			if (response.status === 200) {
				toast.success(`Customer ${updatedStatus ? "blocked" : "unblocked"} successfully`);
				fetchCustomers(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error updating block status", error);
			toast.error("Failed to update block status");
		}
	};
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Customer Management</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Customer Name</th>
										<th>Operating As</th>
										<th>Address</th>
										<th>Currency</th>
										<th>Email (Sales)</th>
										<th>Email (Statement)</th>
										<th>GST No</th>
										<th>Credit Terms</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{customers.map((customer) => (
										<tr key={customer.id}>
											<td>{customer.id}</td>
											<td>{customer.customer_name}</td>
											<td>{customer.operating_as}</td>
											<td>{customer.address}</td>
											<td>{customer.currency}</td>
											<td>{customer.email_sales}</td>
											<td>{customer.email_statement}</td>
											<td>{customer.gst_no}</td>
											<td>{customer.credit_terms}</td>
											<td>
												<button className="btn btn-primary me-2" onClick={() => handleEdit(customer)}>
													Edit
												</button>
												<button className="btn btn-danger me-2" onClick={() => handleDelete(customer.id)}>
													Delete
												</button>
												<button className={`btn ${customer.is_blocked ? "btn-warning" : "btn-secondary"}`} onClick={() => handleBlockUnblock(customer)}>
													{customer.is_blocked ? "Unblock" : "Block"}
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
													value={formValue.customer_name}
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
											<div className="form-group">
												<label htmlFor="email_sales">Sales Email</label>
												<input
													type="email"
													className="form-control"
													id="email_sales"
													name="email_sales"
													value={formValue.email_sales}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="email_statement">Statement Email</label>
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

			{/* here */}

			<Bfooter />
		</>
	);
}

export default View_customer;
