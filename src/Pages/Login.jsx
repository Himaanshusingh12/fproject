import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";

function Login() {
	const [formvalue, setFormvalue] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const getform = (e) => {
		setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
	};

	const validation = () => {
		var result = true;

		if (formvalue.email === "") {
			toast.error("Email Field is required");
			result = false;
		}
		if (formvalue.password === "") {
			toast.error("Password Field is required");
			result = false;
		}
		return result;
	};

	const submithandel = async (e) => {
		e.preventDefault();
		if (validation()) {
			try {
				const response = await axios.post(`${BACKEND_URL}/login`, formvalue);
				if (response.status === 200) {
					const { user } = response.data;
					console.log(response.data);
					localStorage.setItem("userid", user.id);
					localStorage.setItem("uemail", user.email);
					localStorage.setItem("uname", user.name);

					toast.success("Login successful");
					navigate("/user");
				} else {
					toast.error("Login failed: " + response.data.message);
				}
			} catch (error) {
				if (error.response && error.response.data && error.response.data.message) {
					toast.error("Login failed: " + error.response.data.message);
				} else {
					toast.error("Login failed: " + error.message);
				}
			}
		}
	};

	return (
		<>
			<Header />
			{/* HTML */}
			{/* <div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card shadow-sm">
							<div className="card-body">
								<h5 className="card-title">Login</h5>

								<form noValidate onSubmit={submithandel}>
									<div className="mt-5">
										<label htmlFor="email" className="form-label ">
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											name="email"
											value={formvalue.email}
											onChange={getform}
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<input
											type="password"
											className="form-control"
											id="password"
											name="password"
											value={formvalue.password}
											onChange={getform}
											required
										/>
									</div>
									<div className="row">
										<div className="col-md-12">
											<button type="submit" className="btn btn-primary btn-block">
												Login
											</button>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<p>
												Don't have an account? <Link to="/signup">Sign up here</Link>
											</p>
											<p>
												Forgot password? <NavLink to="/forget-password">Reset password</NavLink>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			{/* from here */}
			<section className="content mt-4">
				<div className="container-fluid h-100">
					<div className="row h-100 justify-content-center align-items-center">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Log in</h3>
								</div>
								<form noValidate onSubmit={submithandel}>
									<div className="card-body">
										<div className="row">
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
										</div>
									</div>
									<div className="card-footer">
										<button type="submit" className="btn btn-primary btn-block">
											Log in
										</button>
										<div className="row">
											<div className="col-md-12">
												<p>
													Don't have an account? <Link to="/signup">Sign up here</Link>
												</p>
												<p>
													Forgot password? <NavLink to="/forget-password">Reset password</NavLink>
												</p>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Login;
