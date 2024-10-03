import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function InactiveCustomers() {
	const [inactiveCustomers, setInactiveCustomers] = useState([]);

	useEffect(() => {
		fetchInactiveCustomers();
	}, []);

	const fetchInactiveCustomers = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/inactive-customers`);
			if (response.status === 200) {
				setInactiveCustomers(response.data);
			} else {
				console.error("Failed to fetch inactive customers:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching inactive customers:", error);
		}
	};

	const handleActivate = async (customerId) => {
		try {
			const response = await axios.put(`${BACKEND_URL}/api/activate-customer/${customerId}`);
			if (response.status === 200) {
				toast.success("Customer activated successfully");
				fetchInactiveCustomers();
			} else {
				console.error("Error activating customer:", response.statusText);
			}
		} catch (error) {
			console.error("Error activating customer:", error);
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="card">
						<div className="card-header">
							<h1>Inactive Customers</h1>
						</div>
						<div className="card-body">
							{inactiveCustomers.length === 0 ? (
								<p>No customers are currently Inactive.</p>
							) : (
								<table className="table table-striped table-bordered table-hover">
									<thead className="thead-dark">
										<tr>
											<th scope="col">Customer ID</th>
											<th scope="col">Reason for Inactive</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
										{inactiveCustomers.map((customer) => (
											<tr key={customer.id}>
												<td>{customer.id}</td>
												<td>{customer.reason}</td>
												<td>
													<button className="btn btn-success" onClick={() => handleActivate(customer.id)}>
														Activate
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default InactiveCustomers;
