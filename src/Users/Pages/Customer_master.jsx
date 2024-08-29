import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import axios from "axios";
import { toast } from "react-toastify";

function Customer_master() {
  const [customerForm, setCustomerForm] = useState({
    customer_name: "",
    operating_as: "",
    address: "",
    currency: "",
    email_sales: "",
    email_statement: "",
    gst_no: "",
    credit_terms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validation = () => {
    let result = true;
    if (customerForm.customer_name === "") {
      toast.error("Customer Name field is required");
      result = false;
    } else if (customerForm.customer_name.length < 3) {
      toast.error("Customer Name must be at least 3 characters long");
      result = false;
    }

    if (customerForm.operating_as === "") {
      toast.error("Operating As field is required");
      result = false;
    }

    if (customerForm.address === "") {
      toast.error("Address field is required");
      result = false;
    }

    if (customerForm.currency === "") {
      toast.error("Currency field is required");
      result = false;
    }

    if (customerForm.email_sales === "") {
      toast.error("Email Address for Sales Invoice field is required");
      result = false;
    } else if (!customerForm.email_sales.includes("@")) {
      toast.error(
        "Invalid Email Address for Sales Invoice. Please include '@' in your email."
      );
      result = false;
    }
    if (customerForm.email_statement === "") {
      toast.error("Email Address for Customer Statement field is required");
      result = false;
    } else if (!customerForm.email_statement.includes("@")) {
      toast.error(
        "Invalid Email Address for Customer Statement. Please include '@' in your email."
      );
      result = false;
    }

    if (customerForm.gst_no === "") {
      toast.error("Customer GST No. field is required");
      result = false;
    }

    if (customerForm.credit_terms === "") {
      toast.error("Credit Terms field is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        customerForm
      );
      toast.success(response.data.message);
      setCustomerForm({
        customer_name: "",
        operating_as: "",
        address: "",
        currency: "",
        email_sales: "",
        email_statement: "",
        gst_no: "",
        credit_terms: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast("An error occurred");
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
                      <h3 className="card-title">ADD CUSTOM MASTER</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Customer_name">
                                Customer Name
                              </label>
                              <input
                                type="text"
                                name="customer_name"
                                id="customer_name"
                                className="form-control"
                                placeholder="Enter Customer Name"
                                value={customerForm.customer_name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="operating_as">Operating As</label>
                              <input
                                type="text"
                                name="operating_as"
                                id="operating_as"
                                className="form-control"
                                placeholder="Enter Operating As"
                                value={customerForm.operating_as}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                className="form-control"
                                placeholder="Enter Address"
                                value={customerForm.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="currency">Currency</label>
                              <input
                                type="text"
                                name="currency"
                                id="currency"
                                className="form-control"
                                placeholder="Enter Currency"
                                value={customerForm.currency}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email_sales">
                                Email Address for Sales Invoice
                              </label>
                              <input
                                type="email"
                                name="email_sales"
                                id="email_sales"
                                className="form-control"
                                placeholder="Enter Email Address for Sales Invoice"
                                value={customerForm.email_sales}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email_statement">
                                Email Address for customer Statement
                              </label>
                              <input
                                type="email"
                                name="email_statement"
                                id="email_statement"
                                className="form-control"
                                placeholder="Enter Email Address for Customer Statement"
                                value={customerForm.email_statement}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="gst_no">Customer GST No.</label>
                              <input
                                type="text"
                                name="gst_no"
                                id="gst_no"
                                className="form-control"
                                placeholder="Enter Customer GST NO."
                                value={customerForm.gst_no}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="credit_terms">Credit Terms</label>
                              <input
                                type="text"
                                name="credit_terms"
                                id="credit_terms"
                                className="form-control"
                                placeholder="Enter Credit Terms"
                                value={customerForm.credit_terms}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
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

export default Customer_master;
