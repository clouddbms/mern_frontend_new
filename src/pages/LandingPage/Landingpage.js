import React from "react";
import ParticleBackground from "../../components/particleBackground";
import styles from "./Landingpage.module.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <>
      <div className={styles["particlesjs"]}>
        <ParticleBackground></ParticleBackground>
        <div className={styles.project_name_container}>
               <h1 className={styles.mindmeld}>MIND MELD</h1>      
        </div>
        <div className={styles.hrefs}>
            <h2 className={styles.navi}> <Link to="/contactus">ContactUs</Link> </h2>
            <h2 className={styles.navi}> <Link to="/aboutus">AboutUs</Link></h2>
          </div>
        <div className={styles["bottom-btns"]}>
            <h2 className={styles.explore}>EXPLORE OUR VISION</h2>
            <Link to="/register"> <button className={styles.signup}>Sign Up</button></Link>
            <Link to="/login"><button className={styles.login}>Login</button></Link>
          </div>
      </div>
    </>
  );
}
