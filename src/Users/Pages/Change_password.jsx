import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import axios from "axios";

function Change_password() {
  const [formValue, setFormValue] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formValue);

    if (!formValue.email) {
      toast.error("Email is required");
      return;
    }
    if (!formValue.oldPassword) {
      toast.error("Old password is required");
      return;
    }
    if (!formValue.newPassword) {
      toast.error("New password is required");
      return;
    }
    if (!formValue.confirmPassword) {
      toast.error("Confirm new password is required");
      return;
    }

    if (formValue.newPassword !== formValue.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/user?email=${formValue.email}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];
        if (user.password === formValue.oldPassword) {
          user.password = formValue.newPassword;
          await axios.put(`http://localhost:3000/user/${user.id}`, user);
          toast.success("Password changed successfully");

          // Clear the form fields
          setFormValue({
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          toast.error("Old password is incorrect");
        }
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error(
        "An error occurred while changing the password. Please try again."
      );
    }
  };

  return (
    <>
      <Bheader />
      <BSlidnav />
      <div class="wrapper">
        <div className="content-wrapper">
          <section className="content mt-4">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  {/* jquery validation */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Change your password here</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form id="quickForm" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formValue.email}
                            onChange={handleChange}
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Old password
                          </label>
                          <input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            value={formValue.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter Old password"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formValue.newPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="New Password"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              name="terms"
                              className="custom-control-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="exampleCheck1"
                            >
                              I agree to the
                              <a href="#">terms of service</a>.
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                          Submit
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
        </div>
      </div>
      <Bfooter />
    </>
  );
}

export default Change_password;
