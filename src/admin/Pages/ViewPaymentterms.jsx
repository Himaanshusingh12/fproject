import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";

function ViewPaymentterm() {
	const [paymentterm, setPaymentterm] = useState([]);
	const [filteredPaymentterms, setFilteredPaymentterms] = useState([]);
	const [selectPaymentterm, setSelectPaymentterm] = useState(null);
	const [formValue, setFormValue] = useState({ name: "", note: "" });
	const [searchQuery, setSearchQuery] = useState("");
	//pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [paymenttermPerPage] = useState(6);

	useEffect(() => {
		fetchPaymentterm();
	}, []);

	const fetchPaymentterm = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/paymentterms`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/paymentterms/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);
			if (response.status === 200) {
				// console.log(response.data);
				setPaymentterm(response.data);
				setFilteredPaymentterms(response.data);
			} else {
				toast.error(`Failed to fetch payment terms: ${response.statusText}`);
			}
		} catch (error) {
			toast.error(`Failed to fetch payment terms: ${error.response?.data?.message || error.message}`);
		}
	};

	// handlesearch
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			const filtered = paymentterm.filter((paymentterm) => paymentterm.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredPaymentterms(filtered);
			setCurrentPage(1);
		} else {
			setFilteredPaymentterms(paymentterm);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			setFilteredPaymentterms(
				paymentterm.filter((paymenttermItem) => {
					const nameMatch = paymenttermItem.name && paymenttermItem.name.toLowerCase().includes(searchQuery.toLowerCase());
					const codeMatch = paymenttermItem.code && paymenttermItem.code.toLowerCase().includes(searchQuery.toLowerCase());
					return nameMatch || codeMatch;
				})
			);
		} else {
			setFilteredPaymentterms(paymentterm);
		}
	}, [searchQuery, paymentterm]);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/paymentterms/${id}`);
			toast.success("Payment term deleted successfully");
			fetchPaymentterm();
		} catch (error) {
			console.error("Error deleting Payment term", error);
			toast.error("Error deleting Payment term");
		}
	};
	//Open the modal and set the selected currency for editing
	const handleEdit = (paymentterm_manage) => {
		setSelectPaymentterm(paymentterm_manage);
		setFormValue({ name: paymentterm_manage.name, note: paymentterm_manage.note });
		const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
		modal.show();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${BACKEND_URL}/api/paymentterms/${selectPaymentterm.paymentterms_id}`, formValue);
			// console.log("Response:", response);
			if (response.status === 200) {
				toast.success("Payment term updated successfully");
				fetchPaymentterm();
				const modalElement = document.getElementById("editModal");
				const modal = new window.bootstrap.Modal(modalElement);
				modal.hide();
			}
		} catch (error) {
			console.error("Error updating payment term", error);
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to update Payment term");
			}
		}
	};
	const handleToggle = async (id, currentStatus) => {
		try {
			const updatedStatus = currentStatus === "active" ? "inactive" : "active";
			console.log(`Toggling status for Payment term ID: ${id}, Current Status: ${currentStatus}, Updated Status: ${updatedStatus}`);
			await axios.put(`${BACKEND_URL}/api/paymentterms/${id}/status`);
			toast.success(`Payment term status updated to ${updatedStatus} successfully`);
			fetchPaymentterm(); // Refresh the list
		} catch (error) {
			console.error("Error updating status", error);
			toast.error("Error updating status");
		}
	};

	// Pagination Logic
	const indexOfLastUser = currentPage * paymenttermPerPage;
	const indexOfFirstUser = indexOfLastUser - paymenttermPerPage;
	const currentPaymentterm = filteredPaymentterms.slice(indexOfFirstUser, indexOfLastUser);

	const totalPages = Math.ceil(filteredPaymentterms.length / paymenttermPerPage);

	const handlePageChange = (paymenttermNumber) => {
		setCurrentPage(paymenttermNumber);
	};
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h3 className="mb-4">Manage Payment Term</h3>
								<div className="d-flex align-items-center">
									<span className="me-2">Search:</span>
									<input
										type="text"
										value={searchQuery}
										onChange={handleSearch}
										placeholder="Search Paymemt Term"
										className="form-control"
										style={{ width: "250px" }}
									/>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered">
									<thead>
										<tr>
											{/* <th>ID</th> */}
											<th>PaymentTerm Name</th>
											<th>Credit Note</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{/* {currency.length > 0 ? ( */}
										{/* currency.map((currency_manage) => ( */}
										{currentPaymentterm.length > 0 ? (
											currentPaymentterm.map((paymentterm_manage) => (
												<tr key={paymentterm_manage.paymentterm_id}>
													{/* <td>{currency_manage.currency_id}</td> */}
													<td>{paymentterm_manage.name}</td>
													<td>{paymentterm_manage.note}</td>
													<td>{paymentterm_manage.status || "Active"}</td>
													<td className="d-flex">
														<button
															className={`btn ${paymentterm_manage.status === "active" ? "btn-success me-2" : "btn-secondary"}`}
															onClick={() =>
																handleToggle(paymentterm_manage.paymentterms_id, paymentterm_manage.status)
															}
														>
															<i
																className={`fas ${paymentterm_manage.status === "active" ? "fa-check-circle" : "fa-times-circle"}`}
																title={paymentterm_manage.status === "active" ? "Deactivate" : "Activate"}
															></i>
														</button>

														<button className="btn btn-warning ms-1" onClick={() => handleEdit(paymentterm_manage)}>
															<i className="fas fa-edit" title="Edit"></i>
														</button>

														<button
															className="btn btn-danger ms-2"
															onClick={() => handleDelete(paymentterm_manage.paymentterms_id)}
														>
															<i className="fas fa-trash" title="Delete"></i>
														</button>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan="5" className="text-center">
													No Payment Term Found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination Controls */}
							<nav>
								<ul className="pagination justify-content-end">
									<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
										<button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
											Previous
										</button>
									</li>
									{Array.from({ length: totalPages }, (_, index) => (
										<li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
											<button className="page-link" onClick={() => handlePageChange(index + 1)}>
												{index + 1}
											</button>
										</li>
									))}
									<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
										<button
											className="page-link"
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											Next
										</button>
									</li>
								</ul>
							</nav>

							{/* edit modal */}
							<div
								className="modal fade"
								id="editModal"
								tabIndex="-1"
								role="dialog"
								aria-labelledby="editModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="editModalLabel">
												Edit Payment Term
											</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<form onSubmit={handleSave}>
											<div className="modal-body">
												<div className="form-group">
													<label htmlFor="currency">Payment Term Name</label>
													<input
														type="text"
														id="currency"
														className="form-control"
														value={formValue.name}
														onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
														required
													/>
												</div>
												<div className="form-group">
													<label htmlFor="note">Credit Note</label>
													<input
														type="text"
														id="note"
														className="form-control"
														value={formValue.note}
														onChange={(e) => setFormValue({ ...formValue, note: e.target.value })}
														required
													/>
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-secondary" data-dismiss="modal">
													Close
												</button>
												<button type="submit" className="btn btn-primary">
													Save changes
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
			<Afooter />
		</>
	);
}

export default ViewPaymentterm;
