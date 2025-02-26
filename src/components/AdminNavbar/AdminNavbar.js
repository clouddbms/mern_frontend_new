import { Link } from "react-router-dom";
import styles from "./AdminNavbar.module.css";
import { useEffect, useState } from "react";
const AdminNavbar = () => {
  const [wide, setWide] = useState(false);
  const [newclass, setNewclass] = useState("short");
  const [navitemspan, setNavitemspan] = useState("hide");
  useEffect(() => {
    if (wide) {
      setNewclass("wide");
      setNavitemspan("");
    } else {
      setNewclass("short");
      setNavitemspan("hide");
    }
  }, [wide]);
  function toggleNavbar() {
    setWide(() => !wide);
  }
  return (
    <div className={`${styles["side-nav-container"]}  ${styles[newclass]}`}>
      <nav>
        <button className={styles.toggler} onClick={toggleNavbar}>
          <i class="fa-solid fa-bars"></i>
        </button>

        <ul className={styles["nav-items"]}>
          <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-user"></i>
              <span className={styles[navitemspan]}>Dashboard</span>
            </li>
          </Link>
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-house"></i>
              <span className={styles[navitemspan]}>Home</span>
            </li>
          </Link>
          <Link
            to="/admin/all_experts"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-user-tie"></i>
              <span className={styles[navitemspan]}>Experts</span>
            </li>
          </Link>
          <Link
            to="/admin/all_articles"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li className={styles["nav-item"]}>
              <i class="fa-sharp fa-solid fa-newspaper"></i>
              <span className={styles[navitemspan]}>Articles</span>
            </li>
          </Link>
          <Link
            to="/admin/query"
            style={{ textDecoration: "none", color: "white" }}
          >
            {" "}
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-message"></i>
              <span className={styles[navitemspan]}>Queries</span>
            </li>
          </Link>
          <Link
            to="/admin/mail"
            style={{ textDecoration: "none", color: "white" }}
          >
            {" "}
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-envelope"></i>
              <span className={styles[navitemspan]}>Mail</span>
            </li>
          </Link>
          <Link to="/logout" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            <li className={styles["nav-item"]}>
              <i class="fa-solid fa-right-from-bracket"></i>
              <span className={styles[navitemspan]}>Logout</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default AdminNavbar;
