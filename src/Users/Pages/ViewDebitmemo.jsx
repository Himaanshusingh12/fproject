import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewDebitmemo() {
	const [debitmemo, SetDebitmemo] = useState([]);

	useEffect(() => {
		fetchDebitmemo();
	}, []);

	const fetchDebitmemo = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/purchase-debitmemo`);
			console.log("The fetched Debit memo are:", response.data);
			if (response.status === 200) {
				SetDebitmemo(response.data);
			}
		} catch (error) {
			console.log("Error fetching Purchase Debit memo:", error.response || error.message);
			toast.error("Failed to fetch Purchase Debit Memo");
		}
	};
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Purchase Debitmemo</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Debit Memo No</th>
										<th>Invoice Date</th>
										<th>Vendor ID</th>
										<th>Net Amount</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{debitmemo.map((debitmemo) => (
										<tr key={debitmemo.id}>
											<td>{debitmemo.debitmemo_no}</td>
											<td>{debitmemo.posting_date}</td>
											<td>{debitmemo.vendor_name}</td>
											<td>{debitmemo.total_invoice_amount}</td>
											<td>
												<Link to={`/debitmemo-items/${debitmemo.debitmemo_id}`} className="btn btn-success ml-auto">
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
			<Bfooter />
		</>
	);
}

export default ViewDebitmemo;
