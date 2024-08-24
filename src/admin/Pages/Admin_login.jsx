import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin_login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const getform = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    if (!formValue.email) {
      toast.error("Email is required");
      valid = false;
    }
    if (!formValue.password) {
      toast.error("Password is required");
      valid = false;
    }
    return valid;
  };

  const submithandel = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.get(
          "http://localhost:3000/admins",
          formValue
        );

        console.log("API Response:", response.data);

        const admin = response.data.find(
          (admin) =>
            admin.email === formValue.email &&
            admin.password === formValue.password
        );

        if (admin) {
          localStorage.setItem("adminId", admin.id);
          localStorage.setItem("adminName", admin.name);
          toast.success("Login Successful");
          navigate("/dashboard");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Login failed");
      }
    }
  };
  return (
    <>
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Admin Login</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form
                  id="quickForm"
                  action=""
                  method="post"
                  onSubmit={submithandel}
                >
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Enter Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formValue.email}
                        onChange={getform}
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">
                        Enter Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={getform}
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
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
