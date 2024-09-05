import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Purchase_module() {
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
										<div className="card-header">
											<h3 className="card-title">Purchase Module</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="Customer_name">Posting Date</label>
															<input type="date" name="customer_name" id="postingDate" className="form-control" placeholder="Enter Posting Date" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="operating_as">Document Date</label>
															<input
																type="date"
																name="operating_as"
																id="documentDate"
																className="form-control"
																placeholder="Enter Sales Invoice No."
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="address">Purchase Invoice No.</label>
															<input type="text" name="address" id="invoiceNo" className="form-control" placeholder="Enter Address" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="currency">Vendor Name</label>
															<input type="text" class="form-control" id="vendorName" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email_sales">Vendor Address</label>
															<textarea class="form-control" id="vendorAddress" rows="3"></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="email_statement">Shipping Address</label>
															<textarea class="form-control" id="shippingAddress" rows="3"></textarea>
															<small class="form-text text-muted">Leave empty if the shipping is the same as the vendor address.</small>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="gst_no">Purchase Line</label>
															<input type="text" class="form-control" id="purchaseLine" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="credit_terms">Description</label>
															<textarea class="form-control" id="description" rows="3"></textarea>
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Purchase Qty</label>
															<input type="number" name="credit_terms" id="purchaseQty" className="form-control" placeholder="Enter Credit Terms" />
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Purchase Rate per Qty</label>
															<input
																type="number"
																name="credit_terms"
																id="purchaseRate"
																step="0.01"
																className="form-control"
																placeholder="Enter Credit Terms"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Purchase Amount</label>
															<input
																type="number"
																name="credit_terms"
																id="purchaseAmount"
																step="0.01"
																className="form-control"
																placeholder="Enter Credit Terms"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Tex Rate</label>
															<input
																type="number"
																name="credit_terms"
																id="taxRate"
																step="0.01"
																className="form-control"
																placeholder="Enter Credit Terms"
															/>
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Tax Amount</label>
															<input type="number" class="form-control" id="taxAmount" step="0.01" />
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Purchase Invoice Amount</label>
															<input type="number" class="form-control" id="invoiceAmount" step="0.01" />
														</div>
														<div className="form-group">
															<label htmlFor="credit_terms">Upload Document</label>
															<input type="file" class="form-control" id="documentUpload" accept=".pdf,.docs,.jpg,.png" />
															<small class="form-text text-muted">Max. 25MB per transaction</small>
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
			</div> */}
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									<div className="card card-primary">
										<div className="card-header">
											<h3 className="card-title">Purchase Module</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="postingDate">Posting Date</label>
															<input type="date" id="postingDate" className="form-control" placeholder="Enter Posting Date" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentDate">Document Date</label>
															<input type="date" id="documentDate" className="form-control" placeholder="Enter Document Date" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceNo">Purchase Invoice No.</label>
															<input type="text" id="invoiceNo" className="form-control" placeholder="Enter Purchase Invoice No." />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorName">Vendor Name</label>
															<input type="text" id="vendorName" className="form-control" placeholder="Enter Vendor Name" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorAddress">Vendor Address</label>
															<textarea className="form-control" id="vendorAddress" rows="3" placeholder="Enter Vendor Address"></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="shippingAddress">Shipping Address</label>
															<textarea className="form-control" id="shippingAddress" rows="3" placeholder="Enter Shipping Address"></textarea>
															<small className="form-text text-muted">Leave empty if the shipping is the same as the vendor address.</small>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseLine">Purchase Line</label>
															<input type="text" id="purchaseLine" className="form-control" placeholder="Enter Purchase Line" />
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
															<label htmlFor="purchaseQty">Purchase Qty</label>
															<input type="number" id="purchaseQty" className="form-control" placeholder="Enter Purchase Qty" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseRate">Purchase Rate per Qty</label>
															<input type="number" id="purchaseRate" step="0.01" className="form-control" placeholder="Enter Purchase Rate per Qty" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="purchaseAmount">Purchase Amount</label>
															<input type="number" id="purchaseAmount" step="0.01" className="form-control" placeholder="Enter Purchase Amount" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="taxRate">Tax Rate</label>
															<input type="number" id="taxRate" step="0.01" className="form-control" placeholder="Enter Tax Rate" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="taxAmount">Tax Amount</label>
															<input type="number" id="taxAmount" step="0.01" className="form-control" placeholder="Enter Tax Amount" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoiceAmount">Purchase Invoice Amount</label>
															<input
																type="number"
																id="invoiceAmount"
																step="0.01"
																className="form-control"
																placeholder="Enter Purchase Invoice Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input type="file" className="form-control" id="documentUpload" accept=".pdf,.docs,.jpg,.png" />
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

			<Bfooter />
		</>
	);
}

export default Purchase_module;
