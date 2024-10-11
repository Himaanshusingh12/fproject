import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function Province() {
	const [country, setCountry] = useState([]);
	const [formData, setFormData] = useState({
		country: "",
		province: "",
	});

	useEffect(() => {
		getCountry();
	}, []);

	// for get Active countries
	const getCountry = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/country/active`);
			if (response.status === 200) {
				setCountry(response.data);
			}
		} catch (error) {
			console.error("Error fetching Country:", error);
			toast.error("Failed to fetch Country");
		}
	};
	// Handle for input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Validation function
	const validateForm = () => {
		const { country, province } = formData;

		if (country === "") {
			toast.error("Country field is required");
			return false;
		}

		if (province === "") {
			toast.error("Province field is required");
			return false;
		}

		return true;
	};

	// handleSubmit function
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate the form
		if (!validateForm()) {
			return;
		}

		try {
			await axios.post(`${BACKEND_URL}/api/province`, {
				country_name: formData.country,
				name: formData.province,
			});
			toast.success("Province added successfully");
			setFormData({
				country: "",
				province: "",
			});
		} catch (err) {
			toast.error("Error adding Province");
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
											<h3 className="card-title">Province</h3>
											{/* <Link to="/view-country" className="btn btn-success ml-auto ms-5"> View </Link> */}
										</div>
										<form id="quickForm" onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="country">Select Country</label>
													<select
														type="text"
														name="country"
														id="country"
														value={formData.country}
														onChange={handleChange}
														className="form-control"
													>
														<option value="">Select Country</option>
														{country.map((type) => (
															<option key={type.id} value={type.id}>
																{type.name}
															</option>
														))}
													</select>
												</div>
												<div className="form-group mt-3">
													<label htmlFor="province">Add Province</label>
													<input
														type="text"
														name="province"
														className="form-control"
														value={formData.province}
														onChange={handleChange}
														id="province"
														placeholder="Enter Province"
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

export default Province;
