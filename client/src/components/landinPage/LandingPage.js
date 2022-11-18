import React from "react";
import { Link } from "react-router-dom";
import styles from './landingpage.module.css'

function LandingPage() {
  return (
    
    <header>
       
      <div className={styles.principal}>
        <Link to="/home">
          <button className={styles.btn}>Ingresar</button>
        </Link>
        
      </div>
     
    </header>
   
  );
}

export default LandingPage;
