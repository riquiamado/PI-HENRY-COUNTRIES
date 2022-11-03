import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";

function LandingPage() {
  return (
    <header>
      <div className="texto">
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </header>
  );
}

export default LandingPage;
