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
		email: "",
	});

	const [customers, setCustomers] = useState([]);
	//for in table
	const [items, setItems] = useState([
		{
			sales_line: "",
			description: "",
			sales_qty: 0,
			sales_rate: 0,
			sales_amount: 0,
			tax: 0,
		},
	]);

	useEffect(() => {
		getCustomers();
	}, []);

	const getCustomers = async () => {
		const userId = localStorage.getItem("userid");
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/customers/by-user/${userId}`);
				// console.log("API Response:", response.data);
				if (response.status === 200) {
					setCustomers(response.data);
					// console.log("Customers fetched from API:", response.data);
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

	//for the table
	const addItem = () => {
		setItems([
			...items,
			{
				sales_line: "",
				description: "",
				sales_qty: 0,
				sales_rate: 0,
				sales_amount: 0,
				tax: 0,
			},
		]);
	};
	const handleItemChange = (e, index) => {
		const { name, value } = e.target;
		const updatedItems = [...items];
		updatedItems[index][name] = value;

		if (name === "sales_qty" || name === "sales_rate" || name === "tax") {
			const sales_qty = parseFloat(updatedItems[index].sales_qty) || 0;
			const sales_rate = parseFloat(updatedItems[index].sales_rate) || 0;
			const tax = parseFloat(updatedItems[index].tax) || 0;

			const sales_amount = sales_qty * sales_rate;
			updatedItems[index].sales_amount = sales_amount;

			const total_invoice_amount = updatedItems.reduce((total, item) => total + item.sales_amount + parseFloat(item.tax || 0), 0);
			setFormData((prevData) => ({
				...prevData,
				total_invoice_amount,
			}));
		}

		setItems(updatedItems);
	};

	const handleDeleteItem = (index) => {
		// Create a copy of the current items array
		const updatedItems = [...items];

		// Remove the item at the specified index
		updatedItems.splice(index, 1);

		// Update the state with the new items array
		setItems(updatedItems);
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData((prevData) => {
			const updatedData = {
				...prevData,
				[name]: value,
			};

			// If customer_id changes, set the currency based on the selected customer
			if (name === "customer_name") {
				const selectedCustomer = customers.find((customer) => customer.id === Number(value));
				console.log(selectedCustomer);

				if (selectedCustomer) {
					updatedData.currency = selectedCustomer.currency;
					updatedData.email = selectedCustomer.email_sales;
				} else {
					updatedData.currency = "USD"; // Default currency if customer is not found
					updatedData.email = "";
				}
			}

			// Calculate sales amount and sales invoice amount
			// if (name === "sales_qty" || name === "sales_rate" || name === "tax") {
			// 	const sales_qty = parseFloat(updatedData.sales_qty) || 0;
			// 	const sales_rate = parseFloat(updatedData.sales_rate) || 0;
			// 	const tax = parseFloat(updatedData.tax) || 0;

			// 	const sales_amount = sales_qty * sales_rate;
			// 	const total_invoice_amount = sales_amount + tax;

			// 	return {
			// 		...updatedData,
			// 		sales_amount,
			// 		total_invoice_amount,
			// 	};
			// }

			return updatedData;
		});
	};

	const handleCurrencyChange = (e) => {
		const selectedCurrency = e.target.value;
		getExchangeRate(formData.currency, selectedCurrency);
		setFormData((prevData) => ({
			...prevData,
			currency: selectedCurrency,
		}));
	};

	const apiKey = "ef85597ad49e12c548c7d7f8";
	// const apiVerson = "v6";

	const getExchangeRate = async (baseCurrency, selectedCurrency) => {
		const apiEndpointBase = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
		const apiEndpoint = `${apiEndpointBase}${baseCurrency}`;
		const response = await fetch(apiEndpoint);
		const data = await response.json();
		const exchangeRate = data.conversion_rates[selectedCurrency];
		setFormData((prevData) => ({
			...prevData,
			exchange_rate: 1 / exchangeRate,
		}));
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prevData) => ({
			...prevData,
			document_upload: file,
			document_name: file ? file.name : "",
		}));
	};

	//here email
	const handleEmailChange = (e) => {
		setFormData((prevData) => ({ ...prevData, email: e.target.value }));
	};

	const handleSendEmail = () => {
		const emailSubject = `Sales Invoice #${formData.invoice_no}`;
		const emailBody = `Please find the sales invoice attached.`;
		const emailTo = formData.email;

		//create a milto Link
		const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

		//open the email client
		window.open(mailtoLink, "_blank");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value);
		});

		try {
			console.log(formDataToSend);
			const response = await axios.post(`${BACKEND_URL}/api/sales-invoice`, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data", // Important for file uploads
				},
			});
			console.log("API Response:", response.data);
			if (response.status === 201) {
				toast.success("Sales Invoice Created Successfully");
				handleSendEmail();
				console.log("Sales invoice created successfully:", response.data);
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
					total_invoice_amount: 0,
					document_upload: null,
					bank_details: "",
					customer_address: "",
					shipping_address: "",
					email: "",
				});
				//	for table
				setItems([
					{
						sales_line: "",
						description: "",
						sales_qty: 0,
						sales_rate: 0,
						sales_amount: 0,
						tax: 0,
					},
				]);
			} else {
				console.log("Response Status is not 201:", response.status);
				toast.error(`Failed to Create Sales Invoice : ${response.statusText}`);
			}
		} catch (error) {
			console.error("Error Creating Sales Invoice", error);
			toast.error(`Failed to Create Sales Invoice: ${error.message}`);
		}
	};
	return (
		<>
			<Bheader />
			<BSlidnav />
			{/* <div className="wrapper">
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
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
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

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<select
																type="text"
																name="currency"
																id="currency"
																className="form-control"
																value={formData.currency}
																readOnly
																onChange={handleCurrencyChange}
															>
																<option value="">Select Currency</option>
																<option value="USD">USD</option>
																<option value="EUR">EUR</option>
																<option value="INR">INR</option>
																<option value="GBP">GBP</option>
																<option value="JPY">JPY</option>
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="exchange_rate">Exchange Rate</label>
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
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email">Email</label>
															<input
																className="form-control"
																id="email"
																name="email"
																value={formData.email}
																onChange={handleEmailChange}
																readOnly
															/>
														</div>
													</div>

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
													Post
												</button>
												<button type="button" className="btn btn-secondary ms-3" onClick={handleSendEmail}>
													Send Email
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div> */}
			{/* new design */}
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									<div className="card card-primary">
										<div className="card-header d-flex justify-content-between align-items-center">
											<h3 className="card-title">Sales Invoice</h3>
											<Link to="/view-sales-invoice" className="btn btn-success ml-auto">
												View All Sales Invoices
											</Link>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												{/* First Section: Invoice Details */}
												<div className="row">
													<h5 className="section-title">Invoice Details</h5>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customer_name">Customer Name</label>
															<select
																name="customer_name"
																id="customer_name"
																className="form-control col-md-8"
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
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoice_no">Sales Invoice No.</label>
															<input
																type="text"
																name="invoice_no"
																id="invoice_no"
																className="form-control col-md-8"
																value={formData.invoice_no}
																onChange={handleChange}
																placeholder="Enter Sales Invoice No."
															/>
														</div>
														<div className="form-group">
															<label htmlFor="posting_date">Invoice Date</label>
															<input
																type="date"
																name="posting_date"
																id="posting_date"
																className="form-control col-md-8"
																value={formData.posting_date}
																onChange={handleChange}
																placeholder="Enter Posting Date"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="payment_due_date">Payment Due </label>
															<input
																type="date"
																name="payment_due_date"
																id="payment_due_date"
																className="form-control col-md-8"
																placeholder="Enter Payment Due Date"
															/>
															<small>On Receipt</small>
														</div>
													</div>
												</div>
												<div>
													<h3>Sales Items</h3>
													<table style={{ width: "100%", borderCollapse: "collapse" }}>
														<thead style={{ backgroundColor: "#f2f2f2" }}>
															<tr>
																<th style={{ padding: "8px" }}>Items</th>
																<th style={{ padding: "8px" }}>Quantity</th>
																<th style={{ padding: "8px" }}>Price</th>
																<th style={{ padding: "8px" }}>Amount</th>
															</tr>
														</thead>
														<tbody>
															{items.map((item, index) => (
																<React.Fragment key={index}>
																	<tr style={{ borderBottom: "3px solid #ccc" }}></tr>
																	<tr>
																		<td
																			style={{
																				padding: "8px",
																				display: "flex",
																				justifyContent: "space-between",
																			}}
																		>
																			<div style={{ width: "48%" }}>
																				<input
																					type="text"
																					name="sales_line"
																					className="form-control"
																					value={item.sales_line}
																					onChange={(e) => handleItemChange(e, index)}
																					placeholder="Enter Sales Line"
																					style={{ width: "100%", marginBottom: "4px" }}
																				/>
																			</div>
																			<div style={{ width: "48%" }}>
																				<input
																					type="text"
																					name="description"
																					className="form-control"
																					value={item.description}
																					onChange={(e) => handleItemChange(e, index)}
																					placeholder="Enter Description"
																					style={{ width: "100%" }}
																				/>
																			</div>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number"
																				name="sales_qty"
																				className="form-control"
																				value={item.sales_qty}
																				onChange={(e) => handleItemChange(e, index)}
																				style={{ width: "90%" }}
																			/>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number"
																				name="sales_rate"
																				className="form-control"
																				value={item.sales_rate}
																				onChange={(e) => handleItemChange(e, index)}
																				placeholder="0.00"
																				style={{ width: "90%" }}
																			/>
																		</td>
																		<td style={{ display: "flex", alignItems: "center" }}>
																			<input
																				type="number"
																				name="sales_amount"
																				className="form-control"
																				value={item.sales_amount}
																				readOnly
																				style={{ width: "90%", marginRight: "10px" }}
																			/>
																			<button
																				type="button"
																				onClick={() => handleDeleteItem(index)}
																				style={{
																					backgroundColor: "red",
																					color: "white",
																					border: "none",
																					cursor: "pointer",
																				}}
																			>
																				<i className="fa fa-trash" aria-hidden="true"></i>
																			</button>
																		</td>
																	</tr>
																	<tr>
																		<td colSpan="4" style={{ padding: "8px", textAlign: "left" }}>
																			<div className="form-group" style={{ width: "30%" }}>
																				<label
																					htmlFor="tax"
																					style={{ display: "block", marginBottom: "4px" }}
																				>
																					Tax
																				</label>
																				<input
																					type="number"
																					name="tax"
																					id="tax"
																					className="form-control"
																					value={item.tax}
																					onChange={(e) => handleItemChange(e, index)}
																					placeholder="Enter Tax"
																					style={{ width: "100%" }}
																				/>
																			</div>
																		</td>
																	</tr>
																</React.Fragment>
															))}
															<tr>
																<td colSpan="4">
																	<button type="button" onClick={addItem} className="btn btn-primary">
																		<span style={{ fontSize: "20px" }}>+</span>Add an item
																	</button>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="total-amount mt-3 bg-light" style={{ textAlign: "right" }}>
													<h5>Total Amount</h5>
													<input
														type="number"
														className="form-control"
														style={{ width: "150px", display: "inline-block" }} // Adjust width as needed
														value={items.reduce((total, item) => total + (item.sales_amount || 0), 0)}
														readOnly
													/>
												</div>

												<h5 className="section-title mt-3">Additional Information</h5>
												<div className="row">
													{/* Left Side */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email">Email</label>
															<input
																className="form-control"
																id="email"
																name="email"
																value={formData.email}
																onChange={handleEmailChange}
																readOnly
															/>
														</div>

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
																<small className="text-success">Uploaded: {formData.document_name}</small>
															)}
														</div>
													</div>

													{/* Right Side */}
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

												{/* Submit and Action Buttons */}
												<div className="card-footer">
													<button type="submit" className="btn btn-primary">
														Post
													</button>
													<button type="button" className="btn btn-secondary ms-3" onClick={handleSendEmail}>
														Send Email
													</button>
												</div>
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
