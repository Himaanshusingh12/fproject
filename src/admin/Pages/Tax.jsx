import React, { useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import { Link } from "react-router-dom";

function Tax() {
	const [taxData, setTaxData] = useState({
		description: "",
		gst: "",
		pst: "",
		qst: "",
		hst: "",
		total: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaxData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (taxData.description === "") {
			toast.error("Description name is required");
			return;
		}
		if (taxData.gst === "") {
			toast.error("GST is required");
			return;
		}
		if (taxData.pst === "") {
			toast.error("PST is required");
			return;
		}
		if (taxData.qst === "") {
			toast.error("QST is required");
			return;
		}
		if (taxData.hst === "") {
			toast.error("HST is required");
			return;
		}
		if (taxData.total === "") {
			toast.error("Total is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/tax`, taxData);
			toast.success("Tax added successfully");
			setTaxData({
				description: "",
				gst: "",
				pst: "",
				qst: "",
				hst: "",
				total: "",
			});
		} catch (err) {
			toast.error("Error adding Tax");
			console.error(err);
		}
	};
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-6">
									<div className="card card-primary">
										<div className="card-header d-flex justify-content-between">
											<h3 className="card-title">Tax Rate</h3>
											<Link to="/view-tax" className="btn btn-success ml-auto">
												View All Taxes
											</Link>
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="Description">Description</label>
															<input
																type="text"
																name="description"
																className="form-control"
																id="description"
																placeholder="Enter description Name"
																value={taxData.description}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="gst">GST</label>
															<input
																type="number"
																name="gst"
																className="form-control"
																id="gst"
																placeholder="Enter GST"
																value={taxData.gst}
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="pst">PST</label>
															<input
																type="number"
																name="pst"
																className="form-control"
																id="pst"
																placeholder="Enter PST"
																value={taxData.pst}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="qst">QST</label>
															<input
																type="number"
																name="qst"
																className="form-control"
																id="qst"
																placeholder="Enter QST"
																value={taxData.qst}
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="hst">HST</label>
															<input
																type="number"
																name="hst"
																className="form-control"
																id="hst"
																placeholder="Enter HST"
																value={taxData.hst}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="total">Total</label>
															<input
																type="number"
																name="total"
																className="form-control"
																id="total"
																placeholder="Enter Total"
																value={taxData.total}
																onChange={handleChange}
															/>
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
								<div className="col-md-6" />
							</div>
						</div>
					</section>
				</div>
			</div>
			<Afooter />
		</>
	);
}

export default Tax;
