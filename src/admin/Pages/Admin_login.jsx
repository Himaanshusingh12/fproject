import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Constant";

function Admin_login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`${BACKEND_URL}/api/admin/login`, { email, password });
			localStorage.setItem("adminToken", response.data.token);
			toast.success("Login successfull");
			navigate("/dashboard");
		} catch (error) {
			toast.error("Login failed. please check your credentials");
		}
	};
	return (
		<>
			<section className="content mt-4">
				<div className="container-fluid">
					<div className="row">
						{/* left column */}
						<div className="col-md-4">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Admin Login</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}
								<form id="quickForm" method="post" onSubmit={handleLogin}>
									<div className="card-body">
										<div className="form-group">
											<label htmlFor="email">Enter Email</label>
											<input
												type="email"
												name="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="form-control"
												id="email"
												placeholder="Enter Your Email"
												required
											/>
										</div>
										<div className="form-group">
											<label htmlFor="password">Enter Password</label>
											<input
												type="password"
												name="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="form-control"
												id="password"
												placeholder="Enter Password"
												required
											/>
										</div>
									</div>
									{/* /.card-body */}
									<div className="card-footer">
										<button type="submit" className="btn btn-primary">
											LOGIN
										</button>
									</div>
								</form>
							</div>
							{/* /.card */}
						</div>
						{/*/.col (left) */}
						{/* right column */}
						<div className="col-md-6" />
						{/*/.col (right) */}
					</div>
					{/* /.row */}
				</div>
				{/* /.container-fluid */}
			</section>
		</>
	);
}

export default Admin_login;
