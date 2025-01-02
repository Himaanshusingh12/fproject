import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";

function Bank_payment() {
	const [customers, SetCustomers] = useState([]);
	const [vendors, SetVendors] = useState([]);
	const [paymentToOptions, setPaymentToOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState("vendor");

	useEffect(() => {
		getCustomers();
		getVendors();
	}, []);

	useEffect(() => {
		// update paymentToOptions based on selectedOption
		if (selectedOption === "Customer") {
			setPaymentToOptions(customers);
		} else if (selectedOption === "Vendor" || selectedOption === "Balance Sheet GL") {
			setPaymentToOptions(vendors);
		}
	}, [selectedOption, customers, vendors]);

	const getCustomers = async () => {
		const userId = localStorage.getItem("userid");
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/customers/by-user/${userId}`);
				console.log("API Response:", response.data);
				if (response.status === 200) {
					SetCustomers(response.data);
					// console.log("Customers fetched from API:", response.data);
				} else {
					console.log("Response Status is not 200:", response.status);
					toast.error(`Failed to Get Customer : ${response.statusText}`);
				}
			} catch (error) {
				console.error("Error Get Customers", error);
				toast.error(`Failed to Get Customer: ${error.message}`);
			}
		} else {
			toast.error("User ID not found in local storage");
		}
	};

	const getVendors = async () => {
		const userId = localStorage.getItem("userid");
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/vendors/by-user/${userId}`);
				console.log("API Response:", response.data);
				console.log("The fetched vedors are by current login user:", response.data);
				if (response.status === 200) {
					SetVendors(response.data);
					setPaymentToOptions(response.data);
				} else {
					toast.error(`Failed to Get Vendors: ${response.statusText}`);
				}
			} catch (error) {
				toast.error(`Failed to Get Vendors: ${error.message}`);
			}
		} else {
			toast.error("User ID not found in local storage");
		}
	};
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
															<label htmlFor="bank_account">Select Bank Account</label>
															<select type="text" name="bank_account" id="bank_account" className="form-control">
																<option>Select Bank</option>
																<option>A</option>
																<option>B</option>
															</select>
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
															<label htmlFor="select">Select</label>
															<select
																type="text"
																name="select"
																id="select"
																className="form-control"
																value={selectedOption}
																onChange={(e) => setSelectedOption(e.target.value)}
															>
																{/* <option>Vendor/Customer/Balance Sheet Gl</option> */}
																<option>Vendor</option>
																<option>Customer</option>
																<option>Balance Sheet GL</option>
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="payment_to">Payment To</label>
															<select name="payment_to" id="payment_to" className="form-control">
																<option value="">Payment To</option>
																{paymentToOptions.map((option) => (
																	<option key={option.id} value={option.id}>
																		{option.vendor_name || option.customer_name}
																	</option>
																))}
															</select>
														</div>
													</div>

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="bankAccount">Bank Account</label>
															<input
																type="text"
																name="bank_account"
																id="bankAccount"
																className="form-control"
																placeholder="Enter Bank Account"
															/>
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
															<label htmlFor="address">Address</label>
															<textarea
																name="address"
																id="address"
																className="form-control"
																rows="3"
																placeholder="Enter Address"
															></textarea>
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
															<input
																type="file"
																className="form-control"
																id="uploadDocument"
																accept=".pdf,.docs,.jpg,.png"
															/>
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
