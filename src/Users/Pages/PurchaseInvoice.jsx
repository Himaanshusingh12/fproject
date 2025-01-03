import React, { useEffect, useRef, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

function PurchaseInvoice() {
	const [formData, setFormData] = useState({
		user_id: localStorage.getItem("userid") || "",
		vendor_id: "",
		vendor_address: "",
		shipping_address: "",
		purchase_no: "",
		invoice_date: "",
		posting_date: "",
		payment_due_date: "",
		payment_terms: "",
		email: "",
		currency: "",
		exchange_rate: 0,
		document_upload: null,
		document_name: "",
		total_invoice_amount: 0,
		total_discount: 0,
	});

	// Function to format date to dd/mm/yy
	const formatDateToInput = (date) => {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	// Function to calculate due date dynamically
	const calculateDueDate = (invoiceDate, paymentTermName) => {
		if (!invoiceDate || !paymentTermName) return "";

		const invoiceDateObj = new Date(invoiceDate);

		// Check if the date is valid
		if (isNaN(invoiceDateObj.getTime())) {
			console.error("Invalid invoice date");
			return "";
		}

		// Logic based on payment term name
		let dueDate = invoiceDateObj;

		switch (paymentTermName) {
			case "Due on Receipt":
				return formatDateToInput(dueDate);

			case "Net 7 Days":
				dueDate.setDate(dueDate.getDate() + 7);
				return formatDateToInput(dueDate);

			case "Net 15 Days":
				dueDate.setDate(dueDate.getDate() + 15);
				return formatDateToInput(dueDate);

			case "Net 30 Days":
				dueDate.setDate(dueDate.getDate() + 30);
				return formatDateToInput(dueDate);

			case "Net 60 Days":
				dueDate.setDate(dueDate.getDate() + 60);
				return formatDateToInput(dueDate);

			case "Net 90 Days":
				dueDate.setDate(dueDate.getDate() + 90);
				return formatDateToInput(dueDate);

			case "Advance":
				return ""; // No due date since payment is already received

			case "2/10":
				dueDate.setDate(dueDate.getDate() + 10);
				return formatDateToInput(dueDate);

			case "Enter it manually":
				return ""; // Allow user to manually set due date

			default:
				return ""; // Default case for unrecognized terms
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
			handleItemChange(e, index);
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
			setFormData((prevData) => {
				const updatedData = {
					...prevData,
					payment_terms: selectedValue,
				};

				if (prevData.invoice_date) {
					const dueDate = calculateDueDate(prevData.invoice_date, selectedValue);
					updatedData.payment_due_date = dueDate;
				}

				return updatedData;
			});
		}
	};

	const [items, setItems] = useState([
		{
			purchase_line: "",
			description: "",
			purchase_qty: "",
			purchase_rate: "",
			purchase_amount: 0,
			tax: "",
			discount: "",
			taxAmount: 0,
		},
	]);
	const [currency, setCurrency] = useState([]);
	const [tax, setTax] = useState([]);
	const [paymentterm, setPaymentterm] = useState([]);

	// Create a ref for the invoice section
	const invoiceRef = useRef();

	useEffect(() => {
		getVendors();
		getCurrency();
		getTaxes();
		getPaymentterm();
	}, []);

	// for get Active Currency
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

	// for get Active Currency
	const getTaxes = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/tax/active`);
			if (response.status === 200) {
				console.log("Fetched Taxes:", response.data);
				setTax(response.data);
			}
		} catch (error) {
			console.error("Error fetching Tax:", error);
			toast.error("Failed to fetch tax");
		}
	};

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

	// check if purchase no is duplicate
	const [error, setError] = useState("");
	const handlePurchaseNumberChange = async (e) => {
		const newPurchaseNumber = e.target.value;

		// Update the formData with the new purchase number
		setFormData({
			...formData,
			purchase_no: newPurchaseNumber,
		});

		// Check if the entered purchase number already exists in the database
		try {
			const response = await axios.get(`${BACKEND_URL}/api/check-purchaseinvoice?purchaseNumber=${newPurchaseNumber}`);
			console.log("The Response of purchase duplicate no:", response.data);

			if (response.data.exists) {
				setError("This purchase number is already in use.");
			} else {
				setError("");
			}
		} catch (error) {
			console.error("Error checking purchase number:", error);
		}
	};

	// for fetch vendors names
	const [vendors, setVendors] = useState([]);
	const getVendors = async () => {
		const userId = localStorage.getItem("userid");
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/vendors/by-user/${userId}`);
				console.log("Fetched vendor are -:", response.data);
				if (response.status === 200) {
					setVendors(response.data);
					// console.log("Customers fetched from API:", response.data);
				} else {
					console.log("Response Status is not 200:", response.status);
					toast.error(`Failed to Get Vendors : ${response.statusText}`);
				}
			} catch (error) {
				console.error("Error Get Vendors", error);
				toast.error(`Failed to Get Vendors: ${error.message}`);
			}
		} else {
			toast.error("User ID not found in local storage");
		}
	};
	// this section is for goes to new tab for create new customer
	const openVendorMasterPage = () => {
		window.open("/customer-master", "_blank");
	};

	const addItem = () => {
		setItems([
			...items,
			{
				purchase_line: "",
				description: "",
				purchase_qty: "",
				purchase_rate: "",
				purchase_amount: 0,
				tax: "",
				discount: "",
				taxAmount: 0,
			},
		]);
	};

	// new handleItemchange function
	const handleItemChange = (e, index) => {
		const { name, value } = e.target;
		console.log("Dropdown changed:", name, value);
		const updatedItems = [...items];

		// Update the current field value
		updatedItems[index][name] = name === "purchase_qty" || name === "purchase_rate" ? parseFloat(value) || 0 : value;

		// Helper function to calculate item values
		const calculateItemValues = (item) => {
			// Calculate purchase amount
			item.purchase_amount = (item.purchase_qty || 0) * (item.purchase_rate || 0);

			// Apply discount
			const discount = item.discount || "0";
			let discountedAmount = item.purchase_amount;
			if (discount.endsWith("%")) {
				const percentage = parseFloat(discount.replace("%", "")) || 0;
				item.discountAmount = (discountedAmount * percentage) / 100;
			} else {
				item.discountAmount = parseFloat(discount) || 0;
			}
			discountedAmount -= item.discountAmount;

			// Apply tax
			const selectedTax = tax.find((total) => total.tax_id === Number(item.tax));
			const selectedTaxRate = selectedTax ? selectedTax.total : 0;
			item.taxAmount = (discountedAmount * selectedTaxRate) / 100;

			// Final amount after discount and tax
			item.purchase_amount_after_discount_and_tax = discountedAmount + item.taxAmount;
		};

		// Recalculate values for the updated item
		calculateItemValues(updatedItems[index]);

		// Calculate total discount and invoice amount
		const totalDiscount = updatedItems.reduce((total, item) => total + (item.discountAmount || 0), 0);
		const totalInvoiceAmount = updatedItems.reduce((total, item) => {
			return total + (item.purchase_amount_after_discount_and_tax || 0);
		}, 0);

		// Update the form data and items
		setFormData((prevData) => ({
			...prevData,
			total_invoice_amount: totalInvoiceAmount,
			total_discount: totalDiscount,
		}));
		setItems(updatedItems);
	};

	// New handleDelete function
	const handleDeleteItem = (index) => {
		// Create a copy of the current items array
		const updatedItems = [...items];

		// Remove the item at the specified index
		updatedItems.splice(index, 1);

		// Recalculate totals for discount and invoice amount
		const totalDiscount = updatedItems.reduce((total, item) => total + (item.discountAmount || 0), 0);
		const totalInvoiceAmount = updatedItems.reduce((total, item) => {
			return total + (item.purchase_amount_after_discount_and_tax || 0);
		}, 0);

		// Update the state with the new items and recalculated totals
		setFormData((prevData) => ({
			...prevData,
			total_invoice_amount: totalInvoiceAmount,
			total_discount: totalDiscount,
		}));
		setItems(updatedItems);
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (value === "create-newvendor") {
			openVendorMasterPage();
			return;
		}
		console.log(name, value);
		setFormData((prevData) => {
			const updatedData = {
				...prevData,
				[name]: value,
			};

			// If customer_id changes, set the currency based on the selected customer
			if (name === "vendor_name") {
				const selectedVendor = vendors.find((vendor) => vendor.id === Number(value));
				console.log(selectedVendor);

				if (selectedVendor) {
					updatedData.vendor_address = selectedVendor.address;
					updatedData.shipping_address = selectedVendor.address_send;
					updatedData.email = selectedVendor.email_payment;
					updatedData.currency = selectedVendor.currency;
				} else {
					updatedData.vendor_address = "";
					updatedData.shipping_address = "";
					updatedData.currency = "USD";
				}
			}
			// Automatically calculate payment due date when invoice date or payment terms change
			if (name === "posting_date" || name === "payment_terms") {
				const newDueDate = calculateDueDate(updatedData.posting_date, updatedData.payment_terms);
				updatedData.payment_due_date = newDueDate;
			}
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

	// Function to generate PDF
	const generatePDF = () => {
		const element = invoiceRef.current;
		const options = {
			margin: 1,
			filename: `Purchase_Invoice_${formData.invoice_no}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		html2pdf().from(element).set(options).save();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value);
		});

		// Append items to formDataToSend
		items.forEach((item, index) => {
			Object.entries(item).forEach(([key, value]) => {
				formDataToSend.append(`items[${index}][${key}]`, value);
			});
		});

		try {
			console.log(formDataToSend);
			const response = await axios.post(`${BACKEND_URL}/api/purchase-invoice`, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data", // Important for file uploads
				},
			});
			console.log("API Response:", response.data);
			if (response.status === 201) {
				toast.success("Purchase Invoice Created Successfully");
				console.log("Purchase invoice created successfully:", response.data);
				setFormData({
					user_id: "",
					vendor_id: "",
					vendor_address: "",
					shipping_address: "",
					purchase_no: "",
					invoice_date: "",
					posting_date: "",
					payment_due_date: "",
					payment_terms: "",
					email: "",
					currency: "",
					exchange_rate: 0,
					document_upload: null,
					document_name: "",
					total_invoice_amount: 0,
					total_discount: 0,
				});
				//	for table
				setItems([
					{
						Purchase_line: "",
						description: "",
						purchase_qty: 0,
						purchase_rate: 0,
						purchase_amount: 0,
						tax: "",
						discount: "",
						taxAmount: 0,
					},
				]);
			} else {
				console.log("Response Status is not 201:", response.status);
				toast.error(`Failed to Create Purchase Invoice : ${response.statusText}`);
			}
		} catch (error) {
			console.error("Error Creating Purchase Invoice", error);
			toast.error(`Failed to Create Purchase Invoice: ${error.message}`);
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
											<h3 className="card-title">Purchase Invoice</h3>
											<Link to="/view-purchaseinvoice" className="btn btn-success ml-auto">
												View All Purchase Invoice
											</Link>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
													<h5 className="section-title">Invoice Details</h5>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendor_name">Vendor Name</label>
															<select
																name="vendor_name"
																id="vendor_name"
																className="form-control col-md-8"
																value={formData.vendor_id}
																onChange={handleChange}
															>
																<option
																	value="create-newvendor"
																	onClick={openVendorMasterPage}
																	style={{ color: "blue", fontWeight: "bold" }}
																>
																	Create New Customer
																</option>
																<option value="">Select Vendor</option>
																{vendors.map((vendor) => (
																	<option key={vendor.id} value={vendor.id}>
																		{vendor.vendor_name}
																	</option>
																))}
															</select>
														</div>
														<div className="col-md-10">
															<div className="form-group">
																<label htmlFor="vendor_address">Vendor Address</label>
																<textarea
																	className="form-control"
																	name="vendor_address"
																	id="vendor_address"
																	value={formData.vendor_address}
																	onChange={handleChange}
																	placeholder="Enter Customer Address"
																></textarea>
															</div>
														</div>
														<div className="col-md-10">
															<div className="form-group">
																<label htmlFor="shipping_address">Ship To Address</label>
																<textarea
																	className="form-control"
																	id="shipping_address"
																	name="shipping_address"
																	value={formData.shipping_address}
																	onChange={handleChange}
																	placeholder="Enter Shipping Address"
																></textarea>
															</div>
														</div>
													</div>
													{/* </div> */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchase_no">Bill No.</label>
															<input
																type="text"
																name="purchase_no"
																id="purchase_no"
																className="form-control col-md-8"
																value={formData.purchase_no}
																onChange={handlePurchaseNumberChange}
															/>
															{error && <div className="text-danger">{error}</div>}
														</div>
														<div className="form-group">
															<label htmlFor="invoice_date">Bill Date</label>
															<input
																type="date"
																name="invoice_date"
																id="invoice_date"
																className="form-control col-md-8"
																value={formData.invoice_date}
																onChange={handleChange}
																placeholder="Enter Posting Date"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="posting_date">Posting Date</label>
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
															<label htmlFor="payment_due_date">Payment Due Date </label>
															<input
																type="date"
																name="payment_due_date"
																id="payment_due_date"
																value={formData.payment_due_date}
																onChange={handleChange}
																className="form-control col-md-8"
																placeholder="Enter Payment Due Date"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="payment_terms">Select Payment Terms</label>
															<select
																name="payment_terms"
																id="payment_terms"
																className="form-control col-md-8"
																value={formData.payment_terms}
																onChange={handlePaymentTermsSelectChange}
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
												</div>
												{/* Row for Email, Currency and Exchange Rate */}
												<div className="row">
													<div className="col-md-4">
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
													<div className="col-md-4">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<select
																name="currency"
																id="currency"
																className="form-control"
																value={formData.currency}
																readOnly
																onChange={handleCurrencyChange}
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
													<div className="col-md-4">
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
												</div>
												<div>
													<h3>Purchase Items</h3>
													<table style={{ width: "100%", borderCollapse: "collapse" }}>
														<thead style={{ backgroundColor: "#f2f2f2" }}>
															<tr>
																<th style={{ padding: "8px" }}>Items</th>
																<th style={{ padding: "8px" }}>Quantity</th>
																<th style={{ padding: "8px" }}>Price</th>
																<th style={{ padding: "8px" }}>Tax</th>
																<th style={{ padding: "8px" }}>Discount</th>
																<th style={{ padding: "8px" }}>Amount</th>
																<th style={{ padding: "8px" }}>Action</th>
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
																					name="purchase_line"
																					className="form-control"
																					value={item.purchase_line}
																					onChange={(e) => handleItemChange(e, index)}
																					placeholder="purchase Line"
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
																					placeholder="Description"
																					style={{ width: "100%" }}
																				/>
																			</div>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number"
																				name="purchase_qty"
																				className="form-control"
																				value={item.purchase_qty}
																				placeholder="0.00"
																				onChange={(e) => handleItemChange(e, index)}
																				style={{ width: "90%" }}
																			/>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number"
																				name="purchase_rate"
																				className="form-control"
																				value={item.purchase_rate}
																				onChange={(e) => handleItemChange(e, index)}
																				placeholder="0.00"
																				style={{ width: "90%" }}
																			/>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<select
																				name="tax"
																				id="tax"
																				className="form-control"
																				value={item.tax}
																				onChange={(e) => handleTaxSelectChange(e, index)}
																				style={{ width: "100%" }}
																			>
																				<option
																					value="create-new"
																					style={{ color: "blue", fontWeight: "bold" }}
																				>
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
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number%"
																				name="discount"
																				className="form-control"
																				value={item.discount}
																				placeholder="0.00"
																				onChange={(e) => handleItemChange(e, index)}
																				style={{ width: "90%" }}
																			/>
																		</td>
																		<td style={{ padding: "8px" }}>
																			<input
																				type="number"
																				name="purchase_amount"
																				className="form-control"
																				value={item.purchase_amount}
																				readOnly
																				style={{ width: "90%", marginRight: "10px" }}
																			/>
																		</td>

																		<td style={{ display: "flex", alignItems: "center" }}>
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
																</React.Fragment>
															))}
															<tr>
																<td colSpan="6">
																	<button type="button" onClick={addItem} className="btn btn-primary">
																		<span style={{ fontSize: "20px" }}>+</span>Add an item
																	</button>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div className="total-amount mt-3 bg-light" style={{ padding: "10px" }}>
													<div style={{ display: "flex", justifyContent: "space-between" }}>
														<h5 style={{ width: "450%", textAlign: "right" }}>Subtotal:</h5>
														<h5 style={{ width: "450%", textAlign: "right" }}>
															{items.reduce((total, item) => total + item.purchase_amount, 0).toFixed(2)}
														</h5>
													</div>
													<div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
														<span style={{ width: "450%", textAlign: "right" }}>Discount:</span>
														<span style={{ width: "450%", textAlign: "right" }}>{formData.total_discount}</span>
													</div>

													<div className="tax-section" style={{ marginTop: "20px" }}>
														{items.map((item, index) => (
															<div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
																<span style={{ width: "450%", textAlign: "right" }}>Tax ({item.tax}):</span>
																<span style={{ width: "450%", textAlign: "right" }}>
																	{item.taxAmount ? item.taxAmount.toFixed(2) : "0.00"}
																</span>
															</div>
														))}
													</div>

													<div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
														<span style={{ width: "450%", textAlign: "right", fontWeight: "bold" }}>Gross Total:</span>
														<span style={{ width: "450%", textAlign: "right", fontWeight: "bold" }}>
															{formData.total_invoice_amount.toFixed(2)}
														</span>
													</div>
												</div>

												<h5 className="section-title mt-3">Additional Information</h5>
												<div className="row">
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
																<small className="text-success">Uploaded: {formData.document_name}</small>
															)}
														</div>
													</div>
												</div>

												{/* Submit and Action Buttons */}
												<div className="card-footer">
													<div className="btn-group">
														<button
															type="button"
															className="btn btn-primary dropdown-toggle"
															data-toggle="dropdown"
															aria-haspopup="true"
															aria-expanded="false"
														>
															Post
														</button>
														<div className="dropdown-menu">
															<button className="dropdown-item">Post and Print</button>
															<button className="dropdown-item" onClick={generatePDF}>
																Post and PDF
															</button>
															<button className="dropdown-item">Post and Close</button>
														</div>
													</div>

													<div className="btn-group ml-2">
														<button
															type="button"
															className="btn btn-secondary dropdown-toggle"
															data-toggle="dropdown"
															aria-haspopup="true"
															aria-expanded="false"
														>
															Send
														</button>
														<div className="dropdown-menu">
															<button className="dropdown-item">Post and Email</button>
															<button className="dropdown-item" onClick={() => console.log("Generate Link selected")}>
																Post and Generate Link
															</button>
														</div>
													</div>
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
			{/* pdf structure */}
			<div style={{ display: "none" }}>
				<div ref={invoiceRef} className="invoice" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
					<h1 style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "10px" }}>Purchase Invoice</h1>
					{/* <p>
						<strong>Customer Name:</strong> {formData.customer_name}
					</p> */}
					<p>
						<strong>Bill To:</strong> {formData.customer_name}
					</p>
					<p>
						<strong>Invoice No:</strong> {formData.purchase_no}
					</p>
					<p>
						<strong>Invoice Date:</strong> {formData.posting_date}
					</p>
					<p>
						<strong>Payment Due Date:</strong> {formData.payment_due_date}
					</p>
					<p>
						<strong>Address:</strong> {formData.customer_address}
					</p>
					<p>
						<strong>Shipping Address:</strong> {formData.shipping_address}
					</p>
					<p>
						<strong>Payment Terms:</strong> {formData.payment_terms}
					</p>

					<table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
						<thead>
							<tr style={{ backgroundColor: "#f2f2f2" }}>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "left" }}>Item</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>Quantity</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>Price</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>Tax</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>Amount</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={index}>
									<td style={{ border: "1px solid #000", padding: "8px" }}>{item.purchase_line}</td>
									<td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>{item.purchase_qty}</td>
									<td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>{item.purchase_rate}</td>
									<td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>{item.tax}</td>
									<td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>{item.purchase_amount}</td>
								</tr>
							))}
						</tbody>
					</table>

					<div style={{ marginTop: "20px", textAlign: "right" }}>
						<h3 style={{ margin: "0" }}>Total Amount: {formData.total_invoice_amount}</h3>
					</div>
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

export default PurchaseInvoice;
