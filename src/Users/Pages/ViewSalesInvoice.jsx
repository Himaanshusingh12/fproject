import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewSalesInvoice() {
	const [salesInvoices, setSalesInvoices] = useState([]);

	useEffect(() => {
		fetchSalesInvoices();
	}, []);

	const fetchSalesInvoices = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/sales-invoice`);
			console.log(response.data);
			setSalesInvoices(response.data);
		} catch (error) {
			console.error("Error fetching sales invoices:", error.response || error.message);
			toast.error("Failed to fetch sales invoices.");
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<h2>Sales Invoices</h2>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Invoice No</th>
										<th>Invoice Date</th>
										<th>Customer Id</th>
										<th>Net Amount</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{salesInvoices.map((invoice) => (
										<tr key={invoice.id}>
											<td>{invoice.invoice_no}</td>
											<td>{invoice.posting_date}</td>
											<td>{invoice.customer_name}</td>
											<td>{invoice.total_invoice_amount}</td>
											<td>
												<Link to={`/salesinvoice-items/${invoice.invoice_id}`} className="btn btn-success ml-auto">
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

export default ViewSalesInvoice;
