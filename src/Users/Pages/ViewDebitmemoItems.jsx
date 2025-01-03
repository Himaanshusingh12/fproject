import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function ViewDebitmemoItems() {
	const { debitmemoId } = useParams();
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetchDebitmemoItems();
	}, [debitmemoId]);

	const fetchDebitmemoItems = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/debitmemo_items/${debitmemoId}`);
			console.log("The fetched debitmemo items are:", response.data);
			if (response.status === 200) {
				setItems(response.data);
			}
		} catch (error) {
			console.log("Error Fetching Debit memo items:", error.response || error.message);
			toast.error("Failed to fetch Dabit Memo Items");
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
										<div className="card-header d-flex justify-content-between align-items-center">
											<h3 className="card-title">Purchase Debit Memo</h3>
										</div>
										<form>
											<div className="card-body">
												<div className="row">
													<h5 className="section-title">Debit Memo details</h5>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="customer_name">vendor Id</label>
															<input
																type="text"
																className="form-control col-md-8"
																value={items[0]?.vendor_name || ""}
																disable
															/>
														</div>
														<div className="col-md-10">
															<label htmlFor="customer_name">Bill To Address</label>
															<input
																type="text"
																className="form-control"
																value={items[0]?.vendor_address || ""}
																disable
															/>
														</div>
														<div className="col-md-10">
															<div className="form-group">
																<label htmlFor="shipping_address">Ship To Address</label>
																<input
																	type="text"
																	className="form-control"
																	value={items[0]?.shipping_address || ""}
																	disable
																/>
															</div>
														</div>
													</div>
													{/* </div> */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="invoice_no">Debit Memo No.</label>
															<input
																type="text"
																className="form-control col-md-8"
																value={items[0]?.debitmemo_no || ""}
																disable
															/>
														</div>
														<div className="form-group">
															<label htmlFor="posting_date">Invoice Date</label>
															<input
																type="text"
																className="form-control col-md-8"
																value={items[0]?.posting_date || ""}
																disable
															/>
														</div>
														<div className="form-group">
															<label htmlFor="payment_due_date">Payment Due Date </label>
															<input
																type="text"
																className="form-control col-md-8"
																value={items[0]?.payment_due_date || ""}
																disable
															/>
														</div>
														<div className="form-group">
															<label htmlFor="payment_terms">Payment Terms</label>
															<input
																type="text"
																className="form-control col-md-8"
																value={items[0]?.payment_terms || ""}
																disable
															/>
														</div>
													</div>
												</div>
												{/* Row for Email, Currency and Exchange Rate */}
												<div className="row">
													<div className="col-md-4">
														<div className="form-group">
															<label htmlFor="email">Email</label>
															<input type="email" className="form-control" value={items[0]?.email || ""} disable />
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group">
															<label htmlFor="currency">Currency</label>
															<input type="text" className="form-control" value={items[0]?.currency || ""} disable />
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group">
															<label htmlFor="exchange_rate">Exchange Rate</label>
															<input
																type="text"
																className="form-control"
																value={items[0]?.exchange_rate || ""}
																disable
															/>
														</div>
													</div>
												</div>
												<div>
													<h3>Purchase Items</h3>
													<table style={{ width: "100%", borderCollapse: "collapse" }}>
														<thead style={{ backgroundColor: "#f2f2f2" }}>
															<tr>
																<th style={{ padding: "8px" }}>Purchase Line</th>
																<th style={{ padding: "8px" }}>Description</th>
																<th style={{ padding: "8px" }}>Quantity</th>
																<th style={{ padding: "8px" }}>Price</th>
																<th style={{ padding: "8px" }}>Tax</th>
																<th style={{ padding: "8px" }}>Discount</th>
																<th style={{ padding: "8px" }}>Amount</th>
															</tr>
														</thead>
														<tbody>
															<tr style={{ borderBottom: "3px solid #ccc" }}></tr>
															{items.map((item, index) => (
																<tr key={index}>
																	<td
																		style={{
																			padding: "8px",
																			display: "flex",
																			justifyContent: "space-between",
																		}}
																	>
																		{item.purchase_line}
																	</td>
																	<td style={{ padding: "8px" }}>{item.description}</td>
																	<td style={{ padding: "8px" }}>{item.purchase_qty}</td>
																	<td style={{ padding: "8px" }}>{item.purchase_rate}</td>
																	<td style={{ padding: "8px" }}>{item.tax}</td>
																	<td style={{ padding: "8px" }}>{item.discount}</td>
																	<td style={{ padding: "8px" }}>{item.purchase_amount}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
												<div className="total-amount mt-3 bg-light" style={{ padding: "10px" }}>
													<div style={{ display: "flex", justifyContent: "space-between" }}>
														<h5 style={{ width: "450%", textAlign: "right" }}>Subtotal:</h5>
														<h5 style={{ width: "450%", textAlign: "right" }}>{items.sales_amount};</h5>
													</div>

													<div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
														<span style={{ width: "450%", textAlign: "right" }}>Discount:</span>
														<span style={{ width: "450%", textAlign: "right" }}>{items[0]?.total_discount}</span>
													</div>

													<div className="tax-section" style={{ marginTop: "20px" }}>
														{items.map((item, index) => (
															<div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
																<span style={{ width: "450%", textAlign: "right" }}>Tax ({item.tax}):</span>
																<span style={{ width: "450%", textAlign: "right" }}>{item.taxAmount}</span>
															</div>
														))}
													</div>

													<div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
														<span style={{ width: "450%", textAlign: "right", fontWeight: "bold" }}>Gross Total:</span>
														<span style={{ width: "450%", textAlign: "right", fontWeight: "bold" }}>
															{/* {formData.total_invoice_amount.toFixed(2)} */}
															{items[0]?.total_invoice_amount};
														</span>
													</div>
												</div>

												<h5 className="section-title mt-3">Additional Information</h5>
												{/* <div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="document_upload">Upload Document</label>
															<input
																type="file"
																className="form-control"
																id="document_upload"
																name="document_upload"
																onChange={handleFileChange}
																accept=".pdf,.docx,.jpg,.png"
															/>
															{formData.document_name && (
																<small className="text-success">Uploaded: {formData.document_name}</small>
															)}
														</div>
													</div>
												</div> */}
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

export default ViewDebitmemoItems;
