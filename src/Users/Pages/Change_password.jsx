// import React, { useState } from "react";
// import Bheader from "../Components/Bheader";
// import BSlidnav from "../Components/BSlidnav";
// import Bfooter from "../Components/Bfooter";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Change_password() {
//   const [formValue, setFormValue] = useState({
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });

//   const getFormValue = (e) => {
//     setFormValue({ ...formValue, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { email, oldPassword, newPassword, confirmNewPassword } = formValue;

//     if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
//       toast.error("All fields are required");
//       return false;
//     }

//     if (newPassword !== confirmNewPassword) {
//       toast.error("New passwords do not match");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           `${BACKEND_URL}/change-password`,
//           formValue
//         );
//         if (response.status === 200) {
//           toast.success("Password changed successfully");
//         } else {
//           toast.error("Failed to change password");
//         }
//       } catch (error) {
//         toast.error("Failed to change password: " + error.message);
//       }
//     }
//   };

//   return (
//     <>
//       <Bheader />
//       <BSlidnav />
//       <div class="wrapper">
//         <div className="content-wrapper">
//           <section className="content mt-4">
//             <div className="container-fluid">
//               <div className="row">
//                 {/* left column */}
//                 <div className="col-md-12">
//                   {/* jquery validation */}
//                   <div className="card card-primary">
//                     <div className="card-header">
//                       <h3 className="card-title">Change your password here</h3>
//                     </div>
//                     {/* /.card-header */}
//                     {/* form start */}
//                     <form onSubmit={handleSubmit}>
//                       <div className="card-body">
//                         <div className="form-group">
//                           <label htmlFor="email">Email</label>
//                           <input
//                             type="email"
//                             name="email"
//                             className="form-control"
//                             value={formValue.email}
//                             onChange={getFormValue}
//                             placeholder="Enter Email"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="Old password">Old password</label>
//                           <input
//                             type="password"
//                             name="oldPassword"
//                             className="form-control"
//                             value={formValue.oldPassword}
//                             onChange={getFormValue}
//                             placeholder="Enter Old password"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="newPassword">New Password</label>
//                           <input
//                             type="password"
//                             name="newPassword"
//                             value={formValue.newPassword}
//                             onChange={getFormValue}
//                             className="form-control"
//                             placeholder="New Password"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="confirmNewPassword">
//                             Confirm New Password
//                           </label>
//                           <input
//                             type="password"
//                             name="confirmPassword"
//                             value={formValue.confirmNewPassword}
//                             onChange={getFormValue}
//                             className="form-control"
//                             placeholder="Confirm New Password"
//                           />
//                         </div>
//                         <div className="form-group mb-0">
//                           <div className="custom-control custom-checkbox">
//                             <input
//                               type="checkbox"
//                               name="terms"
//                               className="custom-control-input"
//                               id="exampleCheck1"
//                             />
//                             <label
//                               className="custom-control-label"
//                               htmlFor="exampleCheck1"
//                             >
//                               I agree to the
//                               <a href="#">terms of service</a>.
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       {/* /.card-body */}
//                       <div className="card-footer">
//                         <button type="submit" className="btn btn-primary">
//                           Submit
//                         </button>
//                       </div>
//                     </form>
//                     {/* {message && <p>{message}</p>} */}
//                   </div>
//                   {/* /.card */}
//                 </div>
//                 {/*/.col (left) */}
//                 {/* right column */}
//                 <div className="col-md-6" />
//                 {/*/.col (right) */}
//               </div>
//               {/* /.row */}
//             </div>
//             {/* /.container-fluid */}
//           </section>
//         </div>
//       </div>
//       <Bfooter />
//     </>
//   );
// }

// export default Change_password;

// from here

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
		email: "",
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const navigate = useNavigate();

	const getFormValue = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const { email, oldPassword, newPassword, confirmNewPassword } = formValue;

		// console.log("Validating form:", formValue); // Debugging line

		if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
			toast.error("All fields are required");
			return false;
		}

		if (newPassword !== confirmNewPassword) {
			toast.error("New passwords do not match");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				const response = await axios.post(`${BACKEND_URL}/change-password`, formValue);
				if (response.status === 200) {
					toast.success("Password changed successfully");
					setFormValue({
						email: "",
						oldPassword: "",
						newPassword: "",
						confirmNewPassword: "",
					});
					navigate("/user");
				} else {
					toast.error("Failed to change password");
				}
			} catch (error) {
				toast.error("Failed to change password: " + error.message);
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
								<div className="col-md-12">
									<div className="card card-primary">
										<div className="card-header">
											<h3 className="card-title">Change your password here</h3>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														name="email"
														id="email"
														className="form-control"
														value={formValue.email}
														onChange={getFormValue}
														placeholder="Enter Email"
													/>
												</div>
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
												<div className="form-group">
													<label htmlFor="confirmNewPassword">Confirm New Password</label>
													<input
														type="password"
														name="confirmNewPassword" // Correct name
														id="confirmNewPassword"
														className="form-control"
														value={formValue.confirmNewPassword}
														onChange={getFormValue}
														placeholder="Confirm New Password"
													/>
												</div>
											</div>
											<div className="card-footer">
												<button type="submit" className="btn btn-primary">
													Submit
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
