import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";

function CreateCompany() {
	const [formData, setFormData] = useState({
		user_id: localStorage.getItem("userid") || "",
		company_name: "",
		operating_name: "",
		logo: "",
		business_type: "",
		country: "",
		country_code: "",
		province: "",
		city: "",
		postal_code: "",
		address_line_1: "",
		address_line_2: "",
		phone: "",
		email: "",
		website: "",
		business_no: "",
		corporate_tax_no: "",
		gst_no: "",
		pst_nos: "",
		fiscal_year: "",
		fiscal_year_to: "",
		home_currency: "",
		bank_transit_number: "",
		bank_institution_number: "",
		bank_account_number: "",
		bank_details: "",
		additional_notes: "",
	});

	const [activeSection, setActiveSection] = useState("company");
	const [companies, setCompanies] = useState([]);
	const [currentSection, setCurrentSection] = useState(0);
	const [companyId, setCompanyId] = useState(null);
	const [businessTypes, setBusinessTypes] = useState([]);
	const [currency, setCurrency] = useState([]);
	const [country, setCountry] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const sections = ["company", "contact", "tax", "fiscal", "notes"];

	useEffect(() => {
		getcompanies();
		getBusinessTypes();
		getCountry();
		getProvinces();
		getCurrency();
	}, []);

	// for get Active business types
	const getBusinessTypes = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/business-types/active`);
			if (response.status === 200) {
				setBusinessTypes(response.data);
			}
		} catch (error) {
			console.error("Error fetching business types:", error);
			toast.error("Failed to fetch business types");
		}
	};

	// for get Active Currency
	const getCurrency = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/currency/active`);
			if (response.status === 200) {
				setCurrency(response.data);
			}
		} catch (error) {
			console.error("Error fetching Currency:", error);
			toast.error("Failed to fetch Currency");
		}
	};
	// for get Active countries
	const getCountry = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/country/active`);
			if (response.status === 200) {
				setCountry(response.data);
				console.log(response.data);
			}
		} catch (error) {
			console.error("Error fetching Country:", error);
			toast.error("Failed to fetch Country");
		}
	};
	//for get Provinces
	const getProvinces = async (countryId) => {
		try {
			const response = await axios.get(`${BACKEND_URL}/api/provinces/${countryId}`);
			if (response.status === 200) {
				setProvinces(response.data);
			}
		} catch (error) {
			console.error("Error fetching provinces:", error);
			toast.error("Failed to fetch provinces");
		}
	};
	//for fetch companies
	const getcompanies = async () => {
		const userId = localStorage.getItem("userid");
		console.log("Retrieved userId:", userId);
		if (userId) {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/companies/${userId}`);
				if (response.status === 200) {
					console.log(response.data);
					setCompanies(response.data);
				}
			} catch (error) {
				console.error("Error Get Company", error);
				toast.error("Failed to Get Company");
			}
		}
	};
	// handlechange
	const handleChange = (e) => {
		let { name, value } = e.target;
		if (name === "country") {
			const country_code = country?.find((obj) => obj?.id == value)?.country_code;
			setFormData((prevForm) => ({ ...prevForm, country: value, country_code: country_code, province: "" }));
			getProvinces(value); // Fetch provinces for the selected country
		} else if (name === "fiscal_year_to") {
			setFormData((prevForm) => ({ ...prevForm, fiscal_year_to: value }));
		} else {
			setFormData((prevForm) => ({ ...prevForm, [name]: value }));
		}
	};

	const handleSectionClick = (section) => {
		setActiveSection(section);
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleNextClick = () => {
		if (currentSection < sections.length - 1) {
			setCurrentSection(currentSection + 1);
			handleSectionClick(sections[currentSection + 1]);
		}
	};

	const handleEditCompany = (company) => {
		setFormData({
			user_id: localStorage.getItem("userid"),
			company_name: company.company_name,
			operating_name: company.operating_name,
			logo: company.logo,
			business_type: company.business_type,
			country: company.country,
			province: company.province,
			city: company.city,
			postal_code: company.postal_code,
			address_line_1: company.address_line_1,
			address_line_2: company.address_line_2,
			phone: company.phone,
			email: company.email,
			website: company.website,
			business_no: company.business_no,
			corporate_tax_no: company.corporate_tax_no,
			gst_no: company.gst_no,
			pst_nos: company.pst_nos,
			fiscal_year: company.fiscal_year,
			fiscal_year_to: company.fiscal_year_to,
			home_currency: company.home_currency,
			bank_transit_number: company.bank_transit_number,
			bank_institution_number: company.bank_institution_number,
			bank_account_number: company.bank_account_number,
			bank_details: company.bank_details,
			additional_notes: company.additional_notes,
		});
		setActiveSection("company");
		setCompanyId(company.company_id);
		setIsEditing(true);
	};

	// validation
	const validation = () => {
		let result = true;
		if (formData.company_name === "") {
			toast.error("Company Name field is required");
			result = false;
		} else if (formData.company_name.length < 3) {
			toast.error("Company Name must be at least 3 character");
			result = false;
		}
		if (formData.operating_name === "") {
			toast.error("Operating Name field is required");
			result = false;
		}
		if (formData.country === "") {
			toast.error("Country field is required");
			result = false;
		}
		if (formData.province === "") {
			toast.error("Province field is required");
			result = false;
		}
		if (formData.city === "") {
			toast.error("City field is required");
			result = false;
		}
		if (formData.postal_code === "") {
			toast.error("Postal Code field is required");
			result = false;
		}
		if (formData.address_line_1 === "") {
			toast.error("Address Line 1 field is required");
			result = false;
		}
		if (formData.phone === "") {
			toast.error("Phone field is required");
			result = false;
		}
		if (formData.email === "") {
			toast.error("Email field is required");
			result = false;
		} else if (!formData.email.includes("@")) {
			toast.error("Invalid Email. Please include '@' in your email.");
			result = false;
		}
		if (formData.website === "") {
			toast.error("Website field is required");
			result = false;
		} else if (!/^https?:\/\//i.test(formData.website)) {
			toast.error("Website must start with http:// or https://");
			result = false;
		}
		if (formData.business_no === "") {
			toast.error("Business No. field is required");
			result = false;
		}
		if (formData.corporate_tax_no === "") {
			toast.error("Corporate Tax No. field is required");
			result = false;
		}
		if (formData.gst_no === "") {
			toast.error("GST No. field is required");
			result = false;
		}
		if (formData.pst_nos === "") {
			toast.error("PST Nos. field is required");
			result = false;
		}
		if (formData.fiscal_year === "") {
			toast.error("Fiscal Year field is required");
			result = false;
		}
		if (formData.fiscal_year_to === "") {
			toast.error("Fiscal Year To field is required");
			result = false;
		}
		if (formData.home_currency === "") {
			toast.error("Home Currency field is required");
			result = false;
		}
		if (formData.bank_transit_number === "") {
			toast.error("Bank Transit Number field is required");
			result = false;
		} else if (!/^\d{5}$/.test(formData.bank_transit_number)) {
			toast.error("Transit Number must be a 5-digit number");
			result = false;
		}
		if (formData.bank_institution_number === "") {
			toast.error("Bank Institution Number field is required");
			result = false;
		} else if (!/^\d{3}$/.test(formData.bank_institution_number)) {
			toast.error("Institution Number must be a 3-digit number");
			result = false;
		}

		if (formData.bank_account_number === "") {
			toast.error("Bank Account Number field is required");
			result = false;
		}

		if (formData.bank_details === "") {
			toast.error("Bank Details field is required");
			result = false;
		}
		if (formData.additional_notes === "") {
			toast.error("Additional Notes field is required");
			result = false;
		}
		return result;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validation()) {
			return;
		}
		const userId = localStorage.getItem("userid");
		if (!userId) {
			toast.error("User ID is required to create a company.");
			return;
		}
		if (isEditing) {
			try {
				await axios.put(`${BACKEND_URL}/api/companies/${companyId}`, formData);
				toast.success("Company updated successfully!");
				setIsEditing(false);
				setCompanyId(null);
				setFormData({
					company_name: "",
					operating_name: "",
					logo: "",
					business_type: "",
					country: "",
					province: "",
					city: "",
					postal_code: "",
					address_line_1: "",
					address_line_2: "",
					phone: "",
					email: "",
					website: "",
					business_no: "",
					corporate_tax_no: "",
					gst_no: "",
					pst_nos: "",
					fiscal_year: "",
					fiscal_year_to: "",
					home_currency: "",
					bank_transit_number: "",
					bank_institution_number: "",
					bank_account_number: "",
					bank_details: "",
					additional_notes: "",
				});
			} catch (error) {
				toast.error("Failed to update company");
			}
		} else {
			try {
				await axios.post(`${BACKEND_URL}/api/companies`, formData);
				toast.success("Company added successfully!");
				setFormData({
					company_name: "",
					operating_name: "",
					logo: "",
					business_type: "",
					country: "",
					province: "",
					city: "",
					postal_code: "",
					address_line_1: "",
					address_line_2: "",
					phone: "",
					email: "",
					website: "",
					business_no: "",
					corporate_tax_no: "",
					gst_no: "",
					pst_nos: "",
					fiscal_year: "",
					fiscal_year_to: "",
					home_currency: "",
					bank_transit_number: "",
					bank_institution_number: "",
					bank_account_number: "",
					bank_details: "",
					additional_notes: "",
				});
			} catch (error) {
				toast.error("Failed to add company");
			}
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-4">
						<div className="row">
							{/* Sidebar for section names */}
							<div className="col-md-3">
								<h4 className="mb-3">Manage Profile</h4>
								<div className="list-group">
									{sections.map((section) => (
										<button
											key={section}
											className={`list-group-item list-group-item-action ${activeSection === section ? "active" : ""}`}
											onClick={() => handleSectionClick(section)}
										>
											{section.charAt(0).toUpperCase() + section.slice(1)} Information
										</button>
									))}
									<button
										className={`list-group-item list-group-item-action ${activeSection === "businesses" ? "active" : ""}`}
										onClick={() => handleSectionClick("businesses")}
									>
										Businesses
									</button>
								</div>
							</div>

							{/* Form section */}
							<div
								className="col-md-9"
								style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
							>
								<form onSubmit={handleSubmit}>
									{activeSection === "company" && (
										<div className="mb-4">
											<h4>Company Information</h4>
											<div className="mb-3">
												<label htmlFor="company_name">Company Name</label>
												<input
													type="text"
													name="company_name"
													id="company_name"
													value={formData.company_name}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Company Name"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="operating_name">Operating Name</label>
												<input
													type="text"
													name="operating_name"
													id="operating_name"
													value={formData.operating_name}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Operating Name"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="logo">Logo</label>
												<input
													type="text"
													name="logo"
													id="logo"
													value={formData.logo}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Logo URL"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="business_type">Business Type</label>
												<select
													type="text"
													name="business_type"
													id="business_type"
													value={formData.business_type}
													onChange={handleChange}
													className="form-control"
												>
													<option value="">Select Business Type</option>
													{businessTypes.map((type) => (
														<option key={type.id} value={type.id}>
															{type.name}
														</option>
													))}
												</select>
												<small className="form-text text-muted">Select the type of business you are operating.</small>
											</div>
											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
												Next
											</button>
										</div>
									)}

									{activeSection === "contact" && (
										<div className="mb-4">
											<h4>Contact Information</h4>
											<div className="row">
												<div className="col-md-6 mb-3">
													<label htmlFor="country">Country</label>
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

												<div className="col-md-6 mb-3">
													<label htmlFor="province">Province</label>
													<select
														type="text"
														name="province"
														id="province"
														value={formData.province}
														onChange={handleChange}
														className="form-control"
													>
														<option value="">Select Province</option>
														{provinces.map((province) => (
															<option key={province.id} value={province.id}>
																{province.province_name}
															</option>
														))}
													</select>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="city">City</label>
													<input
														type="text"
														name="city"
														id="city"
														value={formData.city}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter City"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="postal_code">Postal Code</label>
													<input
														type="text"
														name="postal_code"
														id="postal_code"
														value={formData.postal_code}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Postal Code"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="address_line_1">Address Line 1</label>
													<input
														type="text"
														name="address_line_1"
														id="address_line_1"
														value={formData.address_line_1}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Address Line 1"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="address_line_2">Address Line 2</label>
													<input
														type="text"
														name="address_line_2"
														id="address_line_2"
														value={formData.address_line_2}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Address Line 2"
													/>
												</div>

												<div className="col-md-6 mb-3">
													<label htmlFor="phone">Phone</label>

													<div class="input-group">
														{/* <span>{formData?.country_code}</span> */}
														<div class="input-group-prepend">
															<span class="input-group-text" id="basic-addon1">
																{formData?.country_code}
															</span>
														</div>
														<input
															type="text"
															name="phone"
															id="phone"
															value={formData.phone}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Phone"
														/>
													</div>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														name="email"
														id="email"
														value={formData.email}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Email"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="website">Website</label>
													<input
														type="text"
														name="website"
														id="website"
														value={formData.website}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Website"
													/>
												</div>
											</div>
											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
												Next
											</button>
										</div>
									)}

									{activeSection === "tax" && (
										<div className="mb-4">
											<h4>Tax Information</h4>
											<div className="mb-3">
												<label htmlFor="business_no">Business Number</label>
												<input
													type="text"
													name="business_no"
													id="business_no"
													value={formData.business_no}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Business Number"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="corporate_tax_no">Corporate Tax Registration Number</label>
												<input
													type="text"
													name="corporate_tax_no"
													id="corporate_tax_no"
													value={formData.corporate_tax_no}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Corporate Tax Registration Number"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="gst_no">GST Registration Number</label>
												<input
													type="text"
													name="gst_no"
													id="gst_no"
													value={formData.gst_no}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter GST Registration Number"
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="pst_nos">PST Numbers</label>
												<textarea
													name="pst_nos"
													id="pst_nos"
													value={formData.pst_nos}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter PST Numbers"
												/>
											</div>
											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
												Next
											</button>
										</div>
									)}

									{activeSection === "fiscal" && (
										<div className="mb-4">
											<h4>Fiscal Information</h4>
											<div className="mb-3">
												<label htmlFor="fiscal_year">Fiscal Year (From - To)</label>
												<div className="row">
													<div className="col-md-6">
														<input
															type="date"
															name="fiscal_year"
															id="fiscal_year"
															value={formData.fiscal_year}
															onChange={handleChange}
															className="form-control"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="date"
															name="fiscal_year_to"
															id="fiscal_year_to"
															value={formData.fiscal_year_to}
															onChange={handleChange}
															className="form-control"
														/>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6 mb-3">
													<label htmlFor="home_currency">Home Currency</label>
													<select
														type="text"
														name="home_currency"
														id="home_currency"
														value={formData.home_currency}
														onChange={handleChange}
														className="form-control"
													>
														<option value="">Select Currency</option>
														{currency.map((type) => (
															<option key={type.id} value={type.id}>
																{type.name}
															</option>
														))}
													</select>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="bank_transit_number">Bank Transit Number</label>
													<input
														type="text"
														name="bank_transit_number"
														id="bank_transit_number"
														value={formData.bank_transit_number}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Transit Number"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6 mb-3">
													<label htmlFor="bank_institution_number">Bank Institution Number</label>
													<input
														type="text"
														name="bank_institution_number"
														id="bank_institution_number"
														value={formData.bank_institution_number}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Institution Number"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="bank_account_number">Bank Account Number</label>
													<input
														type="text"
														name="bank_account_number"
														id="bank_account_number"
														value={formData.bank_account_number}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Account Number"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6 mb-3">
													<label htmlFor="bank_details">Bank Details</label>
													<textarea
														name="bank_details"
														id="bank_details"
														value={formData.bank_details}
														onChange={handleChange}
														className="form-control"
														placeholder="Enter Bank Details "
													/>
												</div>
											</div>

											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
												Next
											</button>
										</div>
									)}

									{activeSection === "notes" && (
										<div className="mb-4">
											<h4>Additional Notes</h4>
											<div className="mb-3">
												<label htmlFor="additional_notes">Additional Notes</label>
												<textarea
													name="additional_notes"
													id="additional_notes"
													value={formData.additional_notes}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Additional Notes"
												/>
											</div>
											<button type="submit" className="btn btn-primary">
												Submit
											</button>
										</div>
									)}

									{/* Businesses Section */}
									{activeSection === "businesses" && (
										<div className="mb-4">
											<h4>Businesses</h4>
											{companies.length > 0 ? (
												<table className="table table-striped">
													<thead>
														<tr>
															<th>Company ID</th>
															<th>Company Name</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{companies.map((company) => (
															<tr key={company.company_id}>
																<td>{company.company_id}</td>
																<td>{company.company_name}</td>
																<td>
																	<button className="btn btn-primary" onClick={() => handleEditCompany(company)}>
																		Edit
																	</button>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											) : (
												<p>No companies created yet.</p>
											)}
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default CreateCompany;

//from here
// import React, { useEffect, useState } from "react";
// import Bheader from "../Components/Bheader";
// import BSlidnav from "../Components/BSlidnav";
// import Bfooter from "../Components/Bfooter";
// import { toast } from "react-toastify";
// import { BACKEND_URL } from "../../Constant";
// import axios from "axios";

// function CreateCompany() {
// 	const [formData, setFormData] = useState({
// 		user_id: localStorage.getItem("userid") || "",
// 		company_name: "",
// 		operating_name: "",
// 		logo: null,
// 		business_type: "",
// 		country: "",
// 		province: "",
// 		city: "",
// 		postal_code: "",
// 		address_line_1: "",
// 		address_line_2: "",
// 		phone: "",
// 		email: "",
// 		website: "",
// 		business_no: "",
// 		corporate_tax_no: "",
// 		gst_no: "",
// 		pst_nos: "",
// 		fiscal_year: "",
// 		fiscal_year_to: "",
// 		home_currency: "",
// 		bank_transit_number: "",
// 		bank_institution_number: "",
// 		bank_account_number: "",
// 		bank_details: "",
// 		additional_notes: "",
// 	});

// 	const [activeSection, setActiveSection] = useState("company");
// 	const [companies, setCompanies] = useState([]);
// 	const [currentSection, setCurrentSection] = useState(0);
// 	const [companyId, setCompanyId] = useState(null);
// 	const [businessTypes, setBusinessTypes] = useState([]);
// 	const [country, setCountry] = useState([]);
// 	const [provinces, setProvinces] = useState([]); //this
// 	const [isEditing, setIsEditing] = useState(false);
// 	const sections = ["company", "contact", "tax", "fiscal", "notes"];

// 	useEffect(() => {
// 		getcompanies();
// 		getBusinessTypes();
// 		getCountry();
// 		getProvinces(); //this
// 	}, []);

// 	// for get Active business types
// 	const getBusinessTypes = async () => {
// 		try {
// 			const response = await axios.get(`${BACKEND_URL}/api/business-types/active`);
// 			if (response.status === 200) {
// 				setBusinessTypes(response.data);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching business types:", error);
// 			toast.error("Failed to fetch business types");
// 		}
// 	};
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

// 	//for get Provinces
// 	const getProvinces = async (countryId) => {
// 		try {
// 			const response = await axios.get(`${BACKEND_URL}/api/provinces/${countryId}`);
// 			if (response.status === 200) {
// 				setProvinces(response.data);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching provinces:", error);
// 			toast.error("Failed to fetch provinces");
// 		}
// 	};

// 	//for fetch companies
// 	const getcompanies = async () => {
// 		const userId = localStorage.getItem("userid");
// 		console.log("Retrieved userId:", userId); //
// 		if (userId) {
// 			try {
// 				const response = await axios.get(`${BACKEND_URL}/api/companies/${userId}`);
// 				if (response.status === 200) {
// 					console.log(response.data);
// 					setCompanies(response.data);
// 				}
// 			} catch (error) {
// 				console.error("Error Get Company", error);
// 				toast.error("Failed to Get Company");
// 			}
// 		}
// 	};
// 	// new handlechange
// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		if (name === "country") {
// 			setFormData((prevForm) => ({ ...prevForm, country: value, province: "" }));
// 			getProvinces(value); // Fetch provinces for the selected country
// 		} else if (name === "fiscal_year_to") {
// 			setFormData((prevForm) => ({ ...prevForm, fiscal_year_to: value }));
// 		} else {
// 			setFormData((prevForm) => ({ ...prevForm, [name]: value }));
// 		}
// 	};

// 	// Handle file upload for logo
// 	const handleLogoChange = (e) => {
// 		const file = e.target.files[0]; // Get the uploaded file

// 		if (file) {
// 			// Optionally validate file type
// 			const validTypes = ["image/jpeg", "image/png", "image/gif"];
// 			if (!validTypes.includes(file.type)) {
// 				alert("Please upload a valid image file (jpeg, png, gif).");
// 				return;
// 			}

// 			// Create a preview URL for the uploaded image
// 			const previewUrl = URL.createObjectURL(file);

// 			// Update formData with the file and preview URL
// 			setFormData({
// 				...formData,
// 				logo: file, // Store the uploaded file
// 				logoPreview: previewUrl, // Store the preview URL
// 			});
// 		}
// 	};

// 	const handleSectionClick = (section) => {
// 		setActiveSection(section);
// 		const element = document.getElementById(section);
// 		if (element) {
// 			element.scrollIntoView({ behavior: "smooth" });
// 		}
// 	};

// 	const handleNextClick = () => {
// 		if (currentSection < sections.length - 1) {
// 			setCurrentSection(currentSection + 1);
// 			handleSectionClick(sections[currentSection + 1]);
// 		}
// 	};

// 	const handleEditCompany = (company) => {
// 		setFormData({
// 			user_id: localStorage.getItem("userid"),
// 			company_name: company.company_name,
// 			operating_name: company.operating_name,
// 			logo: company.logo,
// 			business_type: company.business_type,
// 			country: company.country,
// 			province: company.province,
// 			city: company.city,
// 			postal_code: company.postal_code,
// 			address_line_1: company.address_line_1,
// 			address_line_2: company.address_line_2,
// 			phone: company.phone,
// 			email: company.email,
// 			website: company.website,
// 			business_no: company.business_no,
// 			corporate_tax_no: company.corporate_tax_no,
// 			gst_no: company.gst_no,
// 			pst_nos: company.pst_nos,
// 			fiscal_year: company.fiscal_year,
// 			fiscal_year_to: company.fiscal_year_to,
// 			home_currency: company.home_currency,
// 			bank_transit_number: company.bank_transit_number,
// 			bank_institution_number: company.bank_institution_number,
// 			bank_account_number: company.bank_account_number,
// 			bank_details: company.bank_details,
// 			additional_notes: company.additional_notes,
// 		});
// 		setActiveSection("company");
// 		setCompanyId(company.company_id);
// 		setIsEditing(true);
// 	};

// 	// validation
// 	const validation = () => {
// 		let result = true;
// 		if (formData.company_name === "") {
// 			toast.error("Company Name field is required");
// 			result = false;
// 		} else if (formData.company_name.length < 3) {
// 			toast.error("Company Name must be at least 3 character");
// 			result = false;
// 		}
// 		if (formData.operating_name === "") {
// 			toast.error("Operating Name field is required");
// 			result = false;
// 		}
// 		if (formData.country === "") {
// 			toast.error("Country field is required");
// 			result = false;
// 		}
// 		if (formData.province === "") {
// 			toast.error("Province field is required");
// 			result = false;
// 		}
// 		if (formData.city === "") {
// 			toast.error("City field is required");
// 			result = false;
// 		}
// 		if (formData.postal_code === "") {
// 			toast.error("Postal Code field is required");
// 			result = false;
// 		}
// 		if (formData.address_line_1 === "") {
// 			toast.error("Address Line 1 field is required");
// 			result = false;
// 		}
// 		if (formData.phone === "") {
// 			toast.error("Phone field is required");
// 			result = false;
// 		}
// 		if (formData.email === "") {
// 			toast.error("Email field is required");
// 			result = false;
// 		} else if (!formData.email.includes("@")) {
// 			toast.error("Invalid Email. Please include '@' in your email.");
// 			result = false;
// 		}
// 		if (formData.website === "") {
// 			toast.error("Website field is required");
// 			result = false;
// 		} else if (!/^https?:\/\//i.test(formData.website)) {
// 			toast.error("Website must start with http:// or https://");
// 			result = false;
// 		}
// 		if (formData.business_no === "") {
// 			toast.error("Business No. field is required");
// 			result = false;
// 		}
// 		if (formData.corporate_tax_no === "") {
// 			toast.error("Corporate Tax No. field is required");
// 			result = false;
// 		}
// 		if (formData.gst_no === "") {
// 			toast.error("GST No. field is required");
// 			result = false;
// 		}
// 		if (formData.pst_nos === "") {
// 			toast.error("PST Nos. field is required");
// 			result = false;
// 		}
// 		if (formData.fiscal_year === "") {
// 			toast.error("Fiscal Year field is required");
// 			result = false;
// 		}
// 		if (formData.fiscal_year_to === "") {
// 			toast.error("Fiscal Year To field is required");
// 			result = false;
// 		}
// 		if (formData.home_currency === "") {
// 			toast.error("Home Currency field is required");
// 			result = false;
// 		}
// 		if (formData.bank_transit_number === "") {
// 			toast.error("Bank Transit Number field is required");
// 			result = false;
// 		} else if (!/^\d{5}$/.test(formData.bank_transit_number)) {
// 			toast.error("Transit Number must be a 5-digit number");
// 			result = false;
// 		}
// 		if (formData.bank_institution_number === "") {
// 			toast.error("Bank Institution Number field is required");
// 			result = false;
// 		} else if (!/^\d{3}$/.test(formData.bank_institution_number)) {
// 			toast.error("Institution Number must be a 3-digit number");
// 			result = false;
// 		}

// 		if (formData.bank_account_number === "") {
// 			toast.error("Bank Account Number field is required");
// 			result = false;
// 		}

// 		if (formData.bank_details === "") {
// 			toast.error("Bank Details field is required");
// 			result = false;
// 		}
// 		if (formData.additional_notes === "") {
// 			toast.error("Additional Notes field is required");
// 			result = false;
// 		}
// 		return result;
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!validation()) {
// 			return;
// 		}
// 		const userId = localStorage.getItem("userid");
// 		if (!userId) {
// 			toast.error("User ID is required to create a company.");
// 			return;
// 		}

// 		const formDataToSubmit = new FormData(); // Create FormData instance

// 		// Append all form data to the FormData instance
// 		Object.keys(formData).forEach((key) => {
// 			formDataToSubmit.append(key, formData[key]);
// 		});

// 		// Check if logo is a valid file before appending
// 		if (formData.logo) {
// 			formDataToSubmit.append("logo", formData.logo); // Append the logo file
// 		} else {
// 			console.error("No logo file to append");
// 		}
// 		if (isEditing) {
// 			try {
// 				await axios.put(`${BACKEND_URL}/api/companies/${companyId}`, formDataToSubmit, {
// 					headers: {
// 						"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
// 					},
// 				});
// 				toast.success("Company updated successfully!");
// 				setIsEditing(false);
// 				setCompanyId(null);
// 				setFormData({
// 					company_name: "",
// 					operating_name: "",
// 					logo: null,
// 					business_type: "",
// 					country: "",
// 					province: "",
// 					city: "",
// 					postal_code: "",
// 					address_line_1: "",
// 					address_line_2: "",
// 					phone: "",
// 					email: "",
// 					website: "",
// 					business_no: "",
// 					corporate_tax_no: "",
// 					gst_no: "",
// 					pst_nos: "",
// 					fiscal_year: "",
// 					fiscal_year_to: "",
// 					home_currency: "",
// 					bank_transit_number: "",
// 					bank_institution_number: "",
// 					bank_account_number: "",
// 					bank_details: "",
// 					additional_notes: "",
// 				});
// 			} catch (error) {
// 				toast.error("Failed to update company");
// 			}
// 		} else {
// 			try {
// 				await axios.post(`${BACKEND_URL}/api/companies`, formData);
// 				toast.success("Company added successfully!");
// 				setFormData({
// 					company_name: "",
// 					operating_name: "",
// 					logo: null,
// 					business_type: "",
// 					country: "",
// 					province: "",
// 					city: "",
// 					postal_code: "",
// 					address_line_1: "",
// 					address_line_2: "",
// 					phone: "",
// 					email: "",
// 					website: "",
// 					business_no: "",
// 					corporate_tax_no: "",
// 					gst_no: "",
// 					pst_nos: "",
// 					fiscal_year: "",
// 					fiscal_year_to: "",
// 					home_currency: "",
// 					bank_transit_number: "",
// 					bank_institution_number: "",
// 					bank_account_number: "",
// 					bank_details: "",
// 					additional_notes: "",
// 				});
// 			} catch (error) {
// 				toast.error("Failed to add company");
// 			}
// 		}
// 	};

// 	return (
// 		<>
// 			<Bheader />
// 			<BSlidnav />
// 			<div className="wrapper">
// 				<div className="content-wrapper">
// 					<div className="container mt-4">
// 						<div className="row">
// 							{/* Sidebar for section names */}
// 							<div className="col-md-3">
// 								<h4 className="mb-3">Manage Profile</h4>
// 								<div className="list-group">
// 									{sections.map((section) => (
// 										<button
// 											key={section}
// 											className={`list-group-item list-group-item-action ${activeSection === section ? "active" : ""}`}
// 											onClick={() => handleSectionClick(section)}
// 										>
// 											{section.charAt(0).toUpperCase() + section.slice(1)} Information
// 										</button>
// 									))}
// 									<button
// 										className={`list-group-item list-group-item-action ${activeSection === "businesses" ? "active" : ""}`}
// 										onClick={() => handleSectionClick("businesses")}
// 									>
// 										Businesses
// 									</button>
// 								</div>
// 							</div>

// 							{/* Form section */}
// 							<div
// 								className="col-md-9"
// 								style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
// 							>
// 								<form onSubmit={handleSubmit}>
// 									{activeSection === "company" && (
// 										<div className="mb-4">
// 											<h4>Company Information</h4>
// 											<div className="mb-3">
// 												<label htmlFor="company_name">Company Name</label>
// 												<input
// 													type="text"
// 													name="company_name"
// 													id="company_name"
// 													value={formData.company_name}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter Company Name"
// 												/>
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="operating_name">Operating Name</label>
// 												<input
// 													type="text"
// 													name="operating_name"
// 													id="operating_name"
// 													value={formData.operating_name}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter Operating Name"
// 												/>
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="logo">Logo</label>
// 												<input
// 													type="file"
// 													name="logo"
// 													id="logo"
// 													accept="image/*"
// 													onChange={handleLogoChange}
// 													className="form-control"
// 												/>
// 												{formData.logoPreview && (
// 													<div className="mt-2">
// 														<img
// 															src={formData.logoPreview}
// 															alt="Logo Preview"
// 															style={{ maxWidth: "200px", maxHeight: "100px" }}
// 														/>
// 													</div>
// 												)}
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="business_type">Business Type</label>
// 												<select
// 													type="text"
// 													name="business_type"
// 													id="business_type"
// 													value={formData.business_type}
// 													onChange={handleChange}
// 													className="form-control"
// 												>
// 													<option value="">Select Business Type</option>
// 													{businessTypes.map((type) => (
// 														<option key={type.id} value={type.id}>
// 															{type.name}
// 														</option>
// 													))}
// 												</select>
// 												<small className="form-text text-muted">Select the type of business you are operating.</small>
// 											</div>
// 											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
// 												Next
// 											</button>
// 										</div>
// 									)}

// 									{activeSection === "contact" && (
// 										<div className="mb-4">
// 											<h4>Contact Information</h4>
// 											<div className="row">
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="country">Country</label>
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
// 													{/* <small className="form-text text-muted">
// 														Your country selection is essential for determining currency and taxation details.
// 													</small> */}
// 												</div>

// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="province">Province</label>
// 													<select
// 														type="text"
// 														name="province"
// 														id="province"
// 														value={formData.province}
// 														onChange={handleChange}
// 														className="form-control"
// 													>
// 														<option value="">Select Province</option>
// 														{provinces.map((province) => (
// 															<option key={province.id} value={province.id}>
// 																{province.province_name}
// 															</option>
// 														))}
// 													</select>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="city">City</label>
// 													<input
// 														type="text"
// 														name="city"
// 														id="city"
// 														value={formData.city}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter City"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="postal_code">Postal Code</label>
// 													<input
// 														type="text"
// 														name="postal_code"
// 														id="postal_code"
// 														value={formData.postal_code}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Postal Code"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="address_line_1">Address Line 1</label>
// 													<input
// 														type="text"
// 														name="address_line_1"
// 														id="address_line_1"
// 														value={formData.address_line_1}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Address Line 1"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="address_line_2">Address Line 2</label>
// 													<input
// 														type="text"
// 														name="address_line_2"
// 														id="address_line_2"
// 														value={formData.address_line_2}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Address Line 2"
// 													/>
// 												</div>

// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="phone">Phone</label>
// 													<input
// 														type="text"
// 														name="phone"
// 														id="phone"
// 														value={formData.phone}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Phone"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="email">Email</label>
// 													<input
// 														type="email"
// 														name="email"
// 														id="email"
// 														value={formData.email}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Email"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="website">Website</label>
// 													<input
// 														type="text"
// 														name="website"
// 														id="website"
// 														value={formData.website}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Website"
// 													/>
// 												</div>
// 											</div>
// 											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
// 												Next
// 											</button>
// 										</div>
// 									)}

// 									{activeSection === "tax" && (
// 										<div className="mb-4">
// 											<h4>Tax Information</h4>
// 											<div className="mb-3">
// 												<label htmlFor="business_no">Business Number</label>
// 												<input
// 													type="text"
// 													name="business_no"
// 													id="business_no"
// 													value={formData.business_no}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter Business Number"
// 												/>
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="corporate_tax_no">Corporate Tax Registration Number</label>
// 												<input
// 													type="text"
// 													name="corporate_tax_no"
// 													id="corporate_tax_no"
// 													value={formData.corporate_tax_no}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter Corporate Tax Registration Number"
// 												/>
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="gst_no">GST Registration Number</label>
// 												<input
// 													type="text"
// 													name="gst_no"
// 													id="gst_no"
// 													value={formData.gst_no}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter GST Registration Number"
// 												/>
// 											</div>
// 											<div className="mb-3">
// 												<label htmlFor="pst_nos">PST Numbers</label>
// 												<textarea
// 													name="pst_nos"
// 													id="pst_nos"
// 													value={formData.pst_nos}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter PST Numbers"
// 												/>
// 											</div>
// 											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
// 												Next
// 											</button>
// 										</div>
// 									)}

// 									{activeSection === "fiscal" && (
// 										<div className="mb-4">
// 											<h4>Fiscal Information</h4>
// 											<div className="mb-3">
// 												<label htmlFor="fiscal_year">Fiscal Year (From - To)</label>
// 												<div className="row">
// 													<div className="col-md-6">
// 														<input
// 															type="date"
// 															name="fiscal_year"
// 															id="fiscal_year"
// 															value={formData.fiscal_year}
// 															onChange={handleChange}
// 															className="form-control"
// 														/>
// 													</div>
// 													<div className="col-md-6">
// 														<input
// 															type="date"
// 															name="fiscal_year_to"
// 															id="fiscal_year_to"
// 															value={formData.fiscal_year_to}
// 															onChange={handleChange}
// 															className="form-control"
// 														/>
// 													</div>
// 												</div>
// 											</div>

// 											<div className="row">
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="home_currency">Home Currency</label>
// 													<select
// 														name="home_currency"
// 														id="home_currency"
// 														value={formData.home_currency}
// 														onChange={handleChange}
// 														className="form-control"
// 													>
// 														<option value="">Select Currency</option>
// 														<option value="USD">USD</option>
// 														<option value="EUR">EUR</option>
// 														<option value="GBP">GBP</option>
// 														<option value="INR">INR</option>
// 														<option value="AUD">AUD</option>
// 														<option value="CAD">CAD</option>
// 														<option value="JPY">JPY</option>
// 														<option value="CNY">CNY</option>
// 														<option value="Other">Other</option>
// 													</select>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="bank_transit_number">Bank Transit Number</label>
// 													<input
// 														type="text"
// 														name="bank_transit_number"
// 														id="bank_transit_number"
// 														value={formData.bank_transit_number}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Transit Number"
// 													/>
// 												</div>
// 											</div>

// 											<div className="row">
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="bank_institution_number">Bank Institution Number</label>
// 													<input
// 														type="text"
// 														name="bank_institution_number"
// 														id="bank_institution_number"
// 														value={formData.bank_institution_number}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Institution Number"
// 													/>
// 												</div>
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="bank_account_number">Bank Account Number</label>
// 													<input
// 														type="text"
// 														name="bank_account_number"
// 														id="bank_account_number"
// 														value={formData.bank_account_number}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Account Number"
// 													/>
// 												</div>
// 											</div>

// 											<div className="row">
// 												<div className="col-md-6 mb-3">
// 													<label htmlFor="bank_details">Bank Details</label>
// 													<textarea
// 														name="bank_details"
// 														id="bank_details"
// 														value={formData.bank_details}
// 														onChange={handleChange}
// 														className="form-control"
// 														placeholder="Enter Bank Details "
// 													/>
// 												</div>
// 											</div>

// 											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
// 												Next
// 											</button>
// 										</div>
// 									)}

// 									{activeSection === "notes" && (
// 										<div className="mb-4">
// 											<h4>Additional Notes</h4>
// 											<div className="mb-3">
// 												<label htmlFor="additional_notes">Additional Notes</label>
// 												<textarea
// 													name="additional_notes"
// 													id="additional_notes"
// 													value={formData.additional_notes}
// 													onChange={handleChange}
// 													className="form-control"
// 													placeholder="Enter Additional Notes"
// 												/>
// 											</div>
// 											<button type="submit" className="btn btn-primary">
// 												Submit
// 											</button>
// 										</div>
// 									)}

// 									{/* Businesses Section */}
// 									{activeSection === "businesses" && (
// 										<div className="mb-4">
// 											<h4>Businesses</h4>
// 											{companies.length > 0 ? (
// 												<table className="table table-striped">
// 													<thead>
// 														<tr>
// 															<th>Company ID</th>
// 															<th>Company Name</th>
// 															<th>Actions</th>
// 														</tr>
// 													</thead>
// 													<tbody>
// 														{companies.map((company) => (
// 															<tr key={company.company_id}>
// 																<td>{company.company_id}</td>
// 																<td>{company.company_name}</td>
// 																<td>
// 																	<button className="btn btn-primary" onClick={() => handleEditCompany(company)}>
// 																		Edit
// 																	</button>
// 																</td>
// 															</tr>
// 														))}
// 													</tbody>
// 												</table>
// 											) : (
// 												<p>No companies created yet.</p>
// 											)}
// 										</div>
// 									)}
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<Bfooter />
// 		</>
// 	);
// }

// export default CreateCompany;
