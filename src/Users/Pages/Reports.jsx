import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Reports() {
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
											<h3 className="card-title">Generate Report</h3>
										</div>
										<form
											onSubmit={(e) => {
												/* Handle form submission here */
											}}
										>
											<div className="card-body">
												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label htmlFor="reportType">Select Report Type</label>
															<select id="reportType" name="report_type" className="form-control">
																<option value="">-- Select Report --</option>
																<option value="aged_account_payable">Aged Account Payable</option>
																<option value="aged_account_receivable">Aged Account Receivable</option>
																<option value="trial_balance">Trial Balance</option>
																<option value="profit_and_loss">Profit and Loss</option>
																<option value="balance_sheet">Balance Sheet</option>
																<option value="general_ledger">General Ledger</option>
																<option value="bank_reconciliation">Bank Reconciliation</option>
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="startDate">Start Date</label>
															<input type="date" id="startDate" name="start_date" className="form-control" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="endDate">End Date</label>
															<input type="date" id="endDate" name="end_date" className="form-control" />
														</div>
													</div>
												</div>
											</div>
											<div className="card-footer">
												<button type="submit" className="btn btn-primary">
													Generate Report
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

export default Reports;
