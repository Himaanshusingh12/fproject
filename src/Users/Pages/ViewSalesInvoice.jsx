import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";

function ViewSalesInvoice() {
	const [salesInvoices, setSalesInvoices] = useState([]);
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [formValue, setFormValue] = useState({
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

	useEffect(() => {
		fetchSalesInvoices();
	}, []);

	const fetchSalesInvoices = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/sales-invoice`);
			console.log(response.data);
			setSalesInvoices(response.data);
		} catch (error) {
			console.error("Error fetching sales invoices:", error.response || error.message);
			toast.error("Failed to fetch sales invoices.");
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/sales-invoice/${id}`);
			setSalesInvoices(salesInvoices.filter((invoice) => invoice.id !== id));
			toast.success("Invoice deleted successfully.");
		} catch (error) {
			toast.error("Failed to delete the invoice.");
		}
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Open the modal and set the selected invoice for editing
	const handleEdit = (invoice) => {
		setSelectedInvoice(invoice); // Set the selected invoice for editing
		setFormValue(invoice); // Populate the form with the selected invoice's data
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show(); // Show the Bootstrap modal
	};

	const handleSave = async (e) => {
		e.preventDefault();
		console.log("Form Value:", formValue);
		console.log("Selected Invoice:", selectedInvoice);

		try {
			console.log("Sending formValue to the server:", formValue);
			const response = await axios.put(`${BACKEND_URL}/api/sales-invoice/${selectedInvoice.id}`, formValue);
			console.log("Update response:", response.data);
			console.log("Response from server:", response);
			if (response.status === 200) {
				// Check if the response is successful
				toast.success("Invoice updated successfully.");
				fetchSalesInvoices(); // Refresh the list after saving

				// Hide the modal after saving
			} else {
				toast.error("Failed to update the invoice.");
			}
		} catch (error) {
			console.error("Error updating invoice:", error); // Log the error for debugging
			toast.error("Failed to update the invoice.");
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Sales Invoices</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>ID</th>
										{/* <th>UserID</th> */}
										<th>Posting Date</th>
										<th>Invoice No </th>
										{/* <th>Customer Name</th> */}
										<th>Currency</th>
										{/* <th>Exchage Rate</th> */}
										{/* <th>Sales Line</th> */}
										{/* <th>Description</th> */}
										<th>Sales_qty</th>
										<th>Sales Rate</th>
										<th>Sales Amount</th>
										{/* <th>Tax</th> */}
										<th>Total Invoice Amount</th>
										{/* <th>Document</th> */}
										<th>Bank Detail</th>
										<th>Customer Address</th>
										{/* <th>Shipping Address</th> */}
										{/* <th>Created_at</th> */}
										{/* <th>Updated_at</th> */}
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{salesInvoices.map((invoice) => (
										<tr key={invoice.id}>
											<td>{invoice.id}</td> {/* Display the correct ID */}
											{/* <td>{invoice.user_id}</td> */}
											<td>{invoice.posting_date}</td>
											<td>{invoice.invoice_no}</td>
											{/* <td>{invoice.customer_name}</td> */}
											<td>{invoice.currency}</td>
											{/* <td>{invoice.exchange_rate || "N/A"}</td> */}
											{/* <td>{invoice.sales_line || "N/A"}</td> */}
											{/* <td>{invoice.description || "N/A"}</td> */}
											<td>{invoice.sales_qty || 0}</td>
											<td>{invoice.sales_rate || 0}</td>
											<td>{invoice.sales_amount || 0}</td>
											{/* <td>{invoice.tax || 0}</td> */}
											<td>{invoice.total_invoice_amount || 0}</td>
											{/* <td>{typeof invoice.document_upload === "string" ? invoice.document_upload : "N/A"}</td> */}
											{/* <td>
												{invoice.document_upload && invoice.document_upload !== "" ? invoice.document_upload : "N/A"}
											</td> */}
											{/* Handle document upload */}
											<td>{typeof invoice.bank_details === "string" ? invoice.bank_details : "N/A"}</td>
											{/* Handle bank details */}
											<td>{invoice.customer_address || "N/A"}</td>
											{/* <td>{invoice.shipping_address || "N/A"}</td> */}
											{/* <td>{invoice.created_at}</td> */}
											{/* <td>{invoice.updated_at}</td> */}
											<td>
												<button className="btn btn-danger" onClick={() => handleDelete(invoice.id)}>
													<i className="fas fa-trash" title="Delete"></i>
												</button>
												<button className="btn btn-primary me-2" onClick={() => handleEdit(invoice)}>
													{/* Edit */}
													<i className="fas fa-edit" title="Edit"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Edit SalesInvoice Modal */}
						{/* <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="editModalLabel">
											Edit Sales Invoice
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form onSubmit={handleSave}>
											<div className="form-group">
												<label htmlFor="posting_date">Posting Date</label>
												<input
													type="text"
													className="form-control"
													id="posting_date"
													name="posting_date"
													value={formValue.posting_date}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="invoice_no">Invoice No</label>
												<input
													type="text"
													className="form-control"
													id="invoice_no"
													name="invoice_no"
													value={formValue.invoice_no}
													onChange={handleFormChange}
													required
												/>
											</div>
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
												<label htmlFor="exchange_rate">Exchange Rate</label>
												<input
													type="text"
													className="form-control"
													id="exchange_rate"
													name="exchange_rate"
													value={formValue.exchange_rate}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="sales_line">Sales Line</label>
												<input
													type="text"
													className="form-control"
													id="sales_line"
													name="sales_line"
													value={formValue.sales_line}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="description">Description</label>
												<input
													type="text"
													className="form-control"
													id="description"
													name="description"
													value={formValue.description}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="sales_qty">Sales Qty</label>
												<input
													type="text"
													className="form-control"
													id="sales_qty"
													name="sales_qty"
													value={formValue.sales_qty}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="sales_rate">Sales Rate</label>
												<input
													type="text"
													className="form-control"
													id="sales_rate"
													name="sales_rate"
													value={formValue.sales_rate}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="sales_amount">Sales Amount</label>
												<input
													type="text"
													className="form-control"
													id="sales_amount"
													name="sales_amount"
													value={formValue.sales_amount}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="tax">Tax</label>
												<input
													type="text"
													className="form-control"
													id="tax"
													name="tax"
													value={formValue.tax}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="total_invoice_amount">Total Invoice Amount</label>
												<input
													type="text"
													className="form-control"
													id="total_invoice_amount"
													name="total_invoice_amount"
													value={formValue.total_invoice_amount}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="document_upload">Document</label>
												<input
													type="text"
													className="form-control"
													id="document_upload"
													name="document_upload"
													value={formValue.document_upload}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="bank_details">Bank Details</label>
												<input
													type="text"
													className="form-control"
													id="bank_details"
													name="bank_details"
													value={formValue.bank_details}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="customer_address">Customer Address</label>
												<input
													type="text"
													className="form-control"
													id="customer_address"
													name="customer_address"
													value={formValue.customer_address}
													onChange={handleFormChange}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="shipping_address">Shipping Address</label>
												<input
													type="text"
													className="form-control"
													id="shipping_address"
													name="shipping_address"
													value={formValue.shipping_address}
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
						</div> */}
						<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="editModalLabel">
											Edit Sales Invoice
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form onSubmit={handleSave}>
											<div className="row">
												{/* Row 1 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="posting_date">Posting Date</label>
														<input
															type="text"
															className="form-control"
															id="posting_date"
															name="posting_date"
															value={formValue.posting_date}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="invoice_no">Invoice No</label>
														<input
															type="text"
															className="form-control"
															id="invoice_no"
															name="invoice_no"
															value={formValue.invoice_no}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 2 */}
												<div className="col-md-6">
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
												</div>
												<div className="col-md-6">
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
												</div>

												{/* Row 3 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="exchange_rate">Exchange Rate</label>
														<input
															type="text"
															className="form-control"
															id="exchange_rate"
															name="exchange_rate"
															value={formValue.exchange_rate}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="sales_line">Sales Line</label>
														<input
															type="text"
															className="form-control"
															id="sales_line"
															name="sales_line"
															value={formValue.sales_line}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 4 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="description">Description</label>
														<input
															type="text"
															className="form-control"
															id="description"
															name="description"
															value={formValue.description}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="sales_qty">Sales Qty</label>
														<input
															type="text"
															className="form-control"
															id="sales_qty"
															name="sales_qty"
															value={formValue.sales_qty}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 5 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="sales_rate">Sales Rate</label>
														<input
															type="text"
															className="form-control"
															id="sales_rate"
															name="sales_rate"
															value={formValue.sales_rate}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="sales_amount">Sales Amount</label>
														<input
															type="text"
															className="form-control"
															id="sales_amount"
															name="sales_amount"
															value={formValue.sales_amount}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 6 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="tax">Tax</label>
														<input
															type="text"
															className="form-control"
															id="tax"
															name="tax"
															value={formValue.tax}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="total_invoice_amount">Total Invoice Amount</label>
														<input
															type="text"
															className="form-control"
															id="total_invoice_amount"
															name="total_invoice_amount"
															value={formValue.total_invoice_amount}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 7 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="document_upload">Document</label>
														<input
															type="text"
															className="form-control"
															id="document_upload"
															name="document_upload"
															value={formValue.document_upload}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="bank_details">Bank Details</label>
														<input
															type="text"
															className="form-control"
															id="bank_details"
															name="bank_details"
															value={formValue.bank_details}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>

												{/* Row 8 */}
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="customer_address">Customer Address</label>
														<input
															type="text"
															className="form-control"
															id="customer_address"
															name="customer_address"
															value={formValue.customer_address}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor="shipping_address">Shipping Address</label>
														<input
															type="text"
															className="form-control"
															id="shipping_address"
															name="shipping_address"
															value={formValue.shipping_address}
															onChange={handleFormChange}
															required
														/>
													</div>
												</div>
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

export default ViewSalesInvoice;
