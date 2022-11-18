import React from "react";
import styles from "./Paginado.module.css";
import { useDispatch } from "react-redux";
import {  setCurrentPage } from "../../redux/actions";
 

function Pagination({ pages, totalCard }) {
  const dispatch = useDispatch();
 
   

  const totalPages = Math.ceil((totalCard - 9) / pages) + 1;

  const page = [];
  for (let i = 0; i < totalPages; i++) {
    page.push(i + 1);
  }

  return (
    <div>
      <nav >
        <ul className={styles.pagination}>
          {page &&
            page.map((num) => (
              <div className={styles.pagination} key={num}>
                <button
                  
                  onClick={() => dispatch(setCurrentPage(num))}>
                  {num}
                </button>
                <hr />
              </div>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
