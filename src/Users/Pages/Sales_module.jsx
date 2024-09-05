import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Sales_module() {
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
											<h3 className="card-title">Sales Module</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="postingDate">Posting Date</label>
															<input type="date" name="postingDate" id="postingDate" className="form-control" placeholder="Enter Posting Date" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceNo">Sales Invoice No.</label>
															<input type="text" name="invoiceNo" id="invoiceNo" className="form-control" placeholder="Enter Sales Invoice No." />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customerName">Customer Name</label>
															<input type="text" name="customerName" id="customerName" className="form-control" placeholder="Enter Customer Name" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customerAddress">Customer Address</label>
															<textarea className="form-control" id="customerAddress" rows="3" placeholder="Enter Customer Address"></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="shippingAddress">Shipping Address</label>
															<textarea className="form-control" id="shippingAddress" rows="3" placeholder="Enter Shipping Address"></textarea>
															<small className="form-text text-muted">Leave empty if the shipping address is the same as the customer address.</small>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesLine">Sales Line</label>
															<input type="text" name="salesLine" id="salesLine" className="form-control" placeholder="Enter Sales Line" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="description">Description</label>
															<textarea className="form-control" id="description" rows="3" placeholder="Enter Description"></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesQty">Sales Qty</label>
															<input type="number" name="salesQty" id="salesQty" className="form-control" placeholder="Enter Sales Quantity" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesRate">Sales Rate per Qty</label>
															<input
																type="number"
																name="salesRate"
																id="salesRate"
																step="0.01"
																className="form-control"
																placeholder="Enter Sales Rate per Quantity"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="salesAmount">Sales Amount</label>
															<input
																type="number"
																name="salesAmount"
																id="salesAmount"
																step="0.01"
																className="form-control"
																placeholder="Enter Sales Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="tax">Tax</label>
															<input type="number" name="tax" id="tax" step="0.01" className="form-control" placeholder="Enter Tax Amount" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceAmount">Sales Invoice Amount</label>
															<input
																type="number"
																name="invoiceAmount"
																id="invoiceAmount"
																step="0.01"
																className="form-control"
																placeholder="Enter Sales Invoice Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankDetails">Bank Details</label>
															<textarea className="form-control" id="bankDetails" rows="3" placeholder="Enter Bank Details"></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input type="file" className="form-control" id="documentUpload" accept=".pdf,.docx,.jpg,.png" />
															<small className="form-text text-muted">Max. 25MB per transaction</small>
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
			<div></div>
			<Bfooter />
		</>
	);
}

export default Sales_module;
