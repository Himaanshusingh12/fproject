// import React, { useEffect, useState } from "react";
// import Aheader from "../Components/Aheader";
// import Slidnav from "../Components/Slidnav";
// import Afooter from "../Components/Afooter";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BACKEND_URL } from "../../Constant";
// import { Link } from "react-router-dom";

// function CountryCode() {
// 	const [country, setCountry] = useState([]);
// 	const [formData, setFormData] = useState({
// 		country: "",
// 		country_code: "",
// 	});

// 	useEffect(() => {
// 		getCountry();
// 	}, []);

// 	// for get Active countries
// 	const getCountry = async () => {
// 		try {
// 			const response = await axios.get(`${BACKEND_URL}/api/country/active`);
// 			if (response.status === 200) {
// 				setCountry(response.data);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching Country:", error);
// 			toast.error("Failed to fetch Country");
// 		}
// 	};
// 	// Handle for input changes
// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prevState) => ({
// 			...prevState,
// 			[name]: value,
// 		}));
// 	};

// 	// Validation function
// 	const validateForm = () => {
// 		const { country, country_code } = formData;

// 		if (country === "") {
// 			toast.error("Country field is required");
// 			return false;
// 		}

// 		if (country_code === "") {
// 			toast.error("Country Code field is required");
// 			return false;
// 		}

// 		const countryCodePattern = /^[A-Z]{2}$/;
// 		if (!countryCodePattern.test(country_code)) {
// 			toast.error("Invalid country code Format.It should start with + followed by 1-3 digits.");
// 			return false;
// 		}

// 		return true;
// 	};

// 	// handleSubmit function
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		// Log form data
// 		console.log("Form Data:", formData);

// 		// Validate the form
// 		if (!validateForm()) {
// 			return;
// 		}

// 		try {
// 			const response = await axios.post(`${BACKEND_URL}/api/code`, {
// 				country_id: formData.country,
// 				code: formData.country_code,
// 			});

// 			// Log API response
// 			console.log("API Response:", response.data);

// 			toast.success("Country code added successfully");
// 			setFormData({
// 				country: "",
// 				country_code: "",
// 			});
// 		} catch (err) {
// 			toast.error("Error adding country code");
// 			console.error(err);
// 		}
// 	};

// 	return (
// 		<>
// 			<Aheader />
// 			<Slidnav />
// 			<div className="wrapper">
// 				<div className="content-wrapper">
// 					<section className="content mt-4">
// 						<div className="container-fluid">
// 							<div className="row">
// 								<div className="col-md-6">
// 									<div className="card card-primary">
// 										<div className="card-header d-flex justify-content-between">
// 											<h3 className="card-title">Country Code</h3>
// 											{/* <Link to="/view-province" className="btn btn-success ml-auto">
// 												View Province
// 											</Link> */}
// 										</div>
// 										<form id="quickForm" onSubmit={handleSubmit}>
// 											<div className="card-body">
// 												<div className="form-group">
// 													<label htmlFor="country">Select Country</label>
// 													<select
// 														type="text"
// 														name="country"
// 														id="country"
// 														value={formData.country}
// 														onChange={handleChange}
// 														className="form-control"
// 													>
// 														<option value="">Select Country</option>
// 														{country.map((type) => (
// 															<option key={type.id} value={type.id}>
// 																{type.name}
// 															</option>
// 														))}
// 													</select>
// 												</div>
// 												<div className="form-group mt-3">
// 													<label htmlFor="country_code">Add Code</label>
// 													<input
// 														type="text"
// 														name="country_code"
// 														id="country_code"
// 														className="form-control"
// 														value={formData.country_code}
// 														onChange={handleChange}
// 														placeholder="Enter Country Code"
// 													/>
// 												</div>
// 											</div>
// 											<div className="card-footer">
// 												<button type="submit" className="btn btn-primary">
// 													Submit
// 												</button>
// 											</div>
// 										</form>
// 									</div>
// 								</div>
// 								<div className="col-md-6" />
// 							</div>
// 						</div>
// 					</section>
// 				</div>
// 			</div>
// 			<Afooter />
// 		</>
// 	);
// }

// export default CountryCode;
