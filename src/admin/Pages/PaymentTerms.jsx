import React, { useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { Link } from "react-router-dom";

function PaymentTerms() {
	const [formValues, setFormValues] = useState({
		paymentterms: "",
		note: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { paymentterms, note } = formValues;

		if (paymentterms === "") {
			toast.error("Payment Terms field is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/paymentterms`, { name: paymentterms, note });
			toast.success("Payment terms added successfully");
			setFormValues({ paymentterms: "", note: "" });
		} catch (err) {
			toast.error("Error adding Payment terms");
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
											<h3 className="card-title">Payment Terms</h3>
											<Link to="/view-paymentterms" className="btn btn-success ml-auto">
												View All Payment Terms
											</Link>
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="paymentterms">Add Payment Terms</label>
													<input
														type="text"
														name="paymentterms"
														className="form-control"
														id="paymentterms"
														placeholder="Enter Payment terms"
														value={formValues.paymentterms}
														onChange={handleChange}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="note">Add Note</label>
													<textarea
														name="note"
														className="form-control"
														id="note"
														placeholder="Enter Note"
														value={formValues.note}
														onChange={handleChange}
													></textarea>
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

export default PaymentTerms;
