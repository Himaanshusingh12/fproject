import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";

function PurchaseInvoice() {
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
											<h3 className="card-title">Purchase Invoice</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="postingDate">Posting Date</label>
															<input type="date" name="posting_date" id="postingDate" className="form-control" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentDate">Document Date</label>
															<input type="date" name="document_date" id="documentDate" className="form-control" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseInvoiceNo">Purchase Invoice No.</label>
															<input
																type="text"
																name="purchase_invoice_no"
																id="purchaseInvoiceNo"
																className="form-control"
																placeholder="Enter Purchase Invoice No."
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorName">Vendor Name</label>
															<select name="vendor_name" id="vendorName" className="form-control">
																{/* Options to be populated from Vendor Master */}
																<option value="">Select Vendor</option>
																{/* Example options */}
																<option value="vendor1">Vendor 1</option>
																<option value="vendor2">Vendor 2</option>
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<select name="currency" id="currency" className="form-control">
																{/* Options to be populated from Customer Master and include exchange rates */}
																<option value="USD">USD</option>
																<option value="EUR">EUR</option>
															</select>
															{/* Exchange rate display */}
															<div id="exchangeRate" className="form-text text-muted">
																Exchange Rate: 1 USD = 0.85 EUR
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorAddress">Vendor Address</label>
															<input
																type="text"
																name="vendor_address"
																id="vendorAddress"
																className="form-control"
																placeholder="Enter Vendor Address"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="shippingAddress">Shipping Address (if different)</label>
															<input
																type="text"
																name="shipping_address"
																id="shippingAddress"
																className="form-control"
																placeholder="Enter Shipping Address"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseLine">Purchase Line</label>
															<input
																type="text"
																name="purchase_line"
																id="purchaseLine"
																className="form-control"
																placeholder="Enter Purchase Line"
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
																className="form-control"
																placeholder="Enter Description"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseQty">Purchase Qty</label>
															<input
																type="number"
																name="purchase_qty"
																id="purchaseQty"
																className="form-control"
																step="0.01"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseRate">Purchase Rate per Qty</label>
															<input
																type="number"
																name="purchase_rate"
																id="purchaseRate"
																className="form-control"
																step="0.01"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseAmount">Purchase Amount</label>
															<input
																type="number"
																name="purchase_amount"
																id="purchaseAmount"
																className="form-control"
																step="0.01"
																readOnly
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="taxRate">Tax Rate</label>
															<input type="number" name="tax_rate" id="taxRate" className="form-control" step="0.01" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="taxAmount">Tax Amount</label>
															<input
																type="number"
																name="tax_amount"
																id="taxAmount"
																className="form-control"
																step="0.01"
																readOnly
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceAmount">Purchase Invoice Amount</label>
															<input
																type="number"
																name="invoice_amount"
																id="invoiceAmount"
																className="form-control"
																step="0.01"
																readOnly
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input
																type="file"
																name="document_upload"
																id="documentUpload"
																className="form-control"
																accept=".pdf,.docx,.jpg,.png"
															/>
															<small className="form-text text-muted">
																Max. 25MB per transaction. Storage charges may apply.
															</small>
														</div>
													</div>
													{/* <div className="col-md-6">
														<div className="form-group">
															<button type="button" className="btn btn-secondary">
																Save
															</button>
															<button type="button" className="btn btn-secondary">
																Discard
															</button>
														</div>
													</div> */}
												</div>
											</div>
											<div className="card-footer">
												{/* <button type="submit" className="btn btn-primary">
													Submit
												</button> */}
												<button type="submit" className="btn btn-primary">
													Save
												</button>
												<button type="reset" className="btn btn-secondary">
													Discard
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

			<Bheader />
		</>
	);
}

export default PurchaseInvoice;
