import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function SalesInvoice() {
	const [formData, setFormData] = useState({
		user_id: localStorage.getItem("userid") || "",
		posting_date: "",
		invoice_no: "",
		customer_name: "",
		currency: "",
		exchange_rate: 0,
		sales_line: "",
		description: "",
		sales_qty: "",
		sales_rate: "",
		sales_amount: 0,
		tax: "",
		total_invoice_amount: 0,
		document_upload: null,
		document_name: "",
		bank_details: "",
		customer_address: "",
		shipping_address: "",
	});

	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		getCustomers();
	}, []);

	const getCustomers = async () => {
		const userId = localStorage.getItem("userid");
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/customers/by-user/${userId}`);
				console.log("API Response:", response.data);
				if (response.status === 200) {
					setCustomers(response.data);
					console.log("Customers fetched from API:", response.data);
				} else {
					console.log("Response Status is not 200:", response.status);
					toast.error(`Failed to Get Customer : ${response.statusText}`);
				}
			} catch (error) {
				console.error("Error Get Customers", error);
				toast.error(`Failed to Get Customer: ${error.message}`);
			}
		} else {
			toast.error("User ID not found in local storage");
		}
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => {
			const updatedData = {
				...prevData,
				[name]: value,
			};

			// If customer_id changes, set the currency based on the selected customer
			if (name === "customer_name") {
				const selectedCustomer = customers.find((customer) => customer.id === Number(value));
				if (selectedCustomer) {
					updatedData.currency = selectedCustomer.currency; // Set the selected customer's currency
				} else {
					updatedData.currency = "USD"; // Default currency if customer is not found
				}
			}

			// Calculate sales amount and sales invoice amount
			if (name === "sales_qty" || name === "sales_rate" || name === "tax") {
				const sales_qty = parseFloat(updatedData.sales_qty) || 0;
				const sales_rate = parseFloat(updatedData.sales_rate) || 0;
				const tax = parseFloat(updatedData.tax) || 0;

				const sales_amount = sales_qty * sales_rate;
				const total_invoice_amount = sales_amount + tax;

				return {
					...updatedData,
					sales_amount,
					total_invoice_amount,
				};
			}

			return updatedData;
		});
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0]; // Get the selected file
		setFormData((prevData) => ({
			...prevData,
			document_upload: file, //Store the file object
			document_name: file ? file.name : "", // Store the file name
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value);
		});

		try {
			const response = await axios.post(`${BACKEND_URL}/api/sales-invoice`, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data", // Important for file uploads
				},
			});
			console.log("Sales invoice created successfully:", response.data);

			// Reset the form data
			setFormData({
				user_id: "",
				posting_date: "",
				invoice_no: "",
				customer_name: "",
				currency: "",
				exchange_rate: 0,
				sales_line: "",
				description: "",
				sales_qty: "",
				sales_rate: "",
				sales_amount: 0,
				tax: "",
				total_invoice_amount: 0, // Ensure this is reset to a number
				document_upload: null,
				bank_details: "",
				customer_address: "",
				shipping_address: "",
			});
		} catch (error) {
			console.error("Error creating sales invoice:", error);
			// You might want to show an error message to the user here
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
											<h3 className="card-title">Sales Invoices</h3>
											<Link to="/view-sales-invoice" className="btn btn-success ml-auto">
												View All Sales Invoices
											</Link>
										</div>
										{/* <div className="card-header">
											<h3 className="card-title">Sales Invoice</h3>
										</div> */}
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
													{/* Posting Date */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="posting_date">Posting Date</label>
															<input
																type="date"
																name="posting_date"
																id="posting_date"
																className="form-control"
																value={formData.posting_date}
																onChange={handleChange}
																placeholder="Enter Posting Date"
															/>
														</div>
													</div>

													{/* Sales Invoice No. */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoice_no">Sales Invoice No.</label>
															<input
																type="text"
																name="invoice_no"
																id="invoice_no"
																className="form-control"
																value={formData.invoice_no}
																onChange={handleChange}
																placeholder="Enter Sales Invoice No."
															/>
														</div>
													</div>

													{/* Customer Name */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customer_name">Customer Name</label>
															<select
																name="customer_name"
																id="customer_name"
																className="form-control"
																value={formData.customer_name}
																onChange={handleChange}
															>
																<option value="">Select Customer</option>
																{customers.map((customer) => (
																	<option key={customer.id} value={customer.id}>
																		{customer.customer_name}
																	</option>
																))}
															</select>
														</div>
													</div>

													{/* Currency */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															{/* Show exchange rate only if currency is different from home currency */}
															<input
																type="text"
																name="currency"
																id="currency"
																className="form-control"
																value={formData.currency}
																readOnly
																// onChange={handleCurrencyChange} // Handle changes to input
															/>
														</div>
													</div>
													{/* exchange rate */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="exchange_rate">Exchange Rate</label>
															{/* Show exchange rate only if currency is different from home currency */}
															<input
																type="text"
																name="exchange_rate"
																id="exchange_rate"
																className="form-control"
																value={formData.exchange_rate}
																readOnly
															/>
														</div>
													</div>

													{/* Sales Line */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="sales_line">Sales Line</label>
															<input
																type="text"
																name="sales_line"
																id="sales_line"
																value={formData.sales_line}
																onChange={handleChange}
																className="form-control"
																placeholder="Enter Sales Line"
															/>
														</div>
													</div>
													{/* Description */}

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="description">Description</label>
															<input
																type="text"
																name="description"
																id="description"
																value={formData.description}
																onChange={handleChange}
																className="form-control"
																placeholder="Enter Description"
															/>
														</div>
													</div>

													{/* Sales Qty */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="sales_qty">Sales Qty</label>
															<input
																type="number"
																name="sales_qty"
																id="sales_qty"
																className="form-control"
																value={formData.sales_qty}
																onChange={handleChange}
																placeholder="Enter Sales Quantity"
															/>
														</div>
													</div>

													{/* Sales Rate per Qty */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="sales_rate">Sales Rate per Qty</label>
															<input
																type="number"
																name="sales_rate"
																id="sales_rate"
																step="0.01"
																className="form-control"
																value={formData.sales_rate}
																onChange={handleChange}
																placeholder="Enter Sales Rate per Quantity"
															/>
														</div>
													</div>

													{/* Sales Amount (I * J) */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="sales_amount">Sales Amount</label>
															<input
																type="number"
																name="sales_amount"
																id="sales_amount"
																step="0.01"
																className="form-control"
																value={formData.sales_amount}
																readOnly
																placeholder="Enter Sales Amount"
															/>
														</div>
													</div>

													{/* Tax */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="tax">Tax</label>
															<input
																type="number"
																name="tax"
																id="tax"
																step="0.01"
																value={formData.tax}
																onChange={handleChange}
																className="form-control"
																placeholder="Enter Tax Amount"
															/>
														</div>
													</div>

													{/* Sales Invoice*/}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoice_amount">Sales Invoice Amount</label>
															<input
																type="number"
																name="invoice_amount"
																id="invoice_amount"
																step="0.01"
																className="form-control"
																value={formData.total_invoice_amount}
																readOnly
																placeholder="Enter Sales Invoice Amount"
															/>
														</div>
													</div>
													{/* Document Upload */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="document_upload">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="document_upload"
																name="document_upload"
																onChange={handleFileChange}
																accept=".pdf,.docx,.jpg,.png"
															/>
															{formData.document_name && (
																<small className="text-success">Uploaded : {formData.document_name}</small>
															)}
														</div>
													</div>

													{/* Bank Details */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bank_details">Bank Details</label>
															<textarea
																className="form-control"
																id="bank_details"
																name="bank_details"
																rows="3"
																value={formData.bank_details}
																onChange={handleChange}
																placeholder="Enter Bank Details"
															></textarea>
														</div>
													</div>
													{/* Customer Address */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customer_address">Customer Address</label>
															<textarea
																className="form-control"
																name="customer_address"
																id="customer_address"
																rows="3"
																value={formData.customer_address}
																onChange={handleChange}
																placeholder="Enter Customer Address"
															></textarea>
														</div>
													</div>

													{/* Shipping Address */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="shipping_address">Shipping Address</label>
															<textarea
																className="form-control"
																id="shipping_address"
																name="shipping_address"
																rows="3"
																value={formData.shipping_address}
																onChange={handleChange}
																placeholder="Enter Shipping Address"
															></textarea>
															<small className="form-text text-muted">
																Leave empty if the shipping address is the same as the customer address.
															</small>
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

			<Bfooter />
		</>
	);
}

export default SalesInvoice;
