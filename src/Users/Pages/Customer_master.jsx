import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import { Link } from "react-router-dom";

function Customer_master() {
	const [customerForm, setCustomerForm] = useState({
		user_id: localStorage.getItem("userid") || "",
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

	const [currency, setCurrency] = useState([]);
	// const [tax, setTax] = useState([]);
	const [tax, setTax] = useState([]);
	const [paymentterm, setPaymentterm] = useState([]);

	useEffect(() => {
		getCurrency();
		getTaxes();
		getPaymentterm();
	}, []);

	// for get active payment terms
	const getPaymentterm = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/paymentterms/active`);
			if (response.status === 200) {
				setPaymentterm(response.data);
			}
		} catch (error) {
			console.error("Error fetching Payment term:", error);
			toast.error("Failed to fetch Payment term");
		}
	};

	// this section for create new payment terms
	const [modalOpen, setModalOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		paymentterms: "",
		note: "",
	});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmits = async (e) => {
		e.preventDefault();
		const { paymentterms, note } = formValues;

		if (paymentterms === "") {
			toast.error("Payment Terms field is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/paymentterms`, { name: paymentterms, note });
			toast.success("Payment terms added successfully");
			setFormValues({ paymentterms: "", note: "" });
		} catch (err) {
			toast.error("Error adding Payment terms");
			console.error(err);
		}
	};

	const handlePaymentTermsSelectChange = (e) => {
		const selectedValue = e.target.value;

		if (selectedValue === "create-newterm") {
			e.target.value = "";
			setModalOpen(true);
		} else {
			setCustomerForm((prevData) => {
				const updatedData = {
					...prevData,
					credit_terms: selectedValue,
				};
				return updatedData;
			});
		}
	};

	// for get Active Currency
	const getTaxes = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/tax/active`);
			if (response.status === 200) {
				// console.log("Fetched Taxes:", response.data);
				setTax(response.data);
			}
		} catch (error) {
			console.error("Error fetching Tax:", error);
			toast.error("Failed to fetch tax");
		}
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTax, setNewTax] = useState({
		description: "",
		tax_rate: "",
	});

	const handleTaxSelectChange = (e, index) => {
		if (e.target.value === "create-new") {
			e.target.value = "";
			setIsModalOpen(true);
		} else {
			setCustomerForm(e, index);
		}
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTax({
			...newTax,
			[name]: value,
		});
	};
	// Handle form submission
	const handleTaxSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!newTax.description || !newTax.tax_rate) {
			toast.error("Both fields are required");
			return;
		}

		try {
			const response = await axios.post(`${BACKEND_URL}/api/custom-tax-rate`, {
				description: newTax.description,
				custom_tax_rate: parseFloat(newTax.tax_rate),
			});

			if (response.status === 201) {
				toast.success("Tax Rate Added Successfully");
				setNewTax({ description: "", tax_rate: "" });
			}
		} catch (error) {
			toast.error("Failed to add Tax Rate");
			console.error("Error:", error);
		}
	};

	//for get Active Currency
	const getCurrency = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/currency/active`);
			if (response.status === 200) {
				setCurrency(response.data);
			}
		} catch (error) {
			console.error("Error fetching Currency:", error);
			toast.error("Failed to fetch Currency");
		}
	};

	const [documentFile, setDocumentFile] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCustomerForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		setDocumentFile(e.target.files[0]);
	};
	const validation = () => {
		let result = true;
		if (customerForm.customer_name === "") {
			toast.error("Customer Name field is required");
			result = false;
		} else if (customerForm.customer_name.length < 3) {
			toast.error("Customer Name must be at least 3 characters long");
			result = false;
		}

		if (customerForm.operating_as === "") {
			toast.error("Operating As field is required");
			result = false;
		}

		if (customerForm.address === "") {
			toast.error("Address field is required");
			result = false;
		}
		if (customerForm.phone_no === "") {
			toast.error("Phone field is required");
			result = false;
		}
		if (customerForm.website === "") {
			toast.error("Website field is required");
			result = false;
		} else if (!/^https?:\/\//i.test(customerForm.website)) {
			toast.error("Website must start with http:// or http://");
			result = false;
		}
		if (customerForm.currency === "") {
			toast.error("Currency field is required");
			result = false;
		}

		if (customerForm.email_sales === "") {
			toast.error("Email Address for Sales Invoice field is required");
			result = false;
		} else if (!customerForm.email_sales.includes("@")) {
			toast.error("Invalid Email Address for Sales Invoice. Please include '@' in your email.");
			result = false;
		}
		if (customerForm.email_statement === "") {
			toast.error("Email Address for Customer Statement field is required");
			result = false;
		} else if (!customerForm.email_statement.includes("@")) {
			toast.error("Invalid Email Address for Customer Statement. Please include '@' in your email.");
			result = false;
		}

		if (customerForm.gst_no === "") {
			toast.error("Customer GST No. field is required");
			result = false;
		}

		if (customerForm.credit_terms === "") {
			toast.error("Credit Terms field is required");
			result = false;
		}

		if (customerForm.credit_limit === "") {
			toast.error("Credit Limit field is required");
			result = false;
		}

		if (customerForm.suggested_tax === "") {
			toast.error("Suggested Tax field is required");
			result = false;
		}
		return result;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validation()) {
			return;
		}

		const formData = new FormData(); // Create FormData to handle file and form data together

		// Append all form data fields
		Object.keys(customerForm).forEach((key) => {
			formData.append(key, customerForm[key]);
		});

		// Append the document file if present
		if (documentFile) {
			formData.append("document", documentFile);
		}

		try {
			const response = await axios.post(`${BACKEND_URL}/api/customers`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success(response.data.message);
			setCustomerForm({
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
			setDocumentFile(null); // Reset the file input
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message || "An error occurred");
			} else {
				toast.error("An error occurred");
			}
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									<div className="card card-primary">
										<div className="card-header d-flex justify-content-between align-items-center">
											<h3 className="card-title">Add Customer</h3>
											<Link to="/view-customer" className="btn btn-success ml-auto">
												View All Customer
											</Link>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="Customer_name">Customer Name</label>
															<input
																type="text"
																name="customer_name"
																id="customer_name"
																className="form-control"
																placeholder="Enter Customer Name"
																value={customerForm.customer_name}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="operating_as">Operating As</label>
															<input
																type="text"
																name="operating_as"
																id="operating_as"
																className="form-control"
																placeholder="Enter Operating As"
																value={customerForm.operating_as}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="address">Address</label>
															<input
																type="text"
																name="address"
																id="address"
																className="form-control"
																placeholder="Enter Address"
																value={customerForm.address}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="phone_no">Phone no</label>
															<input
																type="text"
																name="phone_no"
																id="phone_no"
																className="form-control"
																placeholder="Enter phone"
																value={customerForm.phone_no}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="website">Website</label>
															<input
																type="text"
																name="website"
																id="website"
																className="form-control"
																placeholder="Enter website"
																value={customerForm.website}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<select
																type="text"
																name="currency"
																id="currency"
																value={customerForm.currency}
																onChange={handleChange}
																className="form-control"
															>
																<option value="">Select Currency</option>
																{currency.map((type) => (
																	<option key={type.id} value={type.id}>
																		{type.name}
																	</option>
																))}
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email_sales">Email Address for Sales Invoice</label>
															<input
																type="email"
																name="email_sales"
																id="email_sales"
																className="form-control"
																placeholder="Enter Email Address for Sales Invoice"
																value={customerForm.email_sales}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email_statement">Email Address for customer Statement</label>
															<input
																type="email"
																name="email_statement"
																id="email_statement"
																className="form-control"
																placeholder="Enter Email Address for Customer Statement"
																value={customerForm.email_statement}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="gst_no">Customer GST No.</label>
															<input
																type="text"
																name="gst_no"
																id="gst_no"
																className="form-control"
																placeholder="Enter Customer GST NO."
																value={customerForm.gst_no}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="crdit_terms">Select Payment Terms</label>
															<select
																name="credit_terms"
																id="credit_terms"
																className="form-control"
																value={customerForm.credit_terms}
																// onChange={handleChange}
																onChange={handlePaymentTermsSelectChange}
																style={{ width: "100%" }}
															>
																<option value="create-newterm" style={{ color: "blue", fontWeight: "bold" }}>
																	+ Create New
																</option>
																<option value="" disabled>
																	Payment Terms
																</option>
																{paymentterm.map((type) => (
																	<option key={type.id} value={type.id}>
																		{type.name}
																	</option>
																))}
															</select>
														</div>
													</div>

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="credit_limit">Credit Limit</label>
															<input
																type="number"
																name="credit_limit"
																id="credit_limit"
																className="form-control"
																placeholder="Enter Credit Limit"
																value={customerForm.credit_limit}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="suggested_tax">Suggested Tax</label>
															<select
																name="suggested_tax"
																id="suggested_tax"
																className="form-control"
																value={customerForm.suggested_tax}
																onChange={(e) => handleTaxSelectChange(e)}
															>
																<option value="create-new" style={{ color: "blue", fontWeight: "bold" }}>
																	+ Create New
																</option>
																<option value="" disabled>
																	Tax
																</option>
																{tax.map((taxOption) => (
																	<option key={taxOption.tax_id} value={taxOption.tax_id}>
																		{taxOption.description}
																	</option>
																))}
															</select>
														</div>
													</div>

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="additional_details">Additional Details</label>
															<textarea
																name="additional_details"
																id="additional_details"
																className="form-control"
																placeholder="Enter Additional Details"
																value={customerForm.additional_details}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="document">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="document"
																name="document"
																onChange={handleFileChange}
																accept=".pdf,.docx,.jpg,.png"
															/>
															{documentFile && <small className="text-success">Uploaded:{documentFile.name}</small>}
														</div>
													</div>
												</div>
											</div>
											<div className="card-footer">
												<button type="submit" className="btn btn-primary">
													Submit
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
			{/* modal for create new tax rate */}
			<div
				className={`modal fade ${isModalOpen ? "show d-block" : "d-none"}`}
				tabIndex="-1"
				role="dialog"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div
							className="modal-header"
							style={{
								backgroundColor: "#007bff",
								color: "white",
								borderTopLeftRadius: "5px",
								borderTopRightRadius: "5px",
							}}
						>
							<h5 className="modal-title">Create New Tax Rate</h5>
							<button
								type="button"
								className="close"
								aria-label="Close"
								onClick={() => setIsModalOpen(false)}
								style={{ color: "white" }}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form id="quickForm" method="post">
								<div className="form-group">
									<label htmlFor="description">Description</label>
									<input
										type="text"
										name="description"
										className="form-control"
										id="description"
										value={newTax.description}
										onChange={handleInputChange}
										placeholder="Enter Description"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="tax_rate">Tax Rate (%)</label>
									<input
										type="number"
										name="tax_rate"
										className="form-control"
										id="tax_rate"
										value={newTax.tax_rate}
										onChange={handleInputChange}
										placeholder="Enter Tax Rate"
										required
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={handleTaxSubmit}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* modal for create new payment terms by user */}
			<div
				className={`modal fade ${modalOpen ? "show d-block" : "d-none"}`}
				tabIndex="-1"
				role="dialog"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div
							className="modal-header"
							style={{
								backgroundColor: "#007bff",
								color: "white",
								borderTopLeftRadius: "5px",
								borderTopRightRadius: "5px",
							}}
						>
							<h5 className="modal-title">Create New Payment Term</h5>
							<button type="button" className="close" aria-label="Close" onClick={() => setModalOpen(false)} style={{ color: "white" }}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form id="quickForm" method="post">
								<div className="form-group">
									<label htmlFor="paymentterms">Add Payment Terms</label>
									<input
										type="text"
										name="paymentterms"
										className="form-control"
										id="paymentterms"
										placeholder="Enter Payment terms"
										value={formValues.paymentterms}
										onChange={handleChanges}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="note">Add Note</label>
									<textarea
										name="note"
										className="form-control"
										id="note"
										placeholder="Enter Note"
										value={formValues.note}
										onChange={handleChanges}
									></textarea>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={handleSubmits}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default Customer_master;
