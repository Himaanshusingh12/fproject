import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function ContraEntries() {
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
											<h3 className="card-title">Contra Entries</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="payment_from">Payment From</label>
															<input
																type="text"
																name="payment_from"
																id="payment-from"
																className="form-control"
																placeholder="Enter Payment Sender Name"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="received_in">Received In</label>
															<input
																type="text"
																name="received_in"
																id="received_in"
																className="form-control"
																placeholder="Enter Payment Receiver Name"
															/>
														</div>
													</div>

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
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="uploadDocument">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="uploadDocument"
																accept=".pdf,.docs,.jpg,.png"
															/>
															<small className="form-text text-muted">Max. 25MB per transaction</small>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="description">Description</label>
															<textarea
																name="description"
																id="description"
																className="form-control"
																rows="3"
																placeholder="Enter Description"
															></textarea>
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

export default ContraEntries;
