import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
// import { BACKEND_URL } from "../../Constant";
// import axios from "axios";

function SalesInvoice() {
	// Define state variables
	const [isDifferentCurrency, setIsDifferentCurrency] = useState(false);
	const [currency, setCurrency] = useState(""); // To store selected currency
	const defaultCurrency = "USD"; // Replace with the home/default currency

	// Function to handle currency change
	const handleCurrencyChange = (e) => {
		const selectedCurrency = e.target.value;
		setCurrency(selectedCurrency);

		// Check if the selected currency is different from the default
		if (selectedCurrency !== defaultCurrency) {
			setIsDifferentCurrency(true);
		} else {
			setIsDifferentCurrency(false);
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
										<div className="card-header">
											<h3 className="card-title">Sales Invoice</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													{/* Posting Date */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="postingDate">Posting Date</label>
															<input
																type="date"
																name="posting_date"
																id="postingDate"
																className="form-control"
																placeholder="Enter Posting Date"
															/>
														</div>
													</div>

													{/* Sales Invoice No. */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceNo">Sales Invoice No.</label>
															<input
																type="text"
																name="invoice_no"
																id="invoiceNo"
																className="form-control"
																placeholder="Enter Sales Invoice No."
															/>
														</div>
													</div>

													{/* Customer Name */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customerName">Customer Name</label>
															<select name="customer_id" id="customerName" className="form-control">
																{/* Populate customer names dynamically */}
															</select>
														</div>
													</div>

													{/* Currency (with Exchange Rate) */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<select
																name="currency"
																id="currency"
																className="form-control"
																onChange={handleCurrencyChange}
															>
																{/* Populate currency dynamically */}
																<option value="USD">USD</option>
																<option value="EUR">EUR</option>
																<option value="INR">INR</option>
																{/* Add more currencies */}
															</select>
															{/* Show exchange rate only if currency is different from home currency */}
														</div>
													</div>
													{/* Sales Line */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesLine">Sales Line</label>
															<input
																type="text"
																name="sales_line"
																id="salesLine"
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
																className="form-control"
																placeholder="Enter Description"
															/>
														</div>
													</div>

													{/* Sales Qty */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesQty">Sales Qty</label>
															<input
																type="number"
																name="sales_qty"
																id="salesQty"
																className="form-control"
																placeholder="Enter Sales Quantity"
															/>
														</div>
													</div>

													{/* Sales Rate per Qty */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesRate">Sales Rate per Qty</label>
															<input
																type="number"
																name="sales_rate"
																id="salesRate"
																step="0.01"
																className="form-control"
																placeholder="Enter Sales Rate per Quantity"
															/>
														</div>
													</div>

													{/* Sales Amount (I * J) */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesAmount">Sales Amount</label>
															<input
																type="number"
																name="sales_amount"
																id="salesAmount"
																step="0.01"
																className="form-control"
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
																className="form-control"
																placeholder="Enter Tax Amount"
															/>
														</div>
													</div>

													{/* Sales Invoice Amount (K + L) */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceAmount">Sales Invoice Amount</label>
															<input
																type="number"
																name="invoice_amount"
																id="invoiceAmount"
																step="0.01"
																className="form-control"
																placeholder="Enter Sales Invoice Amount"
															/>
														</div>
													</div>
													{/* Document Upload */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="documentUpload"
																accept=".pdf,.docx,.jpg,.png"
															/>
															<small className="form-text text-muted">Max. 25MB per transaction</small>
														</div>
													</div>

													{/* Bank Details */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankDetails">Bank Details</label>
															<textarea
																className="form-control"
																id="bankDetails"
																name="bank_details"
																rows="3"
																placeholder="Enter Bank Details"
															></textarea>
														</div>
													</div>
													{/* Customer Address */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customerAddress">Customer Address</label>
															<textarea
																className="form-control"
																name="customer_address"
																id="customerAddress"
																rows="3"
																placeholder="Enter Customer Address"
															></textarea>
														</div>
													</div>

													{/* Shipping Address */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="shippingAddress">Shipping Address</label>
															<textarea
																className="form-control"
																id="shippingAddress"
																name="shipping_address"
																rows="3"
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
