import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Customer_statement() {
  return (
    <>
      <Bheader />
      <BSlidnav />
      <div class="wrapper">
        <div className="content-wrapper">
          <p>Customer statement</p>
        </div>
      </div>
      <Bfooter />
    </>
  );
}

export default Customer_statement;
