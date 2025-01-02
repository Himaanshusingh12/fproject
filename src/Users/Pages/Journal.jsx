import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Journal() {
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
											<h3 className="card-title">Journal Entry</h3>
										</div>
										<form
											onSubmit={(e) => {
												/* Handle form submission here */
											}}
										>
											<div className="card-body">
												<div className="row">
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
															<label htmlFor="reference">Reference</label>
															<input
																type="text"
																name="reference"
																id="reference"
																className="form-control"
																placeholder="Enter Reference"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="generalLedger">General Ledger</label>
															<input
																type="text"
																name="general_ledger"
																id="generalLedger"
																className="form-control"
																placeholder="Enter General Ledger"
															/>
														</div>
													</div>
													<div className="col-md-12">
														<div className="form-group">
															<label htmlFor="description">Description</label>
															<textarea
																className="form-control"
																id="description"
																name="description"
																rows="3"
																placeholder="Enter Description"
															></textarea>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="debit">Debit</label>
															<input
																type="number"
																className="form-control"
																id="debit"
																name="debit"
																step="0.01"
																placeholder="Enter Debit Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="credit">Credit</label>
															<input
																type="number"
																className="form-control"
																id="credit"
																name="credit"
																step="0.01"
																min="0"
																placeholder="Enter Credit Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="amount">Amount</label>
															<input
																type="number"
																className="form-control"
																id="amount"
																name="amount"
																step="0.01"
																readOnly
																placeholder="Amount will be calculated"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="documentUpload"
																name="document_upload"
																accept=".pdf,.docx,.jpg,.png"
															/>
															<small className="form-text text-muted">
																Max. 25MB per transaction. Storage charges may apply (e.g., 1GB space for 25 cents per
																month).
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

export default Journal;
