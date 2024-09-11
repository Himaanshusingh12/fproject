import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import Loaderstyle from "./Loaderstyle";
function Signup() {
	const [formvalue, setFormvalue] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
		phone: "",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const getform = (e) => {
		const { name, value } = e.target;
		setFormvalue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validation = () => {
		let result = true;
		if (formvalue.name === "") {
			toast.error("Name field is required");
			result = false;
		} else if (formvalue.name.length < 3) {
			toast.error("Name must be at least 3 characters long");
			result = false;
		}

		if (formvalue.email === "") {
			toast.error("Email field is required");
			result = false;
		} else if (!formvalue.email.includes("@")) {
			toast.error("Invalid email address. Please include '@' in your email.");
			result = false;
		}

		if (formvalue.password === "") {
			toast.error("Password field is required");
			result = false;
		} else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
			if (!passwordRegex.test(formvalue.password)) {
				toast.error(
					"Password must be at least 8 character long, contain at least one uppercase letter,one lowercase letter,and one special character."
				);
				result = false;
			}
		}

		if (formvalue.phone === "") {
			toast.error("Phone field is required");
			result = false;
		}

		return result;
	};

	const submithandel = async (e) => {
		e.preventDefault();
		if (validation()) {
			setLoading(true);
			try {
				const response = await axios.post(`${BACKEND_URL}/signup`, formvalue);
				if (response.status === 201) {
					toast.success("User registered successfully");
					navigate("/verify-otp", { state: { email: formvalue.email } });
					setFormvalue({
						id: "",
						name: "",
						email: "",
						password: "",
						phone: "",
					});
				}
			} catch (error) {
				if (error.response && error.response.data && error.response.data.message) {
					toast.error("Registration failed: " + error.response.data.message);
				} else {
					toast.error("Registration failed: " + error.message);
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<>
			<Header />
			{/* <div className="container py-5">
				{loading ? (
					<Loaderstyle />
				) : (
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div className="card shadow-sm">
								<div className="card-body">
									<h5 className="card-title">Sign up for services</h5>
									<form noValidate action="" method="post" onSubmit={submithandel}>
										<div className="row mt-5">
											<div className="col-md-12">
												<div className="mb-3">
													<label htmlFor="name" className="form-label">
														Name
													</label>
													<input type="text" className="form-control" id="name" name="name" value={formvalue.name} onChange={getform} />
												</div>
											</div>
											<div className="col-md-12">
												<div className="mb-3">
													<label htmlFor="email" className="form-label">
														Email
													</label>
													<input type="email" className="form-control" id="email" name="email" value={formvalue.email} onChange={getform} />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="mb-3">
													<label htmlFor="password" className="form-label">
														Password
													</label>
													<input type="password" className="form-control" id="password" name="password" value={formvalue.password} onChange={getform} />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="mb-3">
													<label htmlFor="phone" className="form-label">
														Phone
													</label>
													<input type="tel" className="form-control" id="phone" name="phone" value={formvalue.phone} onChange={getform} />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<button type="submit" className="btn btn-primary btn-block">
													Sign up
												</button>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<p>
													Already have an account? <Link to="/login">Login here</Link>
												</p>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
			</div> */}

			{/* from here */}
			<section className="content mt-4">
				{loading ? (
					<Loaderstyle />
				) : (
					<div className="container-fluid h-100">
						<div className="row h-100 justify-content-center align-items-center">
							<div className="col-md-6">
								<div className="card card-primary">
									<div className="card-header">
										<h3 className="card-title">Sign up</h3>
									</div>
									<form noValidate action="" method="post" onSubmit={submithandel}>
										<div className="card-body">
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="name">Name</label>
														<input
															type="text"
															name="name"
															id="name"
															className="form-control"
															value={formvalue.name}
															onChange={getform}
															placeholder="Enter Name"
														/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="email">Email</label>
														<input
															type="email"
															name="email"
															id="email"
															className="form-control"
															value={formvalue.email}
															onChange={getform}
															placeholder="Enter Email"
														/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="password">Password</label>
														<input
															type="password"
															name="password"
															id="password"
															className="form-control"
															value={formvalue.password}
															onChange={getform}
															placeholder="Enter Password"
														/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="phone">Phone</label>
														<input
															type="tel"
															name="phone"
															id="phone"
															className="form-control"
															value={formvalue.phone}
															onChange={getform}
															placeholder="Enter Phone"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="card-footer">
											<button type="submit" className="btn btn-primary btn-block">
												Sing up
											</button>
											<div className="row">
												<div className="col-md-12">
													<p>
														Already have an account? <Link to="/login">Login here</Link>
													</p>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>

			<Footer />
		</>
	);
}

export default Signup;
