import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function ForgetPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	// this
	// Function to validate email format
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	try {
	// 		const response = await axios.post(`${BACKEND_URL}/forgot-password`, { email });
	// 		if (response.status === 200) {
	// 			toast.success("Password reset email sent. Please check your inbox.");
	// 			navigate("/login");
	// 		}
	// 	} catch (error) {
	// 		toast.error("Failed to send reset email. Please try again.");
	// 	}
	// };

	// from here
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate email before submitting
		if (!isValidEmail(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}

		try {
			const response = await axios.post(`${BACKEND_URL}/forgot-password`, { email });
			if (response.status === 200) {
				toast.success("Password reset email sent. Please check your inbox.");
				setEmail(""); // Clear the input after successful submission
				navigate("/login");
			}
		} catch (error) {
			if (error.response) {
				// Check for specific status codes and show corresponding messages
				if (error.response.status === 404) {
					toast.error("This email is not registered.");
				} else if (error.response.status === 500) {
					toast.error("Failed to send reset email. Please try again.");
				}
			} else {
				toast.error("Failed to send reset email. Please try again.");
			}
		}
	};

	return (
		<>
			<Header />
			{/* <div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card shadow">
							<div className="card-body">
								<h5 className="card-title">Forgot Password</h5>
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
									</div>
									<button type="submit" className="btn btn-primary">
										Send Reset Link
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			<section className="content mt-4">
				<div className="container-fluid">
					<div className="row  justify-content-center">
						<div className="col-md-4">
							<div className="card card-primary text">
								<div className="card-header">
									<h3 className="card-title">Forget password</h3>
								</div>
								<form noValidate onSubmit={handleSubmit}>
									<div className="card-body">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														className="form-control"
														id="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														// required
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer">
										<button type="submit" className="btn btn-primary">
											Send Reset Link
										</button>
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

export default ForgetPassword;
