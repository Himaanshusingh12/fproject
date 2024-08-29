import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
  const [formvalue, setFormvalue] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const getform = (e) => {
    const { name, value } = e.target;
    setFormvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validation = () => {
    let result = true;
    if (formvalue.name === "") {
      toast.error("Name field is required");
      result = false;
    } else if (formvalue.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      result = false;
    }

    if (formvalue.email === "") {
      toast.error("Email field is required");
      result = false;
    } else if (!formvalue.email.includes("@")) {
      toast.error("Invalid email address. Please include '@' in your email.");
      result = false;
    }

    if (formvalue.password === "") {
      toast.error("Password field is required");
      result = false;
    }

    if (formvalue.phone === "") {
      toast.error("Phone field is required");
      result = false;
    }

    return result;
  };

  const submithandel = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/signup",
          formvalue
        );
        if (response.status === 201) {
          toast.success("User registered successfully");
          navigate("/verify-otp", { state: { email: formvalue.email } });
          setFormvalue({
            id: "",
            name: "",
            email: "",
            password: "",
            phone: "",
          });
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error("Registration failed: " + error.response.data.message);
        } else {
          toast.error("Registration failed: " + error.message);
        }
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Sign up for services</h5>
                <form
                  noValidate
                  action=""
                  method="post"
                  onSubmit={submithandel}
                >
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formvalue.name}
                          onChange={getform}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formvalue.email}
                          onChange={getform}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formvalue.password}
                          onChange={getform}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formvalue.phone}
                          onChange={getform}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;
