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
		address: "",
		phone: "",
		email: "",
		website: "",
		business_no: "",
		corporate_tax_no: "",
		gst_no: "",
		pst_nos: "",
		fiscal_year: "",
		fiscal_year_to: "", //this
		home_currency: "",
		bank_details: "",
		additional_notes: "",
	});

	const [activeSection, setActiveSection] = useState("company");
	const [companies, setCompanies] = useState([]);
	const [currentSection, setCurrentSection] = useState(0);
	const [companyId, setCompanyId] = useState(null); //this
	const [isEditing, setIsEditing] = useState(false);
	const sections = ["company", "contact", "tax", "fiscal", "notes"];

	useEffect(() => {
		getcompanies();
	}, []);

	const getcompanies = async () => {
		const userId = localStorage.getItem("userid");
		console.log("Retrieved userId:", userId); //
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
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
			address: company.address,
			phone: company.phone,
			email: company.email,
			website: company.website,
			business_no: company.business_no,
			corporate_tax_no: company.corporate_tax_no,
			gst_no: company.gst_no,
			pst_nos: company.pst_nos,
			fiscal_year: company.fiscal_year,
			fiscal_year_to: company.fiscal_year_to, //this
			home_currency: company.home_currency,
			bank_details: company.bank_details,
			additional_notes: company.additional_notes,
		});
		setActiveSection("company");
		setCompanyId(company.company_id);
		setIsEditing(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
					address: "",
					phone: "",
					email: "",
					website: "",
					business_no: "",
					corporate_tax_no: "",
					gst_no: "",
					pst_nos: "",
					fiscal_year: "",
					fiscal_year_to: "", //this
					home_currency: "",
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
					address: "",
					phone: "",
					email: "",
					website: "",
					business_no: "",
					corporate_tax_no: "",
					gst_no: "",
					pst_nos: "",
					fiscal_year: "",
					fiscal_year_to: "", //this
					home_currency: "",
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
												<input
													type="text"
													name="business_type"
													id="business_type"
													value={formData.business_type}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Business Type"
												/>
											</div>
											<button type="button" className="btn btn-primary" onClick={handleNextClick}>
												Next
											</button>
										</div>
									)}

									{activeSection === "contact" && (
										<div className="mb-4">
											<h4>Contact Information</h4>
											{/* <div className="mb-3">
												<label htmlFor="address">Address</label>
												<textarea
													name="address"
													id="address"
													value={formData.address}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Address"
												/>
											</div> */}

											{/* from here */}
											<div className="mb-3">
												<label htmlFor="address">Address</label>
												<div className="row">
													<div className="col-md-12">
														<input
															type="text"
															name="address_line_1"
															id="address_line_1"
															value={formData.address_line_1}
															onChange={handleChange}
															className="form-control"
															placeholder="Address Line 1"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-md-12">
														<input
															type="text"
															name="address_line_2"
															id="address_line_2"
															value={formData.address_line_2}
															onChange={handleChange}
															className="form-control"
															placeholder="Address Line 2"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-md-6">
														<input
															type="text"
															name="city"
															id="city"
															value={formData.city}
															onChange={handleChange}
															className="form-control"
															placeholder="City"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															name="province"
															id="province"
															value={formData.province}
															onChange={handleChange}
															className="form-control"
															placeholder="Province"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-md-6">
														<input
															type="text"
															name="postal_code"
															id="postal_code"
															value={formData.postal_code}
															onChange={handleChange}
															className="form-control"
															placeholder="Postal Code"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															name="country"
															id="country"
															value={formData.country}
															onChange={handleChange}
															className="form-control"
															placeholder="Country"
														/>
													</div>
												</div>
											</div>
											<div className="mb-3">
												<label htmlFor="phone">Phone</label>
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
											<div className="mb-3">
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
											<div className="mb-3">
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
												<div className="d-flex">
													<div className="mr-2">
														<input
															type="date"
															name="fiscal_year"
															id="fiscal_year"
															value={formData.fiscal_year}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Fiscal Year"
														/>
													</div>
													<div className="mr-2">
														<input
															type="date"
															name="fiscal_year_to"
															id="fiscal_year_to"
															value={formData.fiscal_year_to}
															onChange={handleChange}
															className="form-control"
															placeholder="To"
														/>
													</div>
												</div>
											</div>

											<div className="mb-3">
												<label htmlFor="home_currency">Home Currency</label>
												<select
													name="home_currency"
													id="home_currency"
													value={formData.home_currency}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Home Currency"
												>
													<option value="">Select Currency</option>
													<option value="">Select Currency</option>
													<option value="USD">USD</option>
													<option value="EUR">EUR</option>
													<option value="GBP">GBP</option>
													<option value="INR">INR</option>
													<option value="AUD">AUD</option>
													<option value="CAD">CAD</option>
													<option value="JPY">JPY</option>
													<option value="CNY">CNY</option>
													<option value="Other">Other</option>
												</select>
											</div>

											{/* <div className="mb-3">
												<label htmlFor="bank_details">Bank Details</label>
												<textarea
													name="bank_details"
													id="bank_details"
													value={formData.bank_details}
													onChange={handleChange}
													className="form-control"
													placeholder="Enter Bank Details"
												/>
											</div> */}

											{/* from here */}

											<div className="mb-3">
												<label htmlFor="bank_details">Bank Details</label>
												<div className="row">
													<div className="col-md-6">
														<input
															type="text"
															name="bank_name"
															id="bank_name"
															value={formData.bank_name}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Bank Name"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															name="bank_account_number"
															id="bank_account_number"
															value={formData.bank_account_number}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Bank Account Number"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-md-6">
														<input
															type="text"
															name="bank_branch"
															id="bank_branch"
															value={formData.bank_branch}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Bank Branch"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															name="bank_ifsc_code"
															id="bank_ifsc_code"
															value={formData.bank_ifsc_code}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Bank IFSC Code"
														/>
													</div>
												</div>
												<div className="row mt-2">
													<div className="col-md-6">
														<input
															type="text"
															name="transit_number"
															id="transit_number"
															value={formData.transit_number}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Transit Number"
														/>
													</div>
													<div className="col-md-6">
														<input
															type="text"
															name="institute_number"
															id="institute_number"
															value={formData.institute_number}
															onChange={handleChange}
															className="form-control"
															placeholder="Enter Institute Number"
														/>
													</div>
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
