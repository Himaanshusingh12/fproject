import React from "react";
import Aheader from "../Components/Aheader";
import Afooter from "../Components/Afooter";
import Slidnav from "../Components/Slidnav";

function Add_users() {
  return (
    <>
      <Aheader />
      <Slidnav />
      <div class="wrapper">
        <div className="content-wrapper">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolores
            veritatis eos nihil, tempore, magni sint quam itaque alias deserunt
            quas. Atque pariatur praesentium ab omnis repellat rerum quia
            ratione?
          </p>
        </div>
      </div>

      <Afooter />
    </>
  );
}

export default Add_users;
