import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import { Link } from "react-router-dom";

function View_customer() {
	const [customers, setCustomers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [formValue, setFormValue] = useState({
		customer_name: "",
		operating_as: "",
		address: "",
		phone_no: "",
		website: "",
		currency: "",
		email_sales: "",
		email_statement: "",
		gst_no: "",
		credit_terms: "",
		credit_limit: "",
		suggested_tax: "",
		additional_details: "",
	});

	const [showModal, setShowModal] = useState(false);
	const [reason, setReason] = useState("");

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/customers`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/customers/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);

			if (response.status === 200) {
				setCustomers(response.data);
				setFilteredCustomers(response.data); // Store fetched customers for client-side filtering
			} else {
				toast.error(`Failed to fetch customers: ${response.statusText}`);
			}
		} catch (error) {
			if (error.response) {
				toast.error(`Failed to fetch customers 2: ${error.response.data.message || error.response.statusText}`);
			} else if (error.request) {
				toast.error("Failed to fetch customers 3: No response received");
			} else {
				toast.error(`Failed to fetch customers 4: ${error.message}`);
			}
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
			console.log("Response:", error.response); // Add this line
			toast.error("Failed to update customer");
		}
	};
	// Block/Unblock customer
	const handleBlockUnblock = async (customer) => {
		try {
			const updatedStatus = customer.is_blocked ? 0 : 1;
			const response = await axios.patch(`${BACKEND_URL}/api/customers/${customer.id}/block`, { is_blocked: updatedStatus });
			if (response.status === 200) {
				toast.success(`Customer ${updatedStatus ? "blocked" : "unblocked"} successfully`);
				fetchCustomers(); // Refresh the customer list
			}
		} catch (error) {
			console.error("Error updating block status", error);
			toast.error("Failed to update block status");
		}
	};
	//active/inactive function
	const handleActiveInactive = async (customer) => {
		try {
			const updatedStatus = customer.status === "Active" ? "Inactive" : "Active";
			if (customer.status === updatedStatus) {
				toast.info(`Customer is already ${updatedStatus}`);
				return;
			}
			setShowModal(true);
			setSelectedCustomer(customer);
			const modal = new window.bootstrap.Modal(document.getElementById("inactivateModal"));
			modal.show(); // Show the Bootstrap modal
		} catch (error) {
			console.error("Error updating active/inactive status", error);
			toast.error(" Failed to update active/inactive status");
		}
	};

	const handleReasonChange = (e) => {
		setReason(e.target.value);
	};

	const handleInactivate = async () => {
		try {
			const response = await axios.patch(`${BACKEND_URL}/api/customers/${selectedCustomer.id}/status`, { status: "Inactive", reason: reason });
			if (response.status === 200) {
				toast.success("Customer inactivated successfully");
				const updatedCustomers = customers.map((c) => (c.id === selectedCustomer.id ? { ...c, status: "Inactive" } : c));
				setCustomers(updatedCustomers);
				fetchCustomers(); // Refresh the customer list
			} else {
				console.error("Error inactivating customer", response);
				toast.error(" Failed to inactivate customer");
			}
		} catch (error) {
			console.error("Error inactivating customer", error);
			toast.error(" Failed to inactivate customer");
		}
	};

	//  for search
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			fetchCustomers(searchQuery);
		} else {
			setFilteredCustomers(customers);
		}
	};
	useEffect(() => {
		if (searchQuery) {
			setFilteredCustomers(
				customers.filter(
					(customer) =>
						customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						customer.operating_as.toLowerCase().includes(searchQuery.toLowerCase()) ||
						customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
						customer.email_sales.toLowerCase().includes(searchQuery.toLowerCase()) ||
						customer.email_statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
						customer.gst_no.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);
		} else {
			setFilteredCustomers(customers);
		}
	}, [searchQuery, customers]);

	useEffect(() => {
		setFilteredCustomers(customers.filter((customer) => customer.status === "Active"));
	}, [customers]);

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h2>Customer Management</h2>
							<Link to="/inactive-customer" className="btn btn-success ml-auto me-5">
								Inactive Customers
							</Link>
							<div className="d-flex align-items-center">
								<span className="me-2">Search:</span>
								<input
									type="text"
									value={searchQuery}
									onChange={handleSearch}
									placeholder="Search customers"
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
										<th>Customer Name</th>
										{/* <th>Operating As</th> */}
										{/* <th>Address</th> */}
										<th>Phone no</th>
										{/* <th>Website</th> */}
										<th>Currency</th>
										{/* <th>Email (Sales)</th> */}
										{/* <th>Email (Statement)</th> */}
										<th>GST No</th>
										{/* <th>Credit Terms</th> */}
										<th>Credit Limit</th>
										{/* <th>Suggested tax</th> */}
										<th>Additional Details</th>
										<th>Stauts</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* {customers.map((customer) => ( */}
									{filteredCustomers.map((customer) => (
										<tr key={customer.id}>
											<td>{customer.id}</td>
											<td>{customer.customer_name}</td>
											{/* <td>{customer.operating_as}</td> */}
											{/* <td>{customer.address}</td> */}
											<td>{customer.phone_no}</td>
											{/* <td>{customer.website}</td> */}
											<td>{customer.currency}</td>
											{/* <td>{customer.email_sales}</td> */}
											{/* <td>{customer.email_statement}</td> */}
											<td>{customer.gst_no}</td>
											{/* <td>{customer.credit_terms}</td> */}
											<td>{customer.credit_limit}</td>
											{/* <td>{customer.suggested_tax}</td> */}
											<td>{customer.additional_details}</td>
											<td>{customer.status}</td>
											<td>
												<button className="btn btn-primary me-2" onClick={() => handleEdit(customer)}>
													{/* Edit */}
													<i className="fas fa-edit" title="Edit"></i>
												</button>
												<button
													className={`btn ${customer.is_blocked ? "btn-warning" : "btn-secondary me-2"}`}
													onClick={() => handleBlockUnblock(customer)}
												>
													<i
														className={`fas ${customer.is_blocked ? "fa-check-circle" : "fa-ban"}`}
														title={customer.is_blocked ? "Unblock" : "Block"}
													></i>
												</button>

												<button
													className={`btn ${customer.status === "Active" ? "btn-success" : "btn-secondary"}`}
													onClick={() => handleActiveInactive(customer)}
												>
													<i
														className={`fas ${customer.status === "Active" ? "fa-check-circle" : "fa-times-circle"}`}
														title={customer.status === "Active" ? "Deactivate" : "Activate"}
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
												<label htmlFor="phone_no">Phone no</label>
												<input
													type="number"
													className="form-control"
													id="phone_no"
													name="phone_no"
													value={formValue.phone_no}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="website">Website</label>
												<input
													type="text"
													className="form-control"
													id="website"
													name="website"
													value={formValue.website}
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
											<div className="form-group">
												<label htmlFor="credit_limit">Credit Limit</label>
												<input
													type="number"
													className="form-control"
													id="credit_limit"
													name="credit_limit"
													value={formValue.credit_limit}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="suggested_tax">Suggested Tax</label>
												<input
													type="number"
													className="form-control"
													id="suggested_tax"
													name="suggested_tax"
													value={formValue.suggested_tax}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="suggested_tax">Additional Details</label>
												<input
													type="text"
													className="form-control"
													id="additional_details"
													name="additional_details"
													value={formValue.additional_details}
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
						{/* from here */}
						<div
							className={`modal fade ${showModal ? "show" : ""}`}
							id="inactivateModal"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="inactivateModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="inactivateModalLabel">
											Inactivate Customer
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form>
											<div className="form-group">
												<label htmlFor="reason">Reason for inactivation:</label>
												<textarea
													type="text"
													className="form-control"
													id="reason"
													name="reason"
													value={reason}
													onChange={handleReasonChange}
													required
												/>
											</div>
											<button type="button" className="btn btn-primary" onClick={handleInactivate}>
												Inactivate
											</button>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
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

export default View_customer;
