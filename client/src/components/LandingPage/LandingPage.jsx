import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css"

export default function LandingPage() {
  return (
    <div id="fondo">
      <h1 className="cartel" >Bienvenidos:</h1>
      <Link to="/home">
          <button
            className="logoIn"
            src="https://1.bp.blogspot.com/-r-vVAPhYeh0/XvcxxFAXFWI/AAAAAAAAZpQ/ithAR9K5wAQUGTt004NVJTvQZpji345mACLcBGAsYHQ/s1600/18.png"
            alt="In to page"
          > Ingresa</button>
        </Link>
    </div>
  );
}
