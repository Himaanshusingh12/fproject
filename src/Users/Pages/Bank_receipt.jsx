import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Bank_receipt() {
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
											<h3 className="card-title">Bank Receipt</h3>
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
																className="form-control"
																id="vendorCustomerAddress"
																rows="3"
																placeholder="Enter Vendor/Customer Address"
															></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankAccount">Payment Deposited To Bank Account</label>
															<input type="text" className="form-control" id="bankAccount" placeholder="Enter Bank Account" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="paymentReceivedAmount">Payment Received Amount</label>
															<input
																type="number"
																className="form-control"
																id="paymentReceivedAmount"
																step="0.01"
																placeholder="Enter Payment Received Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="outstandingInvoices">Outstanding Invoices / On Account Payment</label>
															<textarea
																className="form-control"
																id="outstandingInvoices"
																rows="3"
																placeholder="Select Outstanding Invoices or Enter On Account Payment"
															></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="receiptAmount">Receipt Amount</label>
															<input type="number" className="form-control" id="receiptAmount" step="0.01" placeholder="Enter Receipt Amount" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input type="file" className="form-control" id="documentUpload" accept=".pdf,.docx,.jpg,.png" />
															<small className="form-text text-muted">Max. 25MB per transaction. Storage charges may apply.</small>
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

export default Bank_receipt;
