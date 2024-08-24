import React, { useEffect, useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [formvalue, setFormvalue] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    console.log("Retrieved user ID from localStorage:", userId);
    if (userId) {
      fetchUserData(userId);
    } else {
      navigate("/");
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("Fetching data for user ID:", userId);

      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const editdata = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${id}`);
      setFormvalue(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getform = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
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
    if (formvalue.password === "") {
      toast.error("Password Field is required");
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
        const res = await axios.patch(
          `http://localhost:5000/user/${formvalue.id}`,
          formvalue
        );
        if (res.status === 200) {
          toast.success("Update success");
          fetchUserData();
          setFormvalue({
            id: "",
            name: "",
            email: "",
            password: "",
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
      <div class="wrapper">
        <div className="content-wrapper">
          <div className="container-xxl bg-white p-0">
            {/* Team Start */}
            <div className="container-xxl">
              <div className="container py- px-lg-3">
                <div className="wow fadeInUp" data-wow-delay="0.1s">
                  <h1 className="text-center mb-5">Edit Profile</h1>
                </div>
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="row g-4">
                    <div
                      className="offset-lg-4 col-lg-4 col-md-6 offset-md-3 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="team-item bg-light rounded">
                        <div className="text-center border-bottom p-4">
                          <h5>{data.name}</h5>
                          <span>Email : {data.email}</span>
                          <br />
                          <br />
                          <span>Password : {data.password}</span>
                          <br />
                          <br />
                          <span>phone : {data.phone}</span>
                          <br />
                          <br />
                          <button
                            className="btn btn-primary"
                            onClick={() => editdata(data.id)}
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            Edit Profile
                          </button>

                          <div className="modal" id="myModal">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                  <h4 className="modal-title">Edit Profile</h4>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-dismiss="modal"
                                  />
                                </div>
                                {/* Modal body */}

                                <div className="modal-body">
                                  <div className="container">
                                    <form action="" method="post">
                                      <div className="row g-3">
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="name"
                                              value={formvalue.name}
                                              onChange={getform}
                                              id="name"
                                            />
                                            <label htmlFor="name">
                                              Your Name
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input
                                              type="email"
                                              className="form-control"
                                              name="email"
                                              value={formvalue.email}
                                              onChange={getform}
                                              id="email"
                                            />
                                            <label htmlFor="email">
                                              Your Email
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input
                                              type="password"
                                              className="form-control"
                                              name="password"
                                              value={formvalue.password}
                                              onChange={getform}
                                              id="password"
                                            />
                                            <label htmlFor="password">
                                              Your Password
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input
                                              type="tel"
                                              className="form-control"
                                              name="phone"
                                              value={formvalue.phone}
                                              onChange={getform}
                                              id="phone"
                                            />
                                            <label htmlFor="phone">
                                              Your Phone
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-12">
                                          <button
                                            onClick={submithandel}
                                            className="btn btn-primary w-100 py-3"
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Team End */}
          </div>
        </div>
      </div>
      <Bfooter />
    </>
  );
}

export default Profile;
