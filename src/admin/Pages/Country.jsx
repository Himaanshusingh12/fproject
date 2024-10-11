import React, { useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import { Link } from "react-router-dom";

function Country() {
	const [country, setCountry] = useState("");

	const handleChange = (e) => {
		setCountry(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (country === "") {
			toast.error("Country field is required");
			return;
		}
		try {
			await axios.post(`${BACKEND_URL}/api/country`, { name: country });
			toast.success("Country added successfully");
			setCountry("");
		} catch (err) {
			toast.error("Error adding Country");
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
										<div className="card-header">
											<h3 className="card-title">Country</h3>
											<Link to="/view-country" className="btn btn-success ml-auto ms-5">
												View
											</Link>
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="country">Add Country</label>
													<input
														type="text"
														name="country"
														className="form-control"
														id="country"
														placeholder="Enter Country Name"
														value={country}
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

export default Country;
