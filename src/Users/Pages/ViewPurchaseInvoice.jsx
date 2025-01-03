import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewPurchaseInvoice() {
	const [purchaseinvoice, SetPurchaseinvoice] = useState([]);

	useEffect(() => {
		fetchPurchaseInvoice();
	}, []);

	const fetchPurchaseInvoice = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/get-purchaseinvoice`);
			console.log("Fetched Purchase Invoices are:", response.data);
			if (response.status === 200) {
				SetPurchaseinvoice(response.data);
			}
		} catch (error) {
			console.log("Error fetching purchase invoice:", error.response || error.message);
			toast.error("Failed to fetch Purchase invoice");
		}
	};
	return (
		<>
			<Bheader />
			<BSlidnav />

			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Purchase Invoice</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Purchase Invoice No</th>
										<th>Invoice Date</th>
										<th>Vendor Name</th>
										<th>Net Amount</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{purchaseinvoice.map((purchaseinvoice) => (
										<tr key={purchaseinvoice.id}>
											<td>{purchaseinvoice.purchase_no}</td>
											<td>{purchaseinvoice.invoice_date}</td>
											<td>{purchaseinvoice.vendor_name}</td>
											<td>{purchaseinvoice.total_invoice_amount}</td>
											<td>
												<Link
													to={`/purchaseinvoice-items/${purchaseinvoice.purchaseinvoice_id}`}
													className="btn btn-success ml-auto"
												>
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

export default ViewPurchaseInvoice;
