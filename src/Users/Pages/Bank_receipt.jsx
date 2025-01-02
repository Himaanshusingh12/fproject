import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function Bank_receipt() {
	const [customers, SetCustomers] = useState([]);
	const [vendors, SetVendors] = useState([]);
	const [paymentToOptions, setPaymentToOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState("customer");

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
					setPaymentToOptions(response.data);
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
					// setPaymentToOptions(response.data);
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
											<h3 className="card-title">Bank Receipt</h3>
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
															<label htmlFor="received_date">Received Date</label>
															<input
																type="date"
																name="received_date"
																id="received_date"
																className="form-control"
																placeholder="Enter Received date"
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
																<option>Customer</option>
																<option>Vendor</option>
																<option>Balance Sheet GL</option>
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="received_from">Received From</label>
															<select name="received_from" id="received from" className="form-control">
																<option value="">Received From</option>
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
															<label htmlFor="amount_received">Amount Received</label>
															<input
																type="number"
																className="form-control"
																id="amount_received"
																name="amount_received"
																step="0.01"
																placeholder="Enter Receipt Amount"
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customer_address">Customer Address</label>
															<textarea
																className="form-control"
																id="customer_address"
																name="customer_address"
																rows="3"
																placeholder="Enter Customer Address"
															></textarea>
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
															<label htmlFor="documentUpload">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="documentUpload"
																accept=".pdf,.docx,.jpg,.png"
															/>
															<small className="form-text text-muted">
																Max. 25MB per transaction. Storage charges may apply.
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

export default Bank_receipt;
