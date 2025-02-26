import styles from "../LoginPage/loginstyles.module.css";
import Questionvideo from "../../assets/images/Question - 69588.mp4";
import title from "../../assets/images/title5.png";
const LefttLogin = () => {
  return (
    <>
    
      <div className={styles.vid}>
        <video width="170px" height="170px" autoPlay muted loop>
          <source src={Questionvideo} type="video/mp4" />
        </video>
      </div>
      <h2 className={styles.welcome}>Welcome to</h2>
      <img className={styles.meld} src={title} alt="" />
      <div className={styles.caption}>
        The writing of a good Blog is a talent, but the conveying it is an art.
      </div>
      <div className={styles["slideshow-container"]}></div>
    </>
  );
};
export default LefttLogin;
