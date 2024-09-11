import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../Constant";

function Change_password() {
	const [formValue, setFormValue] = useState({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const navigate = useNavigate();

	const getFormValue = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const { oldPassword, newPassword, confirmNewPassword } = formValue;

		// Check if each field is filled
		if (!oldPassword || !newPassword || !confirmNewPassword) {
			if (!oldPassword) {
				toast.error("Old password is required");
				return false;
			}

			if (!newPassword) {
				toast.error("New passwords is required");
				return false;
			}
			if (!confirmNewPassword) {
				toast.error("Confirm new password is required");
			}
			return false;
		}

		// Check if new passwords match
		if (newPassword !== confirmNewPassword) {
			toast.error("New passwords do not match");
			return false;
		}

		// Regular expression to check the password strength
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!passwordRegex.test(newPassword)) {
			toast.error(
				"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
			);
			return false;
		}

		return true;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			const userId = localStorage.getItem("userid");
			try {
				const response = await axios.post(`${BACKEND_URL}/change-password`, {
					userId,
					oldPassword: formValue.oldPassword,
					newPassword: formValue.newPassword,
					confirmNewPassword: formValue.confirmNewPassword,
				});

				if (response.status === 200) {
					toast.success("Password changed successfully");
					setFormValue({
						oldPassword: "",
						newPassword: "",
						confirmNewPassword: "",
					});
					navigate("/user");
				} else {
					toast.error("Failed to change password");
				}
			} catch (error) {
				if (error.response) {
					// Display specific error messages from server
					toast.error(error.response.data.message || "An error occurred");
				} else {
					// Display generic error message for unknown errors
					toast.error("An error occurred while changing the password");
				}
			}
		}
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-6">
									<div className="card card-primary">
										<div className="card-header">
											<h3 className="card-title">Change password</h3>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label htmlFor="oldPassword">Old Password</label>
															<input
																type="password"
																name="oldPassword"
																id="oldPassword"
																className="form-control"
																value={formValue.oldPassword}
																onChange={getFormValue}
																placeholder="Enter Old Password"
															/>
														</div>
													</div>
													<div className="col-md-12">
														<div className="form-group">
															<label htmlFor="newPassword">New Password</label>
															<input
																type="password"
																name="newPassword"
																id="newPassword"
																className="form-control"
																value={formValue.newPassword}
																onChange={getFormValue}
																placeholder="New Password"
															/>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label htmlFor="confirmNewPassword">Confirm Password</label>
															<input
																type="password"
																name="confirmNewPassword"
																id="confirmNewPassword"
																className="form-control"
																value={formValue.confirmNewPassword}
																onChange={getFormValue}
																placeholder="Confirm New Password"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="card-footer">
												<button type="submit" className="btn btn-primary">
													Update Password
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>

			<Bfooter />
		</>
	);
}

export default Change_password;
