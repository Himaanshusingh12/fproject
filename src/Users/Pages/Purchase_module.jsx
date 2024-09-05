import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Purchase_module() {
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
