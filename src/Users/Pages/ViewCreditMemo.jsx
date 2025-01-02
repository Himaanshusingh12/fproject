import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import { useEffect } from "react";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ViewCreditMemo() {
	const [creditmemo, SetCreditmemo] = useState([]);

	useEffect(() => {
		fetchCreditmemo();
	}, []);

	const fetchCreditmemo = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/sales-creditmemo`);
			console.log("The fetched credit memo are:", response.data);
			if (response.status === 200) {
				SetCreditmemo(response.data);
			}
		} catch (error) {
			console.log("Error fetching Sales Credit memo:", error.response || error.message);
			toast.error("Failed to Sales Credit memo");
		}
	};
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Sales Creditmemo</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Credit Memo No</th>
										<th>Invoice Date</th>
										<th>Customer ID</th>
										<th>Net Amount</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{creditmemo.map((creditmemo) => (
										<tr key={creditmemo.id}>
											<td>{creditmemo.creditmemo_no}</td>
											<td>{creditmemo.posting_date}</td>
											<td>{creditmemo.customer_name}</td>
											<td>{creditmemo.total_invoice_amount}</td>
											<td>
												<Link to={`/creditmemo-items/${creditmemo.creditmemo_id}`} className="btn btn-success ml-auto">
													View
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<BSlidnav />
		</>
	);
}

export default ViewCreditMemo;
