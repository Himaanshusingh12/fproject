import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function Manage_user() {
	const [users, setUsers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [editForm, setEditForm] = useState({
		name: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/users`)
			.then((response) => setUsers(response.data))
			.catch((error) => toast.error("Error fetching users:", error));
	}, []);

	const handleShowModal = (user) => {
		setSelectedUser(user);
		setEditForm({
			name: user.name,
			email: user.email,
			phone: user.phone,
		});
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedUser(null);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`${BACKEND_URL}/api/users/${selectedUser.id}`, editForm)
			.then((response) => {
				setUsers((prevUsers) => prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...editForm } : user)));
				toast.success("User updated successfully!");
				handleCloseModal();
			})
			.catch(() => toast.error("Error updating user!"));
	};

	const handleDelete = (id) => {
		axios
			.delete(`${BACKEND_URL}/api/users/${id}`)
			.then((response) => {
				console.log(response.data.message);
				setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
				toast.success("User deleted successfully!");
			})
			.catch(() => toast.error("Error deleting user!"));
	};
	// Block/Unblock User
	const toggleBlockUser = (id) => {
		axios
			.put(`${BACKEND_URL}/api/users/${id}/block`)
			.then((response) => {
				const { message, isBlocked } = response.data;
				console.log(message);

				setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, isBlocked } : user)));

				toast.success(message);
			})
			.catch((error) => {
				console.error("Error toggling block status:", error);
				toast.error("Error toggling block status!");
			});
	};

	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-2">
						<h3 className="mb-4">Manage User</h3>
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Email Verified</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.id}>
										<td>{user.id}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<td>{user.emailVerified ? "Yes" : "No"}</td>
										<td>{user.isBlocked ? "Blocked" : "Active"}</td>
										<td>
											<button
												className={`btn ${user.isBlocked ? "btn-secondary" : "btn-success"} me-2`}
												onClick={() => toggleBlockUser(user.id)}
											>
												<i
													className={`fas ${user.isBlocked ? "fa-times-circle" : "fa-check-circle"}`}
													title={user.isBlocked ? "Unblock" : "Block"}
												></i>
											</button>
											<button className="btn btn-warning ms-2" onClick={() => handleShowModal(user)}>
												<i className="fas fa-edit" title="Edit"></i>
											</button>
											<button className="btn btn-danger ms-2" onClick={() => handleDelete(user.id)}>
												<i className="fas fa-trash" title="Delete"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* Modal */}
						{showModal && (
							<div
								className="modal fade show"
								tabIndex="-1"
								style={{ display: "block" }}
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLabel">
												Edit User
											</h5>
											<button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
										</div>
										<div className="modal-body">
											<form onSubmit={handleSubmit}>
												<div className="mb-3">
													<label htmlFor="name" className="form-label">
														Name
													</label>
													<input
														type="text"
														id="name"
														name="name"
														className="form-control"
														value={editForm.name}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="email" className="form-label">
														Email
													</label>
													<input
														type="email"
														id="email"
														name="email"
														className="form-control"
														value={editForm.email}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="phone" className="form-label">
														Phone
													</label>
													<input
														type="text"
														id="phone"
														name="phone"
														className="form-control"
														value={editForm.phone}
														onChange={handleChange}
														required
													/>
												</div>
												<button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
													Close
												</button>
												<button type="submit" className="btn btn-primary ms-2">
													Save Changes
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						)}
						{showModal && <div className="modal-backdrop fade show"></div>}
					</div>
				</div>
			</div>
			<Afooter />
		</>
	);
}

export default Manage_user;
