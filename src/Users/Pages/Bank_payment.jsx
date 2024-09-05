import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Bank_payment() {
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
											<h3 className="card-title">Bank Payment Module</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="postingDate">Posting Date</label>
															<input type="date" name="posting_date" id="postingDate" className="form-control" placeholder="Enter Posting Date" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorCustomerName">Vendor/Customer Name</label>
															<input
																type="text"
																name="vendor_customer_name"
																id="vendorCustomerName"
																className="form-control"
																placeholder="Enter Vendor/Customer Name"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="vendorCustomerAddress">Vendor/Customer Address</label>
															<textarea
																name="vendor_customer_address"
																id="vendorCustomerAddress"
																className="form-control"
																rows="3"
																placeholder="Enter Vendor/Customer Address"
															></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankAccount">Bank Account</label>
															<input type="text" name="bank_account" id="bankAccount" className="form-control" placeholder="Enter Bank Account" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="paymentAmount">Payment Amount</label>
															<input
																type="number"
																name="payment_amount"
																id="paymentAmount"
																className="form-control"
																placeholder="Enter Payment Amount"
																step="0.01"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="outstandingInvoices">Outstanding Invoices / On Account Payment</label>
															<textarea
																name="outstanding_invoices"
																id="outstandingInvoices"
																className="form-control"
																rows="3"
																placeholder="Select Outstanding Invoices or Enter On Account Payment"
															></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="uploadDocument">Upload Document</label>
															<input type="file" className="form-control" id="uploadDocument" accept=".pdf,.docs,.jpg,.png" />
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

export default Bank_payment;
