import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";

function VerifyOtp() {
	const [enteredOtp, setEnteredOtp] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { email } = location.state;

	const handleOtpChange = (e) => {
		setEnteredOtp(e.target.value);
	};

	const verifyOtp = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${BACKEND_URL}/verify-otp`, {
				email,
				enteredOtp,
			});
			if (response.status === 200) {
				toast.success("OTP verified successfully");
				navigate("/");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Invalid OTP");
		}
	};
	return (
		<div className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow-sm">
						<div className="card-body">
							<h5 className="card-title">Verify Your Email</h5>
							<form onSubmit={verifyOtp}>
								<div className="mb-3">
									<label htmlFor="otp" className="form-label">
										Enter Your OTP
									</label>
									<input type="text" className="form-control" id="otp" value={enteredOtp} onChange={handleOtpChange} required />
								</div>
								<button type="submit" className="btn btn-primary">
									Verify Email
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerifyOtp;
