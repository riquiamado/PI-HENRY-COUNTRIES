import React from "react";
import styles from "./Paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

function Pagination({ pages, totalCard }) {
  const dispatch = useDispatch();
  const currpage = useSelector((state) => state.currentPage);

  const totalPages = Math.ceil((totalCard - 9) / pages) + 1;

  const page = [];
  for (let i = 0; i < totalPages; i++) {
    page.push(i + 1);
  }

  return (
    <nav className={styles.pag}>
      <ul className={styles.pagination}>
        {page &&
          page.map((num) => (
            <div className={styles.pagination} key={num}>
              <button onClick={() => dispatch(setCurrentPage(num))}>
                {num}
              </button>
            </div>
          ))}
      </ul>
    </nav>
  );
}

export default Pagination;
