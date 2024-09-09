import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../Constant";

function Profile() {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [formvalue, setFormvalue] = useState({
		id: "",
		name: "",
		email: "",
		phone: "",
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userId = localStorage.getItem("userid");
		// console.log("Retrieved user ID from localStorage:", userId);
		if (userId) {
			fetchUserData(userId);
		} else {
			navigate("/");
		}
	}, []);

	const fetchUserData = async (userId) => {
		try {
			// const userId = localStorage.getItem("userid");
			// console.log("Fetching data for user ID:", userId);
			const res = await axios.get(`${BACKEND_URL}/user/${userId}`);
			setData(res.data);
			setFormvalue(res.data);
			// console.log(res.data);
			setLoading(false);
		} catch (error) {
			console.log("Error fetching user data:", error);
			setLoading(false);
		}
	};

	const getform = (e) => {
		setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
	};

	const editdata = async (id) => {
		try {
			const res = await axios.get(`${BACKEND_URL}/user/${id}`);
			setFormvalue(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const validation = () => {
		let result = true;
		if (formvalue.name === "") {
			toast.error("Name Field is required");
			result = false;
		}
		if (formvalue.email === "") {
			toast.error("Email Field is required");
			result = false;
		}
		if (formvalue.phone === "") {
			toast.error("Phone Field is required");
			result = false;
		}
		return result;
	};

	const submithandel = async (e) => {
		e.preventDefault();

		if (validation()) {
			try {
				console.log("Submitting data:", formvalue);
				const res = await axios.patch(`${BACKEND_URL}/user/${formvalue.id}`, formvalue);
				if (res.status === 200) {
					toast.success("Update success");
					fetchUserData(formvalue.id);
					setFormvalue({
						id: "",
						name: "",
						email: "",
						phone: "",
					});
				}
			} catch (error) {
				console.error(error);
			}
		}
		return false;
	};

	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<section className="content mt-4">
						<div className="container-fluid">
							<div className="row justify-content-center">
								<div className="col-md-6">
									<div className="card card-primary card-outline">
										<div className="card-body box-profile">
											{loading ? (
												<div className="text-center">
													{/* Loader */}
													<div className="spinner-border text-primary" role="status">
														<span className="visually-hidden"></span>
													</div>
													<p>Loading...</p>
												</div>
											) : (
												<>
													<h3 className="profile-username text-center">{data.name}</h3>
													<p className="text-muted text-center">User</p>
													<ul className="list-group list-group-unbordered mb-3">
														<li className="list-group-item">
															<b>ID</b> <a className="float-right">{data.id}</a>
														</li>
														<li className="list-group-item">
															<b>Email</b> <a className="float-right">{data.email}</a>
														</li>
														<li className="list-group-item">
															<b>Phone</b> <a className="float-right">{data.phone}</a>
														</li>
													</ul>

													<button className="btn btn-primary btn-block" onClick={() => editdata(data.id)} data-toggle="modal" data-target="#myModal">
														Edit Profile
													</button>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className="modal" id="myModal">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title">Edit Profile</h4>
									<button type="button" className="btn-close" data-dismiss="modal" />
								</div>

								<div className="modal-body">
									<div className="container">
										<form onSubmit={submithandel}>
											<div className="row g-3">
												<div className="col-md-6">
													<div className="form-floating">
														<input type="text" className="form-control" name="name" value={formvalue.name} onChange={getform} id="name" />
														<label htmlFor="name">Your Name</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-floating">
														<input type="email" className="form-control" name="email" value={formvalue.email} onChange={getform} id="email" />
														<label htmlFor="email">Your Email</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-floating">
														<input type="tel" className="form-control" name="phone" value={formvalue.phone} onChange={getform} id="phone" />
														<label htmlFor="phone">Your Phone</label>
													</div>
												</div>
												<div className="col-12">
													<button className="btn btn-primary w-100 py-3" type="submit">
														Save
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" data-dismiss="modal">
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Bfooter />
		</>
	);
}

export default Profile;
