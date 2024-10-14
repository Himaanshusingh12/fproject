import React, { useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function BusinessType() {
	const [businessType, setBusinessType] = useState("");

	const handleChange = (e) => {
		setBusinessType(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (businessType === "") {
			toast.error("Business Type field is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/business-types`, { name: businessType });
			toast.success("Business Type added successfully");
			setBusinessType("");
		} catch (err) {
			toast.error("Error adding Business Type");
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
											<h3 className="card-title">Business Types</h3>
											<Link to="/view-businesses" className="btn btn-success ml-auto">
												View Business Types
											</Link>
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="business_type">Add Business Type</label>
													<input
														type="text"
														name="business_type"
														className="form-control"
														id="Business_type"
														placeholder="Enter Business Type"
														value={businessType}
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

export default BusinessType;
