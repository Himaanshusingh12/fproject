import React, { useEffect, useState } from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";
import axios from "axios";
import { BACKEND_URL } from "../../Constant";
import { toast } from "react-toastify";

function Manage_user() {
	const [users, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [editForm, setEditForm] = useState({
		name: "",
		email: "",
		phone: "",
	});
	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [userPerPage] = useState(6);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async (searchQuery = "") => {
		try {
			let url = `${BACKEND_URL}/api/users`;
			if (searchQuery) {
				url = `${BACKEND_URL}/api/users/search?search=${searchQuery}`;
			}
			const response = await axios.get(url);

			if (response.status === 200) {
				setUsers(response.data);
				setFilteredUsers(response.data);
			} else {
				toast.error(`Failed to fetch Users: ${response.statusText}`);
			}
		} catch (error) {
			if (error.response) {
				toast.error(`Failed to fetch user 2: ${error.response.data.message || error.response.statusText}`);
			} else if (error.request) {
				toast.error("Failed to fetch user 3: No response received");
			} else {
				toast.error(`Failed to fetch user 4: ${error.message}`);
			}
		}
	};
	//  for search Users
	// const handleSearch = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setSearchQuery(searchQuery);
	// 	setCurrentPage(1); // Reset pagination

	// 	if (searchQuery) {
	// 		fetchUsers(searchQuery);
	// 	} else {
	// 		setFilteredUsers(users);
	// 	}
	// };
	//new handlesearch
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery) {
			// const filtered = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
			// setFilteredUsers(filtered);
			setCurrentPage(1);
		} else {
			setFilteredUsers(users);
		}
	};
	useEffect(() => {
		if (searchQuery) {
			setFilteredUsers(
				users.filter(
					(user) =>
						user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
						user.phone.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);
		} else {
			setFilteredUsers(users);
		}
	}, [searchQuery, users]);

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

	// Pagination Logic
	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

	const totalPages = Math.ceil(filteredUsers.length / userPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<div className="container mt-2">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h3 className="mb-4">Manage User</h3>
							<div className="d-flex align-items-center">
								<span className="me-2">Search:</span>
								<input
									type="text"
									value={searchQuery}
									onChange={handleSearch}
									placeholder="Search Users"
									className="form-control"
									style={{ width: "250px" }}
								/>
							</div>
						</div>
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
								{currentUsers.map((user) => (
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

						{/* Pagination Controls */}
						<nav>
							<ul className="pagination justify-content-end">
								<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
									<button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
										Previous
									</button>
								</li>
								{Array.from({ length: totalPages }, (_, index) => (
									<li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
										<button className="page-link" onClick={() => handlePageChange(index + 1)}>
											{index + 1}
										</button>
									</li>
								))}
								<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
									<button
										className="page-link"
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
									>
										Next
									</button>
								</li>
							</ul>
						</nav>

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
