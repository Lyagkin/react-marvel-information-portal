import { NavLink } from "react-router-dom";

import zombie from "../../resources/img/zombie.jpg";

const PageNotFound = () => {
  return (
    <div
      style={{
        margin: "10px auto",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ textTransform: "uppercase" }}>Sorry! This page is not exist!</h2>
        <NavLink style={{ color: "#9F0013" }} to="/">
          Go back!
        </NavLink>
      </div>

      <div
        style={{
          backgroundImage: `url(${zombie})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundSize: "cover",
          width: "90%",
          height: "60vh",
          margin: "0 auto",
          borderRadius: "15px",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
        }}
      ></div>
    </div>
  );
};

export default PageNotFound;
