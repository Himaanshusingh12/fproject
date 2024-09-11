import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function ResetPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetToken } = useParams(); // Get token from URL
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(`${BACKEND_URL}/reset-password`, { resetToken, newPassword: password });
			if (response.status === 200) {
				toast.success("Password reset successfully");
				navigate("/login"); // Redirect to login page after successful password reset
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to reset password. Please try again.");
			}
		}
	};

	return (
		<>
			<Header />
			{/* <div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card shadow-sm">
							<div className="card-body">
								<h5 className="card-title">Reset Password</h5>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											New Password
										</label>
										<input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
									</div>
									<div className="mb-3">
										<label htmlFor="confirmPassword" className="form-label">
											Confirm Password
										</label>
										<input
											type="password"
											className="form-control"
											id="confirmPassword"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</div>
									<button type="submit" className="btn btn-primary">
										Reset Password
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
									<h3 className="card-title">Reset Password</h3>
								</div>
								<form onSubmit={handleSubmit}>
									<div className="card-body">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label htmlFor="password">New Password</label>
													<input
														type="password"
														className="form-control"
														id="password"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														required
													/>
												</div>
												<div className="form-group">
													<label htmlFor="email">Confirm Password</label>
													<input
														type="password"
														className="form-control"
														id="confirmPassword"
														value={confirmPassword}
														onChange={(e) => setConfirmPassword(e.target.value)}
														required
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer">
										<button type="submit" className="btn btn-primary">
											Reset Password
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

export default ResetPassword;
