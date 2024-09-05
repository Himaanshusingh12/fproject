import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Bank_reconciliation() {
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
											<h3 className="card-title">Bank Reconciliation</h3>
										</div>
										<form onSubmit>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankAccount">Bank Account</label>
															<input type="text" name="bank_account" id="bankAccount" className="form-control" placeholder="Enter Bank Account" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="reconciliationPeriod">Reconciliation Period</label>
															<input type="month" name="reconciliation_period" id="reconciliationPeriod" className="form-control" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankBalancePerBook">Bank Balance per Book (as of cut-off date)</label>
															<input type="number" name="bank_balance_per_book" id="bankBalancePerBook" className="form-control" step="0.01" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankBalanceManual">Bank Balance (Manual Entry, as of cut-off date)</label>
															<input type="number" name="bank_balance_manual" id="bankBalanceManual" className="form-control" step="0.01" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="adjustments">Adjustments</label>
															<input type="number" name="adjustments" id="adjustments" className="form-control" step="0.01" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="difference">Difference</label>
															<input type="number" name="difference" id="difference" className="form-control" step="0.01" readOnly />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<button type="button" className="btn btn-secondary" id="loadTransaction">
																Load Unreconciled Transactions
															</button>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="clearingDate">Enter the Date of Clearing into the Bank Account</label>
															<input type="date" name="clearing_date" id="clearingDate" className="form-control" />
														</div>
														<div className="form-group">
															<label htmlFor="documentUpload">Upload Document</label>
															<input type="file" name="document_upload" id="documentUpload" className="form-control" accept=".pdf,.docx,.jpg,.png" />
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

export default Bank_reconciliation;
