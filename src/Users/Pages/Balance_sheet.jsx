import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Balance_sheet() {
  return (
    <>
      <Bheader />
      <BSlidnav />
      <div class="wrapper">
        <div className="content-wrapper">
          <p>Balance sheet</p>
        </div>
      </div>
      <Bfooter />
    </>
  );
}

export default Balance_sheet;
