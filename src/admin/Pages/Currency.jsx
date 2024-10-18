import React, { useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { Link } from "react-router-dom";

function Currency() {
	const [currency, setCurrency] = useState("");

	const handleChange = (e) => {
		setCurrency(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currency === "") {
			toast.error("Currency field is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/currency`, { name: currency });
			toast.success("Currency added successfully");
			setCurrency("");
		} catch (err) {
			toast.error("Error adding Currency");
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
											<h3 className="card-title">Currency</h3>
											<Link to="/view-currency" className="btn btn-success ml-auto">
												View All Currency
											</Link>
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="currency">Add Currency</label>
													<input
														type="text"
														name="currency"
														className="form-control"
														id="currency"
														placeholder="Enter Currency Name"
														value={currency}
														onChange={handleChange}
													/>
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

export default Currency;
